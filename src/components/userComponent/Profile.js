'use client';
import React, { useEffect, useState } from 'react';
import { ProfileFormSchema } from '@/validation/FormSchema';
import { signOut, useSession} from "next-auth/react";
import { ProfileSettings } from '@/constant/formField';
import { Alert, Avatar, Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useAppUtils, useReactFormUtils, useReduxState } from '@/hooks/useAppUtils';
import { CameraAlt, } from '@mui/icons-material';
import ChangePassword from './ChangePassword';
import { updateProfile } from '@/service/authService';
import ValidatedTextField from '../common/ValidatedTextField';
import useFormHandler from '@/hooks/useFormHandler';
import AlertModal from '../modal/AlertModal';
import { SidebarWrapper } from '../layout/SidebarWrapper';
import Cookies from 'js-cookie';
import CSpinner from '../common/CSpinner';
export const ProfileSetting = () => {
    const session = useSession();
    const { dispatch, theme,router   } = useAppUtils()
    const { register, handleSubmit, control, errors, isValid, reset } = useReactFormUtils(ProfileFormSchema);
    const { loading, handleSubmit: handleForm, } = useFormHandler({
        apiFunction: ({ username, email, selectedImage }) => dispatch(updateProfile({ username, email, selectedImage,provider:userInfo?.provider })),
        successMessage: { title: 'User Update', text: 'User Updated Successfully', buttonText: 'Ok', },
        onSuccess: () => { setUserSettingState((prev) => ({ ...prev, isEditing: false })); },
    });
    const [UserSettingStates, setUserSettingState] = useState({
        isEditing: false,
        changepasswordModal: false,
    });
    const { userInfo } = useReduxState()
    const [selectedImage, setSelectedImage] = useState(userInfo?.avatar);
    const [preview, setPreview] = useState(userInfo?.avatar || "");

    const fieldsWithFixedValue = ProfileSettings.map((field) => {
        switch (field.name) {
            case "username":
                return UserSettingStates.isEditing
                    ? { ...field, defaultValue: userInfo?.username || "Not Set" }
                    : {
                        ...field, fixedValue: userInfo?.username || "Not Set"
                    };
            case "email":
                return UserSettingStates.isEditing
                    ? { ...field, ...(userInfo?.provider === "google" ? { fixedValue: userInfo?.email || "Not Set" } : { defaultValue: userInfo?.email || "Not Set" }) } :  {
                        ...field, fixedValue: userInfo?.email || "Not Set"
                    };
 

            default:
                return field;
        }
    })

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));

        }
    };

    const onSubmit = async (data) => {
        const { username, email } = data
        handleForm({ username, email, selectedImage });
        if (data?.username == userInfo?.username && data?.email == userInfo?.email && selectedImage == userInfo?.avatar) {
            await AlertModal({
                icon: 'info',
                title: 'No Changes Detected',
                text: 'You have not made any changes to update.',
                buttonText: 'Ok',
            })
            return;
        }
        else {
            handleForm({ ...data, userId: userInfo?.id, avatar: selectedImage });

        }
        if (selectedImage === userInfo?.avatar) {
            handleForm({ ...data, userId: userInfo?.id, });
        }
    };
