import { createSlice } from '@reduxjs/toolkit';

const getUserFromLocalStorage = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const initialState = {
  user: getUserFromLocalStorage(),
};

export const authSlice = createSlice({
  
  name: 'auth',
  initialState: {
    user: getUserFromLocalStorage(),
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
    },
    signup: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, signup } = authSlice.actions;

export default authSlice.reducer;
