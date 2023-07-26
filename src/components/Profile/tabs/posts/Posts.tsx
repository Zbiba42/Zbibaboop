import { Box } from '@mui/material'
import { profile } from '../../ProfileContent'
import { PostForm } from './PostForm'
interface Props {
  profile?: profile
}
export const Posts = ({ profile }: Props) => {
  return (
    <>
      <Box
        sx={{
          textAlign: 'start',
          p: 0,
        }}
      >
        <h3 className="text-lg font-medium m-1">New post :</h3>
        <PostForm
          Fullname={profile?.Fullname}
          ProfilePath={profile?.ProfilePath}
        />
      </Box>
    </>
  )
}
