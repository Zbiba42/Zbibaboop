import { serverUrl } from '../config'
import { User } from '../pages/Search'
import { Button, Typography } from '@mui/material'

interface Props {
  user: User
}
export const Profilemin = ({ user }: Props) => {
  return (
    <div className="w-[100%] p-2 m-2 rounded-lg border flex flex-wrap relative -z-10">
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
      <Button
        variant="outlined"
        sx={{
          position: 'absolute',
          right: '0.8rem',
          top: '1.4rem',
          height: '2.5rem',
          color: '#272838',
          border: '1px solid #272838',
        }}
      >
        View Profile
      </Button>
    </div>
  )
}
