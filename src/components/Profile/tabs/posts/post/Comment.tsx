import { IconButton } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CommentInterface } from './Comments'
import { serverUrl } from '../../../../../config'
interface Props {
  comment: CommentInterface
}
export const Comment = ({ comment }: Props) => {
  return (
    <div className="relative grid grid-cols-1 gap-4 p-2 m-2 border rounded-lg text-start">
      <div className="relative flex gap-4">
        <img
          src={serverUrl + comment.owner.ProfilePath}
          className="relative h-14 w-14 rounded-full border border-black "
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between h-7">
            <p className="relative text-xl overflow-hidden">
              {comment.owner.Fullname}
            </p>
            <a className="text-gray-500 text-xl" href="#">
              <IconButton aria-label="more" id="long-button">
                <MoreVertIcon />
              </IconButton>
            </a>
          </div>
          <p className="text-gray-400 text-sm">
            {new Date(comment.timestamp).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </p>
        </div>
      </div>
      <p className="-mt-4 text-gray-500 text-center">{comment.content}</p>
    </div>
  )
}
