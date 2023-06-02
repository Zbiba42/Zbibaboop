import { Box } from '@mui/material'
import logo from '../../logo.png'
import { HomeButton, SideBarButton, SideBarBox } from '../styles/sideBarStyle'
export const SideBar = () => {
  interface Button {
    name: string
    icon: string
  }
  const Buttons: Button[] = [
    { name: 'search', icon: 'fa-solid fa-magnifying-glass' },
    { name: 'search', icon: 'fa-solid fa-magnifying-glass' },
    { name: 'search', icon: 'fa-solid fa-magnifying-glass' },
  ]
  return (
    <Box sx={SideBarBox}>
      <Box sx={HomeButton}>
        <img src={logo} alt="" className="text-xl m-1 transition-all" />
      </Box>
      {Buttons.map((button) => {
        return (
          <Box sx={SideBarButton}>
            <i className={`${button.icon} text-xl m-1`}></i>
            <h4>{button.name}</h4>
          </Box>
        )
      })}
    </Box>
  )
}
