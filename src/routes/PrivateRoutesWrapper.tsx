import { Navigate, Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { NavBar } from '../components/NavBar'
import { SideBar } from '../components/SideBar'
import { Profile } from '../pages/Profile/Profile'
import { useContext } from 'react'
import { HandleProfileClickContext } from '../routes/AppRoutes'
import { SearchInput } from '../components/search/SearchInput'

export const PrivateRoutesWrapper = () => {
  const token = sessionStorage.getItem('AccessToken')
  const isAuthenticated = token && !isTokenExpired(token)
  interface Token {
    exp: number
  }
  function isTokenExpired(token: string) {
    const decodedToken = jwtDecode<Token>(token)
    const currentTime = Date.now() / 1000
    return decodedToken.exp < currentTime
  }
  const animateContext = useContext(HandleProfileClickContext)
  return isAuthenticated ? (
    <>
      <SideBar />
      <NavBar />
      <SearchInput />
      {animateContext?.animate === 'open' ||
      animateContext?.animate === 'closing' ? (
        <Profile />
      ) : (
        ''
      )}
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  )
}
