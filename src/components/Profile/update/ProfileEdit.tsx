import { serverUrl } from '../../../config'
import { Box, Button, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { ImagesUpdate } from './ImagesUpdate'
import { AboutUpdate } from './AboutUpdate'
import { profile } from '../ProfileContent'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'
interface Props {
  profile?: profile
  SetEditing: React.Dispatch<React.SetStateAction<boolean>>
}
interface CitySearchOption {
  value: string
  label: string
}
export const ProfileEdit = ({ profile, SetEditing }: Props) => {
  const profilePic = useRef<HTMLInputElement>(null)
  const coverPic = useRef<HTMLInputElement>(null)
  const FullName = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const BioRef = useRef<HTMLInputElement>(null)
  const [country, setCountry] = useState<string>('')
  const [cities, setCities] = useState<CitySearchOption[]>([])
  const [city, setCity] = useState<string>()
  const WorkRef = useRef<HTMLInputElement>(null)
  const collegeRef = useRef<HTMLInputElement>(null)
  const highSchoolRef = useRef<HTMLInputElement>(null)
  interface data {
    [key: string]: string | File | undefined
    id: string | undefined
    Fullname: string | undefined
    ProfilePath: string | File | undefined
    CoverPath: string | File | undefined
    bio: string
    Work: string
    College: string
    HighSchool: string
    Country: string
    City: string
  }
  const prepareFormData = (data: data) => {
    const formData = new FormData()
    Object.keys(data).forEach((key) => {
      if (data[key]) {
        formData.append(key, data[key] as string | Blob)
      }
    })
    return formData
  }

  const handleFormSubmit = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null
    const data = {
      id: decodedToken?.id,
      Fullname: FullName.current?.value,
      ProfilePath: profilePic.current?.files?.[0],
      CoverPath: coverPic.current?.files?.[0],
      bio: BioRef.current?.value || '',
      Work: WorkRef.current?.value || '',
      College: collegeRef.current?.value || '',
      HighSchool: highSchoolRef.current?.value || '',
      Country: country || '',
      City: city || '',
    }
    if (!data.Fullname) {
      toast.error('Please enter your full name')
      return
    }
    const formData = prepareFormData(data)

    try {
      const response = await axios.post(
        serverUrl + '/api/user/updateUser',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      toast.success(response.data.message)
      SetEditing(false)
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    {
      profile?.Country ? setInputValue(profile?.Country) : ''
    }
    {
      profile?.Country ? setCountry(profile?.Country) : ''
    }
    {
      profile?.City ? setCity(profile?.City) : ''
    }
  }, [])
  return (
    <>
      <Box sx={{ height: '18rem', marginBottom: '0.5rem', boxShadow: 1 }}>
        {/* profile and cover pics */}
        <ImagesUpdate
          profile={profile}
          profilePicRef={profilePic}
          coverPicRef={coverPic}
        />
        {/* Full Name  */}
        <TextField
          label="Full Name"
          type="text"
          variant="standard"
          defaultValue={profile?.Fullname}
          inputRef={FullName}
          placeholder="Please enter your name"
          sx={{
            color: '#272838',
            marginTop: '1.25rem',
            width: '40%',
          }}
        />
      </Box>

      {/* About infos */}
      <Box sx={{ p: 3, textAlign: 'left' }}>
        <AboutUpdate
          profile={profile}
          BioRef={BioRef}
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCities={setCities}
          setCountry={setCountry}
          cities={cities}
          setCity={setCity}
          WorkRef={WorkRef}
          collegeRef={collegeRef}
          highSchoolRef={highSchoolRef}
        />

        <div className="mt-4 w-[100%] flex justify-center gap-3">
          <Button
            variant="outlined"
            onClick={handleFormSubmit}
            sx={{
              color: '#272838',
              border: '1px solid #272838',
            }}
          >
            Save changes
          </Button>
          <Button
            variant="outlined"
            onClick={() => SetEditing(false)}
            sx={{
              color: '#272838',
              border: '1px solid #272838',
            }}
          >
            Cancel
          </Button>
        </div>
      </Box>
    </>
  )
}
