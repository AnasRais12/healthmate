'use client';
import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Typography,
    TextField,
    useTheme,
    Link as MuiLink,
    Paper,
    useMediaQuery,
} from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import ValidatedTextField from '../common/ValidatedTextField';
import CSpinner from '../common/CSpinner';
import { useRouter } from 'next/navigation';
function Authlayout({ formFields = [], schemas, loading, authVariant, backgroundImage, onSubmit, ...props

}) {
    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.only('xs'));
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        control,
        watch,
        reset
    } = useForm({
        resolver: yupResolver(schemas),
        mode: 'onChange'
    });


    const handleFormSubmit = (data) => {
        try {
            onSubmit(data, reset)
        } catch (error) {
            console.log(error, "error is here")

        }
        finally {
            reset();
        }
    }

    const handleBottomLinkRedirect = () => {
        if (authVariant === "forgetPassword") {
            props.setForgetPasswordModal(false)
        }
        else {
            router.push('/signin')

        }
    }

    return (
        <Box display="flex" width="100%" sx={{ height: { lg: "100vh", xs: "fit" } }} >
            {/* Left Image Section */}
            <Box
                sx={{
                    display: { xs: 'none', lg: 'flex' },
                    width: '50%',
                    height: '100%',
                    position: 'relative',
                    borderRight: `2px solid ${theme.palette.divider}`,
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        // backgroundImage: theme?.palette.mode === 'dark' ? `url(${backgroundImage.dark})` : `url(${backgroundImage.light})`,
                        backgroundImage: `url(${backgroundImage})`,

                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        zIndex: 1,
                    }}
                />

                <Box
                    position="absolute"
                    zIndex={2}
                    width="100%"
                    height="100%"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    p={4}
                >
                </Box>
            </Box>

            {/* Right Form Section */}
            {/* <Box
                width={{ xs: '100%', lg: '50%', }}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', lg: 'center' },
                    px: { xs: 0, sm: 6, md: 8, lg: 0 },
                    py: 6,
                    pt: { xs: '0px', lg: '300px' },
                    overflowY: { xs: 'auto', lg: 'auto' },
                    maxHeight: { lg: '100vh' },
                    minHeight: { lg: '100vh' },
                }}
            > */}
               <Box
                width={{ xs: '100%', lg: '50%', }}

                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    px: { xs: 0, sm: 6, md: 8, lg: 0 },
                    py: { xs: 0, sm: 6 },
                    overflowY: { xs: 'auto', lg: 'auto' },
                    height: { xs: 'auto', lg: '100vh' },
                }}
            >
                <Paper
                    elevation={isXs ? 0 : 3}
                    sx={{
                        p: { xs: 2, sm: 5 },
                        bgcolor: {
                            xs: theme.palette.background.default,
                            sm: theme.palette.background.default,
                        },
                        width: { xs: '100%', md: '70%', lg: '80%' },
                    }}
                >
                    <Box textAlign="center" mb={4}>
                        {/* <Box
                            sx={{
                                width: 64,
                                height: 64,
                                backgroundColor: theme.palette.primary.main,
                                borderRadius: 2,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                mb: 2,
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                width={32}
                                height={32}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>
                        </Box> */}
                        <Typography variant="h4" fontWeight="bold" color="primary">
                            {props.heading}
                        </Typography>
                        <Typography variant="body1" color="black">
                            {props.subHeading}
                        </Typography>
                    </Box>

                    <Box onSubmit={handleSubmit(handleFormSubmit)} component="form" noValidate autoComplete="off" display="flex" flexDirection="column" gap={2}>

                        {formFields.map((field, index) => (
                            <ValidatedTextField
                                key={index}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                icon={field.icon}
                                register={register}
                                control={control}
                                errors={errors}
                                helperText={errors[field.name]?.message}
                            />
                        ))}
                        {/* <ValidatedTextField
                            key={index}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            register={register}
                            errors={errors}
                            isValid={isValid}
                            control={control}
                        /> */}

                        {authVariant === "signIn" && (
                            <MuiLink sx={{ cursor: 'pointer' }} onClick={() => props.setForgetPasswordModal(true)} underline="hover" color="primary">
                                Forget your password
                            </MuiLink>
                        )}

                        <Button disabled={!isValid} type="submit" variant="contained" size="large">
                            {loading ? <CSpinner /> : props.submitButtonText}
                        </Button>


                        {authVariant === "verification" && (
                            <Button
                                onClick={props?.handleResend}
                                disabled={props?.isResendDisabled}
                                variant="contained"

                            >
                                {props?.isResendDisabled ? (
                                    `Resend OTP in 0:${props?.isResendTimer.toString().padStart(2, '0')}`
                                ) : props?.isResendLoading ? (
                                    <CSpinner />
                                ) : (
                                    'Resend OTP'
                                )}
                            </Button>
                        )}



                        {(authVariant !== "signIn" && authVariant !== "signUp") && (
                            <MuiLink sx={{ cursor: "pointer" }} onClick={handleBottomLinkRedirect} underline="hover" color="primary">
                                {props.bottomLinkText || ""}
                            </MuiLink>
                        )}

                    </Box>
                    {(authVariant === "signIn" || authVariant === "signUp") && (
                        <>
                            <Divider sx={{ my: 4 }}>Or</Divider>

                            <Button
                                variant="outlined"
                                startIcon={<FcGoogle size={22} />}
                                fullWidth
                                sx={{ textTransform: 'none', borderColor: theme.palette.divider }}
                            >
                                Continue with Google
                            </Button>
                        </>
                    )
                    }


                    {(authVariant === "signIn" || authVariant === "signUp") && (
                        <Box textAlign="center" mt={4}>
                            <Typography color="text.primary">
                                {authVariant === "signIn"
                                    ? "Don't have an account?"
                                    : "Already have an account?"}
                                <MuiLink
                                    href={authVariant === "signIn" ? "/signup" : "/signin"}
                                    underline="hover"
                                    color="primary"
                                    fontWeight="medium"
                                    ml="6px"
                                >
                                    {authVariant === "signIn" ? "Join" : "Login"}
                                </MuiLink>
                            </Typography>
                        </Box>
                    )}

                </Paper>
            </Box>
        </Box >
    );
}

export default Authlayout;
