import { createSlice } from '@reduxjs/toolkit';
import { signInUser, signUpUser, updateProfile } from '@/service/authService';

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
        console.log(action, "action is here ")
        if (action?.payload?.user) {
          state.userdata = action.payload.user;
          state.token = action.payload?.token
        }
        ;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.userdata = action.payload
      })
    // .addCase(updateProfile.fulfilled, (state, action) => {
    //   state.users = { ...state.users, phone_number: action.payload?.phone_number, profileAvatar: action.payload?.avatar_url, } //profieName: action.payload?.name, };
    // })
    //       .addCase(updateProfileAddress.fulfilled, (state, action) => {
    // state.users = { ...state.users, phone: action.payload }
    //       })
    // .addCase(SellerAddress.fulfilled, (state, action) => {
    //   state.users = { ...state.users, sellerAddress: action.payload }
    // })
    // .addCase(updateSellerAddress.fulfilled, (state, action) => {
    //   state.users = { ...state.users, sellerAddress: action.payload }
    // })
    //       .addCase(removeProfileAddress.fulfilled, (state, action) => {
    //         if (state.users?.userAddress) {
    //           delete state.users.userAddress;
    //         }
    //       })
    //        .addCase(authLogoutUser.fulfilled, (state, action) => {
    //         state.users = {};
    //       })
  }
});


export const { addUserData, clearUserData, setToken, updateUserData } =
  userSLice.actions;

export const userReducer = userSLice.reducer;