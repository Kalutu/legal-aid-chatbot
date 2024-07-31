import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import messageReducer from "./slices/messagesSlice";
import statsReducer from "./slices/statsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    message: messageReducer,
    report:statsReducer ,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;