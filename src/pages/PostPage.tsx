import axios from 'axios'
import { useParams } from 'react-router-dom'
import { serverUrl } from '../config'
import { useEffect, useState } from 'react'
import { Post } from '../components/Profile/tabs/posts/post/Post'
import { PostInterface } from '../components/Profile/tabs/posts/Posts'

export const PostPage = () => {
  const { id } = useParams()
  const [post, setPost] = useState<PostInterface>()
  const [_postRefresh, setRefresh] = useState(0)
  const getPost = async () => {
    try {
      const { data } = await axios.get(serverUrl + '/api/posts/getOne', {
        params: {
          id: id,
        },
      })
      console.log(data.data)
      setPost(data.data)
    } catch (error: any) {
      console.log(error.message)
    }
  }
  useEffect(() => {
    getPost()
  }, [])
  return (
    <div className=" text-center pt-[100px] px-80">
      {post && <Post post={post} user={post.owner} setRefresh={setRefresh} />}
    </div>
  )
}
