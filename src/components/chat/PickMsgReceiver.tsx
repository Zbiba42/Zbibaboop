import { Box, TextField } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { serverUrl } from '../../config'
import { useDispatch } from 'react-redux'
import { profile } from '../Profile/ProfileContent'
import { toggleNewChatComponent } from '../../redux/chat'
import CloseIcon from '@mui/icons-material/Close'
import { FriendsResults } from './FriendsResults'

export const PickMsgReceiver = () => {
  const [Results, setResults] = useState([])
  const dispatch = useDispatch()

  const handleSearchChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value
    if (searchTerm.trim().length > 0) {
      const { data } = await axios.get(serverUrl + '/api/search/friends', {
        params: {
          searchTerm: searchTerm,
        },
      })
      setResults(data.data)
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
        pt: 2,
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        className="absolute right-2 top-2"
        onClick={() => dispatch(toggleNewChatComponent())}
      >
        <CloseIcon fontSize="small" sx={{ color: 'black' }} />
      </button>

      <h3 className="text-lg font-medium ml-4">New Message</h3>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <h3 className="text-base font-medium m-2 ml-6">To :</h3>
        <TextField
          type="text"
          variant="standard"
          sx={{ width: '75%', margin: '0 auto' }}
          autoComplete="off"
          onChange={handleSearchChange}
        />
      </Box>

      <hr className="w-full" />
      <Box sx={{ overflow: 'scroll', height: '100%' }}>
        {Results.map((friend: profile) => {
          return <FriendsResults friend={friend} />
        })}
      </Box>
    </Box>
  )
}
