'use client';
import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import ValidatedTextField from '@/components/common/ValidatedTextField';
import useFormHandler from '@/hooks/useFormHandler';
import { ChangePasswordField } from '@/constant/formField';
import { changePasswordService } from '@/service/authService';
import { useReactFormUtils, useReduxState } from '@/hooks/useAppUtils';
import CSpinner from '../common/CSpinner';
import { ChangePasswordSchema } from '@/validation/authSchema';
import { Box, Grid } from '@mui/material';

function ChangePassword({ setUserSettingState }) {
    const { register, handleSubmit, control, errors, isValid, } = useReactFormUtils(ChangePasswordSchema);
    const { loading, handleSubmit: handleForm } = useFormHandler({
        apiFunction: (data) => changePasswordService(data),
        successMessage: {
            title: 'Changed!',
            text: 'Password Changed successfully',
            buttonText: 'Ok'
        },
        modalClose: () => setUserSettingState(prev => ({ ...prev, changepasswordModal: false, isEditing: false }))

    });
    const onSubmit = (data) => {
        const { password, newPassword, } = data;
        handleForm({ password, newPassword, })
    }
    return (
        <>
            <div
                className="fixed inset-0 z-[999] bg-opacity-400 bg-[#0e0c0cd7] flex items-center justify-center overflow-hidden"
            >
                <div className="max-w-md w-[90%] p-6 bg-white shadow-lg rounded-lg">
                    <div className="flex justify-between px-2">
                        <h2 className="text-xl font-bold mb-4">Change Password</h2>
                        <button
                            onClick={() => setUserSettingState(prev => ({ ...prev, changepasswordModal: false }))}
                            className="text-xl font-bold mb-4 hover:text-[red]"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {ChangePasswordField?.map((field, index) => (
                            <Grid item xs={12} md={12} lg={12} key={index} sx={{ mb: 1 }}>
                                <Box sx={{ display: "flex", flexDirection: "column", width: "100%", }}>
                                    <ValidatedTextField
                                        key={index}
                                        name={field.name}
                                        label={field.label}
                                        type={field.type}
                                        register={register}
                                        errors={errors}
                                        isValid={isValid}
                                        control={control}
                                        showEndAdornment={true}


                                    />


                                </Box>
                            </Grid>

                        ))}
                        <button
                            type="submit"
                            className="w-full px-3 py-2 bg-primary text-white rounded"
                            disabled={loading}
                        >
                            {loading ? <CSpinner /> : 'Change Password'}
                        </button>
                    </form>
                </div>
            </div >
        </>
    );
}

export default ChangePassword;
