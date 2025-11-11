import React from "react";
import { Container } from "react-bootstrap";

function VideoDescription({ description }) {
  const displayText = description?.trim() ? description : "Video description";

  return (
    <Container className="mt-4 px-0">
      <h5 className="mb-3">Description</h5>
      <div style={{ whiteSpace: "pre-wrap" }}>{displayText}</div>
    </Container>
  );
}

export default VideoDescription;
