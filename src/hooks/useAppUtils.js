'use client';
import { useTheme, useMediaQuery } from '@mui/material';
import { useDispatch, } from 'react-redux';
import { useRouter } from 'next/navigation';
import { usefetchUser, useReportData, useVitalsData } from '@/Store/selector';
// import { usefetchUser, useIpInfo } from '@/store/selector';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export const useBreakpoints = () => {
    const theme = useTheme();
    return {
        isMobileS: useMediaQuery(theme.breakpoints.only('mobileS')),
        isXs: useMediaQuery(theme.breakpoints.only('xs')),
        isSm: useMediaQuery(theme.breakpoints.only('sm')),
        isMd: useMediaQuery(theme.breakpoints.only('md')),
        isLg: useMediaQuery(theme.breakpoints.only('lg')),
        isXl: useMediaQuery(theme.breakpoints.only('xl')),
        isMdUp: useMediaQuery(theme.breakpoints.up("md")),
    };
};



export const useAppUtils = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const router = useRouter();
    return { dispatch, router, theme, };
};



export const useReduxState = () => {
    const userInfo = usefetchUser();
    const reportData = useReportData();
    const vitalData = useVitalsData()
    return { userInfo, reportData, vitalData };
};



export const useReactFormUtils = (schema) => {
    const form = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    return {
        ...form,
        register: form.register,
        handleSubmit: form.handleSubmit,
        control: form.control,
        errors: form.formState.errors,
        isValid: form.formState.isValid,
        reset: form.reset,
    };
};

// export const usePrice = (price) => {
//     const ipDetails = useIpinfo()
//     const formattedPrice = useMemo(() => {
//         if (!price || !ipDetails) return '';
//         const converted = (price * ipDetails.rate).toFixed(1);
//         return `${ipDetails.symbol} ${new Intl.NumberFormat('en-IN').format(converted)}`;
//     }, [price, ipDetails]);

//     return formattedPrice;
// };