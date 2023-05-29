import { useState } from 'react'
import Logo from '../assets/logo.png'
import { LoginForm } from '../components/LoginForm'
import { SinupForm } from '../components/SinupForm'
export const Login = () => {
  const [form, setForm] = useState('login')
  return (
    <div className="flex flex-wrap">
      <div className="mr-auto mt-10">
        <img src={Logo} alt="logo" />
      </div>
      {form == 'login' ? (
        <LoginForm setForm={setForm} />
      ) : (
        <SinupForm setForm={setForm} />
      )}
    </div>
  )
}
