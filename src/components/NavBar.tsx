import { Box } from '@mui/material'
import profile from '../assets/NoProfile.png'
export const NavBar = () => {
  return (
    <Box
      sx={{
        width: window.innerWidth * 0.23,
        height: 65,
        borderRadius: '5px',
        boxShadow: 2,
        display: 'flex',
        flexWrap: 'wrap',
        justifyItems: 'center',
        justifyContent: 'center',
        float: 'right',
      }}
    >
      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
      >
        <i className="fa-regular fa-message text-xl m-1"></i>
        <h4>Notifications</h4>
      </Box>
      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
      >
        <i className="fa-regular fa-bell text-xl m-1"></i>
        <h4>Notifications</h4>
      </Box>

      <Box sx={{ width: '33%', paddingTop: 0.5 }}>
        <img
          className=" rounded-full  w-9 m-auto object-cover"
          src={profile}
          alt=""
        />
        <h4>My Profile</h4>
      </Box>
    </Box>
  )
}
