import React, { useState } from 'react';
import {
    Box,
    Tabs,
    Tab,
    Button,
    Typography,
    useTheme,
    Divider,
    Stack,
} from '@mui/material';
import { Email, Lock, Person, Google } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import CSpinner from '../common/CSpinner';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import ValidatedTextField from '../common/ValidatedTextField';

import { postRequest } from '@/service/apiFunction';
import { postApiCall } from '@/service/apiService';
import AlertModal from '../modal/AlertModal';
import { ForgotPassword } from './ForgetPassword';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData, setToken } from '@/Store/Feature/UserSlice';

const ModernAuth = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [tab, setTab] = useState(0);
    const [forgetPasswordModal, setForgetPasswordModal] = useState(0);
    const [loading, setloading] = useState(false);
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Dynamic validation schema
    const schema = yup.object().shape({
        username:
            tab === 1
                ? yup.string().required('Full Name is required')
                : yup.string().notRequired(),
        email: yup
            .string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                'Password must contain at least one letter and one number'
            ),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { username: '', email: '', password: '' },
        mode: 'onChange',
    });

    const handleTabChange = (_, newValue) => {
        setTab(newValue);
        reset({ username: '', email: '', password: '' });
    };

    const onSubmit = async (data) => {
        try {
            setloading(true);
            if (tab === 0) {
                try {
                    const { email, password } = data;
                    await postRequest(
                        postApiCall?.authFlow.signIn,
                        { email, password },
                        (resData) => {
                            console.log(resData, 'resData os here ');

                            AlertModal({
                                icon: 'success',
                                title: 'Login Successful',
                                text: `${resData?.message}`,
                                buttonText: 'OK',
                            }).then(() => {
                                dispatch(addUserData(resData?.data?.user));
                                dispatch(setToken(resData?.data?.token));
                                Cookies.set('role', resData?.data?.user?.role);
                                router.push('/home');
                            });
                        }
                    );
                } finally {
                }
            } else {
                try {
                    const { email, password, username } = data;
                    await postRequest(
                        postApiCall?.authFlow?.signUp,
                        { email, password, username },
                        (resData) => {
                            console.log(resData, 'resdata is here ');

                            AlertModal({
                                icon: 'success',
                                title: 'Registration Successful',
                                text: `${resData?.message}. A verification code has been sent to your email.`,
                                buttonText: 'OK',
                            }).then(() => {
                                dispatch(addUserData(resData?.data));
                                router.push('/verification');
                            });
                        }
                    );
                } finally {
                }
            }
        } catch (error) {
            AlertModal({
                icon: 'error',
                title: `Request Failed!`,
                text: `${error?.message}`,
                buttonText: 'OK',
            });
        } finally {
            reset();
            setloading(false);
        }
    };

    if (forgetPasswordModal) {
        return (
            <ForgotPassword
                setForgetPasswordModal={setForgetPasswordModal}
                setTab={setTab}
            />
        );
    }
    console.log(tab, 'tba ish ere ');

    return (

        <Box
            sx={{
                p: { xs: 2, sm: 6 },
                width: '100%',
                bgcolor: theme.palette.background.paper,
                maxWidth: { xs: '100%', sm: 700 },
                borderRadius: 3,
                mx: 'auto',
                boxShadow: {
                    xs: 'none',
                    sm: '3px 4px 6px rgba(0, 0, 0, 0.1), 3px 1px 6px rgba(0, 0, 0, 0.20)',
                },
            }}
        >
            {/* StreamHub Brand Heading */}
            <Typography
                variant="h5"
                fontWeight="800"
                align="center"
                sx={{
                    mb: { xs: 3, sm: 4 },
                    fontSize: { xs: '24px', sm: '30px' },
                    color: theme.palette.primary.main,
                }}
            >
                StreamHub
            </Typography>

            {/* Tabs */}
            <Tabs
                value={tab}
                onChange={handleTabChange}
                variant="fullWidth"
                textColor="primary"
                indicatorColor="primary"
                sx={{
                    mb: { xs: 6, sm: 6 },
                }}
            >
                <Tab label="Sign In" />
                <Tab label="Sign Up" />
            </Tabs>

            {/* Form */}
            <Box
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                sx={{ mt: { xs: 2, sm: 3 } }}
            >
                <Stack spacing={{ xs: 4, sm: 4 }}>
                    {tab === 1 && (
                        <ValidatedTextField
                            label="Full Name"
                            name="username"
                            icon={<Person />}
                            register={register}
                            error={errors.username}
                            helperText={errors.username?.message}
                            isValid={isValid}
                        />
                    )}

                    <ValidatedTextField
                        label="Email"
                        name="email"
                        type="email"
                        icon={<Email />}
                        register={register}
                        error={errors.email}
                        helperText={errors.email?.message}
                        isValid={isValid}
                    />

                    <ValidatedTextField
                        label="Password"
                        name="password"
                        type="password"
                        icon={<Lock />}
                        register={register}
                        error={errors.password}
                        helperText={errors.password?.message}
                        isValid={isValid}
                    />
                </Stack>

                {/* Forgot Password - Only for Sign In */}
                {tab === 0 && (
                    <Box
                        onClick={() => setForgetPasswordModal(true)}
                        sx={{ textAlign: 'right', mt: { xs: 1, sm: 1 } }}
                    >
                        <Typography
                            onClick={() => setTab(tab === 0 ? 1 : 0)}
                            align="right"
                            sx={{ mt: 0, fontSize: { xs: 12, sm: 15 }, cursor: 'pointer' }}
                        >
                            Forget Password
                        </Typography>
                    </Box>
                )}

                {/* Submit Button */}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: { xs: 2, sm: 3 }, py: { xs: 1, sm: 1.5 } }}
                    disabled={!isValid}
                >
                    {loading ? <CSpinner /> : tab === 0 ? 'Sign In' : 'Sign Up'}
                </Button>

                {/* Divider & Google Button */}
                <Divider sx={{ my: { xs: 2, sm: 3 } }}>or</Divider>
                <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<Google />}
                    sx={{
                        textTransform: 'none',
                        fontWeight: 500,
                        // backgroundColor: isDark ? '#2a2a2a' : '#f9f9f9',
                        '&:hover': {
                            // backgroundColor: isDark ? '#3a3a3a' : '#efefef',
                        },
                        borderColor: isDark ? '#444' : '#ccc',
                        py: { xs: 1, sm: 1.5 },
                    }}
                >
                    Sign in with Google
                </Button>

                {/* Toggle Link */}
                <Typography
                    onClick={() => setTab(tab === 0 ? 1 : 0)}
                    align="left"
                    sx={{
                        mt: { xs: 2, sm: 3 },
                        fontSize: { xs: 13, sm: 15 },
                        cursor: 'pointer',
                    }}
                >
                    {tab === 0 ? "Don't have an account?" : 'Already have an account?'}
                </Typography>
            </Box>
        </Box>
    );
};

export default ModernAuth;
