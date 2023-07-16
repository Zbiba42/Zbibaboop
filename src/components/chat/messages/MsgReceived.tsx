import { serverUrl } from '../../../config'
import { FileComponentReceived } from './FileComponentReceived'

interface Props {
  img: string
  content: string
  files: Array<{ name: string; path: string }>
  isFirst: boolean
}

export const MsgReceived = ({ img, content, files, isFirst }: Props) => {
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
          <div>
            {content && (
              <span
                className={
                  isFirst
                    ? 'px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600'
                    : 'px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600'
                }
              >
                {content}
              </span>
            )}
            {files.length > 0 && (
              <FileComponentReceived files={files} isFirst={isFirst} />
            )}
          </div>
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
