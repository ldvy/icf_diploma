import React from 'react';
import { Toast } from 'react-bootstrap';
import './message.css';

import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { setIsNewMessage } from '../../../redux/user/userSlice';

const Message = () => {
  const dispatch = useDispatch<AppDispatch>();
  const messageContent = useSelector(
    (state: RootState) => state.user.messageContent
  );

  return (
    <Toast
      style={{
        position: 'absolute',
        top: 60,
        right: 20,
      }}
      onClose={() =>
        dispatch(setIsNewMessage({ isNewMessage: false, messageContent: '' }))
      }
      autohide
      delay={5000}
    >
      <Toast.Header>
        <div className='toaster-header'> Update Notification </div>
      </Toast.Header>
      <Toast.Body className='body-text'>{messageContent}</Toast.Body>
    </Toast>
  );
};

export default Message;
