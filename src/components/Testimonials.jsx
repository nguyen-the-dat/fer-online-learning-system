import React from "react";
import { Carousel, Container, Row, Col, Card } from "react-bootstrap";
import StarRating from "./StarRating"; // giữ nguyên component star rating nếu đã có

const Testimonials = ({ testimonials }) => {
  const chunkedTestimonials = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    chunkedTestimonials.push(testimonials.slice(i, i + 3));
  }

  console.log('chunkedTestimonials', chunkedTestimonials)
  return (
    <section className="pb-5">
      <Container>
        <h2 className="mb-4">Testimonials</h2>
        <Carousel interval={null}>
          {chunkedTestimonials.map((group, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {group.map((testimonial) => (
               
                  <Col key={testimonial.id} md={6} lg={4} className="mb-4">
                    <Card className="h-100 shadow-sm">
                      <Card.Body>
                        <div className="d-flex align-items-center mb-3">
                          <img
                            src={testimonial?.user?.profilePicture}
                            alt={`Profile ${testimonial?.user?.first_name}`}
                            width={56}
                            height={56}
                            className="rounded-circle me-3"
                          />
                          <div>
                            <h5 className="mb-0">
                              {testimonial?.user?.firstName}{" "}
                              {testimonial?.user?.lastName}
                            </h5>
                            <div className="text-warning">
                              <StarRating rating={testimonial?.rating} />
                            </div>
                          </div>
                        </div>
                        <Card.Text className="text-muted">
                          {testimonial?.review}
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;
