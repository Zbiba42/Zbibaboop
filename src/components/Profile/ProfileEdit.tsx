import { serverUrl } from '../../config'
import { Box, Button, TextField } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import EditIcon from '@mui/icons-material/Edit'
import { useState, useRef, ChangeEvent, useEffect } from 'react'
import Select from 'react-select'
import axios from 'axios'

interface Props {
  profile?: {
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

  interface CitySearchOption {
    value: string
    label: string
  }
  const [inputValue, setInputValue] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [cities, setCities] = useState<CitySearchOption[]>([])
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setCities([])
  }
  const handleSelectCountry = async () => {
    try {
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/cities',
        {
          country: inputValue,
        }
      )
      const citiesData: string[] = response.data?.data
      if (citiesData) {
        setCountry(inputValue)
        const formattedCities: CitySearchOption[] = citiesData.map(
          (city: string) => ({
            value: city,
            label: city,
          })
        )
        setCities(formattedCities)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  useEffect(() => {
    {
      profile?.Country ? setInputValue(profile?.Country) : ''
    }
  })
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
        <TextField
          type="text"
          variant="standard"
          sx={{ width: '60%', marginLeft: '1rem' }}
          placeholder="Please enter you Bio !"
          defaultValue={profile?.bio ? profile?.bio : ''}
        />
        <hr className="w-[100%] m-2 text-[#272838]" />
        <h2 className="font-bold text-xl text-[#272838] ">City</h2>
        <h2 className="m-1 mb-2 text-lg  text-[#272838] flex gap-2">
          <HomeIcon fontSize="medium" /> Lives In{' '}
          <TextField
            type="text"
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter a country"
          />
          <Button
            variant="outlined"
            onClick={handleSelectCountry}
            sx={{ color: '#272838', border: '1px solid #272838' }}
          >
            Search
          </Button>
          <Select
            options={cities}
            defaultInputValue={profile?.City ? profile?.City : ''}
            styles={{
              control: (provided: any) => ({
                ...provided,
                width: 200,
                border: 'none', // Adjust the width value as needed
              }),
              menu: (provided: any) => ({
                ...provided,
                width: 200, // Adjust the width value as needed
              }),
            }}
          />
        </h2>
        <h2 className="font-bold text-xl text-[#272838] ">Work</h2>
        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <WorkIcon fontSize="medium" />{' '}
          <TextField
            type="text"
            variant="standard"
            sx={{ width: '60%', margin: '0 auto' }}
            placeholder="Please enter a work place"
            defaultValue={profile?.Work ? profile?.Work : ''}
          />
        </h2>
        <h2 className="font-bold text-xl text-[#272838] ">College</h2>

        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <SchoolIcon fontSize="medium" />{' '}
          <TextField
            type="text"
            variant="standard"
            sx={{ width: '60%', margin: '0 auto' }}
            placeholder="Please enter a school name"
            defaultValue={profile?.College ? profile?.College : ''}
          />
        </h2>

        <h2 className="font-bold text-xl text-[#272838]">High school</h2>

        <h2 className="m-1 mb-2 text-lg  text-[#272838] ">
          <SchoolIcon fontSize="medium" />{' '}
          <TextField
            type="text"
            variant="standard"
            sx={{ width: '60%', margin: '0 auto' }}
            placeholder="Please enter a school name"
            defaultValue={profile?.HighSchool ? profile?.HighSchool : ''}
          />
        </h2>

        <div className="mt-4 w-[100%] flex justify-center">
          <Button
            variant="outlined"
            sx={{
              color: '#272838',
              border: '1px solid #272838',
            }}
          >
            Save changes
          </Button>
        </div>
      </Box>
    </>
  )
}
