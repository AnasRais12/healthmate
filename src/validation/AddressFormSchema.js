import * as yup from 'yup';
export const addressForm = yup.object().shape({
    full_name: yup.string().required('Full name is required'),
    phone_number: yup.string().min(10, 'Enter a valid phone number').required(),
    city: yup.string().required('City is required'),
    country: yup.string().required('City is required'),
    area: yup.string(),
    address: yup.string().required('Address is required'),
    zip_code: yup.string().matches(/^\d+$/, 'Zip code must be numeric').required(),
});
