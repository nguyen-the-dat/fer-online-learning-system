import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ReviewModal from "./ReviewModal";

const GiveReview = ({ courseId }) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline-secondary"
        className="w-100 mt-3"
        onClick={() => setIsReviewModalOpen(true)}
      >
        Give Review
      </Button>

      <ReviewModal
        show={isReviewModalOpen}
        onHide={() => setIsReviewModalOpen(false)}
        courseId={courseId}
      />
    </>
  );
};

export default GiveReview;
