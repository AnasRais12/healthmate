import Authlayout from "../layout/AuthLayout";
import { useState } from "react";
import { LoginFields } from "@/constant/formField";
import { signInSchema } from "@/validation/authSchema";
import { ForgotPassword } from "./ForgetPassword";
import { useAppUtils } from "@/hooks/useAppUtils";
import { signInUser } from "@/service/authService";
import useFormHandler from "@/hooks/useFormHandler";
export const SignIn = () => {
  const { dispatch } = useAppUtils()
  const [forgetPasswordModal, setForgetPasswordModal] = useState(false)
  const { loading, handleSubmit, } = useFormHandler({
    apiFunction: ({ email, password, }) =>
      dispatch(signInUser({ email, password, })),
    successMessage: { title: 'Login Successful', text: 'Welcome back!', buttonText: 'Ok', navigate: 'dashboard' },
  });
  const onSubmit = async (data,) => {
    const { email, password, } = data
    handleSubmit({ email, password, })
  }

  if (forgetPasswordModal) {
    return <ForgotPassword setForgetPasswordModal={setForgetPasswordModal} />
  }
  return (
    <Authlayout formFields={LoginFields} schemas={signInSchema} loading={loading} authVariant={"signIn"} backgroundImage={"/assets/authBackgroundImage/Login.avif"} onSubmit={onSubmit} setForgetPasswordModal={setForgetPasswordModal} forgetPasswordModal={forgetPasswordModal} heading={'Welcome Back'} subHeading={'Its Great To See You Again'} submitButtonText={'Login'} />
  );
};

