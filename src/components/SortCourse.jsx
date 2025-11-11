import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SORT_OPTIONS = [
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
];

const SortCourse = () => {
  const [selected, setSelected] = useState('');

  const handleChange = (e) => {
    setSelected(e.target.value);
    // Bạn có thể gọi hàm lọc dữ liệu tại đây
  };

  return (
    <Form.Select
      value={selected}
      onChange={handleChange}
      aria-label="Sort courses"
      style={{ width: '180px' }}
    >
      <option value="">Sort By</option>
      {SORT_OPTIONS.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default SortCourse;
