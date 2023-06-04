import { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import jwtDecode from 'jwt-decode'
import { serverUrl } from '../config'
import axios from 'axios'
import { Box, Button, Tab, Tabs } from '@mui/material'
import { TabPanel } from './TabContent'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
interface Props {
  setAnimate?: React.Dispatch<React.SetStateAction<string>>
}
export const ProfileContent = ({ setAnimate }: Props) => {
  const [profile, setProfile] = useState<{
    CoverPath: string
    ProfilePath: string
    Fullname: string
    bio: string
    gender: string
    Work: string
    Education: string
    City: string
  }>()
  const [value, setValue] = useState(0)

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
      console.log(data.data)
    }
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      <Box sx={{ marginBottom: '0.5rem', boxShadow: 1 }}>
        <button className="absolute" onClick={() => setAnimate?.('closing')}>
          X
        </button>
        <img
          src={serverUrl + profile?.CoverPath}
          alt=""
          draggable="false"
          className="h-48"
        />
        <img
          src={serverUrl + profile?.ProfilePath}
          alt=""
          draggable="false"
          className=" m-3 w-40 rounded-full border border-black absolute top-[100px]"
        />
        <h1 className="mt-5 font-bold text-3xl text-[#272838] capitalize text-left ml-44">
          {profile?.Fullname}
        </h1>
        <Button
          color="inherit"
          variant="text"
          style={{ marginRight: '1rem' }}
          className="float-right"
        >
          <EditIcon fontSize="small" className="mr-1 " /> Edit Profile
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
        <Box sx={{ textAlign: 'left' }}>
          <h2 className="font-bold text-xl text-[#272838] ">Bio</h2>
          <h3 className="text-center">
            If you’re going through hell, keep going
          </h3>
          <hr className="w-[100%] m-2 text-[#272838]" />

          <h2 className="mb-1 text-xl text-[#272838] ">
            <HomeIcon fontSize="medium" /> Lives In{' '}
            <span className="font-bold">Rabat, Morocco</span>
          </h2>

          <h2 className="mb-1 text-xl text-[#272838] ">
            <WorkIcon fontSize="medium" />{' '}
            {profile?.Work ? (
              <>
                Works at <span className="font-bold">{profile?.Work}</span>
              </>
            ) : (
              'No workplaces to show'
            )}
          </h2>

          <h2 className="mb-1 text-xl text-[#272838] ">
            <SchoolIcon fontSize="medium" />{' '}
            {profile?.Work ? (
              <>
                Studies at{' '}
                <span className="font-bold">{profile?.Education}</span>
              </>
            ) : (
              'No schools to show'
            )}
          </h2>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Friends
      </TabPanel>
      <TabPanel value={value} index={3}>
        Photos
      </TabPanel>
    </>
  )
}
