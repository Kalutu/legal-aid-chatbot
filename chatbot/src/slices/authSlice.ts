import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";
import toast from 'react-hot-toast'


type User = {
  email: string;
  password: string;
};

type NewUser = User & {
  firstname: string;
  lastname:string,
  email:string,
  password:string,
  phonenumber:string
  accounttype:string,
};

type UserBasicInfo = {
  id: string;
  name: string;
  email: string;
};

type UserProfileData = {
  name: string;
  email: string;
};

type AuthApiState = {
  basicUserInfo?: UserBasicInfo | null;
  userProfileData?: UserProfileData | null;
  status: "idle" | "loading" | "failed";
  error: string | null;
};

const initialState: AuthApiState = {
  basicUserInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  userProfileData: undefined,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk("login", async (data: User) => {
 
    const response = axiosInstance.post("/users/auth/login", data);

  
   toast.promise(response, {
      loading: 'Logging In',
      success: (data) => {
        if (data.status === 500) throw new Error('server error')
        localStorage.setItem("userInfo", JSON.stringify(data.data));
       setTimeout(() => {
         
          if(data.data.accounttype==="admin"){

       
          window.location.href = '/dashboard';
        }else{
          window.location.href = `/chat/${data.data.chatId}`;

        }
        }, 1500)
  
       
        return "Logged in Successfuly"
      },
      error: (e) => {
        return e?.response?.data?.message || "An error occurred at our end"
      }
    })
    // You might want to return the response here for further handling in your component


});

export const register = createAsyncThunk("register", async (data: NewUser) => {
  const response = axiosInstance.post(
    "/users/auth/register",
    data
    
  );
  toast.promise(response, {
    loading: 'Registering...',
    success: (data) => {
      if (data.status === 500) throw new Error('server error')
      
     setTimeout(() => {
       
        window.location.href = `/`;

      
      }, 1500)

     
      return "Registration Successful"
    },
    error: (e) => {
      return e?.response?.data?.message || "An error occurred at our end"
    }
  })

 
});

export const logout = createAsyncThunk("logout", async () => {

  localStorage.removeItem("userInfo");
  window.location.href = "/"


});



export const anonymousLogin = createAsyncThunk("anonymous", async () => {
  const response = axiosInstance.get("/users/auth/anonymous");
  toast.promise(response, {
    loading: 'Logging In',
    success: (data) => {
      if (data.status === 500) throw new Error('server error')
      localStorage.setItem("userInfo", JSON.stringify(data.data));
     setTimeout(() => {
       
        window.location.href = `/chat/${data.data.chatId}`;

      
      }, 1500)

     
      return "Logged in as Anonymous User"
    },
    error: (e) => {
      return e?.response?.data?.message || "An error occurred at our end"
    }
  })

});

export const getUser = createAsyncThunk(
  "users/profile",
  async (userId: string) => {
    const response = await axiosInstance.get(
      `/users/${userId}`
    );
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(login.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Login failed";
    })

    .addCase(anonymousLogin.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message || "Login failed";
    })
 
  
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Registration failed";
      })

      .addCase(logout.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "idle";
        state.basicUserInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Logout failed";
      })

      .addCase(getUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "idle";
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Get user profile data failed";
      });
  },
});

export default authSlice.reducer;