import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'
import jwtDecode from 'jwt-decode'
import { serverUrl } from '../../config'
import axios from 'axios'
import { Box, Button, Tab, Tabs } from '@mui/material'
import { TabPanel } from './TabContent'
import { About } from './tabs/About'
import { ProfileEdit } from './update/ProfileEdit'

interface Props {
  setAnimate?: React.Dispatch<React.SetStateAction<string>>
}
export interface profile {
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
export const ProfileContent = ({ setAnimate }: Props) => {
  const [profile, setProfile] = useState<profile>()
  const [value, setValue] = useState(0)
  const [isEditing, SetEditing] = useState(false)
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  const getUser = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const { data } = await axios.get(serverUrl + '/api/user/getUser', {
        params: {
          id: decodedToken.id,
        },
      })
      setProfile(data.data)
    }
  }
  useEffect(() => {
    getUser()
  }, [isEditing])
  if (!isEditing) {
    return (
      <>
        <Box sx={{ marginBottom: '0.5rem', boxShadow: 1 }}>
          <button
            className="absolute right-1"
            onClick={() => setAnimate?.('closing')}
          >
            <CloseIcon sx={{ color: 'white' }} />
          </button>
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
          <Button
            color="inherit"
            variant="text"
            style={{ marginRight: '1rem' }}
            className="float-right"
            onClick={() => SetEditing(true)}
          >
            <EditIcon fontSize="small" className="mr-1" /> Edit Profile
          </Button>
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
      </>
    )
  } else {
    return <ProfileEdit profile={profile} SetEditing={SetEditing} />
  }
}
