import React from 'react';
import { Link } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';

// Actions
import { deleteFaq } from '../../actions';

// Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const back = (
  <FontAwesomeIcon icon='arrow-alt-circle-left' className='back-icon' />
);

const edit = <FontAwesomeIcon icon='edit' className='icon' />;

const deleteX = <FontAwesomeIcon icon='times' className='icon' />;

const UtilBar = ({ singleFaq, history, currentUser }) => {
  const deleteEntry = () => {
    deleteFaq(singleFaq._id);
    history.push('/');
  };

  return (
    <div className='util-bar-container d-flex justify-content-center pt-1'>
      <div className='d-flex justify-content-between align-items-center util-bar '>
        <div className='pl-3'>
          <Link to='/'>{back}</Link>
        </div>
        <div className='d-flex pr-3'>
          <div className='pr-3 d-flex btn btn-success text-light edit-button'>
            {
              <Link to={`/handbook/edit?=_id=${singleFaq._id}`}>
                Edit {edit}
              </Link>
            }
          </div>
          {currentUser.role === 'admin' && (
            <div
              className='ml-2 text-light delete btn btn-danger'
              onClick={deleteEntry}>
              Delete {deleteX}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { deleteFaq })(UtilBar);
