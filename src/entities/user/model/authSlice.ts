import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// interface RegisterPayload {
//   type: 'fiz' | 'yur';
//   role: 'seller' | 'buyer';
//   phone: string;
//   email: string;
//   inn: string;
// }

interface LoginPayload {
  login_contact: string;
  password: string;
}

interface AuthState {
  isAuth: boolean;
  loading: boolean;
  error: string | null;
}


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', credentials);
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('isAuth', 'true');
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации');
    }
  }
);




export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/auth/register', userData);
      
      if (response.data.accessToken) {
        localStorage.setItem('token', response.data.accessToken);
        localStorage.setItem('isAuth', 'true');
      }
      
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Ошибка при регистрации');
    }
  }
);

const initialState: AuthState = {
  isAuth: localStorage.getItem('isAuth') === 'true',
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      state.isAuth = false;
      state.error = null;
      localStorage.removeItem('isAuth');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuth = true; 
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
