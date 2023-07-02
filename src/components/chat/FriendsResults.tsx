import { useDispatch } from 'react-redux'
import { AddChat, toggleNewChatComponent } from '../../redux/chat'
import { profile } from '../Profile/ProfileContent'
import { serverUrl } from '../../config'
import {  Typography } from '@mui/material'

interface Props {
  friend: profile
}
export const FriendsResults = ({ friend }: Props) => {
  const dispatch = useDispatch()
  return (
    <div
      className="p-1 m-1 rounded-lg border flex flex-wrap items-center cursor-pointer"
      onClick={() => {
        dispatch(AddChat({ recipient: friend }))
        dispatch(toggleNewChatComponent())
      }}
    >
      <img
        src={serverUrl + friend.ProfilePath}
        alt=""
        className="w-14 h-14 rounded-full object-cover"
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
          {friend.Fullname}
        </Typography>
        {friend.Country ? (
          <Typography
            component={'h4'}
            sx={{
              fontWeight: 400,
              color: 'grey',
            }}
          >
            Lives In {friend.City}, {friend.Country}
          </Typography>
        ) : (
          ''
        )}
      </div>
    </div>
  )
}
