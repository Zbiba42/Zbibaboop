import { Box } from '@mui/material'

import jwtDecode from 'jwt-decode'
import { NavBox } from '../../styles/navStyle'
import { Link } from 'react-router-dom'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import React, { useContext, useEffect, useState } from 'react'
import { HandleProfileClickContext } from '../../routes/AppRoutes'
import { serverUrl } from '../../config'
import axios from 'axios'

import { Notifications } from './Notifications/Notifications'
import { SocketContext } from '../../routes/PrivateRoutesWrapper'
import { ProfileMenu } from './Profile/ProfileMenu'
import { ConversationsMenu } from './Conversations/ConversationsMenu'

export const NavBar = () => {
  const socket = useContext(SocketContext)
  const animateContext = useContext(HandleProfileClickContext)

  const [notifCount, setNotifCount] = useState<number>(0)
  const [msgCount, setMsgCount] = useState<number>(0)
  const [profile, setProfile] = useState('')
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(
    null
  )
  const [notifMenuAnchor, setNotifMenuAnchor] =
    React.useState<null | HTMLElement>(null)
  const [convosMenuAnchor, setConvosMenuAnchor] =
    React.useState<null | HTMLElement>(null)
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -7,
      top: 13,
      border: `2.5px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))

  const handleProfileMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget)
  }
  const handleProfileMenuClose = () => {
    setProfileAnchor(null)
  }

  const handleNotifMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotifMenuAnchor(event.currentTarget)
  }
  const handleNotifMenuClose = () => {
    setNotifMenuAnchor(null)
  }

  const handleConvosMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setConvosMenuAnchor(event.currentTarget)
  }
  const handleConvosMenuClose = () => {
    setConvosMenuAnchor(null)
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
        onClick={handleConvosMenuClick}
      >
        <StyledBadge badgeContent={msgCount} color="info">
          <i className="fa-regular fa-message text-xl m-1"></i>
        </StyledBadge>
        <h4>Messages</h4>
      </Box>
      {/* Convos Menu */}
      <ConversationsMenu
        convosMenuAnchor={convosMenuAnchor}
        setMsgCount={setMsgCount}
        handleConvosMenuClose={handleConvosMenuClose}
      />

      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
        component={Link}
        onClick={handleNotifMenuClick}
      >
        <StyledBadge badgeContent={notifCount} color="info">
          <i className="fa-regular fa-bell text-xl m-1"></i>
        </StyledBadge>
        <h4>Notifications</h4>
      </Box>
      {/* Notifications Menu */}
      <Notifications
        notifMenuAnchor={notifMenuAnchor}
        handleNotifMenuClose={handleNotifMenuClose}
        setNotifCount={setNotifCount}
        socket={socket}
      />

      <Box
        sx={{ width: '33%', paddingTop: 0.5, cursor: 'pointer' }}
        onClick={handleProfileMenuClick}
      >
        <img
          className=" rounded-full  w-9 h-9 m-auto object-cover"
          src={profile}
          alt=""
        />
        <h4>Profile</h4>
      </Box>
      {/* Profile Menu */}
      <ProfileMenu
        profileAnchor={profileAnchor}
        handleProfileMenuClose={handleProfileMenuClose}
        profile={profile}
        animateContext={animateContext}
      />
    </Box>
  )
}
