import { Tooltip } from '@mui/material'
import { serverUrl } from '../../../config'
import { FileComponentReceived } from './FileComponentReceived'

interface Props {
  img: string
  msg: {
    sender: string
    content: string
    files: Array<{
      name: string
      path: string
    }>
    timestamp: string
    _id: string
  }
  isFirst: boolean
}

export const MsgReceived = ({ img, msg, isFirst }: Props) => {
  return (
    <div className="chat-message mb-1">
      <div className="flex items-end">
        <div
          className={
            isFirst
              ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'
              : 'ml-8 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start'
          }
        >
          <Tooltip
            title={new Date(msg.timestamp).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            arrow
            placement="right"
          >
            <div className="flex flex-row flex-nowrap align-center">
              {msg.content && (
                <span
                  className={
                    isFirst
                      ? 'px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600 break-all'
                      : 'px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600 break-all'
                  }
                >
                  {msg.content}
                </span>
              )}
              {msg.files.length > 0 && (
                <FileComponentReceived files={msg.files} isFirst={isFirst} />
              )}
            </div>
          </Tooltip>
        </div>
        {isFirst && (
          <img
            src={serverUrl + img}
            alt="My profile"
            className="w-6 h-6 rounded-full order-1 object-cover"
          />
        )}
      </div>
    </div>
  )
}
