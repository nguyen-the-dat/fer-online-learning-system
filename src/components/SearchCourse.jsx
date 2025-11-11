import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";

const SearchCourse = () => {
  return (
    <InputGroup className="mb-3">
      <InputGroup.Text>
        <BsSearch />
      </InputGroup.Text>
      <Form.Control
        type="text"
        placeholder="Search courses..."
        aria-label="Search courses"
      />
    </InputGroup>
  );
};

export default SearchCourse;
