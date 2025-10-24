
import * as yup from 'yup';
export const signUpSchema = yup.object().shape({
    username: yup.string().trim().required('Username is required'),
    email: yup.string()
        .trim()
        .lowercase()
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


export const signInSchema = yup.object().shape({
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

export const forgetSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email format')
        .required('Email is required'),
});


// Zod validation schema
export const otpSchema = yup.object().shape({
    otp: yup
        .string()
        .required('OTP is Required')
        .matches(/^\d{6}$/, 'OTP should be  6 digits'),
});

export const resetPasswordschema = yup.object().shape({
    password: yup.string().min(6).required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const formSchema = yup.object().shape({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    role: yup.string().required('Role is required'),
});

export const ChangePasswordSchema = yup.object().shape({
    password: yup.string().required('Current password is required'),
    newPassword: yup
        .string()
        .min(8, 'New password must be at least 8 characters')
        .required('New password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required'),
});

export const AddVitalsSchema = yup.object().shape({
    createdDate: yup.string(),
    bp: yup
        .string()
        .required('BP is required'),
    username: yup
        .string()
        .required('Username is required'),
    sugar: yup
        .number()
        .required('Sugar is required'),
    weight: yup
        .number()
        .required('Weight is required'),
    notes: yup
        .string()
});

export const AddReportSchema = yup.object().shape({
    createdDate: yup.string().required('Date Required'),
    type: yup
        .string()
        .required('Type is required — Make sure it matches the type mentioned in your uploaded file'),
    reportTitle: yup
        .string()
        .min(3, 'Report title is too short — it must match the title in your uploaded file, otherwise the upload will fail.')
        .required('Report title is required — it must match the title in your uploaded file, otherwise the upload will fail.')

});
