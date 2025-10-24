import * as yup from 'yup';
export const ProfileFormSchema = yup.object().shape({
    username: yup.string().required('Full name is required'),
    email: yup.string()
        .trim()
        .lowercase()
        .email('Invalid email format')
        .required('Email is required'),
});
export const BusinessVerificationSchema = yup.object().shape({
    business_name: yup
        .string()
        .required("Business name is required"),

    business_type: yup
        .string()
        .required("Business type is required"),

    business_email: yup
        .string()
        .trim()
        .lowercase()
        .email("Invalid email format")
        .required("Business email is required"),

    business_phone: yup
        .string()
        .matches(/^[0-9]{10,15}$/, "Enter a valid phone number")
        .required("Business phone is required"),

    address: yup
        .string()
        .required("Address is required"),

    city: yup
        .string()
        .required("City is required"),

    country: yup
        .string()
        .required("Country is required"),

    website: yup
        .string()
        .url("Enter a valid URL")
        .notRequired(), // 👈 website optional hai


    license_doc: yup
        .string()
        .required("License document is required"),

    bank_name: yup
        .string()
        .required("Bank name is required"),

    account_title: yup
        .string()
        .required("Account title is required"),

    account_number: yup
        .string()
        .required("Account number is required"),
});
