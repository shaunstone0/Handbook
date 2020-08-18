import React from 'react';
import { Spinner } from 'react-bootstrap';

const SpinnerScreen = () => {
  return (
    <div>
      <div className='spinner d-flex justify-content-center align-items-center'>
        <div className=' d-flex flex-column align-content-center justify-content-center'>
          <Spinner animation='grow' variant='primary' className='m-auto' />
          <div className='mt-2 font-weight-bold'>Preparing..</div>
        </div>
      </div>
    </div>
  );
};

export default SpinnerScreen;
