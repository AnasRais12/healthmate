import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signUpUser, updateProfile ,googleUser} from '@/service/authService';

const initialState = {
  userdata: {},
  token: '',
};

const userSLice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    addUserData: (state, action) => {
      state.userdata = action.payload;
    },
    clearUserData: (state) => {
      state.userdata = {};
      state.token = null;
    },
    updateUserData: (state, action) => {
      state.userdata = { ...state.userdata, ...action.payload }; // For sign in or update
    },

    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //add to wishlist
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.userdata = action.payload?.user;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        if (action?.payload?.user) {
          state.userdata = action.payload.user;
          state.token = action.payload?.token
        }
        ;
      })
        .addCase(googleUser.fulfilled, (state, action) => {
        if (action?.payload?.user) {
          state.userdata = action.payload.user;
          state.token = action.payload?.token
        }
        ;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userdata = action.payload
      })
  }
});


export const { addUserData, clearUserData, setToken, updateUserData } =
  userSLice.actions;

export const userReducer = userSLice.reducer;