import axios from 'axios'
import { useState, useEffect } from 'react'
import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
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
}
export const Notification = ({ notif }: Props) => {
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
  return (
    <>
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto">
        <div className="p-4">
          <div className="flex items-start">
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <img
                className=" rounded-full  w-9 h-9 mb-1 object-cover"
                src={serverUrl + sender?.ProfilePath}
                alt=""
              />{' '}
              <p className="text-sm font-medium leading-5 text-gray-900">
                {sender?.Fullname} sent you a friend request
              </p>
              <div className="flex space-x-2 mt-1">
                <button className="px-3 py-1 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                  Accept
                </button>
                <button className="px-3 py-1 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300">
                  Decline
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
