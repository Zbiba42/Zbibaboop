import { useState, useEffect } from 'react'
import Logo from '../assets/logo.png'
import jwtDecode from 'jwt-decode'
import { LoginForm } from '../components/LoginForm'
import { SinupForm } from '../components/SinupForm'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const [form, setForm] = useState('login')
  const navigate = useNavigate()
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
    if (isAuthenticated) {
      return navigate('/home')
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex justify-items-center flex-wrap p-[3rem]">
      <div className="m-auto mt-10">
        <img src={Logo} alt="logo" draggable="false" />
      </div>
      {form == 'login' ? (
        <LoginForm setForm={setForm} />
      ) : (
        <SinupForm setForm={setForm} />
      )}
    </div>
  )
}
