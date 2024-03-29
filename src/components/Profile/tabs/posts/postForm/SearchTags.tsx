import { Box, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, useState } from 'react'
import { serverUrl } from '../../../../../config'
import CloseIcon from '@mui/icons-material/Close'
import { profile } from '../../../ProfileContent'

interface Props {
  setTagsShown: React.Dispatch<React.SetStateAction<Boolean>>
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        fullName: string
        id: string
      }[]
    >
  >
  tags: {
    fullName: string
    id: string
  }[]
}

export const SearchTags = ({ setTagsShown, setTags, tags }: Props) => {
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
  const toggleTagSelect = (friend: profile) => {
    const isFriendSelected = tags.some((tag) => tag.id === friend._id)

    // If it's selected, remove it from the selected list
    if (isFriendSelected) {
      setTags((prevSelected) =>
        prevSelected.filter((tag) => tag.id !== friend._id)
      )
    } else {
      // If it's not selected, add it to the selected list
      setTags((prevSelected) => [
        ...prevSelected,
        { fullName: friend.Fullname, id: friend._id },
      ])
    }
  }
  return (
    <Box
      sx={{
        backgroundColor: 'white',
        width: 320,
        height: 300,
        marginLeft: '20px',
        borderRadius: '0.5rem',
        pt: 1,
        m: 0,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      <button
        className="absolute right-2 top-2"
        onClick={() => setTagsShown(false)}
      >
        <CloseIcon fontSize="small" sx={{ color: 'black' }} />
      </button>

      <h3 className="text-lg font-medium ">Tag people</h3>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <TextField
          type="text"
          variant="standard"
          sx={{ width: '90%', margin: '0 auto', mb: 1 }}
          autoComplete="off"
          onChange={handleSearchChange}
        />
      </Box>

      <hr className="w-full" />
      <Box sx={{ overflow: 'scroll', height: '100%' }}>
        {Results.map((friend: profile) => {
          const isSelected = tags.some((tag) => tag.id == friend._id)
          return (
            <div
              className={
                isSelected
                  ? 'p-1 m-1 rounded-lg border flex flex-wrap items-center cursor-pointer bg-gray-300'
                  : 'p-1 m-1 rounded-lg border flex flex-wrap items-center cursor-pointer'
              }
              onClick={() => {
                toggleTagSelect(friend)
              }}
              key={friend._id}
            >
              <img
                src={serverUrl + friend.ProfilePath}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="m-2 text-start">
                <Typography
                  component={'h2'}
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.2em',
                    color: '#252526',
                  }}
                >
                  {friend.Fullname}
                </Typography>
              </div>
            </div>
          )
        })}
      </Box>
    </Box>
  )
}
