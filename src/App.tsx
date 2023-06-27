import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import './App.css'
import { AppRoutes } from './routes/AppRoutes'

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
            'http://localhost:5000/api/Auth/refresh',
            {
              refreshToken: oldrefreshToken,
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
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        transition={Flip}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <AppRoutes />
    </>
  )
}

export default App
