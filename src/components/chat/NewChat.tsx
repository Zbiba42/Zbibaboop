import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialIcon from '@mui/material/SpeedDialIcon'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import AddCommentIcon from '@mui/icons-material/AddComment'
import { useDispatch } from 'react-redux'
import { toggleNewChatComponent } from '../../redux/chat'

export const NewChat = () => {
  const dispatch = useDispatch()
  return (
    <SpeedDial
      ariaLabel="SpeedDial openIcon example"
      sx={{ position: 'absolute', bottom: 20, right: 20 }}
      icon={<SpeedDialIcon />}
    >
      <SpeedDialAction
        key={'New chat'}
        icon={<AddCommentIcon className="scale-x-[-1]" />}
        tooltipTitle={'New chat'}
        onClick={() => {
          dispatch(toggleNewChatComponent())
        }}
      />
    </SpeedDial>
  )
}
