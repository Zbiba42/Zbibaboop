import { useState, useEffect } from 'react'
import { Profilemin } from '../Profilemin'
import { Box } from '@mui/material'
import { Pagination } from '@mui/material'
interface Props {
  friends?: Array<{
    _id: string
    Fullname: string
    ProfilePath: string
    Country: string
    City: string
  }>
}
export const Friends = ({ friends }: Props) => {
  const [pageNumber, setPageNumber] = useState(1)
  const [friendsOnPage, setFriendsOnPage] = useState<Props['friends']>([])
  const [totalPages, setTotalPages] = useState(0)
  const pagination = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value)
  }
  useEffect(() => {
    if (friends) {
      // Calculate the total number of pages
      setTotalPages(Math.ceil(friends?.length / 10))

      // Calculate the starting index and ending index for the friends on the current page
      const startIndex = (pageNumber - 1) * 10
      const endIndex = Math.min(startIndex + 10, friends.length)

      // Retrieve the friends to be displayed on the current page
      setFriendsOnPage(friends.slice(startIndex, endIndex))
    }
  }, [pageNumber])
  return (
    <>
      <Box
        sx={{
          padding: 0,
          textAlign: 'left',
          display: 'flex',
          width: '100%',
          flexWrap: 'wrap',
          gap: '3%',
        }}
      >
        {friendsOnPage?.map((friend) => {
          return (
            <div style={{ flexBasis: '48%' }}>
              <Profilemin user={friend} key={friend._id} />
            </div>
          )
        })}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Pagination
            page={pageNumber}
            count={totalPages}
            onChange={pagination}
          />
        </Box>
      </Box>
    </>
  )
}
