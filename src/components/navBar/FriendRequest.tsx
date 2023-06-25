import { serverUrl } from '../../config'
import { profile } from '../Profile/ProfileContent'
import { toast } from 'react-toastify'
import { SocketContext } from '../../routes/PrivateRoutesWrapper'
import { useContext } from 'react'
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
  sender: profile | undefined
  getNotifs: () => void
}
export const FriendRequest = ({ notif, sender, getNotifs }: Props) => {
  const socket = useContext(SocketContext)
  const acceptFriend = () => {
    socket?.emit('acceptFriendReq', notif)
    socket?.on('friendReqAcceptedSuccess', (data) => {
      if (data.succes) {
        toast.success(data.data + sender?.Fullname, {
          toastId: 'friendReqAccept',
        })
        getNotifs()
      }
    })
  }
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
              {sender?.Fullname} sent you a friend request
            </p>
            <div className="w-[100%] flex justify-center space-x-2 mt-2">
              <button
                className="px-3 py-1 text-gray-800 bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                onClick={acceptFriend}
              >
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
  )
}
