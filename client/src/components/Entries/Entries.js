import React from 'react';
import { Row, Col, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const book = <FontAwesomeIcon icon='book-open' />;

const Faqs = ({ faqs, isLoading, uniqueArray }) => {
  return (
    <div>
      <div className='d-flex align-items-center cat-header'>
        <div className='mr-2 icon'>{book}</div>
        <div className='cat-header-header'>Hand Book</div>
      </div>
      <Row className='mt-4'>
        {uniqueArray.map((faq) => (
          <Col className='mt-2' sm={6} key={faq}>
            <ListGroup variant='flush' className='mb-5'>
              <div className='font-weight-bold ml-2'> {faq}</div>
              {faqs
                .filter((item) => item.category.includes(faq))
                .map((item) => (
                  <ListGroup.Item
                    action
                    key={item._id}
                    className='faq-question w-50'>
                    <Link
                      _id={item._id}
                      to={`/handbook/fullquestion?_id=${item._id}`}>
                      {item.question}
                    </Link>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Faqs;
