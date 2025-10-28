'use client';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import AlertModal from '@/components/modal/AlertModal';
import { resetPasswordFields } from '@/constant/formField';
import { postApiCall } from '@/service/apiService';
import { postRequest } from '@/service/apiFunction';
import Authlayout from '../layout/AuthLayout';
import { resetPasswordschema } from '@/validation/authSchema';
export default function ResetPassword() {
    const { token } = useParams();
    const [loading, setLoading] = useState(false);
    const onSubmit = async (data) => {
        try {
            setLoading(true);
            await postRequest(
                postApiCall?.authFlow?.resetPassword,
                { token, newPassword: data.confirmPassword },
                (resData) => {
                    AlertModal({
                        icon: 'success',
                        title: 'Reset Password',
                        text: resData?.message,
                        buttonText: 'Login',
                    })
                }
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Authlayout formFields={resetPasswordFields} schemas={resetPasswordschema} loading={loading} authVariant={"resetPassword"} backgroundImage={"/assets/authBackgroundImage/resetPassword.jpg"} onSubmit={onSubmit} heading={'Reset Your Password'} subHeading={''} submitButtonText={'Reset Password'} bottomLinkText={"Back to sign In"} />


    );
}

