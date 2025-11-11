import React, { useState } from 'react';
import {
  Button,
  Offcanvas,
  Accordion,
  Form,
  Container,
} from 'react-bootstrap';
import { BsFilter } from "react-icons/bs";

const CATEGORY_OPTIONS = [
  { id: 1, label: 'Design', value: 'design' },
  { id: 3, label: 'Development', value: 'development' },
  { id: 4, label: 'Marketing', value: 'marketing' },
  { id: 5, label: 'IT & Software', value: 'it-software' },
  { id: 6, label: 'Personal Development', value: 'personal-development' },
  { id: 7, label: 'Business', value: 'business' },
  { id: 8, label: 'Photography', value: 'photography' },
  { id: 9, label: 'Music', value: 'music' },
];

const PRICE_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
];

const FilterCourseMobile = () => {
  const [show, setShow] = useState(false);
  const [filter, setFilter] = useState({
    categories: ['development'],
    price: ['free'],
    sort: '',
  });

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const applyArrayFilter = ({ type, value }) => {
    const isApplied = filter[type].includes(value);
    setFilter((prev) => ({
      ...prev,
      [type]: isApplied
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  return (
    <div className="d-lg-none">
      <Button variant="outline-secondary" onClick={handleShow}>
        <BsFilter className="me-1" /> Filter
      </Button>

      <Offcanvas show={show} onHide={handleClose} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter Courses</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion defaultActiveKey="0" alwaysOpen>
            {/* Categories */}
            <Accordion.Item eventKey="0">
              <Accordion.Header>Categories</Accordion.Header>
              <Accordion.Body>
                {CATEGORY_OPTIONS.map((option, idx) => (
                  <Form.Check
                    key={option.value}
                    id={`category-${idx}`}
                    type="checkbox"
                    label={option.label}
                    checked={filter.categories.includes(option.value)}
                    onChange={() =>
                      applyArrayFilter({ type: 'categories', value: option.value })
                    }
                    className="mb-2"
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>

            {/* Price */}
            <Accordion.Item eventKey="1">
              <Accordion.Header>Price</Accordion.Header>
              <Accordion.Body>
                {PRICE_OPTIONS.map((option, idx) => (
                  <Form.Check
                    key={option.value}
                    id={`price-${idx}`}
                    type="checkbox"
                    label={option.label}
                    checked={filter.price.includes(option.value)}
                    onChange={() =>
                      applyArrayFilter({ type: 'price', value: option.value })
                    }
                    className="mb-2"
                  />
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export default FilterCourseMobile;
