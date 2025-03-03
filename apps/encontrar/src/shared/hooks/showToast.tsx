import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { CustomToast } from 'shared/components/CustomToast';
import { toastProps } from 'shared/components/Toast/ToastContainer';

export const showToast = ({ title, message }: { title: string; message: string }) => {
  toast.info(<CustomToast title={title} message={message} />, { ...toastProps });
};
