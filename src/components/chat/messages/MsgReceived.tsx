import { IconButton, Tooltip, Menu, MenuItem } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { serverUrl } from '../../../config'
import { FileComponentReceived } from './FileComponentReceived'
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

export const MsgReceived = ({ img, msg, isFirst, deleteMessage }: Props) => {
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
            <div>
              {msg.content && (
                <span
                  className={
                    isFirst
                      ? 'px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600'
                      : 'px-4 py-2 rounded-lg inline-block rounded-tl-none bg-gray-300 text-gray-600'
                  }
                >
                  {msg.content}
                </span>
              )}
              {msg.files.length > 0 && (
                <FileComponentReceived files={msg.files} isFirst={isFirst} />
              )}
              <IconButton onClick={handleClick}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
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
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
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
            className="w-6 h-6 rounded-full order-1 object-cover"
          />
        )}
      </div>
    </div>
  )
}
