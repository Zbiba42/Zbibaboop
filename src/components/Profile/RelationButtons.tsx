import React from 'react'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import ChatBubbleIcon from '@mui/icons-material/ChatBubble'
import { toast } from 'react-toastify'
import jwtDecode from 'jwt-decode'
import { Socket } from 'socket.io-client'
import { Button } from '@mui/material'
import { profile } from './ProfileContent'
import axios from 'axios'
import { serverUrl } from '../../config'
interface Props {
  socket: Socket | null
  profile: profile | undefined
  relation: string | undefined
  setRelation: React.Dispatch<React.SetStateAction<string | undefined>>
}
export const RelationButtons = ({
  socket,
  profile,
  relation,
  setRelation,
}: Props) => {
  const addFriend = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket) {
      const friendRequest = { sender: decodedToken.id, Receiver: profile?._id }
      socket?.emit('sendFriendReq', friendRequest)
      socket.on('FriendReqSent', (data) => {
        if (data.succes) {
          toast.success(data.data, {
            toastId: 'sent',
          })
          setRelation('already sent')
        }
      })
    }
  }
  const cancelReq = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket) {
      const friendRequest = { sender: decodedToken.id, Receiver: profile?._id }
      socket?.emit('cancelFriendReq', friendRequest)
      socket.on('FriendReqCanceled', (data) => {
        if (data.succes) {
          toast.success(data.data, {
            toastId: 'cancel',
          })
          setRelation('none')
        }
      })
    }
  }
  const removeFriend = async () => {
    const { data } = await axios.post(serverUrl + '/api/user/removeFriend', {
      id: profile?._id,
    })
    if (data.succes === true) {
      toast.success(`you removed ${profile?.Fullname} from your friend list`)
      setRelation('none')
    } else {
      toast.error(`there was an error please try again later`)
    }
  }
  return (
    <>
      {relation === 'already sent' ? (
        <Button
          color="inherit"
          variant="text"
          style={{
            marginRight: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
          className="float-right"
          onClick={cancelReq}
        >
          Cancel request
          <i className="fa-solid fa-user-xmark fa-lg ml-1"></i>
        </Button>
      ) : relation === 'already Received' ? (
        <Button
          color="inherit"
          variant="text"
          style={{
            marginRight: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
          className="float-right"
        >
          Accept Request
          <i className="fa-solid fa-user-check fa-lg ml-1 "></i>
        </Button>
      ) : relation === 'friends' ? (
        <>
          <Button
            color="inherit"
            variant="text"
            style={{
              marginRight: '1rem',
              display: 'flex',
              alignItems: 'center',
            }}
            className="float-right"
            onClick={removeFriend}
          >
            Remove Friend
            <i className="fa-solid fa-user-xmark fa-lg ml-1"></i>
          </Button>
          <Button
            color="inherit"
            variant="text"
            style={{
              marginRight: '0.5rem',
            }}
            endIcon={<ChatBubbleIcon fontSize="small" />}
            className="float-right"
          >
            Send Message
          </Button>
        </>
      ) : (
        <Button
          color="inherit"
          variant="text"
          style={{
            marginRight: '1rem',
          }}
          endIcon={<PersonAddAlt1Icon fontSize="small" />}
          className="float-right"
          onClick={addFriend}
        >
          Add friend
        </Button>
      )}
    </>
  )
}