import React from 'react';
import { Link } from 'react-router-dom';

// FontAwesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const plus = <FontAwesomeIcon icon='plus' className='icon' />;

const AddButton = () => {
  return (
    <>
      <Link to='/handbook/create'>
        <div className='addbutton d-flex justify-content-center align-items-center'>
          {plus}
        </div>
      </Link>
    </>
  );
};

export default AddButton;
