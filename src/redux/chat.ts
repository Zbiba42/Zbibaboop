import { createSlice } from '@reduxjs/toolkit'

interface StateInterface {
  newChatShown: boolean
  Chats: Array<HTMLDivElement>
}
const ChatSlice = createSlice({
  name: 'Chat',
  initialState: {
    newChatShown: false,
    Chats: [],
  } as StateInterface,
  reducers: {
    toggleNewChatComponent: (state) => {
      state.newChatShown = !state.newChatShown
    },
    AddChat: (state, action) => {
      if (state.Chats.length <= 3) {
        state.Chats = [...state.Chats, action.payload.chat]
      } else {
        state.Chats = [...state.Chats.slice(1), action.payload.chat]
      }
    },
  },
})

export const { toggleNewChatComponent } = ChatSlice.actions

export default ChatSlice.reducer
