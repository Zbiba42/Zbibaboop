import { Box, IconButton, TextField } from '@mui/material'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
import { useDispatch } from 'react-redux'
import { removeChat } from '../../redux/chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { MsgSent } from './messages/MsgSent'
import { MsgReceived } from './messages/MsgReceived'
import { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { SocketContext } from '../../routes/PrivateRoutesWrapper'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {
  sender: string
  recipient: profile
}

export const Chat = ({ sender, recipient }: Props) => {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()
  let FirstReceived: any = null
  let FirstSent: any = null
  const chatRef = useRef<HTMLDivElement>(null)
  const TextMsgRef = useRef<HTMLInputElement>(null)
  const [messages, setMessages] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const getMessages = async () => {
    try {
      const { data } = await axios.get(serverUrl + '/api/messages/', {
        params: {
          recipient: recipient._id,
          page: page,
        },
      })

      setMessages(data.data.messages.reverse())
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const getNextMessages = async () => {
    alert('called')
    try {
      const { data } = await axios.get(serverUrl + '/api/messages/', {
        params: {
          recipient: recipient._id,
          page: page + 1,
        },
      })

      if (data.data.messages.length === 0) {
        setHasMore(false)
        return
      }

      setPage((prevPage) => prevPage + 1)

      setMessages(data.data.messages.reverse())
    } catch (error) {
      console.error('Error fetching next messages:', error)
    }
  }

  const sendMessage = () => {
    const TextData = TextMsgRef.current?.value

    if (TextData) {
      const message = {
        sender: sender,
        recipient: recipient._id,
        type: 'text',
        content: TextData,
      }

      socket?.emit('sendMessage', message)

      setTimeout(() => {
        getMessages()
        if (chatRef.current) {
          chatRef.current.scrollTop = chatRef.current.scrollHeight
        }
      }, 1)
    }
  }

  useEffect(() => {
    socket?.on('receiveMessage', () => {
      getMessages()
    })
  }, [])

  useEffect(() => {
    getMessages()
  }, [])

  return (
    <Box
      ref={chatRef}
      sx={{
        backgroundColor: 'white',
        width: 320,
        marginLeft: '20px',
        border: '1px solid grey',
        boxShadow: 2,
        borderRadius: '10px 10px 0% 0%',
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        className="absolute right-2 top-2"
        onClick={() => dispatch(removeChat(recipient._id))}
      >
        <CloseIcon fontSize="small" sx={{ color: 'black' }} />
      </button>
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <img
          src={serverUrl + recipient?.ProfilePath}
          alt=""
          draggable="false"
          className=" w-12 h-12 object-cover rounded-full border border-black "
        />
        <h1 className=" font-bold text-lg text-[#272838] capitalize text-left ">
          {recipient?.Fullname}
        </h1>
      </Box>

      <hr className="w-full" />
      <Box
        sx={{
          p: 1,
        }}
      >
        <InfiniteScroll
          dataLength={messages.length}
          next={() => getNextMessages()}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          scrollThreshold={1}
        >
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
                  img={recipient.ProfilePath}
                  key={index}
                />
              )
            }
          })}
        </InfiniteScroll>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 60,
          backgroundColor: '#ffffff',
          boxShadow: '0px -2px 8px rgba(0, 0, 0, 0.1)',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          sx={{
            flex: 1,
            marginRight: 2,
          }}
          placeholder="Type a message"
          autoComplete="off"
          variant="standard"
          inputRef={TextMsgRef}
        />
        <label htmlFor="file-input">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <input type="file" id="file-input" style={{ display: 'none' }} />
        </label>
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
