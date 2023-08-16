import { TextField } from '@mui/material'
import { useNavigate } from 'react-router-dom'

export const SearchInput = () => {
  const navigate = useNavigate()
  return (
    <div className="w-full ml-[84px] h-[89px] fixed bg-white pt-[1.8rem] z-50">
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
            ? navigate(
                `/search?filter=all&search=${encodeURIComponent(
                  e.target.value.trim()
                )}`
              )
            : ''
        }}
        autoComplete="off"
      />
    </div>
  )
}
