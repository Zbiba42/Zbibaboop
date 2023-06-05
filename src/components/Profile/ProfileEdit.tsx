import { serverUrl } from '../../config'
import { Box } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useRef } from 'react'

interface Props {
  profile?: {
    CoverPath: string
    ProfilePath: string
    Fullname: string
    bio: string
    gender: string
    Work: string
    Education: string
    City: string
  }
}
export const ProfileEdit = ({ profile }: Props) => {
  const [profileHover, setProfileHover] = useState(false)
  const [coverHover, setCoverHover] = useState(false)
  const profilePic = useRef(null)
  const coverPic = useRef(null)

  const realTimeImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const file = event.target.files?.[0]
    const reader = new FileReader()
    if (file) {
      reader.onload = (event) => {
        const dataURL = event?.target?.result
        const imgElement = document.getElementById(id) as HTMLImageElement
        if (imgElement && typeof dataURL === 'string') {
          imgElement.src = dataURL
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Box sx={{ height: '20rem', marginBottom: '0.5rem', boxShadow: 1 }}>
        <img
          src={serverUrl + profile?.CoverPath}
          alt=""
          ref={coverPic}
          draggable="false"
          className="w-[100%] h-48 object-cover "
          id="cover-image"
          onMouseEnter={() => setCoverHover(true)}
        />
        <input
          type="file"
          id="cover-image-input"
          className="hidden"
          onChange={(event) => realTimeImageChange(event, 'cover-image')}
        />
        {coverHover && (
          <>
            <div
              className="h-48 w-[100%] bg-black bg-opacity-50  absolute top-0 "
              onMouseLeave={() => setCoverHover(false)}
            >
              <label
                htmlFor="cover-image-input"
                className="w-[100%] h-[100%] cursor-pointer rounded-full flex items-center justify-center"
              >
                <div>
                  <EditIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
              </label>
            </div>
          </>
        )}
        <img
          src={serverUrl + profile?.ProfilePath}
          alt=""
          id="profile-image"
          ref={profilePic}
          draggable="false"
          className=" m-3 w-40 rounded-full border border-black absolute top-[100px]"
          onMouseEnter={() => setProfileHover(true)}
        />
        <input
          type="file"
          id="profile-image-input"
          className="hidden"
          onChange={(event) => realTimeImageChange(event, 'profile-image')}
        />
        {profileHover && (
          <>
            <div
              className="m-3 h-40 w-40 bg-black bg-opacity-50 rounded-full absolute top-[100px]"
              onMouseLeave={() => setProfileHover(false)}
            >
              <label
                htmlFor="profile-image-input"
                className="w-[100%] h-[100%] cursor-pointer rounded-full flex items-center justify-center"
              >
                <div>
                  <EditIcon fontSize="large" sx={{ color: 'white' }} />
                </div>
              </label>
            </div>
          </>
        )}

        <h1 className="mt-5 font-bold text-3xl text-[#272838] capitalize text-left ml-44">
          {profile?.Fullname}
        </h1>
      </Box>
      <Box sx={{ p: 3, textAlign: 'left' }}>
        <h2 className="font-bold text-xl text-[#272838] ">Bio</h2>
        <h3 className="text-center">
          If you’re going through hell, keep going
        </h3>
        <hr className="w-[100%] m-2 text-[#272838]" />
        <h2 className="font-bold text-xl text-[#272838] ">City</h2>
        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <HomeIcon fontSize="medium" /> Lives In{' '}
          <span className="font-bold">Rabat, Morocco</span>
        </h2>
        <h2 className="font-bold text-xl text-[#272838] ">Work</h2>
        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <WorkIcon fontSize="medium" />{' '}
          {profile?.Work ? (
            <>
              Works at <span className="font-bold">{profile?.Work}</span>
            </>
          ) : (
            'No workplaces to show'
          )}
        </h2>
        <h2 className="font-bold text-xl text-[#272838] ">College</h2>

        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <SchoolIcon fontSize="medium" />{' '}
          {profile?.Work ? (
            <>
              Studies at <span className="font-bold">{profile?.Education}</span>
            </>
          ) : (
            'No schools to show'
          )}
        </h2>

        <h2 className="font-bold text-xl text-[#272838]">High school</h2>

        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <SchoolIcon fontSize="medium" />{' '}
          {profile?.Work ? (
            <>
              Studies at <span className="font-bold">{profile?.Education}</span>
            </>
          ) : (
            'No schools to show'
          )}
        </h2>
      </Box>
    </>
  )
}
