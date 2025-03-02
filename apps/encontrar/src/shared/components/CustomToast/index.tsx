import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import 'react-toastify/dist/ReactToastify.css';

export const CustomToast = ({ title, message }: { title: string; message: string }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        background: '#fff',
        padding: '12px',
        borderRadius: '4px',
        borderLeft: '4px solid #F4B342',
        boxShadow: '0px 2px 10px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
        {/* <FaInfoCircle color="#F4B342" style={{ marginRight: '8px' }} /> */}
        <strong style={{ color: '#8C5700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <ErrorOutlineOutlinedIcon />
          {title}
        </strong>
      </div>
      <p style={{ margin: 0, color: '#333', fontSize: '14px', width: '320px' }}>{message}</p>
    </div>
  );
};
