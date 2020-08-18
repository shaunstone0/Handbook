import React, { useEffect } from 'react';
// Decode
import { decodeEntities } from '../../utils/Decode';

// Components
import Editor from './Editor';
// Redux

// Validation
import useForm from '../../customHooks/useForm';
import validate from './ValidateEdit';

// URL
import queryString from 'query-string';

//Bootstrap
import { Button, Form, Container } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { setAlert } from '../../actions';
import { updateFaq, getQuestionById } from '../../actions/';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createIcon = <FontAwesomeIcon icon='folder-plus' className='icon' />;

const parsedID = queryString.parse(window.location.search);
let parsed = Object.values(parsedID);

const EditForm = ({
  updateFaq,
  singleFaq,
  getQuestionById,
  history,
  setAlert,
}) => {
  const { formData, setFormData, onSubmit, errors } = useForm(
    updateInfo,
    validate
  );
  useEffect(() => {
    // if (!singleFaq) getQuestionById(parsed);
    if (singleFaq) {
      setFormData({
        category: singleFaq.category,
        question: singleFaq.question,
        answer: singleFaq.answer,
      });
    }
    if (!singleFaq.answer) {
      history.push('/');
    }
  }, [getQuestionById, singleFaq, setFormData]);

  const { question, answer, category } = formData;

  // Decode Answer
  let decoded;
  if (answer) {
    decoded = decodeEntities(answer);
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleEditorChange = (decoded) => {
    setFormData({ ...formData, answer: decoded });
  };

  async function updateInfo() {
    let id = singleFaq._id;
    try {
      updateFaq(question, answer, category, id);
      history.push(`/handbook/fullquestion?_id=${id}`);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(formData);

  return (
    <Container fluid>
      <div className='d-flex align-content-center justify-content-center w-100 create-container'>
        <Form onSubmit={onSubmit} className='m-auto create-form'>
          <h3 className='mb-4 mt-4'>{createIcon} Edit</h3>
          <Form.Group>
            <Form.Label className='font-weight-bold'>Handbook Title</Form.Label>
            <Form.Control
              name='question'
              type='text'
              placeholder='Title'
              value={question || ''}
              onChange={(e) => handleChange(e)}
              className={errors.question ? 'danger' : ''}
            />
            {errors.question && (
              <p className='error-message mt-2 p-2'>{errors.question}</p>
            )}

            <Form.Text className='text-muted'>
              Sim Only Cancellation, End of Day Booking, ect.
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label className='font-weight-bold'>Answer</Form.Label>

            <Editor
              handleEditorChange={handleEditorChange}
              value={decoded}
              errors={errors.answer}
            />
            {errors.answer && (
              <p className='error-message mt-2 p-2 '>{errors.answer}</p>
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className='font-weight-bold'>Category</Form.Label>
            <Form.Control
              as='select'
              name='category'
              value={category || ''}
              onChange={(e) => handleChange(e)}
              className={errors.category ? 'danger' : ''}>
              <option value='Choose One'>Choose One</option>
              <option value='Contracts'>Contracts</option>
              <option value='Upgrades'>Upgrades</option>
              <option value='Prepaid'>Prepaid</option>
              <option value='Devices'>Devices</option>
              <option value='Mobile Cancellations'>Mobile Cancellation</option>
              <option value='Internet Cancellations'>
                Internet Cancellations
              </option>
              <option value='Customer Info'>Customer Info</option>
              <option value='Cash Register/Banking'>
                Cash Register/Banking
              </option>
              <option value='Sapphire'> Sapphire Mifi</option>
              <option value='Store Supplies'>Store Supplies</option>
            </Form.Control>
            {errors.category && (
              <p className='error-message mt-2 p-2'>{errors.category}</p>
            )}
          </Form.Group>
          <Button variant='primary' type='submit' className='mt-3 mb-1 w-100'>
            Submit
          </Button>
          <Button
            href={`/handbook/fullquestion?_id=${singleFaq._id}`}
            variant='secondary'
            className='mt-2 mb-4 w-100'>
            Cancel
          </Button>
        </Form>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  singleFaq: state.singleFaq.singleFaq,
});

export default connect(mapStateToProps, {
  setAlert,
  getQuestionById,
  updateFaq,
})(EditForm);
