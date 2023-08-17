import { Navigate, Outlet, useLocation } from 'react-router-dom'
import jwtDecode from 'jwt-decode'
import { NavBar } from '../components/navBar/NavBar'
import { SideBar } from '../components/SideBar'
import { Profile } from '../pages/Profile'
import { useEffect, useState } from 'react'
import { SearchInput } from '../components/search/SearchInput'
import { Socket, io } from 'socket.io-client'
import { createContext } from 'react'
import { ChatContainer } from '../components/chat/ChatsContainer'

export const SocketContext = createContext<Socket | null>(null)

export const PrivateRoutesWrapper = () => {
  const location = useLocation()
  const [socket, setSocket] = useState<Socket | null>(null)
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

  useEffect(() => {
    const accessToken = sessionStorage.getItem('AccessToken')
    const decodedToken = accessToken
      ? jwtDecode<{ id: string }>(accessToken)
      : null

    if (decodedToken && socket == null) {
      const socket = io('http://localhost:5000/', {
        query: {
          userId: decodedToken.id,
        },
      })
      setSocket(socket)
    }
    return () => {
      socket?.disconnect()
    }
  }, [])

  return isAuthenticated ? (
    <>
      <SocketContext.Provider value={socket}>
        <SideBar />
        <NavBar />
        <ChatContainer />
        {location.pathname === '/search' || '/user' ? '' : <SearchInput />}
        {/* {animateContext?.animate === 'open' ||
        animateContext?.animate === 'closing' ? ( */}
        <Profile />
        <Outlet />
      </SocketContext.Provider>
    </>
  ) : (
    <Navigate to="/" />
  )
}
