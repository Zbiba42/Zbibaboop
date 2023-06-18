import { Link } from 'react-router-dom'
import { serverUrl } from '../config'
import { User } from '../pages/Search'
import { Typography } from '@mui/material'

interface Props {
  user: User
}
export const Profilemin = ({ user }: Props) => {
  return (
    <Link to={'/user/' + user._id}>
      <div className="w-[100%] p-2 m-2 rounded-lg border flex flex-wrap cursor-pointer hover:bg-gray-100">
        <img
          src={serverUrl + user.ProfilePath}
          alt=""
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="m-2 text-start">
          <Typography
            component={'h2'}
            sx={{
              fontWeight: 700,
              fontSize: '1.2em',

              color: '#252526',
            }}
          >
            {user.Fullname}
          </Typography>
          {user.Country ? (
            <Typography
              component={'h4'}
              sx={{
                fontWeight: 400,
                color: 'grey',
              }}
            >
              Lives In {user.City}, {user.Country}
            </Typography>
          ) : (
            ''
          )}
        </div>
      </div>
    </Link>
  )
}
