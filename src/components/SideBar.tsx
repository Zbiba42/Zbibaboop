import { Box } from '@mui/material'
import logo from '../../logo.png'
import { HomeButton, SideBarButton, SideBarBox } from '../styles/sideBarStyle'
import { Link } from 'react-router-dom'
export const SideBar = () => {
  interface Button {
    name: string
    icon: string
    link: string
  }
  const Buttons: Button[] = [
    { name: 'search', icon: 'fa-solid fa-magnifying-glass', link: '/search' },
  ]
  return (
    <Box sx={SideBarBox}>
      <Box sx={HomeButton} component={Link} to={'/home'}>
        <img
          src={logo}
          alt=""
          className="text-xl m-1 transition-all filter invert 100"
          draggable="false"
        />
      </Box>
      {Buttons.map((button) => {
        return (
          <Box sx={SideBarButton} key={button.name}>
            <Link
              to={button.link}
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                justifyItems: 'center',
              }}
            >
              <i className={`${button.icon} text-xl m-1`}></i>
              <h4>{button.name}</h4>
            </Link>
          </Box>
        )
      })}
    </Box>
  )
}
