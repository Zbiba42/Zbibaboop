import { createSlice } from '@reduxjs/toolkit'
import { profile } from '../components/Profile/ProfileContent'

interface StateInterface {
  newChatShown: boolean
  Chats: Array<{ recipient: profile }>
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
      const recipient = action.payload.recipient
      const isRecipientExists = state.Chats.some(
        (chat) => chat.recipient._id === recipient._id
      )

      if (!isRecipientExists) {
        if (state.Chats.length < 3) {
          state.Chats = [...state.Chats, { recipient }]
        } else {
          state.Chats = [...state.Chats.slice(1), { recipient }]
        }
      }
    },
    removeChat: (state, action) => {
      const chatIndex = state.Chats.findIndex(
        (chat) => chat.recipient._id === action.payload
      )

      if (chatIndex !== -1) {
        state.Chats.splice(chatIndex, 1)
      }
    },
  },
})

export const { toggleNewChatComponent, AddChat, removeChat } = ChatSlice.actions

export default ChatSlice.reducer