const handleLogout = async () => {
  await signOut({ redirect: false }); // 👈 prevents auto redirect

  localStorage.removeItem("token");
  localStorage.removeItem("persist:root");
  Cookies.remove("role");

  await AlertModal({
    icon: 'success',
    title: 'Logged Out',
    text: 'You have been logged out successfully.',
    buttonText: 'Ok',
  });

  router.push('/signin');
};

    return (
        <SidebarWrapper headerText={'Profile'}>
            <Box
                display="flex"
                flexDirection="column"
                width="100%"
                alignItems="flex-start"

                sx={{
                    mt: 0,
                    bgcolor: theme.palette.background.paper,
                    borderRadius: 10,
                    color: theme.palette.text.primary,
                    p: { xs: 1, sm: 2 },
                    borderRadius: 3,
                    height: 'fit-content',

                }}
            >
                {UserSettingStates?.changepasswordModal && <ChangePassword setUserSettingState={setUserSettingState} />}


                <Box
                    component="main"
                    display="flex"
                    flexDirection="column"
                    width="100%"
                    alignItems="flex-start"
                >
                    {!UserSettingStates?.isEditing && (
                        <Box sx={{ pr: { xs: '0px', sm: '8px' }, mb: { xs: 2, sm: 0 }, py: '2px', display: 'flex', justifyContent: 'end', width: '100%' }}>
                            <Button onClick={() => setUserSettingState((prev) => ({ ...prev, isEditing: true }))} variant="contained" sx={{ py: 0.5 }} > Edit</Button>
                        </Box>

                    )}

                    <Box
                        display="flex"
                        flexDirection={{ xs: "column", sm: "column" }}
                        alignItems="center"
                        textAlign="center"
                        gap={2}
                        sx={{ width: "100%", pr: { sm: 6 } }}
                    >
                        {/* Avatar Section */}
                        <Box sx={{ position: "relative", width: 120, height: 120 }}>
                            <Avatar
                                src={preview}
                                alt="Profile Picture"
                                sx={{
                                    width: "100%",
                                    height: "100%",
                                    borderRadius: "50%",
                                    border: "3px solid #e0e0e0",
                                    transition: "0.3s",
                                }}
                            />

                            {/* Hidden Input for File */}
                            <input
                                accept="image/*"
                                type="file"
                                id="upload-image"
                                style={{ display: "none" }}
                                onChange={handleImageChange}
                            />

                            {/* Camera Icon Button */}
                            {UserSettingStates?.isEditing && (
                                <label htmlFor="upload-image">
                                    <IconButton
                                        component="span"
                                        sx={{
                                            position: "absolute",
                                            bottom: 5,
                                            right: 5,
                                            backgroundColor: "white",
                                            boxShadow: 2,
                                            "&:hover": { backgroundColor: "#f5f5f5" },
                                        }}
                                    >
                                        <CameraAlt fontSize="small" />
                                    </IconButton>
                                </label>
                            )}

                        </Box>

                        {/* Text Section */}
                        <Box>
                            <Typography variant="h5" fontWeight={600} color="text.primary">
                                My Profile
                            </Typography>
                            <Typography sx={{ mb: { xs: 3, sm: 0 } }} variant="body1" color="text.primary">
                                Update your profile picture and personal details.
                            </Typography>
                        </Box>
                    </Box>

                    <>
                        <Grid
                            container
                            spacing={2}
                            sx={{ pt: 2, mb: 2, display: "flex", flexDirection: "column", width: "100%" }}
                        >
                            <Box onSubmit={handleSubmit(onSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>
                                {fieldsWithFixedValue?.map((field, index) => (
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
                                                fixedValue={field.fixedValue}
                                                showEndAdornment={false}


                                            />


                                        </Box>
                                    </Grid>

                                ))}
                                {!UserSettingStates?.isEditing && (
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                        <label className="block text-lg lg:text-sm font-medium mb-3">
                                            Password
                                        </label>

                                        <TextField
                                            fullWidth
                                            size="small"
                                            value={"*********"}
                                        />
                                        <Button sx={{mt:2}}
        variant="contained"
        color="error"
        onClick={handleLogout}
      >
        Logout
      </Button>
                                    </Box>
                                )}

                                {UserSettingStates.isEditing && (
                                    <>
                                        <Button
                                            onClick={() =>
                                                setUserSettingState((prev) => ({ ...prev, changepasswordModal: true }))
                                            }
                                            sx={{
                                                mt: { xs: '2px', sm: '5px' },
                                                mb: { xs: 3, sm: 0 },
                                                px: 0,
                                                py: 0,
                                                minWidth: 0,
                                                bgcolor: 'transparent',
                                                width: 'fit-content',
                                                color: 'primary.main',
                                                textTransform: 'none',
                                                textDecoration: 'underline',
                                                '&:hover': {
                                                    bgcolor: 'transparent',
                                                    textDecoration: 'underline',
                                                },
                                            }}
                                        >
                                            Change Password
                                        </Button>
                                        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, justifyContent: "end", gap: 2 }}>
                                            <Button onClick={() => setUserSettingState((prev) => ({ ...prev, isEditing: false })) && reset()} type="submit" variant="contained" sx={{ mt: { xs: 0, sm: 3 }, py: 0.5, bgcolor: "red" }}>
                                                Cancel
                                            </Button>
                                            <Button type="submit" variant="contained" sx={{ py: 0.5, mt: { xs: 0, sm: 3 } }}>
                                                {loading ? <CSpinner /> : "Save Changes"}
                                            </Button>
                                        </Box>
                                    </>
                                )}
                            </Box>
                        </Grid>
                    </>

                </Box>
            </Box >
        </SidebarWrapper >
    );
};


