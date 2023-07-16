import { serverUrl } from '../../../config'
import { FileComponentSent } from './FileComponentSent'

interface Props {
  img: string
  content: string
  files: Array<{ name: string; path: string }>
  isFirst: boolean
}

export const MsgSent = ({ img, content, files, isFirst }: Props) => {
  return (
    <div className="chat-message mb-1">
      <div className="flex items-end justify-end">
        <div
          className={
            isFirst
              ? 'flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end'
              : 'mr-8 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end'
          }
        >
          <div>
            {content && (
              <span
                className={
                  isFirst
                    ? 'px-4 py-2 rounded-lg inline-block bg-blue-600 text-white'
                    : 'px-4 py-2 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white'
                }
              >
                {content}
              </span>
            )}
            {files.length > 0 && (
              <FileComponentSent files={files} isFirst={isFirst} />
            )}
          </div>
        </div>
        {isFirst && (
          <img
            src={serverUrl + img}
            alt="My profile"
            className="w-6 h-6 rounded-full order-2  object-cover"
          />
        )}
      </div>
    </div>
  )
}
