import { profile } from '../Profile/ProfileContent'
import { Profilemin } from '../Profilemin'
interface Props {
  results: Array<profile>
}
export const SearchResults = ({ results }: Props) => {
  return (
    <div
      style={{
        margin: '100px 20rem 0',
        width: '50%',
      }}
    >
      {results.map((user) => {
        return <Profilemin user={user} />
      })}
    </div>
  )
}
