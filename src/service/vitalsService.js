import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest, deleteRequest, putRequest } from "./apiFunction";
import { postApiCall, getApiCall, deleteApiCall, putApiCall } from "./apiService";

//ADD VITALS GET VITALS 

export const AddVitalsService = createAsyncThunk(
    "users/AddVitals",
    async (item,) => {
        let data;
        const { bp, createdDate, notes, sugar, weight, userId, username } = item
        try {
            await postRequest(
                postApiCall?.Vitals.add,
                { userId, bp, date: createdDate, notes, sugar, weight, username },
                (resData) => {

                    data = resData?.data

                }
            );
            return data

        }
        catch (err) {
            throw new Error(err.message);
        }
    }
);

export const getVitalsService = createAsyncThunk(
    "vitals/getVitalsService",
    async ({ userId }, { rejectWithValue }) => {
        try {
            let data;
            await getRequest(
                `${getApiCall?.Vitals?.getAllVitals}/${userId}`,
                (resData) => {
                    data = resData?.data;
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
export const deleteVitalService = createAsyncThunk(
    "vitals/deleteVitalService",
    async ({ id }, { rejectWithValue }) => {
        try {
            let data;
            await deleteRequest(
                `${deleteApiCall?.deleteVital.deleteVitalById}/${id}`,
                (resData) => {
                    data = resData?.data;
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);


export const updateVitalService = createAsyncThunk(
    "vitals/updateVitalService",
    async (payload, { rejectWithValue }) => {
        console.log(payload, "Updated Version")
        try {
            let data;
            await putRequest(
                `${putApiCall?.Vitals?.updateVital}/${payload?.vitalId}`,
                payload,
                (resData) => {
                    data = resData?.data;
                }
            );
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);
// export const  = createAsyncThunk(
//     "vitals/getVitalsService",
//     async ({ userId }, { rejectWithValue }) => {
//         try {
//             let data;
//             await getRequest(
//                 `${getApiCall?.Vitals?.getAllVitals}/${userId}`,
//                 (resData) => {
//                     data = resData?.data;
//                 }
//             );
//             return data;
//         } catch (err) {
//             return rejectWithValue(err.message);
//         }
//     }
// );




