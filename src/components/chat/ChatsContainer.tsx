import { Box } from '@mui/material'

import { useSelector } from 'react-redux'
import { PickMsgReceiver } from './PickMsgReceiver'
import { NewChat } from './NewChat'
import { Chat } from './Chat'
import { profile } from '../Profile/ProfileContent'
import jwtDecode from 'jwt-decode'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { serverUrl } from '../../config'

export const ChatContainer = () => {
  const [senderProfile, setSenderProfile] = useState('')
  const newChatShown = useSelector((state: any) => state.Chat.newChatShown)
  const Chats = useSelector((state: any) => state.Chat.Chats)
  const token = sessionStorage.getItem('AccessToken') as string
  const decodedToken = jwtDecode(token) as any
  const getSenderImg = async () => {
    const { data } = await axios.get(serverUrl + '/api/user/getUsersImg', {
      params: {
        id: decodedToken.id,
      },
    })
    setSenderProfile(data.data.ProfilePath)
  }
  useEffect(() => {
    getSenderImg()
  }, [])
  return (
    <Box
      sx={{
        height: '65%',
        paddingRight: '100px',
        position: 'absolute',
        zIndex: 99,
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      {newChatShown && <PickMsgReceiver />}
      {Chats.map((chat: { recipient: profile }) => {
        return (
          <Chat
            senderProfile={senderProfile}
            sender={decodedToken.id}
            recipient={chat.recipient}
            key={chat.recipient._id}
          />
        )
      })}
      <NewChat />
    </Box>
  )
}
