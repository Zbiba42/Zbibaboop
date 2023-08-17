import { Box } from '@mui/material'
import { profile } from '../../ProfileContent'
import { PostForm } from './postForm/PostForm'
import { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import { serverUrl } from '../../../../config'
import axios from 'axios'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from './post/Post'
import { useParams } from 'react-router-dom'
interface Props {
  profile?: profile
  type: string
}
export interface PostInterface {
  _id: string
  owner: profile
  tags: profile[]
  content: string
  files: {
    type: string
    url: string
  }[]
  timestamp: string
  comments: {
    id: string
    owner: string
    onPost: string
    content: string
    timestamp: string
  }[]
  reactions: string[]
}
export const Posts = ({ profile, type }: Props) => {
  const [posts, setPosts] = useState<PostInterface[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [postRefresh, setRefresh] = useState(0)
  const { id } = useParams()
  const [isStranger, setIsStranger] = useState(true)
  const getPosts = async () => {
    const decodedToken = jwtDecode<{ id: string }>(
      sessionStorage.getItem('AccessToken') as string
    )
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
      if (data.data.length !== 0) {
        setPosts(posts.concat(data.data))
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    setPage(1)
    getPosts()
  }, [postRefresh])
  useEffect(() => {
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
              setRefresh={setRefresh}
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
          scrollableTarget="ProfileContainer"
        >
          {posts.map((post: PostInterface) => {
            return (
              <Post
                setRefresh={setRefresh}
                post={post}
                user={profile}
                key={post._id}
              />
            )
          })}
        </InfiniteScroll>
      </Box>
    </>
  )
}
