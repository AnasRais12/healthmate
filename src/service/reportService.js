import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest, getRequest, deleteRequest } from "./apiFunction";
import { postApiCall, getApiCall, deleteApiCall } from "./apiService";

export const AddReportService = createAsyncThunk(
    "users/AddReport",
    async (item,) => {
        let typeInfo = item?.type ? JSON.parse(item?.type) : item?.type
        const { file, date, reportTitle, userId } = item
        let data
        try {
            await postRequest(
                postApiCall?.Reports.add,
                { userId, file, date, type: typeInfo?.name, reportTitle, file },
                (resData) => {

                    data = resData?.data;

                }
            );
            return data

        }
        catch (err) {
            throw new Error(err.message);
        }
    }
);
export const getFilesService = createAsyncThunk(
    "files/getFilesService",
    async ({ userId }, { rejectWithValue }) => {
        try {
            let data;
            await getRequest(
                `${getApiCall?.Files?.getAll}/${userId}`,
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

export const deleteFileByIdService = createAsyncThunk(
    "files/deleteFileByIdService",
    async (payload, { rejectWithValue }) => {
        console.log("Deleting file with ID:", payload?.id);
        try {
            let data;
            await deleteRequest(
                `${deleteApiCall?.Reports.deleteFileById}/${payload?.id}`,
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

// export const GETrP = createAsyncThunk(
//     "files/getFilesService",
//     async ({ userId }, { rejectWithValue }) => {
//         try {
//             let data;
//             await getRequest(
//                 `${getApiCall?.Files?.getAll}/${payload?.id}`,
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