import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";


type Messages = Array<{

    sender: string;
    message: string;
}>;



type Message =  {

  message: string;
  sender: string;
  chatId: string;
};

type MessagesApiState = {
  messages: Message[];
  message: Message | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: MessagesApiState = {
  messages: [],
  message: null,
  status: "idle",
  error: null,
};



type Data = {
    url: string;

}

  export const getMessages = createAsyncThunk("messages", async (data:Data) => {
        const storedUserInfo = localStorage.getItem("userInfo")
    const token = storedUserInfo ? JSON.parse(storedUserInfo).data : null;
    axiosInstance.defaults.headers["x-auth-token"] = token
   
    const response = await axiosInstance.get(
      `/chat/messages/${data.url}`
    
    );
    
    const resData = response.data.data;
   

    return resData;
  });
  export const sendMessage = createAsyncThunk("sendMessage", async (data:Message) => {
    const storedUserInfo = localStorage.getItem("userInfo");

const token = storedUserInfo ? JSON.parse(storedUserInfo).data : null;
    axiosInstance.defaults.headers["x-auth-token"] = token
    const response = await axiosInstance.post(
      "/chat/send",
  
      data
      
    );
    const resData = response.data.data;
  

    return resData;
  });
  
 
  
  const messagesSlice = createSlice({
    name: "message",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
      .addCase(getMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Getting Messages failed";
      })
        .addCase(getMessages.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(
          getMessages.fulfilled,
    (state, action: PayloadAction<Message[]>) => {
        state.status = "idle";
        state.messages.push(...action.payload); // Using spread operator to push all messages from payload
    }
)
    .addCase(sendMessage.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Send Failed";
    })
      .addCase(sendMessage.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        sendMessage.fulfilled,
        (state, action:PayloadAction<Message>) => {
          state.status = "idle";
        
          state.message= action.payload
    
        }
      )
    }
  }
  )

export default messagesSlice.reducer;
  