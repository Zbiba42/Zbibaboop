import { useEffect, useState } from 'react'
import { serverUrl } from '../../../config'
import { profile } from '../../Profile/ProfileContent'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { AddChat } from '../../../redux/chat'

interface Props {
  convo: {
    participants: Array<string>
    _id: string
    messages: Array<{
      content: string
      files: Array<string>
      timestamp: string
      sender: string
      type: string
      _id: string
    }>
  }
}

export const Conversation = ({ convo }: Props) => {
  const [sender, setSender] = useState<profile>()
  const dispatch = useDispatch()

  const getUser = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const id = convo.participants.filter((id) => {
        return id != decodedToken.id
      })
      const { data } = await axios.get(serverUrl + '/api/user/getUser', {
        params: {
          id: id,
        },
      })
      setSender(data.data)
    }
  }

  const getTimeElapsed = (timestamp: string) => {
    const currentTime = new Date()
    const sentTime = new Date(timestamp)
    const timeDiff = currentTime.getTime() - sentTime.getTime()

    const minutes = Math.floor(timeDiff / (1000 * 60))
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))

    if (minutes < 1) {
      return 'just now'
    } else if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <div
      className={
        convo.messages[0].sender != sender?._id
          ? 'relative p-2 m-2 rounded-lg border flex flex-wrap cursor-pointer hover:bg-gray-100'
          : 'relative p-2 m-2 rounded-lg border flex flex-wrap cursor-pointer bg-gray-100'
      }
      onClick={() => {
        dispatch(AddChat({ recipient: sender }))
      }}
    >
      {convo.messages[0].sender == sender?._id && (
        <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
      <img
        src={serverUrl + sender?.ProfilePath}
        alt=""
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="m-2 text-start">
        <Typography
          component={'h2'}
          sx={{
            fontWeight: 700,
            fontSize: '1em',
            color: '#252526',
          }}
        >
          {sender?.Fullname}
        </Typography>
        <p
          className="text-sm font-medium leading-5 text-gray-900 m-1 "
          style={{
            maxWidth: '250px', // Adjust the value to your desired maximum width
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {convo.messages[0].sender === sender?._id ? '' : 'You: '}
          {convo.messages[0].content ? convo.messages[0].content + ' .' : ''}
          {convo.messages[0].files.length > 0 ? 'attachment .' : ''}
          <span className="text-sm font-medium leading-5 text-gray-900 m-1 mr-0">
            {getTimeElapsed(convo.messages[0].timestamp)}
          </span>
        </p>
      </div>
    </div>
  )
}
