import React, { useEffect } from 'react';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
// Components
import Category from '../Category/Category';
import Faqs from '../Entries/Entries';
import AddButton from '../AddButton/AddButton';
import Alert from '../Alert/Alert';

// Bootstrap
import { Container } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { getAllQuestions, getMostViewsQuestions } from '../../actions';
import store from '../../index';
import { PURGE } from '../../actions/types';

const App = ({
  getAllQuestions,
  getMostViewsQuestions,
  faqs,
  isLoading,
  mostViewed,
}) => {
  useEffect(() => {
    getAllQuestions();
    getMostViewsQuestions();
    store.dispatch({ type: PURGE });
  }, [getAllQuestions, getMostViewsQuestions]);

  // Get Categories from Database
  const getCategories = () => {
    const catArray = [];
    if (faqs) {
      faqs.map((faq) => {
        return catArray.push(...faq.category);
      });
    }
    const uniqueArray = [...new Set(catArray)];
    return uniqueArray;
  };

  return (
    <>
      <Alert />
      <Container fluid>
        <div className='app p-3'>
          <Category faqs={faqs} isLoading={isLoading} mostViewed={mostViewed} />
          <hr />
          <Faqs faqs={faqs} uniqueArray={getCategories()} />
        </div>
        <AddButton />
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({
  faqs: state.faqs.faqs,
  mostViewed: state.mostViewed.mostViewed,
  isLoading: state.faqs.isLoading,
});
export default connect(mapStateToProps, {
  getAllQuestions,
  getMostViewsQuestions,
})(App);
