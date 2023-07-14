import { Menu } from '@mui/material'

import jwtDecode from 'jwt-decode'

import { useEffect, useState } from 'react'

import axios from 'axios'

import { Notification } from './Notification'
import { serverUrl } from '../../../config'
import { Socket } from 'socket.io-client'

interface Props {
  notifMenuAnchor: HTMLElement | null
  handleNotifMenuClose: () => void
  setNotifCount: React.Dispatch<React.SetStateAction<number>>
  socket: Socket | null
}

export const Notifications = ({
  notifMenuAnchor,
  handleNotifMenuClose,
  setNotifCount,
  socket,
}: Props) => {
  const open = Boolean(notifMenuAnchor)
  const [notifications, setNotifications] = useState<
    Array<{
      sender: String
      receiver: String
      type: String
      content: { sender: String; Receiver: String; status: String }
      status: String
    }>
  >([])
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
      setNotifications(data.data.reverse())
      const unreadCount = data.data.filter(
        (notif: { status: string }) => notif.status === 'unread'
      ).length
      setNotifCount(unreadCount)
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('notification', () => {
        getNotifs()
      })
      socket.on('cancelNotif', () => {
        getNotifs()
      })
      socket.on('friendReqAccepted', () => {
        getNotifs()
      })
    }
    getNotifs()
  }, [socket])

  return (
    <Menu
      anchorEl={notifMenuAnchor}
      id="notif-menu"
      open={open}
      onClose={handleNotifMenuClose}
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
  )
}
