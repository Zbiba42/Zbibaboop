import { useRef } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'
interface LoginProps {
  setForm: (arg: string) => void
}
export const LoginForm = ({ setForm }: LoginProps) => {
  const emailRef = useRef<HTMLInputElement | null>(null)
  const passwordRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const data = {
      Email: email,
      Password: password,
    }
    try {
      const response = await axios.post(
        'http://localhost:5000/api/Auth/Login',
        data
      )
      if (response.status == 200) {
        toast.success('You are suscesfully logged in')
        sessionStorage.setItem('accesToken', response.data.accesToken)
        sessionStorage.setItem('refreshToken', response.data.refreshToken)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="form  m-auto w-[500px]">
      <Typography variant="h5" component="h5" m={2}>
        Welcome Back !
      </Typography>

      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '400px',
          margin: 'auto',
        }}
        onSubmit={handleSubmit}
      >
        <TextField
          label="Email"
          type="email"
          inputRef={emailRef}
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          inputRef={passwordRef}
          margin="normal"
          required
        />
        <Typography component={'h6'} display={'inline-flex'} sx={{ m: 1 }}>
          dont have an account ?{' '}
          <span
            className="text-purple-900 hover:cursor-pointer"
            onClick={() => {
              setForm('signup')
            }}
          >
            Sing Up
          </span>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Login
        </Button>
      </Box>
    </div>
  )
}
