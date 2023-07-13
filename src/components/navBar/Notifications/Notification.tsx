import axios from 'axios'
import { useState, useEffect } from 'react'
import { serverUrl } from '../../../config'
import { FriendRequest } from './FriendRequest'
import { profile } from '../../Profile/ProfileContent'
import { Link } from 'react-router-dom'

interface Props {
  notif: {
    sender: String
    receiver: String
    type: String
    content: {
      sender: String
      Receiver: String
      status: String
    }
    status: String
  }
  getNotifs: () => Promise<void>
}
export const Notification = ({ notif, getNotifs }: Props) => {
  const [sender, setSender] = useState<profile>()
  const getSender = async () => {
    const { data } = await axios.get(serverUrl + '/api/user/getUser', {
      params: {
        id: notif.sender,
      },
    })
    setSender(data.data)
  }
  const readNotif = async () => {
    if (notif.status === 'unread') {
      const { data } = await axios.post(serverUrl + '/api/user/readNotif', {
        notif: notif,
      })
      if (data.succes) {
        getNotifs()
      }
    } else {
      return
    }
  }
  const removeNotif = async () => {
    const { data } = await axios.post(serverUrl + '/api/user/removeNotif', {
      notif: notif,
    })
    if (data.succes) {
      getNotifs()
    }
  }
  useEffect(() => {
    getSender()
  }, [])

  if (notif.type === 'friend request') {
    return (
      <FriendRequest
        notif={notif}
        sender={sender}
        readNotif={readNotif}
        getNotifs={getNotifs}
        removeNotif={removeNotif}
      />
    )
  } else if (notif.type === 'friend request accepted') {
    return (
      <div className=" relative w-full mb-3 bg-white shadow-sm outline outline-1 outline-gray-200  rounded-lg pointer-events-auto">
        {notif.status === 'unread' && (
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
        {notif.status === 'read' && (
          <i
            className="fa-solid fa-xmark absolute top-2 right-3 w-2 h-2 rounded-full cursor-pointer"
            onClick={removeNotif}
          ></i>
        )}
        <div className="p-2">
          <div className="flex items-start">
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <Link to={`/user/${sender?._id}`}>
                <img
                  className=" rounded-full  w-9 h-9 mr-2 object-cover float-left"
                  src={serverUrl + sender?.ProfilePath}
                  alt=""
                  onClick={readNotif}
                />{' '}
              </Link>
              <p className="text-sm font-medium leading-5 text-gray-900 m-1">
                {sender?.Fullname} Accepted your friend request
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <h2></h2>
  }
}
