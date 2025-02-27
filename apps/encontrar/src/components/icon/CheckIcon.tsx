import { Check } from '@mui/icons-material';
import { StepIconProps } from '@mui/material/StepIcon';

export const CustomStepIcon = (props: StepIconProps) => {
  const { active, completed, className } = props;

  return (
    <div className={className}>
      {completed ? (
        <div
          style={{
            // width: 26,
            // height: 26,
            borderRadius: '50%',
            background: 'green',
            border: '2px solid green',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: active ? 'black' : 'green',
            padding: '5px',
          }}
        >
          {/* {props.icon} */}
          <Check style={{ color: 'white', fontSize: 20 }} />
        </div>
      ) : (
        <div
          style={{
            // width: 26,
            // height: 26,
            borderRadius: '50%',
            background: 'white',
            border: '2px solid gray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 'bold',
            color: active ? 'black' : 'green',
            padding: '5px',
          }}
        >
          {/* {props.icon} */}
          <Check style={{ color: '#CDCDCD', fontSize: 20 }} />
        </div>
      )}
    </div>
  );
};
