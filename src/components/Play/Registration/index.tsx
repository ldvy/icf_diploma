import React, { FC } from 'react';
import './registration.css';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { registrationThunk } from '../../../redux/user/loginThunk';

type RegistrationPropsType = {
  show: boolean;
};

const Registration: FC<RegistrationPropsType> = ({ show }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!show) {
    return null;
  }

  return (
    <>
      <div className='registration-container'>
        <div className='registration-content'>
          <div style={{ fontSize: '150%' }}>Join us now!</div>
          <button
            style={{
              marginTop: '2%',
              marginBottom: '2%',
              border: 'none',
              outline: 'none',
            }}
            className='login-button'
            onClick={() => dispatch(registrationThunk())}
          >
            <img
              src={require('../../../assets/img-landing/register-button.png')}
              alt='Register button'
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default Registration;
