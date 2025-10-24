import { createSlice } from '@reduxjs/toolkit';
import { AddReportService, getFilesService, deleteFileByIdService } from '@/service/reportService';
const initialState = {
  reports: {},
};

const reportSlice = createSlice({
  name: 'reportSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(AddReportService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.reports = [action.payload, ...state.reports];
        }
      })
      .addCase(getFilesService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.reports = action.payload
        }

      })
      .addCase(deleteFileByIdService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.reports = state.reports.filter(vital => vital?._id !== action?.payload);
        }
      });


    // .addCase(deleteVitalService.fulfilled, (state, action) => {
    //         if (action?.payload) {
    //           state.vitals = state.vitals.filter(vital => vital?._id !== action?.payload);
    //         }
    //       })
    //       .addCa

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




export const reportReducer = reportSlice.reducer;
