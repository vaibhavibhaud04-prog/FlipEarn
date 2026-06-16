import { createSlice } from '@reduxjs/toolkit';

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    listing: null,
    isOpen: false,
    chatId: null,
  },
  reducers: {
    // openChat: (state, action) => {
    //   state.isOpen = true;
    //   state.listing = action.payload.listing;
    //   state.chatId = action.payload.chatId;
    // },
    // closeChat: (state) => {
    //   state.isOpen = false;
    //   state.listing = null;
    //   state.chatId = null;
    // },
    setChat: (state, action) => {
      state.listing = action.payload.listing;
      state.isOpen = true;
      
      if(action.payload.chatId){
        state.chatId = action.payload.chatId;
      }
    },
    clearChat: (state) => {
      state.listing = null;
      state.isOpen = false;
      state.chatId = null;
  },
}
});

export const { setChat, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
