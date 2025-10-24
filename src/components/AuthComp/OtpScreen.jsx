'use client';
import React, { useEffect, useState } from 'react';
import { calculateRemainingSeconds } from '@/utils/Common';
import { postApiCall } from '@/service/apiService';
import { postRequest } from '@/service/apiFunction';
import { OtpFields } from '@/constant/formField';
import AlertModal from '../modal/AlertModal';
import Authlayout from '../layout/AuthLayout';
import { otpSchema } from '@/validation/authSchema';
import { useReduxState } from '@/hooks/useAppUtils';

const OtpScreen = () => {
  const { userInfo } = useReduxState()
  const [loading, setLoading] = useState(false)
  const [otpControls, setOtpControls] = useState({
    timer: calculateRemainingSeconds(userInfo?.expiresAt),
    isResendDisabled: false,
    verificationLoading: false,
    isResendLoading: false,
  });


  useEffect(() => {
    if (userInfo?.expiresAt) {
      const remainingTime = calculateRemainingSeconds(userInfo?.expiresAt);
      setOtpControls((prev) => ({
        ...prev,
        timer: remainingTime,
        isResendDisabled: remainingTime > 0,
      }));
    }
  }, [userInfo?.expiresAt]);

  useEffect(() => {
    let interval;
    if (otpControls.timer > 0) {
      interval = setInterval(() => {
        setOtpControls((prev) => ({
          ...prev,
          timer: prev.timer - 1,
        }));
      }, 1000);
    } else {
      setOtpControls((prev) => ({
        ...prev,
        isResendDisabled: false,
      }));
    }
    return () => clearInterval(interval);
  }, [otpControls.timer]);

  const onSubmit = async ({ otp }) => {
    try {
      setLoading(true)
      setOtpControls((prev) => ({ ...prev, verificationLoading: true }));

      await postRequest(
        postApiCall?.authFlow?.verification,
        { email: userInfo.email, code: otp },
        (resData) => {
          AlertModal({
            icon: 'success',
            title: 'Verified Successfully',
            text: resData?.message,
            buttonText: 'Login',
          });
        }
      );
    } finally {
      setLoading(false);
      setOtpControls((prev) => ({ ...prev, verificationLoading: false }));
    }
  };

  const handleResend = async () => {
    try {
      setOtpControls((prev) => ({ ...prev, isResendLoading: true }));

      await postRequest(
        postApiCall?.authFlow?.resend,
        { email: userInfo?.email },
        (resData) => {
          AlertModal({
            icon: 'success',
            title: 'Code Sent Again',
            text: resData?.message,
            buttonText: 'OK',
          }).then(() => {
            const newTimer = calculateRemainingSeconds(
              resData?.data?.expiresAt
            );
            setOtpControls((prev) => ({
              ...prev,
              timer: newTimer,
              isResendDisabled: true, // optional: disable button until timer ends
            }));
          });
        }
      );
    } finally {
      setOtpControls((prev) => ({ ...prev, isResendLoading: false }));
    }
  };

  return (
    <Authlayout formFields={OtpFields} schemas={otpSchema} loading={loading} authVariant={"verification"} backgroundImage={"/assests/authBackgroundImage/Otpscreen.jpg"} onSubmit={onSubmit} heading={'OTP Verifiaction'} subHeading={"Enter the 6-digit code send to your email"} submitButtonText={'Verify OTP '} handleResend={handleResend} isResendDisabled={otpControls.isResendDisabled} isResendTimer={otpControls?.timer} isResendLoading={otpControls?.isResendLoading} bottomLinkText={"Back to sign In "} />

  );
};

export default OtpScreen;
