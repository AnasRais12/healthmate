'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  IconButton,
  Container,
  Paper,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { IoCheckmarkCircleOutline } from 'react-icons/io5';
// import { postApiCall } from '@/service/authServiice';
import { Email } from '@mui/icons-material';
import ValidatedTextField from '../common/ValidatedTextField';
import CSpinner from '../common/CSpinner';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import AlertModal from '../modal/AlertModal';
import { updateUserData } from '@/Store/Feature/UserSlice';
import { ForgetPasswordFields } from '@/constant/formField';
import { postRequest } from '@/service/apiFunction';
import { postApiCall } from '@/service/apiService';
import Authlayout from '../layout/AuthLayout';
import { forgetSchema } from '@/validation/authSchema';
export const ForgotPassword = ({ setForgetPasswordModal }) => {
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data, reset) => {
    setLoading(true);
    try {
      const { email } = data;
      await postRequest(postApiCall?.authFlow.forget, { email }, (resData) => {
        AlertModal({
          icon: 'success',
          title: 'Sent Code',
          text: resData?.message,
          buttonText: 'OK',
        }).then(() => {
          setForgetPasswordModal(false)
        });
      });
    } finally {
      setLoading(false);
      reset()
    }
  };

  return (

    <Authlayout formFields={ForgetPasswordFields} schemas={forgetSchema} loading={loading} authVariant={"forgetPassword"} backgroundImage={"/assests/authBackgroundImage/forgetPassword.jpg"} onSubmit={onSubmit} heading={'Forget Password'} subHeading={'We Provide A Link In Your email '} submitButtonText={'Send'} bottomLinkText={"Back to sign in"} setForgetPasswordModal={setForgetPasswordModal} />
  );
};

