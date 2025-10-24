import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  timeLine: [],
};

const timeLineSlice = createSlice({
  name: 'timeLineSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      //add to wishlist
    //   .addCase(signUpUser.fulfilled, (state, action) => {
    //     state.userdata = action.payload?.user;
    //   })
    //   .addCase(signInUser.fulfilled, (state, action) => {
    //     console.log(action.payload, "payload is here ");
    //     state.userdata = action.payload.user;
    //     state.token = action.payload?.token;
    //   })
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




export const reportReducer = timeLineSlice.reducer;
