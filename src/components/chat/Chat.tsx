import { useContext, useRef } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
import { useDispatch } from 'react-redux'
import { removeChat } from '../../redux/chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import { SocketContext } from '../../routes/PrivateRoutesWrapper'
import { InfiniteScrollMsgs } from './InfiniteScrollMsgs'

interface Props {
  sender: string
  recipient: profile
  senderProfile: string
}

export const Chat = ({ senderProfile, sender, recipient }: Props) => {
  const socket = useContext(SocketContext)
  const dispatch = useDispatch()

  const TextMsgRef = useRef<HTMLInputElement>(null)
  const filesRef = useRef<HTMLInputElement>(null)
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
    }
    if (filesRef.current?.files && filesRef.current?.files.length > 0) {
      const message = {
        sender: sender,
        recipient: recipient._id,
        type: 'file',
        content: [] as {
          file: File
          fileName: string
          type: string
          size: number
        }[],
      }
      const files = Array.from(filesRef.current.files)
      message.content = files.map((file) => {
        return {
          file: file,
          fileName: file.name,
          type: file.type,
          size: file.size,
        }
      })

      console.log(message)
      socket?.emit('sendMessage', message)
    }
  }

  return (
    <Box
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

      <InfiniteScrollMsgs
        recipient={recipient}
        socket={socket}
        senderProfile={senderProfile}
        TextMsgRef={TextMsgRef}
      />

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
          <input
            type="file"
            id="file-input"
            style={{ display: 'none' }}
            multiple
            ref={filesRef}
          />
        </label>
        <IconButton onClick={sendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
