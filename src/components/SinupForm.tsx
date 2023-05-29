import { useRef } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import axios from 'axios'
interface LoginProps {
  setForm: (arg: string) => void
}

export const SinupForm = ({ setForm }: LoginProps) => {
  const fullNameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const confirmPasswordRef = useRef<HTMLInputElement>(null)
  const validateEmail = (email: string): boolean => {
    return (
      email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
    )
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const fullName = fullNameRef.current?.value
    const email = emailRef.current?.value as string
    const password = passwordRef.current?.value
    const confirmPassword = confirmPasswordRef.current?.value
    const validation = {
      name: false,
      email: false,
      password: false,
    }
    if (!fullName) {
      toast.error('please fill all the inputs')
    } else {
      validation.name = true
    }
    if (!validateEmail(email)) {
      toast.error('please insert a valid email')
    } else {
      validation.email = true
    }
    if (!(password === confirmPassword)) {
      toast.error('passwords dosent match')
    } else {
      validation.password = true
    }
    if (validation.name && validation.email && validation.password) {
      const data = {
        Fullname: fullName,
        Email: email,
        Password: password,
      }
      try {
        const response = await axios.post(
          'http://localhost:5000/api/Auth/Signup',
          data
        )
        if (response.status == 200) {
          toast.success('account created suscesfully !')
          setForm('login')
        }
      } catch (error: any) {
        toast.error(error.message)
      }
    }
  }
  return (
    <div className="form  m-auto w-[500px]">
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
        <Typography variant="h5" component="h5" m={2}>
          Create your account
        </Typography>
        <TextField
          label="Full Name"
          type="text"
          inputRef={fullNameRef}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          type="email"
          inputRef={emailRef}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          inputRef={passwordRef}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          type="password"
          inputRef={confirmPasswordRef}
          required
          fullWidth
          margin="normal"
        />
        <Typography component={'h6'} display={'inline-flex'} sx={{ m: 1 }}>
          Already have an account ?{' '}
          <span
            className="text-purple-900 hover:cursor-pointer"
            onClick={() => {
              setForm('login')
            }}
          >
            Login
          </span>
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Sing Up
        </Button>
      </Box>
    </div>
  )
}
