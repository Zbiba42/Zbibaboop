import { IconButton, Tooltip, Menu, MenuItem, TextField } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { serverUrl } from '../../../config'
import { FileComponentSent } from './FileComponentSent'
import { useRef, useState } from 'react'
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
  editMessage: (id: string, content: string | undefined) => Promise<void>
}

export const MsgSent = ({
  img,
  msg,
  isFirst,
  deleteMessage,
  editMessage,
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
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
            <div className="flex flex-row flex-nowrap align-center">
              <IconButton onClick={handleClick} sx={{ m: 0, p: 0 }}>
                <MoreVertIcon fontSize="small" />
              </IconButton>
              {isEditing
                ? msg.content.length > 0 && (
                    <>
                      <span
                        className={
                          isFirst
                            ? 'px-4 py-2 rounded-lg inline-block bg-blue-600 text-white'
                            : 'px-4 py-2 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white'
                        }
                      >
                        <TextField
                          defaultValue={msg.content}
                          placeholder="Type a message"
                          autoComplete="off"
                          inputRef={inputRef}
                          multiline
                          variant="standard"
                          onKeyDown={(e) => {
                            if (e.key == 'Enter') {
                              msg.content != inputRef.current?.value &&
                                editMessage(msg._id, inputRef.current?.value)
                              setIsEditing(false)
                            }
                            if (e.key === 'Escape') {
                              setIsEditing(false)
                            }
                          }}
                          inputProps={{
                            style: { color: 'white' },
                          }}
                        />
                      </span>
                    </>
                  )
                : msg.content.length > 0 && (
                    <span
                      className={
                        isFirst
                          ? 'px-4 py-2 rounded-lg inline-block bg-blue-600 text-white break-all'
                          : 'px-4 py-2 rounded-lg inline-block rounded-tr-none bg-blue-600 text-white break-all'
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
          {isEditing && (
            <span className="flex items-end justify-end gap-4 w-full">
              <h6
                className="m-1 text-blue-500 cursor-pointer hover:text-blue-900"
                onClick={() => {
                  setIsEditing(false)
                }}
              >
                Cancel
              </h6>
              <h6
                className="m-1 text-blue-500 cursor-pointer hover:text-blue-900"
                onClick={() => {
                  msg.content != inputRef.current?.value &&
                    editMessage(msg._id, inputRef.current?.value)
                  setIsEditing(false)
                }}
              >
                Save
              </h6>
            </span>
          )}
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
            <MenuItem
              onClick={() => {
                setIsEditing(true)
                handleClose()
              }}
            >
              Edit
            </MenuItem>
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
