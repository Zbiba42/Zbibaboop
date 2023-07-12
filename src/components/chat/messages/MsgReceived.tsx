import { serverUrl } from '../../../config'

interface Props {
  img: string
  content: string
  isFirst: boolean
}

export const MsgReceived = ({ img, content, isFirst }: Props) => {
  return (
    <div className="chat-message mb-1">
      <div className="flex items-end">
        {isFirst ? (
          <>
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
                  {content}
                </span>
              </div>
            </div>
            <img
              src={serverUrl + img}
              alt="My profile"
              className="w-6 h-6 rounded-full order-1 object-cover"
            />
          </>
        ) : (
          <>
            <div className="ml-8 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
              <div>
                <span className=" px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600 ">
                  {content}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
