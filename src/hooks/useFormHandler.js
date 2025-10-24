// hooks/useFormHandler.js
import { useState } from 'react';
import AlertModal from '@/components/modal/AlertModal';
import { useAppUtils } from './useAppUtils';
export default function useFormHandler({ apiFunction, onSuccess, successMessage, modalClose } = {}) {
    const [loading, setLoading] = useState(false);
    const { router } = useAppUtils()

    const handleSubmit = async (data, reset) => {
        try {
            setLoading(true);
            const res = await apiFunction(data);
            if (res?.error) throw new Error(res?.error?.message);
            if (res?.payload || res?.data) {
                let orderId = res?.payload?.orders?.order_id
                if (successMessage) {
                    await AlertModal({
                        icon: 'success',
                        title: successMessage.title,
                        text: orderId ? `${successMessage.text} Order ID: ${orderId}` : successMessage.text,
                        buttonText: successMessage.buttonText,
                    }).then(() => {
                        if (successMessage?.navigate) {
                            if (orderId) {
                                router.push(`/${successMessage?.navigate}/${orderId.slice(1)}`)
                            }
                            else {
                                router.push(`/${successMessage?.navigate}`)

                            }
                        }


                    });

                }
                if (onSuccess) {
                    const authResponse = { ...res, formFields: data }
                    onSuccess(authResponse);
                }

            }

        } catch (error) {
            console.log(error?.message, "message is here ")
            await AlertModal({
                icon: 'error',
                title: 'Something Went Wrong',
                text: error?.message,
                buttonText: 'Ok',
            });
            if (modalClose) modalClose(); // ✅ Call the functi

        } finally {
            setLoading(false);
            if (modalClose) modalClose(); 
            if(reset) reset()// ✅ Call the function
        }
    };

    return { loading, handleSubmit, setLoading, };
}
