import React from 'react';
import { Link } from 'react-router-dom';
// Components
import Spinner from '../Spinner/Spinner';

// Bootstrap
import { Card, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const faqView = <FontAwesomeIcon icon='eye' />;
const question = <FontAwesomeIcon icon='question-circle' />;
const CategoryList = ({ mostViewed, faqs, isLoading }) => {
  return isLoading ? (
    <Spinner />
  ) : (
    <div className='w-100 m-auto'>
      {' '}
      <div className='mt-3'>
        <div className='d-flex align-items-center cat-header'>
          <div className='mr-2 icon'>{question}</div>
          <div className='cat-header-header'>Featured Questions</div>
        </div>
        <Row>
          {mostViewed.map((faq) => (
            <Col sm={6} className='mt-4' key={faq._id}>
              <Link _id={faq._id} to={`/handbook/fullquestion?_id=${faq._id}`}>
                <Card className='featured-faq'>
                  <Card.Body>
                    <div className='mb-2'>
                      <small className='text-muted'>{faq.category}</small>
                    </div>
                    <div className='question'>{faq.question}</div>
                    <div className=' d-flex justify-content-end'>
                      <small className='text-super-muted'>
                        {faqView} {faq.views}
                      </small>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CategoryList;
