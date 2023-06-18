import { useEffect, useState } from 'react'
import { SearchFilters } from '../components/search/SearchFilters'
import { useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField/TextField'
import axios from 'axios'
import { serverUrl } from '../config'
import { SearchResults } from '../components/search/SearchResults'
export interface User {
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
export const Search = () => {
  const location = useLocation()
  const [filter, setFilter] = useState<string>('All')
  const [results, setResults] = useState<Array<User>>([])
  const handleSearch = async (filter: string, search: string) => {
    try {
      const { data } = await axios.get(
        serverUrl + `/api/search/?search=${search}&page=1`
      )
      setResults(data.data)
    } catch (error) {}
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const query = searchParams.get('search') as string
    const filter = searchParams.get('filter') as string
    if (filter != '' && query != '') {
      handleSearch(filter, query)
    }
  }, [])
  return (
    <>
      <div
        style={{
          paddingLeft: '82px',
          height: '200vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div className="w-[100%] h-fit fixed bg-white pt-[1.8rem]">
          <TextField
            placeholder="Search"
            variant="outlined"
            sx={{
              width: '40%',
              position: 'fixed',
              left: '25rem',
              backgroundColor: 'white',
            }}
            onKeyDown={(e: any) => {
              e.key == 'Enter' && e.target.value.trim() != ''
                ? handleSearch(filter, e.target.value.trim())
                : ''
            }}
            autoComplete="off"
          />
        </div>
        <SearchFilters filter={filter} setFilter={setFilter} />
        <SearchResults results={results} />
      </div>
    </>
  )
}
