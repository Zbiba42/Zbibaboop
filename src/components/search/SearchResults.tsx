import jwtDecode from 'jwt-decode'
import { profile } from '../Profile/ProfileContent'
import { Profilemin } from '../Profile/Profilemin'
import { PostInterface } from '../Profile/tabs/posts/Posts'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from '../Profile/tabs/posts/post/Post'
import { useState } from 'react'
interface Props {
  results: (profile | PostInterface)[]
  filter: string
  hasMore: boolean
  getNextPage: () => Promise<void>
}
export const SearchResults = ({
  results,
  filter,
  hasMore,
  getNextPage,
}: Props) => {
  const decodedToken: { id: string } = jwtDecode(
    sessionStorage.getItem('AccessToken') as string
  )
  const [_postRefresh, setRefresh] = useState(0)

  return (
    <div
      style={{
        margin: '100px 20rem 0',
        width: '50%',
      }}
    >
      <InfiniteScroll
        dataLength={results.length}
        next={() => getNextPage()}
        hasMore={hasMore}
        loader={''}
      >
        {filter === 'People' &&
          results.map((user) => {
            if (user._id != decodedToken.id) {
              return <Profilemin user={user as profile} />
            }
          })}
        {filter === 'Posts' &&
          results.map((item: PostInterface | profile) => {
            const post = item as PostInterface
            console.log(post)
            return (
              <Post
                post={post}
                user={post.owner}
                key={post._id}
                setRefresh={setRefresh}
              />
            )
          })}
      </InfiniteScroll>
    </div>
  )
}
