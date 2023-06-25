import axios from 'axios'
import { useState, useEffect } from 'react'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'

import { FriendRequest } from './friendRequest'

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
  getNotifs: () => void
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
  useEffect(() => {
    getSender()
  }, [])
  if (notif.type === 'friend request') {
    return <FriendRequest notif={notif} sender={sender} getNotifs={getNotifs} />
  } else if (notif.type === 'friend request accepted') {
    return (
      <div className="w-full mb-3 bg-white shadow-sm outline outline-1 outline-gray-200  rounded-lg pointer-events-auto">
        <div className="p-2">
          <div className="flex items-start">
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <img
                className=" rounded-full  w-9 h-9 mr-2 object-cover float-left"
                src={serverUrl + sender?.ProfilePath}
                alt=""
              />{' '}
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
