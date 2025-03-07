import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import 'react-toastify/dist/ReactToastify.css';

export const CustomToast = ({
  title,
  message,
  isSuccessType,
}: {
  title: string;
  message: string;
  isSuccessType?: boolean;
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: '#fff',
        padding: '12px',
        borderRadius: '4px',
        borderLeft: `4px solid ${isSuccessType ? 'green' : '#F4B342'}`,
        boxShadow: '0px 2px 10px rgba(157, 131, 131, 0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        {/* <FaInfoCircle color="#F4B342" style={{ marginRight: '8px' }} /> */}
        <strong
          style={{ color: isSuccessType ? 'green' : '#8C5700', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          {isSuccessType ? <CheckCircleOutlineIcon /> : <ErrorOutlineOutlinedIcon />}
          {title}
        </strong>
      </div>
      <p style={{ margin: 0, color: '#333', fontSize: '14px', width: '320px' }}>{message}</p>
    </div>
  );
};
