import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Socket } from 'socket.io-client'
import { Box } from '@mui/material'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
import { toast } from 'react-toastify'
import { MsgSent } from './messages/MsgSent'
import { MsgReceived } from './messages/MsgReceived'

interface Props {
  recipient: profile
  socket: Socket | null
  senderProfile: string
  TextMsgRef: React.RefObject<HTMLInputElement>
}

export const InfiniteScrollMsgs = ({
  recipient,
  socket,
  senderProfile,
  TextMsgRef,
}: Props) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  let FirstReceived: any = null
  let FirstSent: any = null

  const getMessages = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + '/api/Conversation/messages',
        {
          params: {
            recipient: recipient._id,
            page: page,
          },
        }
      )
      if (data.data) {
        setMessages(data.data.messages.reverse())
        if (data.data.messages.length === 0) {
          setHasMore(false)
        }
      } else {
        setMessages([])
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const getNextMessages = async () => {
    try {
      const { data } = await axios.get(
        serverUrl + '/api/Conversation/messages',
        {
          params: {
            recipient: recipient._id,
            page: page + 1,
          },
        }
      )

      if (data.data.messages.length === 0) {
        setHasMore(false)
      }

      setPage((prevPage) => prevPage + 1)

      setMessages(data.data.messages.reverse().concat(messages))
    } catch (error) {
      toast.error('Error fetching next messages')
    }
  }

  const deleteMessage = async (id: string) => {
    try {
      const { data } = await axios.post(
        serverUrl + '/api/Conversation/messages/remove',
        { id: id }
      )
      if (data.succes) {
        getMessages()
        toast.success('message deleted successfully')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  const editMessage = async (id: string, content: string | undefined) => {
    try {
      const { data } = await axios.post(
        serverUrl + '/api/Conversation/messages/edit',
        { id: id, content: content }
      )
      if (data.succes) {
        getMessages()
        toast.success('message updated successfully')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (page != 1) {
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop += 1300
        // messagesContainerRef.current.scrollHeight - 36 * 40
      }
    } else {
      if (messagesContainerRef.current) {
        getMessages()
        messagesContainerRef.current.scrollTop +=
          messagesContainerRef.current.scrollHeight
      }
    }
  }, [page])

  useEffect(() => {
    socket?.on('receiveMessage', (data) => {
      if (data.sender == recipient._id) {
        getMessages()
      }
    })
    socket?.on('messageSentResponse', (data) => {
      if (!data.succes) {
        toast.dismiss('fileUpload')
        toast.error('there was an error please try again later ')
      } else {
        if (data.message.recipient === recipient._id) {
          setMessages((old) => old.concat(data.message))

          setTimeout(() => {
            toast.dismiss('fileUpload')
          }, 500)
          if (TextMsgRef.current) {
            TextMsgRef.current.value = ''
          }
        }
      }
    })
    getMessages()
  }, [])

  return (
    <Box
      ref={messagesContainerRef}
      id="messagesContainer"
      sx={{
        height: '100%',
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        p: 1,
        scrollBehavior: 'smooth',
      }}
    >
      <InfiniteScroll
        dataLength={messages.length}
        next={() => getNextMessages()}
        hasMore={hasMore}
        inverse={true}
        loader={''}
        scrollableTarget="messagesContainer"
        key={recipient._id}
      >
        {messages.length === 0 && (
          <h3 className="text-center">
            This is the start of your conversation with {recipient.Fullname} say
            Hi!
          </h3>
        )}
        {messages.map(
          (
            msg: {
              sender: string
              content: string
              files: Array<{
                name: string
                path: string
              }>
              timestamp: string
              _id: string
            },
            index
          ) => {
            if (msg.sender == recipient._id) {
              if (FirstReceived == null) {
                FirstReceived = msg._id
                FirstSent = null
              }
              return (
                <MsgReceived
                  msg={msg}
                  isFirst={FirstReceived == msg._id}
                  img={recipient.ProfilePath}
                  key={index}
                />
              )
            } else {
              if (FirstSent == null) {
                FirstSent = msg._id
                FirstReceived = null
              }
              return (
                <MsgSent
                  msg={msg}
                  isFirst={FirstSent == msg._id}
                  img={senderProfile}
                  key={index}
                  deleteMessage={deleteMessage}
                  editMessage={editMessage}
                />
              )
            }
          }
        )}
      </InfiniteScroll>
      {page != 1 && (
        <div
          className="absolute left-36 w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 cursor-pointer"
          onClick={() => {
            setPage(1)
          }}
        >
          <i className="fa-solid fa-arrow-down"></i>
        </div>
      )}
    </Box>
  )
}
