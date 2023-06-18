import { createContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoutesWrapper } from './PrivateRoutesWrapper'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Search } from '../pages/Search'
import { User } from '../pages/User'

interface HandleProfileClickContextType {
  setAnimate: React.Dispatch<React.SetStateAction<string>>
  animate: string
}

export const HandleProfileClickContext =
  createContext<HandleProfileClickContextType | null>(null)

export const AppRoutes = () => {
  const [animate, setAnimate] = useState('close')

  return (
    <HandleProfileClickContext.Provider value={{ setAnimate, animate }}>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route element={<PrivateRoutesWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/:id" element={<User />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HandleProfileClickContext.Provider>
  )
}
