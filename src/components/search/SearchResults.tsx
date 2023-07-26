import jwtDecode from 'jwt-decode'
import { profile } from '../Profile/ProfileContent'
import { Profilemin } from '../Profile/Profilemin'
interface Props {
  results: Array<profile>
}
export const SearchResults = ({ results }: Props) => {
  const decodedToken: { id: string } = jwtDecode(
    sessionStorage.getItem('AccessToken') as string
  )
  return (
    <div
      style={{
        margin: '100px 20rem 0',
        width: '50%',
      }}
    >
      {results.map((user) => {
        if (user._id != decodedToken.id) {
          return <Profilemin user={user} />
        }
      })}
    </div>
  )
}
