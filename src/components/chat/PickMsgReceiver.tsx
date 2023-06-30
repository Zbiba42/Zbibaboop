import { Box, TextField } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { serverUrl } from '../../config'
import { Profilemin } from '../Profilemin'

export const PickMsgReceiver = () => {
  const [Results, setResults] = useState([])
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
        width: 320,
        marginLeft: '20px',
        border: '1px solid grey',
        boxShadow: 2,
        borderRadius: 2,
        pt: 2,
        textAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h3 className="text-lg font-medium ml-4">New Message</h3>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          mb: 2,
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
      {Results.map((friend) => {
        return <Profilemin user={friend} />
      })}
    </Box>
  )
}
