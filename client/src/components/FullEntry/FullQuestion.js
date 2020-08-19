import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getQuestionById, deleteFaq } from '../../actions';

// Components
import Spinner from '../Spinner/Spinner';
import UtilBar from './UtilBar';

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

const FullQuestion = ({ singleFaq, getQuestionById }) => {
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

  return !singleFaq.answer ? (
    <Spinner />
  ) : (
    <div>
      <Container className='p-2 mt-3 mb-5'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center pl-3'>
            <h3>{singleFaq.question}</h3>
          </div>
        </div>
        <hr />
        <ReactQuill
          readOnly={true}
          modules={{ toolbar: false }}
          value={decoded || ''}
          className='answer-container mt-1'
        />
      </Container>
      <UtilBar singleFaq={singleFaq} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  singleFaq: state.singleFaq.singleFaq,
});

export default connect(mapStateToProps, { getQuestionById })(FullQuestion);
