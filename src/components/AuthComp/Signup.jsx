import React from 'react'
import Authlayout from '../layout/AuthLayout';
import { SignUpFields } from '@/constant/formField';
import useFormHandler from '@/hooks/useFormHandler';
import { signUpUser } from '@/service/authService';
import { signUpSchema } from '@/validation/authSchema';
import { useAppUtils } from '@/hooks/useAppUtils';

export const Signup = () => {
    const { dispatch } = useAppUtils()
    const { loading, handleSubmit, } = useFormHandler({
        apiFunction: ({ email, password, username }) =>
            dispatch(signUpUser({ email, password, username })),
        successMessage: {
            title: 'Verification Email Sent',
            text: 'Please check your email.',
            buttonText: 'Ok',
            navigate: 'signin'
        },
    });

    const onSubmit = async (data,) => {
        const { email, password, username } = data
        handleSubmit({ email, password, username })
    }
    return (
        <Authlayout formFields={SignUpFields} schemas={signUpSchema} loading={loading} authVariant={"signUp"} backgroundImage={"/assests/authBackgroundImage/Login.avif"} onSubmit={onSubmit} heading={'Create an account'} subHeading={"Let's create your account."} submitButtonText={'Create Account'} />


    )
}

export default Signup