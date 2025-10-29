import { createAsyncThunk } from "@reduxjs/toolkit";
import { postRequest } from "./apiFunction";
import { postApiCall } from "./apiService";
import Cookies from "js-cookie";
import { getVitalsService } from "./vitalsService";
import { getFilesService } from "./reportService";
export const signUpUser = createAsyncThunk(
    "users/signUpUser",
    async ({ email, password, username },) => {
        let data;
        try {
            await postRequest(
                postApiCall?.authFlow?.signUp,
                { email, password, username },
                (resData) => {
                    data = { user: resData?.data }


                }

            );
            return data
        }
        catch (err) {
            throw new Error(err.message);
        }
    }
);


export const signInUser = createAsyncThunk(
    "users/signInUser",
    async ({ email, password, }, { dispatch }) => {
        let data;
        try {
            await postRequest(
                postApiCall?.authFlow.signIn,
                { email, password },
                (resData) => {
                    if (resData?.data?.user || resData?.data?.token) {
                        data = { user: resData?.data?.user, token: resData?.data?.token }
                        Cookies.set('role', resData?.data?.user?.role, { expires: 7 });

                        localStorage.setItem('token', resData?.data?.token);



                    }
                }

            );
            await dispatch(getVitalsService({ userId: data?.user?._id }))
            await dispatch(getFilesService({ userId: data?.user?._id }))
            return data
        }
        catch (err) {
            throw new Error(err?.message);
        }
    }
);

export const googleUser = createAsyncThunk(
    "users/googleUser",
    async ({ email,username,avatar }, { dispatch }) => {
        let data;
        try {
            await postRequest(
                postApiCall?.authFlow.googleLogin,
                { email,username,avatar },
                (resData) => {
                    if (resData?.data?.user || resData?.data?.token) {
                        data = { user: {...resData?.data?.user,provider:"google" }, token: resData?.data?.token,}
                        Cookies.set('role', resData?.data?.user?.role, { expires: 7 });
                        localStorage.setItem('token', resData?.data?.token);
                    }
                }

            );
        
            await dispatch(getVitalsService({ userId: data?.user?._id }))
            await dispatch(getFilesService({ userId: data?.user?._id }))
            return data
        }
        catch (err) {
            throw new Error(err?.message);
        }
    }
);


export const updateProfile = createAsyncThunk(
    "user/updateProfile",
    async ({ email, username, selectedImage,provider }) => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("username", username);
        if (selectedImage) {
            formData.append("avatar", selectedImage); // backend field name
        }
          if (provider) {
            formData.append("provider", provider); // backend field name
        }

        let payload;
        try {
            await postRequest(
                postApiCall?.authFlow.updateProfile,
                formData,
                (resData) => {
                    payload = resData?.data
                }
            );
            return payload

        }
        catch (err) {
            throw new Error(err.message);
        }
    }
);


export async function changePasswordService({ newPassword, password, }) {
    try {
        let data;
        await postRequest(
            postApiCall?.authFlow.changePassword,
            { newPassword, currentPassword: password },
            (resData) => {

                data = { data: true }

            }
        );
        return data

    }

    catch (error) {
        throw new Error(err.message);

    }



}
