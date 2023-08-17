import { useEffect, useRef, useState } from 'react'
import { SearchFilters } from '../components/search/SearchFilters'
import TextField from '@mui/material/TextField/TextField'
import axios from 'axios'
import { serverUrl } from '../config'
import { SearchResults } from '../components/search/SearchResults'
import { profile } from '../components/Profile/ProfileContent'
import { PostInterface } from '../components/Profile/tabs/posts/Posts'
import { toast } from 'react-toastify'

export const Search = () => {
  const [filter, setFilter] = useState<string>('People')
  const [page, setPage] = useState(1)
  const [results, setResults] = useState<Array<profile | PostInterface>>([])
  const [hasMore, setHasMore] = useState(true)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleSearch = async () => {
    try {
      const { data } = await axios.get(
        serverUrl +
          `/api/search/?search=${inputRef.current?.value}&page=${page}&filter=${filter}`
      )
      if (data.data.length === 0) {
        setHasMore(false)
      } else {
        setResults(data.data)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  const getNextPage = async () => {
    try {
      const { data } = await axios.get(
        serverUrl +
          `/api/search/?search=${inputRef.current?.value}&page=${
            page + 1
          }&filter=${filter}`
      )
      setPage((old) => old + 1)
      if (data.data.length === 0) {
        setHasMore(false)
      } else {
        setResults(results.concat(data.data))
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }
  useEffect(() => {
    setPage(1)
    setResults([])
  }, [filter])

  return (
    <>
      <div
        style={{
          paddingLeft: '82px',
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
            inputRef={inputRef}
            onKeyDown={(e: any) => {
              e.key == 'Enter' && e.target.value.trim() != ''
                ? handleSearch()
                : ''
            }}
            autoComplete="off"
          />
        </div>
        <SearchFilters filter={filter} setFilter={setFilter} />
        <SearchResults
          results={results}
          filter={filter}
          hasMore={hasMore}
          getNextPage={getNextPage}
        />
      </div>
    </>
  )
}
