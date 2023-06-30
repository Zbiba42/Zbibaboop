import { Box } from '@mui/material'

import { useSelector } from 'react-redux'
import { PickMsgReceiver } from './PickMsgReceiver'
import { NewChat } from './NewChat'

export const ChatContainer = () => {
  const newChatShown = useSelector((state: any) => state.Chat.newChatShown)
  return (
    <Box
      sx={{
        width: '95%',
        height: '65%',
        paddingRight: '100px',
        position: 'absolute',
        bottom: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'row-reverse',
      }}
    >
      {newChatShown && <PickMsgReceiver />}
      <NewChat />
    </Box>
  )
}
