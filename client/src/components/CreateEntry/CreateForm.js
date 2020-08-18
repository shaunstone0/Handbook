import React from 'react';

import Editor from './Editor';
import { createFaq, setAlert } from '../../actions';
import useForm from '../../customHooks/useForm';
import validate from './ValidateCreate';

//Bootstrap
import { Button, Form, Container } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createIcon = <FontAwesomeIcon icon='folder-plus' className='icon' />;

const CreateForm = ({ createFaq, history, setAlert }) => {
  const create = async () => {
    try {
      await createFaq(question, answer, category);
      history.push('/');
      setAlert('Hand Book Entry Created', 'success');
    } catch (err) {
      setAlert('Creation Failed, Please contact Administrator', 'danger');
      return;
    }
  };

  const { formData, setFormData, onSubmit, errors } = useForm(create, validate);

  const handleFormChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleEditorChange = (content) => {
    setFormData({ ...formData, answer: content });
  };

  const { question, category, answer } = formData;

  return (
    <Container fluid>
      <div className='d-flex align-content-center justify-content-center w-100 create-container'>
        <Form onSubmit={onSubmit} className='m-auto create-form'>
          <h3 className='mb-4 mt-4'>{createIcon} Create</h3>
          <Form.Group>
            <Form.Label className='font-weight-bold'>Handbook Title</Form.Label>
            <Form.Control
              name='question'
              type='text'
              placeholder='Title'
              value={question || ''}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              className={errors.category ? 'danger' : ''}>
              <option>Choose One</option>
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
          <Button href='/' variant='secondary' className='mt-2 mb-4 w-100'>
            Cancel
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default connect(null, { createFaq, setAlert })(CreateForm);
