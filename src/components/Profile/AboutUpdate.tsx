import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import Select from 'react-select'
import { Button, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import axios from 'axios'
import { profile } from '../../pages/Profile/ProfileContent'
interface CitySearchOption {
  value: string
  label: string
}
interface Props {
  profile?: profile
  BioRef: React.RefObject<HTMLInputElement>
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
  setCities: React.Dispatch<React.SetStateAction<CitySearchOption[]>>
  setCountry: React.Dispatch<React.SetStateAction<string>>
  cities: CitySearchOption[]
  setCity: React.Dispatch<React.SetStateAction<string | undefined>>
  WorkRef: React.RefObject<HTMLInputElement>
  collegeRef: React.RefObject<HTMLInputElement>
  highSchoolRef: React.RefObject<HTMLInputElement>
}
export const AboutUpdate = ({
  profile,
  BioRef,
  inputValue,
  setInputValue,
  setCities,
  setCountry,
  cities,
  setCity,
  WorkRef,
  collegeRef,
  highSchoolRef,
}: Props) => {
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
  return (
    <>
      <h2 className="font-bold text-xl text-[#272838] ">Bio</h2>
      <TextField
        type="text"
        variant="standard"
        sx={{ width: '60%', marginLeft: '1rem' }}
        placeholder="Please enter you Bio !"
        defaultValue={profile?.bio ? profile?.bio : ''}
        inputRef={BioRef}
      />
      <hr className="w-[100%] m-2 text-[#272838]" />
      <h2 className="font-bold text-xl text-[#272838] ">City</h2>
      <h2 className="m-1 mb-2 text-lg  text-[#272838] flex gap-2">
        <HomeIcon fontSize="medium" />
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
          onChange={(e) => setCity(e?.value)}
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
          inputRef={WorkRef}
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
          inputRef={collegeRef}
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
          inputRef={highSchoolRef}
        />
      </h2>
    </>
  )
}
