import { configureStore } from '@reduxjs/toolkit'
import ChatSlice from './chat'

export const store = configureStore({
  reducer: {
    Chat: ChatSlice,
  },
})
