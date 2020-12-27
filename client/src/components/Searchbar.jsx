import React from 'react';
import Form from 'react-bootstrap/Form';
// import Results from '../pages/Results';

const Searchbar = ({ submit }) => {
  return (
    <div>
      <Form.Control
        onKeyDown={submit}
        style={{ textAlign: 'center', fontFamily: 'Oswald' }}
        id="searchbar"
        size="lg"
        type="text"
        placeholder="Search a Beer! 🔍"
      />

      {/* <Results data={apiData} /> */}
    </div>
  );
};

export default Searchbar;
