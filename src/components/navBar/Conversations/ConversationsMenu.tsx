import { Menu } from '@mui/material'

interface Props {
  convosMenuAnchor: HTMLElement | null
  handleConvosMenuClose: React.Dispatch<React.SetStateAction<number>>
}

export const ConversationsMenu = ({
  convosMenuAnchor,
  handleConvosMenuClose,
}: Props) => {
  const open = Boolean(convosMenuAnchor)
  return (
    <Menu
      anchorEl={convosMenuAnchor}
      id="notif-menu"
      open={open}
      onClose={handleConvosMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.32))',
          mt: 1.5,
          position: 'fixed',
          width: '310px',
          minHeight: '100px',
          maxHeight: '500xp',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <div className="overflow-y-scroll max-h-[500px] p-2 w-full notifications">
        uwu
      </div>
    </Menu>
  )
}
