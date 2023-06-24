import { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../routes/PrivateRoutesWrapper'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1'
import { serverUrl } from '../config'
import axios from 'axios'
import { Box, Button, Tab, Tabs } from '@mui/material'
import { TabPanel } from '../components/Profile/TabContent'
import { About } from '../components/Profile/tabs/About'
import { useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
export interface profile {
  _id: string
  CoverPath: string
  ProfilePath: string
  Fullname: string
  bio: string
  gender: string
  Work: string
  City: string
  Country: string
  College: string
  HighSchool: string
}
export const User = () => {
  const socket = useContext(SocketContext)
  const [profile, setProfile] = useState<profile>()
  const [value, setValue] = useState(0)
  const [relation, setRelation] = useState<string>()
  const { id } = useParams()
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const getUser = async () => {
    const { data } = await axios.get(serverUrl + '/api/user/getUser', {
      params: {
        id: id,
      },
    })
    setProfile(data.data)
  }
  const checkRelation = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const { data } = await axios.get(
        serverUrl + `/api/user/getRelation?user1=${decodedToken.id}&user2=${id}`
      )
      setRelation(data.data)
    }
  }
  const addFriend = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket) {
      const friendRequest = { sender: decodedToken.id, Receiver: profile?._id }
      socket?.emit('sendFriendReq', friendRequest)
      socket.on('FriendReqSent', (data) => {
        if (data.succes) {
          toast.success(data.data, {
            toastId: 'sent',
          })
          console.log('ahiya')
          setRelation('already sent')
        }
      })
    }
  }
  const cancelReq = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket) {
      const friendRequest = { sender: decodedToken.id, Receiver: profile?._id }
      socket?.emit('cancelFriendReq', friendRequest)
      socket.on('FriendReqCanceled', (data) => {
        if (data.succes) {
          toast.success(data.data, {
            toastId: 'cancel',
          })
          console.log('machafk 7ed')
          setRelation('none')
        }
      })
    }
  }

  useEffect(() => {
    checkRelation()
    getUser()
  }, [])
  return (
    <div
      style={{
        paddingLeft: '82px',
        height: '200vh',
        width: '65%',
        display: 'flex',
        margin: '0 auto',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 0,
        backgroundColor: 'white',
      }}
    >
      <Box sx={{ marginBottom: '0.5rem', boxShadow: 1 }}>
        <img
          src={serverUrl + profile?.CoverPath}
          alt=""
          draggable="false"
          className="w-[100%] h-48 object-cover "
        />
        <img
          src={serverUrl + profile?.ProfilePath}
          alt=""
          draggable="false"
          className=" m-3 w-40 h-40 object-cover rounded-full border border-black absolute top-[100px]"
        />
        <h1 className="mt-5 font-bold text-3xl text-[#272838] capitalize text-left ml-44">
          {profile?.Fullname}
        </h1>
        {relation === 'already sent' ? (
          <Button
            color="inherit"
            variant="text"
            style={{ marginRight: '1rem' }}
            className="float-right"
            onClick={cancelReq}
          >
            <PersonAddAlt1Icon fontSize="small" className="mr-1" /> Cancel
            request
          </Button>
        ) : relation === 'already Received' ? (
          <Button
            color="inherit"
            variant="text"
            style={{ marginRight: '1rem' }}
            className="float-right"
          >
            <PersonAddAlt1Icon fontSize="small" className="mr-1" /> Accept
            Request
          </Button>
        ) : (
          <Button
            color="inherit"
            variant="text"
            style={{ marginRight: '1rem' }}
            className="float-right"
            onClick={addFriend}
          >
            <PersonAddAlt1Icon fontSize="small" className="mr-1" /> Add friend
          </Button>
        )}

        <Tabs
          sx={{
            clear: 'both',
          }}
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Posts" />
          <Tab label="About" />
          <Tab label="Friends" />
          <Tab label="Photos" />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Posts
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About profile={profile} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Friends
      </TabPanel>
      <TabPanel value={value} index={3}>
        Photos
      </TabPanel>
    </div>
  )
}
