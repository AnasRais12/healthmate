import { useSelector } from 'react-redux';
export const usefetchUser = () =>
    useSelector((state) => state?.user?.userdata);
export const useReportData = () =>
    useSelector((state) => state?.report?.reports);
export const useVitalsData = () =>
    useSelector((state) => state?.vital?.vitals);
