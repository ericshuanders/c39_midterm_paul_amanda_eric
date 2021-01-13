import React from 'react';
import Form from 'react-bootstrap/Form';


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

      
    </div>
  );
};

export default Searchbar;
