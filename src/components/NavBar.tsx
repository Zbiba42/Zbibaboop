import { Box } from '@mui/material'
import jwtDecode from 'jwt-decode'
import { NavBox } from '../styles/navStyle'
import { Link } from 'react-router-dom'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { styled } from '@mui/material/styles'
import { useContext, useEffect, useState } from 'react'
import { HandleProfileClickContext } from '../routes/AppRoutes'
import { serverUrl } from '../config'
import axios from 'axios'
export const NavBar = () => {
  const [profile, setProfile] = useState('')
  const animateContext = useContext(HandleProfileClickContext)
  const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -7,
      top: 13,
      border: `2.5px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }))
  const getUser = async () => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken) {
      const { data } = await axios.get(serverUrl + '/api/user/getUser', {
        params: {
          id: decodedToken.id,
        },
      })

      setProfile(serverUrl + data.data.ProfilePath)
    }
  }
  useEffect(() => {
    getUser()
  }, [animateContext])
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
          className=" rounded-full  w-9 h-9 m-auto object-cover"
          src={profile}
          alt=""
        />
        <h4>My Profile</h4>
      </Box>
    </Box>
  )
}
