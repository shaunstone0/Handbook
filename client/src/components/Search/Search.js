import React, { useEffect } from 'react';
import { Form } from 'react-bootstrap';

const Search = ({ handleChange, searchTerm, faqs, setSearchResults }) => {
  useEffect(() => {
    const results = faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [faqs, searchTerm, setSearchResults]);

  return (
    <Form.Group className='mt-4'>
      <Form.Control
        placeholder='Search'
        onChange={handleChange}
        value={searchTerm}
      />
    </Form.Group>
  );
};

export default Search;
