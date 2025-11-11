import React, { useState } from 'react';
import { Accordion, Card, Form, Container } from 'react-bootstrap';

const PRICE_OPTIONS = [
  { label: 'Free', value: 'free' },
  { label: 'Paid', value: 'paid' },
];

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

const FilterCourse = () => {
  const [filter, setFilter] = useState({
    categories: ['development'],
    price: ['free'],
    sort: '',
  });

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
    <Container className="d-none d-lg-block">
      <Accordion defaultActiveKey="0">
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
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FilterCourse;
