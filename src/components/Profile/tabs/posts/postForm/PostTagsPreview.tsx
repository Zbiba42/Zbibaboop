import { Box, Tooltip } from '@mui/material'
import React from 'react'

interface Props {
  tags: {
    fullName: string
    id: string
  }[]
  setTags: React.Dispatch<
    React.SetStateAction<
      {
        fullName: string
        id: string
      }[]
    >
  >
}

export const PostTagsPreview = ({ tags, setTags }: Props) => {
  return (
    <Box
      sx={{
        mt: 1,
        p: 1,
        outline: '1px solid grey',
        boxShadow: 1,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {tags.map((tag) => {
        return (
          <Tooltip title="remove" placement="right">
            <div
              className="text-[#272838] flex flex-col space-y-2 border- rounded-xl bg-blue-200 px-2 mx-1 mb-1 cursor-pointer transition-all duration-200 hover:bg-[#D52941] hover:text-white"
              onClick={() => {
                setTags((prevSelected) =>
                  prevSelected.filter((selected) => selected.id !== tag.id)
                )
              }}
              key={tag.id}
            >
              <span>
                <i
                  className="fa-solid fa-user-xmark fa-sm"
                  style={{ color: '#808080', marginRight: 10 }}
                ></i>
                {tag.fullName}{' '}
              </span>
            </div>
          </Tooltip>
        )
      })}
    </Box>
  )
}
