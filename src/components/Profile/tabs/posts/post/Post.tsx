import { serverUrl } from '../../../../../config'
import { profile } from '../../../ProfileContent'
import { PostInterface } from '../Posts'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  ListItemIcon,
  TextField,
} from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { PostFilesPrev } from './PostFilesPrev'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import ShareIcon from '@mui/icons-material/Share'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied'
import axios from 'axios'
import { Comments } from './Comments'
import { Link } from 'react-router-dom'
import jwtDecode from 'jwt-decode'

interface Props {
  post: PostInterface
  user?: profile
  setRefresh: React.Dispatch<React.SetStateAction<number>>
}

export const Post = ({ post, user, setRefresh }: Props) => {
  const [isSamePerson, setIsSamePerson] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const [isReactHovered, setIsReactHovered] = useState(false)

  const handleReactHover = (hover: boolean) => {
    setIsReactHovered(hover)
  }
  const [DialogOpen, setDialogOpen] = useState(false)

  const handleDialogClickOpen = () => {
    setDialogOpen(true)
  }

  const handleDialogClose = () => {
    setDialogOpen(false)
  }
  const [isEdittingContent, SetEdittingContent] = useState(false)
  const PostContentRef = useRef<HTMLInputElement>(null)
  const [isCommentsShown, setCommentsShown] = useState(false)
  const updateContent = async () => {
    if (PostContentRef.current) {
      if (PostContentRef.current.value !== post.content) {
        try {
          const { data } = await axios.post(
            serverUrl + '/api/posts/updateContent',
            {
              postId: post._id,
              content: PostContentRef.current.value,
            }
          )
          if (data.succes) {
            toast.success('post updated succesfully')
            post.content = PostContentRef.current.value
            SetEdittingContent(false)
          }
        } catch (error) {}
      } else {
        SetEdittingContent(false)
      }
    }
  }
  const deletePost = async () => {
    try {
      const { data } = await axios.post(serverUrl + '/api/posts/delete', {
        postId: post._id,
      })
      if (data.succes) {
        toast.success('post deleted successfully')
        setRefresh((old) => old + 1)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      if (decodedToken.id === post.owner._id) {
        setIsSamePerson(true)
      } else {
        setIsSamePerson(false)
      }
    }
  }, [])
  return (
    <div
      className="w-full border min-h-[auto]  p-2 my-2 rounded-md relative"
      onMouseLeave={() => handleReactHover(false)}
    >
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={() => SetEdittingContent(true)}>
          <ListItemIcon>
            <i className="fa-solid fa-pen-to-square"></i>
          </ListItemIcon>
          edit post content
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <i className="fa-solid fa-user-tag"></i>
          </ListItemIcon>
          edit post tags
        </MenuItem>
        <MenuItem
          className="hover:bg-[#D52941]"
          onClick={handleDialogClickOpen}
        >
          <ListItemIcon>
            <i className="fa-solid fa-trash"></i>
          </ListItemIcon>
          delete post
        </MenuItem>
      </Menu>
      {/* delete dialog */}
      <Dialog
        open={DialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Post'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure u want to delete the post ? once the post is deleted
            you cant restore it!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button
            onClick={() => {
              deletePost()
              handleDialogClose()
            }}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* Nav */}

      <div className="flex items-center gap-3 relative">
        <div className="absolute top-1 right-0">
          {isSamePerson && (
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          )}
        </div>
        <Link to={'/user/' + user?._id}>
          <img
            src={serverUrl + user?.ProfilePath}
            alt=""
            draggable="false"
            className=" w-12 h-12 object-cover rounded-full border border-black "
          />
        </Link>
        <div>
          <Link to={'/user/' + user?._id}>
            <h1 className=" font-bold text-lg text-[#272838] capitalize text-left ">
              {user?.Fullname}
            </h1>
          </Link>
          <Link to={'/post/' + post._id}>
            <h4 className="font-sans text-sm text-[#272838] capitalize text-left">
              {new Date(post.timestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </h4>
          </Link>
          {post.tags.length > 0 && (
            <h1 className=" font-sans text-sm text-[#272838] capitalize text-left ">
              with
              {post.tags.splice(0, 2).map((tag: any) => {
                return (
                  <>
                    <span
                      className="text-[#272838] space-y-2 border- rounded-xl bg-blue-200 px-2 mx-1 mb-1 cursor-pointer transition-all duration-200"
                      key={tag._id}
                    >
                      {tag.Fullname}
                      {post.tags.length - 3 > 0 && (
                        <span>And {post.tags.length - 3}</span>
                      )}
                    </span>
                  </>
                )
              })}
            </h1>
          )}
        </div>
      </div>
      {/* Content */}
      {isEdittingContent ? (
        <>
          <div className="flex gap-1 items-center">
            <TextField
              sx={{
                width: '85%',
                m: 2,
              }}
              inputProps={{
                style: { width: '100%' },
              }}
              multiline
              maxRows={4}
              placeholder="Nobody cares abt what ur gonna post"
              autoComplete="off"
              variant="standard"
              defaultValue={post.content}
              inputRef={PostContentRef}
            />
            <Button
              variant="contained"
              size="small"
              onClick={() => SetEdittingContent(false)}
              sx={{ height: '2rem' }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={updateContent}
              sx={{ height: '2rem' }}
            >
              Update
            </Button>
          </div>
        </>
      ) : (
        <div className="w-full py-2 px-3">
          {!isExpanded ? post.content.slice(0, 93) : post.content}
          {!isExpanded && post.content.length > 93 && (
            <span
              onClick={() => setIsExpanded(true)}
              className="show-more-button text-blue-500 cursor-pointer"
            >
              {' '}
              Show more...
            </span>
          )}
          {isExpanded && (
            <span
              onClick={() => setIsExpanded(false)}
              className="show-more-button text-blue-500 cursor-pointer"
            >
              {' '}
              Show less...
            </span>
          )}{' '}
        </div>
      )}

      {/* Files */}
      {post.files.length > 0 && <PostFilesPrev previews={post.files} />}
      {/* buttons */}
      <div className="grid grid-cols-3 w-full px-5 my-3 relative">
        <div
          className="flex flex-row justify-center items-center w-full space-x-3"
          onMouseEnter={() => handleReactHover(true)}
        >
          <ThumbUpIcon
            sx={{ color: isReactHovered ? 'primary.main' : '#838383' }}
          />
          <span className="font-semibold text-lg text-gray-600">React</span>
          {isReactHovered && (
            <Box
              sx={{
                position: 'absolute',
                top: '-4rem',
                left: '0',
                backgroundColor: 'white',
                borderRadius: '10px',
                boxShadow: '0 1px 6px rgba(0, 0, 0, 0.1)',
                padding: '6px',
                zIndex: 1,
              }}
            >
              <Stack
                direction="row"
                spacing={2}
                onMouseEnter={() => handleReactHover(true)}
                onMouseLeave={() => handleReactHover(false)}
              >
                <IconButton
                  size="large"
                  color="primary"
                  aria-label={'Thumbs Up'}
                >
                  <ThumbUpIcon />
                </IconButton>
                <IconButton size="large" color="primary" aria-label={'Like'}>
                  <FavoriteIcon />
                </IconButton>
                <IconButton size="large" color="primary" aria-label={'Love'}>
                  <SentimentSatisfiedIcon />
                </IconButton>
              </Stack>
            </Box>
          )}
        </div>

        <IconButton
          size="small"
          sx={{
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent' },
          }}
          onClick={() => setCommentsShown((old) => !old)}
        >
          <ChatBubbleOutlineIcon />
        </IconButton>
        <IconButton
          size="small"
          sx={{
            backgroundColor: 'transparent',
            '&:hover': { backgroundColor: 'transparent' },
          }}
        >
          <ShareIcon />
        </IconButton>
      </div>
      {/* Comments */}
      {isCommentsShown && <Comments post={post} />}
    </div>
  )
}
