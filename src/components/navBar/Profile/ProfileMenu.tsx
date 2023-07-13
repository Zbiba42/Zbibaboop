import { Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'

import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

interface Props {
  profileAnchor: HTMLElement | null
  handleProfileMenuClose: () => void
  profile: string
  animateContext: any
}

export const ProfileMenu = ({
  profileAnchor,
  handleProfileMenuClose,
  profile,
  animateContext,
}: Props) => {
  const navigate = useNavigate()
  const open = Boolean(profileAnchor)
  const logout = () => {
    sessionStorage.removeItem('AccessToken')
    sessionStorage.removeItem('RefreshToken')
    navigate('/')
    toast.info('logged off succesfully')
  }
  return (
    <Menu
      anchorEl={profileAnchor}
      id="account-menu"
      open={open}
      onClose={handleProfileMenuClose}
      onClick={handleProfileMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
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
      <MenuItem
        onClick={() => {
          animateContext?.setAnimate('open')
          handleProfileMenuClose()
        }}
      >
        <img
          className=" rounded-full  w-9 h-9 mr-2 object-cover"
          src={profile}
          alt=""
        />{' '}
        My Profile
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleProfileMenuClose}>
        <ListItemIcon>
          <Settings fontSize="small" />
        </ListItemIcon>
        Settings
      </MenuItem>
      <MenuItem onClick={logout}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  )
}
