import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className='loading'>
      <div className='spinner-border text-primary' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
