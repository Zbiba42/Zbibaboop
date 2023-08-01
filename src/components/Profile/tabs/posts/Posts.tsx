import { Box } from '@mui/material'
import { profile } from '../../ProfileContent'
import { PostForm } from './postForm/PostForm'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { serverUrl } from '../../../../config'
import axios from 'axios'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
interface Props {
  profile?: profile
  type: string
}
interface Post {
  owner: string
  tags: string[]
  content: string
  files: string[]
  timestamp: string
  comments: string[]
  reactions: string[]
}
export const Posts = ({ profile, type }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const { id } = useParams()
  const [isStranger, setIsStranger] = useState(true)
  const getPosts = async () => {
    const decodedToken = jwtDecode<{ id: string }>(
      sessionStorage.getItem('AccessToken') as string
    )
    console.log('token :' + decodedToken.id)
    const userId = type === 'profile' ? decodedToken.id : id
    try {
      const { data } = await axios.get(serverUrl + '/api/posts/get', {
        params: {
          id: userId,
          page: page,
        },
      })
      if (data.data.length === 0) {
        setHasMore(false)
      }
      setPosts(data.data)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getNextPage = async () => {
    const decodedToken = jwtDecode<{ id: string }>(
      sessionStorage.getItem('AccessToken') as string
    )
    console.log('token :' + decodedToken.id)
    const userId = type === 'profile' ? decodedToken.id : id
    try {
      const { data } = await axios.get(serverUrl + '/api/posts/get', {
        params: {
          id: userId,
          page: page + 1,
        },
      })
      if (data.data.length === 0) {
        setHasMore(false)
      }
      setPage((old) => old + 1)
      setPosts(data.data.concat(posts))
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    getPosts()
    setIsStranger(() => {
      const decodedToken = jwtDecode<{ id: string }>(
        sessionStorage.getItem('AccessToken') as string
      )
      if (!id) {
        return false
      }
      if (decodedToken.id === id) {
        return false
      } else {
        return true
      }
    })
  }, [])
  return (
    <>
      <Box
        sx={{
          textAlign: 'start',
          p: 0,
        }}
      >
        {!isStranger && (
          <>
            <h3 className="text-lg font-medium m-1">New post :</h3>
            <PostForm
              Fullname={profile?.Fullname}
              ProfilePath={profile?.ProfilePath}
            />
          </>
        )}
        <InfiniteScroll
          dataLength={posts.length}
          next={() => getNextPage()}
          hasMore={hasMore}
          loader={''}
          scrollableTarget="messagesContainer"
        >
          {posts.map((post: Post) => {
            return (
              <div>
                post1 +{' '}
                {new Date(post.timestamp).toLocaleString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </div>
            )
          })}
        </InfiniteScroll>
      </Box>
    </>
  )
}
