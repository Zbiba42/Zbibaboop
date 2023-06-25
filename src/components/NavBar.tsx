import { Box, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material'

import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import jwtDecode from 'jwt-decode'
import { NavBox } from '../styles/navStyle'
import { Link, useNavigate } from 'react-router-dom'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { HandleProfileClickContext } from '../routes/AppRoutes'
import { serverUrl } from '../config'
import axios from 'axios'
import { SocketContext } from '../routes/PrivateRoutesWrapper'
import { toast } from 'react-toastify'
import { Notification } from './navBar/Notification'

export const NavBar = () => {
  const socket = useContext(SocketContext)
  const navigate = useNavigate()
  const [notifCount, setNotifCount] = useState<number>(0)
  const [notifications, setNotifications] = useState<
    Array<{
      sender: String
      receiver: String
      type: String
      content: { sender: String; Receiver: String; status: String }
      status: String
    }>
  >([])
  const [profile, setProfile] = useState('')
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [anchorEl2, setAnchorEl2] = React.useState<null | HTMLElement>(null)

  const animateContext = useContext(HandleProfileClickContext)
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -7,
      top: 13,
      border: `2.5px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const open2 = Boolean(anchorEl2)
  const handleClick2 = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl2(event.currentTarget)
  }
  const handleClose2 = () => {
    setAnchorEl2(null)
  }
  const getUser = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const { data } = await axios.get(serverUrl + '/api/user/getUser', {
        params: {
          id: decodedToken.id,
        },
      })

      setProfile(serverUrl + data.data.ProfilePath)
    }
  }
  const getNotifs = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const { data } = await axios.get(serverUrl + '/api/user/getNotifs', {
        params: {
          id: decodedToken.id,
        },
      })
      setNotifications(data.data)
      setNotifCount(data.data.length)
    }
  }
  const logout = () => {
    sessionStorage.removeItem('AccessToken')
    sessionStorage.removeItem('RefreshToken')
    navigate('/')
    toast.info('logged off succesfully')
  }
  useEffect(() => {
    getNotifs()
  }, [])

  useEffect(() => {
    if (socket) {
      socket?.on('notification', () => {
        getNotifs()
      })
      socket.on('cancelNotif', () => {
        getNotifs()
      })
      socket.on('friendReqAccepted', () => {
        getNotifs()
      })
    }
  }, [socket])
  useEffect(() => {
    getUser()
  }, [animateContext])
  return (
    <Box sx={NavBox}>
      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
        component={Link}
        to={'/'}
      >
        <StyledBadge badgeContent={0} color="info">
          <i className="fa-regular fa-message text-xl m-1"></i>
        </StyledBadge>
        <h4>Messages</h4>
      </Box>

      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
        component={Link}
        onClick={handleClick2}
      >
        <StyledBadge badgeContent={notifCount} color="info">
          <i className="fa-regular fa-bell text-xl m-1"></i>
        </StyledBadge>
        <h4>Notifications</h4>
      </Box>

      <Menu
        anchorEl={anchorEl2}
        id="notif-menu"
        open={open2}
        onClose={handleClose2}
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
          {notifications.length > 0 ? (
            notifications.map((notif) => {
              return <Notification getNotifs={getNotifs} notif={notif} />
            })
          ) : (
            <div className="p-2 w-full h-full flex justify-center items-center">
              <p className="text-sm font-medium leading-5 text-gray-900 m-1">
                you dont have any notifications !
              </p>
            </div>
          )}
        </div>
      </Menu>

      <Box
        sx={{ width: '33%', paddingTop: 0.5, cursor: 'pointer' }}
        onClick={handleClick}
      >
        <img
          className=" rounded-full  w-9 h-9 m-auto object-cover"
          src={profile}
          alt=""
        />
        <h4>Profile</h4>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
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
            handleClose()
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

        <MenuItem onClick={handleClose}>
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
    </Box>
  )
}
