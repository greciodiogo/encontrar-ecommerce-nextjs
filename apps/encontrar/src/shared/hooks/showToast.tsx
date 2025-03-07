import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { CustomToast } from 'shared/components/CustomToast';
import { toastProps } from 'shared/components/Toast/ToastContainer';

export const showToast = ({
  title,
  message,
  isSuccessType = false,
}: {
  title: string;
  message: string;
  isSuccessType?: boolean;
}) => {
  isSuccessType
    ? toast.success(<CustomToast title={title} message={message} isSuccessType={isSuccessType} />, { ...toastProps })
    : toast.info(<CustomToast title={title} message={message} isSuccessType={isSuccessType} />, { ...toastProps });
};
