import React from "react";
import { Button, Badge } from "react-bootstrap";
import { BsX } from "react-icons/bs"; // ✅ dùng react-icons

const ActiveFilters = ({ filter, applyArrayFilter }) => {
  return (
    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
      {/* Active Categories */}
      {filter.categories.length > 0 &&
        filter.categories.map((category) => (
          <Badge
            key={category}
            pill
            bg="light"
            text="dark"
            className="d-flex align-items-center gap-1 px-3 py-2 border"
          >
            {category}
            <Button
              variant="link"
              size="sm"
              className="p-0 ms-2 text-danger d-flex align-items-center"
              onClick={() =>
                applyArrayFilter({ type: "categories", value: category })
              }
              style={{ lineHeight: 1 }}
            >
              <BsX size={12} />
            </Button>
          </Badge>
        ))}

      {/* Active Prices */}
      {filter.price.length > 0 &&
        filter.price.map((price) => (
          <Badge
            key={price}
            pill
            bg="light"
            text="dark"
            className="d-flex align-items-center gap-1 px-3 py-2 border"
          >
            {price}
            <Button
              variant="link"
              size="sm"
              className="p-0 ms-2 text-danger d-flex align-items-center"
              onClick={() => applyArrayFilter({ type: "price", value: price })}
              style={{ lineHeight: 1 }}
            >
              <BsX size={12} />
            </Button>
          </Badge>
        ))}
    </div>
  );
};

export default ActiveFilters;
