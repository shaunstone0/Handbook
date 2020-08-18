import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQuestionById, deleteFaq } from '../../actions';
import Spinner from '../Spinner/Spinner';

// Decode
import queryString from 'query-string';
import { decodeEntities } from '../../utils/Decode';
// Redux
import { connect } from 'react-redux';
// React Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// Bootstrap
import { Container } from 'react-bootstrap';

// Get ID from URL

const back = (
  <FontAwesomeIcon icon='arrow-alt-circle-left' className='back-icon' />
);

const edit = <FontAwesomeIcon icon='edit' className='icon' />;

const deleteX = <FontAwesomeIcon icon='times' className='icon' />;

const FullQuestion = ({
  singleFaq,
  getQuestionById,
  currentUser,
  deleteFaq,
  history,
}) => {
  useEffect(() => {
    const parsedID = queryString.parse(window.location.search);
    Object.entries(parsedID).forEach(([key, value]) => {
      return getQuestionById(value);
    });
  }, [getQuestionById]);

  let decoded;
  if (singleFaq.answer) {
    const answer = singleFaq.answer;
    decoded = decodeEntities(answer);
  }

  const deleteEntry = () => {
    deleteFaq(singleFaq._id);
    history.push('/');
  };

  return !singleFaq.answer ? (
    <Spinner />
  ) : (
    <Container className='p-2 mt-3'>
      <div className='d-flex justify-content-between align-items-center'>
        <div className='d-flex align-items-center pl-3'>
          <h3>{singleFaq.question}</h3>
        </div>
      </div>
      {/* <hr /> */}
      <ReactQuill
        readOnly={true}
        modules={{ toolbar: false }}
        value={decoded || ''}
        className='answer-container'
      />
      <div className='d-flex justify-content-between'>
        <div className='pl-3'>
          <Link to='/'>{back}</Link>
        </div>
        <div className='pr-3 d-flex'>
          {<Link to={`/handbook/edit?=_id=${singleFaq._id}`}>{edit}</Link>}
          {currentUser.role === 'admin' && (
            <div className='ml-2 text-danger delete' onClick={deleteEntry}>
              {deleteX}
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  singleFaq: state.singleFaq.singleFaq,
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, { getQuestionById, deleteFaq })(
  FullQuestion
);
