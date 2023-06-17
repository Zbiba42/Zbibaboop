import { useEffect, useState } from 'react'
import { SearchFilters } from '../components/search/SearchFilters'
import { useLocation } from 'react-router-dom'
import TextField from '@mui/material/TextField/TextField'
import axios from 'axios'
import { serverUrl } from '../config'
export const Search = () => {
  const location = useLocation()
  const [filter, setFilter] = useState<string>('All')
  const [results, setResults] = useState()
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
          paddingTop: '1.8rem',
        }}
      >
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={{ width: '40%', position: 'fixed', left: '25rem', top: '1.8rem' }}
          onKeyDown={(e: any) => {
            e.key == 'Enter' && e.target.value.trim() != ''
              ? handleSearch(filter, e.target.value.trim())
              : ''
          }}
          autoComplete="off"
        />
        <SearchFilters filter={filter} setFilter={setFilter} />
      </div>
    </>
  )
}
