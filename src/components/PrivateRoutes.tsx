import { Navigate, Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
export const PrivateRoutes = () => {
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
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}
