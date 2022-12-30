import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  firstData: [],
  codeAction : 0,
};

const ChatBotSlice = createSlice({
  name: 'ChatBot',
  initialState,
  reducers: {
    addData: (state, data) => {
      if (state.firstData.length===0 || state.firstData.at(-1).code !== data.payload.code){
        state.firstData.push(data.payload);
        state.codeAction = data.payload.codeAction
        setTimeout(()=>{
          document.getElementById('mainGrandProfChatBox').scrollTo({
            top : document.getElementById('mainGrandProfChatBox').scrollHeight + 1000,
            left : 0,
            behavior : 'smooth'
          })
        },300)
      }
    },
    clear: state => {
      state.firstData = [];
    },
  },
});
const ChatBotReducer = ChatBotSlice.reducer;
export default ChatBotReducer;
export const ChatBotActions = ChatBotSlice.actions;
