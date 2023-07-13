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
      const { data } = await axios.get(serverUrl + '/api/messages/', {
        params: {
          recipient: recipient._id,
          page: page,
        },
      })
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
      const { data } = await axios.get(serverUrl + '/api/messages/', {
        params: {
          recipient: recipient._id,
          page: page + 1,
        },
      })

      if (data.data.messages.length === 0) {
        setHasMore(false)
      }

      setPage((prevPage) => prevPage + 1)

      setMessages(data.data.messages.reverse().concat(messages))
    } catch (error) {
      console.error('Error fetching next messages:', error)
    }
  }

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop +=
        messagesContainerRef.current.scrollHeight / (messages.length / 40)
    }
  }, [page])

  useEffect(() => {
    socket?.on('receiveMessage', () => {
      getMessages()
    })
    socket?.on('messageSentResponse', (data) => {
      if (!data.succes) {
        toast.error('there was an error please try again later ')
      } else {
        setMessages((old) => old.concat(data.message))
        if (TextMsgRef.current) {
          TextMsgRef.current.value = ''
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
        {messages.map((msg: any, index) => {
          if (msg.sender == recipient._id) {
            if (FirstReceived == null) {
              FirstReceived = msg._id
              FirstSent = null
            }
            return (
              <MsgReceived
                content={msg.content}
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
                content={msg.content}
                isFirst={FirstSent == msg._id}
                img={senderProfile}
                key={index}
              />
            )
          }
        })}
      </InfiniteScroll>
    </Box>
  )
}
