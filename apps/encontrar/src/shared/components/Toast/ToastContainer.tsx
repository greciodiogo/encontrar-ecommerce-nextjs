import React from 'react';
import { ToastContainer as ReactToastContainer } from 'react-toastify';

export const ToastContainer: React.FC = () => {
  return (
    <ReactToastContainer
      position="bottom-center"
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
