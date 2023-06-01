import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PrivateRoutesWrapper } from './PrivateRoutesWrapper'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route element={<PrivateRoutesWrapper />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
