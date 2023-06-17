import { User } from '../../pages/Search'
import { Profilemin } from '../Profilemin'
interface Props {
  results: Array<User>
}
export const SearchResults = ({ results }: Props) => {
  return (
    <div
      style={{
        margin: '100px 20rem 0',
        width: '60%',
        height: '200vh',
        scrollBehavior: 'smooth',
      }}
    >
      {results.map((user) => {
        return <Profilemin user={user} />
      })}
    </div>
  )
}
