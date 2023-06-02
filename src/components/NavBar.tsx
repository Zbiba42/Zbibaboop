import { Box } from '@mui/material'
import profile from '../assets/NoProfile.png'
import { NavBox } from '../styles/navStyle'
import { Link } from 'react-router-dom'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useContext } from 'react'
import { HandleProfileClickContext } from '../routes/AppRoutes'
export const NavBar = () => {
  const animateContext = useContext(HandleProfileClickContext)
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -7,
      top: 13,
      border: `2.5px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))
  return (
    <Box sx={NavBox}>
      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
        component={Link}
        to={'/'}
      >
        <StyledBadge badgeContent={1} color="info">
          <i className="fa-regular fa-message text-xl m-1"></i>
        </StyledBadge>
        <h4>Messages</h4>
      </Box>

      <Box
        sx={{
          borderRight: `${1}px solid #D3D3D3`,
          width: '33%',
          paddingTop: 0.5,
        }}
        component={Link}
        to={'/'}
      >
        <StyledBadge badgeContent={0} color="info">
          <i className="fa-regular fa-bell text-xl m-1"></i>
        </StyledBadge>
        <h4>Notifications</h4>
      </Box>

      <Box
        sx={{ width: '33%', paddingTop: 0.5, cursor: 'pointer' }}
        onClick={() => animateContext?.setAnimate('open')}
      >
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
