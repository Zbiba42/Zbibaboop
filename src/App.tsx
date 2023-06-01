import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Login } from './pages/Login'
import axios from 'axios'
import './App.css'
import { Home } from './pages/Home'
import { PrivateRoutes } from './components/PrivateRoute'

function App() {
  axios.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('AccessToken')
    config.headers['Authorization'] = `Bearer ${token}`
    return config
  })

  axios.interceptors.response.use(
    (res) => {
      return res
    },
    async (err) => {
      if (err.response && err.response.status === 401) {
        try {
          const oldrefreshToken = sessionStorage.getItem('RefreshToken')
          const response = await axios.post(
            'http://localhost:5000/api/Authentication/refresh',
            {
              token: oldrefreshToken,
            }
          )

          const { refreshToken, accessToken } = response.data.data
          sessionStorage.setItem('AccessToken', accessToken)
          sessionStorage.setItem('RefreshToken', refreshToken)

          err.config.headers['Authorization'] = 'Bearer ' + accessToken
          return axios(err.config)
        } catch (error) {
          console.error('Error refreshing token:', error)
        }
      }

      return Promise.reject(err)
    }
  )

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
