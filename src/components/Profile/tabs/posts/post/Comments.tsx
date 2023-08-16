import { useContext, useEffect, useRef, useState } from 'react'
import { Button, Input } from '@mui/material'
import { SocketContext } from '../../../../../routes/PrivateRoutesWrapper'
import { PostInterface } from '../Posts'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
import axios from 'axios'
import { serverUrl } from '../../../../../config'
import { Comment } from './Comment'
import { profile } from '../../../ProfileContent'
import InfiniteScroll from 'react-infinite-scroll-component'

export interface CommentInterface {
  id: string
  owner: profile
  onPost: string
  content: string
  timestamp: string
}

export const Comments = ({ post }: { post: PostInterface }) => {
  const socket = useContext(SocketContext)
  const [page, setPage] = useState(1)
  const [comments, setComments] = useState<CommentInterface[]>([])
  const [hasMore, setHasMore] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)

  const getComments = async () => {
    const { data } = await axios.get(serverUrl + '/api/posts/getComments', {
      params: {
        postId: post._id,
        page: page,
      },
    })
    if (data.data.length === 0) {
      setHasMore(false)
    }
    setComments(data.data)
  }
  const getNextPage = async () => {
    const { data } = await axios.get(serverUrl + '/api/posts/getComments', {
      params: {
        postId: post._id,
        page: page + 1,
      },
    })
    console.log(data.data)
    setPage((old) => old + 1)
    if (data.data.length === 0) {
      setHasMore(false)
    } else {
      setComments(data.data.concat(comments))
    }
  }
  const handleSubmit = () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket) {
      const newComment = {
        id: decodedToken.id,
        postId: post._id,
        content: inputRef.current?.value,
      }
      if (!newComment.content) {
        toast.error('Comments cant be empty!')
        return
      }
      socket.emit('postComment', newComment)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      getComments()
    }
  }
  useEffect(() => {
    getComments()
  }, [])
  return (
    <>
      <div className="border-t">
        <div className="max-h-[300px] overflow-scroll" id="commentsDiv">
          <InfiniteScroll
            dataLength={comments.length}
            next={() => getNextPage()}
            hasMore={hasMore}
            loader={''}
            scrollableTarget="commentsDiv"
          >
            {comments.map((comment) => {
              return <Comment comment={comment} />
            })}
          </InfiniteScroll>
        </div>
        <div className="h-14 flex flex-row justify-center items-center gap-3 border-t">
          <Input
            type="text"
            inputRef={inputRef}
            placeholder="Enter your comment"
            fullWidth
          />
          <Button variant="outlined" sx={{ height: 45 }} onClick={handleSubmit}>
            Post Comment
          </Button>
        </div>
      </div>
    </>
  )
}
