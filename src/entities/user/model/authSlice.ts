import { createSlice } from '@reduxjs/toolkit';
interface AuthState {
  isAuth: boolean;
}
const initialState: AuthState = {
  isAuth: localStorage.getItem('isAuth') === 'true',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    loginSuccess: (state) => {
      state.isAuth = true;
      localStorage.setItem('isAuth', 'true');
    },

    logoutSuccess: (state) => {
      state.isAuth = false;
      localStorage.removeItem('isAuth');
    },
  },
});

export const { loginSuccess, logoutSuccess } = authSlice.actions;

export default authSlice.reducer;
