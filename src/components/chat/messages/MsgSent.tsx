import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { serverUrl } from '../../../config'
import { FileComponentSent } from './FileComponentSent'
import { useState } from 'react'
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
  deleteMessage: (id: any) => Promise<void>
}

export const MsgSent = ({ img, msg, isFirst, deleteMessage }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
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
          <Tooltip
            title={new Date(msg.timestamp).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
            arrow
            placement="left"
          >
            <div>
              <IconButton onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
              {msg.content && (
                <span
                  className={
                    isFirst
                      ? 'px-4 py-2 rounded-lg inline-block bg-blue-600 text-white'
                      : 'px-4 py-2 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white'
                  }
                >
                  {msg.content}
                </span>
              )}
              {msg.files.length > 0 && (
                <FileComponentSent
                  files={msg.files}
                  isFirst={isFirst}
                  key={msg._id}
                />
              )}
            </div>
          </Tooltip>
          <Menu
            id="demo-positioned-menu"
            aria-labelledby="demo-positioned-button"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleClose}>Edit</MenuItem>
            <MenuItem
              onClick={() => {
                handleClose()
                setTimeout(() => {
                  deleteMessage(msg._id)
                }, 10)
              }}
            >
              Delete
            </MenuItem>
          </Menu>
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
