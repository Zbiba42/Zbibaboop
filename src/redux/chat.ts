import { createSlice } from '@reduxjs/toolkit'

const ChatSlice = createSlice({
  name: 'Chat',
  initialState: {
    newChatShown: false,
  },
  reducers: {
    toggleNewChatComponent: (state) => {
      state.newChatShown = !state.newChatShown
    },
  },
})

export const { toggleNewChatComponent } = ChatSlice.actions

export default ChatSlice.reducer
