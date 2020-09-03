import React, { useEffect, useState } from 'react';

// Components
import Category from '../Category/Category';
import Faqs from '../Entries/Entries';
import AddButton from '../AddButton/AddButton';
import Alert from '../Alert/Alert';
import Search from '../Search/Search';
// Bootstrap
import { Container } from 'react-bootstrap';

// Redux
import { connect } from 'react-redux';
import { getCategories } from '../../utils/getCatergories';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    getAllQuestions();
    getMostViewsQuestions();
    store.dispatch({ type: PURGE });
  }, [getAllQuestions, getMostViewsQuestions]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  console.log(searchResults);

  return (
    <>
      <Alert />
      <Container fluid>
        <Search
          handleChange={handleChange}
          searchTerm={searchTerm}
          faqs={faqs}
          setSearchResults={setSearchResults}
        />

        {searchTerm ? (
          <div>
            {searchResults.map((item) => {
              return <div>{item.question}</div>;
            })}
          </div>
        ) : (
          <div className='app p-3'>
            <Category
              faqs={faqs}
              isLoading={isLoading}
              mostViewed={mostViewed}
            />
            <hr />
            <Faqs faqs={faqs} uniqueArray={getCategories(faqs)} />
          </div>
        )}
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
