import { Box, IconButton, TextField } from '@mui/material'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
import { useDispatch } from 'react-redux'
import { removeChat } from '../../redux/chat'
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send'
import AttachFileIcon from '@mui/icons-material/AttachFile'
interface Props {
  recipient: profile
}

export const Chat = ({ recipient }: Props) => {
  const dispatch = useDispatch()
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
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>Chat aykon hna</h2>
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
        />
        <label htmlFor="file-input">
          <IconButton component="span">
            <AttachFileIcon />
          </IconButton>
          <input type="file" id="file-input" style={{ display: 'none' }} />
        </label>
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  )
}
