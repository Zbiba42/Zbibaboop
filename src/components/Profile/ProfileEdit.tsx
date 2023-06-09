import { serverUrl } from '../../config'
import { Box, Button, TextField } from '@mui/material'
import { useState, useRef, useEffect } from 'react'
import { ImagesUpdate } from './ImagesUpdate'
import { AboutUpdate } from './AboutUpdate'
import { profile } from '../../pages/Profile/ProfileContent'
interface Props {
  profile?: profile
}
interface CitySearchOption {
  value: string
  label: string
}
export const ProfileEdit = ({ profile }: Props) => {
  const profilePic = useRef<HTMLInputElement>(null)
  const coverPic = useRef<HTMLInputElement>(null)
  const FullName = useRef<HTMLInputElement>(null)
  const [inputValue, setInputValue] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [cities, setCities] = useState<CitySearchOption[]>([])

  const handleFormSubmit = () => {
    console.log('profilePic : ' + profilePic.current?.files?.[0])
    console.log('coverPic : ' + coverPic.current?.files?.[0])
    console.log('FullName : ' + FullName.current?.value)
  }
  useEffect(() => {
    {
      profile?.Country ? setInputValue(profile?.Country) : ''
    }
  })
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
          variant="outlined"
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
          inputValue={inputValue}
          setInputValue={setInputValue}
          setCities={setCities}
          setCountry={setCountry}
          cities={cities}
        />

        <div className="mt-4 w-[100%] flex justify-center">
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
        </div>
      </Box>
    </>
  )
}
