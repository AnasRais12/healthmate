import { createSlice } from '@reduxjs/toolkit';
import { getVitalsService, AddVitalsService, deleteVitalService, updateVitalService } from '@/service/vitalsService';

const initialState = {
  vitals: {},
};

const vitalSlice = createSlice({
  name: 'vitalSlice',
  initialState,
  extraReducers: (builder) => {
    builder
      //add to wishlist
      .addCase(getVitalsService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.vitals = action.payload
        }
      })
      .addCase(AddVitalsService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.vitals = [action.payload, ...state.vitals];

        }
      })
      .addCase(deleteVitalService.fulfilled, (state, action) => {
        if (action?.payload) {
          state.vitals = state.vitals.filter(vital => vital?._id !== action?.payload);
        }
      })
      .addCase(updateVitalService.fulfilled, (state, action) => {
        if (action?.payload?._id) {
          state.vitals = state?.vitals?.map((vital) => vital._id === action.payload._id ? action.payload : vital);
        }
      });
  }
});




export const vitalReducer = vitalSlice.reducer;
