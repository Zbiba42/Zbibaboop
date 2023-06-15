import { TextField } from '@mui/material'

export const Search = () => {
  return (
    <>
      <div
        style={{
          // paddingLeft: '90px',
          position: 'fixed',
          height: '100vh',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '1.8rem',
        }}
      >
        <TextField
          placeholder="Search"
          variant="outlined"
          sx={{ width: '40%' }}
          autoComplete="off"
        />
      </div>
    </>
  )
}
