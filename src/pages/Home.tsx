import axios from 'axios'
import { serverUrl } from '../config'
import { useEffect, useState } from 'react'
import { PostInterface } from '../components/Profile/tabs/posts/Posts'
import { Post } from '../components/Profile/tabs/posts/post/Post'
import InfiniteScroll from 'react-infinite-scroll-component'

export const Home = () => {
  const [posts, setPosts] = useState<PostInterface[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [_postRefresh, setRefresh] = useState(0)
  const getPosts = async () => {
    const { data } = await axios.get(serverUrl + '/api/home/get', {
      params: {
        page: page,
      },
    })

    if (data.data.length === 0) {
      setHasMore(false)
    }
    setPosts(data.data)
  }
  const getNextPage = async () => {
    const { data } = await axios.get(serverUrl + '/api/home/get', {
      params: {
        page: page + 1,
      },
    })
    setPage((old) => old + 1)
    if (data.data.length === 0) {
      setHasMore(false)
    }
    if (data.data.length !== 0) {
      setPosts(data.data.concat(posts))
    }
  }
  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className=" text-center pt-[100px] px-80">
      <InfiniteScroll
        dataLength={posts.length}
        next={() => getNextPage()}
        hasMore={hasMore}
        loader={''}
      >
        {posts.map((post: PostInterface) => {
          return (
            <Post
              setRefresh={setRefresh}
              post={post}
              user={post.owner}
              key={post._id}
            />
          )
        })}
      </InfiniteScroll>
    </div>
  )
}
