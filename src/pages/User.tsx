import { useEffect, useState, useContext } from 'react'
import { SocketContext } from '../routes/PrivateRoutesWrapper'
import { serverUrl } from '../config'
import axios from 'axios'
import { Box, Tab, Tabs } from '@mui/material'
import { TabPanel } from '../components/Profile/TabContent'
import { About } from '../components/Profile/tabs/About'
import { useParams } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { RelationButtons } from '../components/Profile/RelationButtons'
import { profile } from '../components/Profile/ProfileContent'
import { Friends } from '../components/Profile/tabs/Friends'
import { Posts } from '../components/Profile/tabs/posts/Posts'

export const User = () => {
  const socket = useContext(SocketContext)
  const [profile, setProfile] = useState<profile>()
  const [value, setValue] = useState(0)
  const [relation, setRelation] = useState<string>()
  const [FriendReq, setFriendReq] = useState<
    { sender: string; Receiver: string; status: string } | undefined
  >()
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
      if (data.data === 'already Received') {
        setFriendReq(data.friendReq)
      }
      setRelation(data.data)
    }
  }

  useEffect(() => {
    socket?.on('friendReqAcceptedSuccess', () => {
      checkRelation()
    })
    socket?.on('friendReqAccepted', () => {
      checkRelation()
    })
    socket?.on('notification', (data) => {
      if (data.sender === profile?._id) {
        checkRelation()
      }
    })
    socket?.on('cancelNotif', (data) => {
      if (data.sender === profile?._id) {
        checkRelation()
      }
    })
    setValue(0)
    checkRelation()
    getUser()
  }, [id])
  return (
    <div
      style={{
        paddingLeft: '82px',
        width: '65%',
        display: 'flex',
        margin: '0 auto',
        overflow: ' scroll',
        height: '100vh',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 0,
        backgroundColor: 'white',
      }}
      id="ProfileContainer"
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

        <RelationButtons
          socket={socket}
          profile={profile}
          relation={relation}
          FriendReq={FriendReq}
          setRelation={setRelation}
        />

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
        <Posts profile={profile} type="user" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <About profile={profile} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Friends friends={profile?.friends} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Photos
      </TabPanel>
    </div>
  )
}
