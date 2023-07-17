import { Menu } from '@mui/material'
import axios from 'axios'
import { serverUrl } from '../../../config'
import { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../../../routes/PrivateRoutesWrapper'
import { toast } from 'react-toastify'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Conversation } from './Conversation'
import jwtDecode from 'jwt-decode'

interface Props {
  convosMenuAnchor: HTMLElement | null
  handleConvosMenuClose: React.Dispatch<React.SetStateAction<number>>
  setMsgCount: React.Dispatch<React.SetStateAction<number>>
}

export const ConversationsMenu = ({
  convosMenuAnchor,
  handleConvosMenuClose,
  setMsgCount,
}: Props) => {
  const open = Boolean(convosMenuAnchor)
  const socket = useContext(SocketContext)

  const [conversations, setConversations] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const getConvos = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      try {
        const { data } = await axios.get(
          serverUrl + '/api/Conversation/convos',
          {
            params: {
              page: page,
            },
          }
        )
        if (data.data.length === 0) {
          setHasMore(false)
        }
        console.log(decodedToken)
        const unreadCount = data.data.filter(
          (convo: { messages: Array<{ sender: string }> }) =>
            convo.messages[0].sender != decodedToken.id
        ).length
        setMsgCount(unreadCount)
        setConversations(data.data)
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }
  const getNextPage = async () => {
    try {
      const { data } = await axios.get(serverUrl + '/api/Conversation/convos', {
        params: {
          page: page + 1,
        },
      })
      if (data.data.length === 0) {
        setHasMore(false)
      }
      setPage((old) => old + 1)
      setConversations((old) => old.concat(data.data))
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    if (socket) {
      socket.on('receiveMessage', () => {
        getConvos()
      })
      socket.on('messageSentResponse', () => {
        getConvos()
      })
      getConvos()
    }
  }, [socket])
  return (
    <Menu
      anchorEl={convosMenuAnchor}
      id="notif-menu"
      open={open}
      onClose={handleConvosMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'visible',
          filter: 'drop-shadow(0px 2px 5px rgba(0,0,0,0.32))',
          mt: 1.5,
          position: 'fixed',
          width: '400px',
          minHeight: '100px',
          maxHeight: '500xp',
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
      <div
        className="overflow-y-scroll max-h-[500px] p-1 w-full notifications"
        id="ConvosContainer"
      >
        <InfiniteScroll
          dataLength={conversations.length}
          next={getNextPage}
          hasMore={hasMore}
          loader={''}
          scrollableTarget="ConvosContainer"
        >
          {conversations.map(
            (convo: {
              participants: Array<string>
              _id: string
              messages: Array<{
                content: string
                files: Array<string>
                timestamp: string
                sender: string
                type: string
                _id: string
              }>
            }) => {
              return (
                <>
                  <Conversation convo={convo} key={convo._id} />
                </>
              )
            }
          )}
        </InfiniteScroll>
      </div>
    </Menu>
  )
}
