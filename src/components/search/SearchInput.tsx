import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const SearchInput = () => {
  const navigate = useNavigate()
  return (
    <TextField
      placeholder="Search"
      variant="outlined"
      sx={{ width: '40%', position: 'fixed', left: '25rem', top: '1.8rem' }}
      onKeyDown={(e: any) => {
        e.key == 'Enter' && e.target.value.trim() != ''
          ? navigate(`/search?filter=all&search=${encodeURIComponent(e.target.value.trim())}`)
          : ''
      }}
      autoComplete="off"
    />
  )
}
