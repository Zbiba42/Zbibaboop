import { Box } from '@mui/material'

import { useSelector } from 'react-redux'
import { PickMsgReceiver } from './PickMsgReceiver'
import { NewChat } from './NewChat'
import { Chat } from './Chat'
import { profile } from '../Profile/ProfileContent'

export const ChatContainer = () => {
  const newChatShown = useSelector((state: any) => state.Chat.newChatShown)
  const Chats = useSelector((state: any) => state.Chat.Chats)
  console.log(Chats)
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
        return <Chat recipient={chat.recipient} />
      })}
      <NewChat />
    </Box>
  )
}
