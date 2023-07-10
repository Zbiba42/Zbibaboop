import { serverUrl } from '../../../config'

interface Props {
  img: string
  content: string
  isFirst: boolean
}

export const MsgSent = ({ img, content, isFirst }: Props) => {
  return (
    <div className="chat-message mb-1">
      <div className="flex items-end justify-end">
        {isFirst ? (
          <>
            <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-end">
              <div>
                <span className="px-4 py-2 rounded-lg inline-block bg-blue-600 text-white ">
                  {content}
                </span>
              </div>
            </div>
            <img
              src={serverUrl + img}
              alt="My profile"
              className="w-6 h-6 rounded-full order-2 mt-[-20px]"
            />
          </>
        ) : (
          <div className="mr-8 flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
            <div>
              <span className=" px-4 py-2 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white ">
                {content}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
