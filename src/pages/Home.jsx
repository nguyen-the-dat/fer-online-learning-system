import { Container, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import Element from "../components/Element";
export default function HeroSection() {
  return (
    <>
      <section className="bg-light py-5 position-relative">
        <Container className="text-center position-relative">
          <Badge
            bg="secondary"
            className="mb-3 py-2 px-3 fs-6 shadow rounded-pill"
          >
            Hey, Welcome
          </Badge>

          <h1 className="fw-bold display-5 mb-3">
            Learn By Doing with <br /> Easy Learning
          </h1>

          <p className="lead mx-auto" style={{ maxWidth: "42rem" }}>
            “You don’t understand anything until you learn it more than one
            way.”
          </p>

          <div className="d-flex flex-wrap justify-content-center gap-3 mt-4">
            <Link to="/courses">
              <Button size="lg">Explore Now</Button>
            </Link>

            <Link to="/register/instructor">
              <Button variant="outline-primary" size="lg">
                Become An Instructor
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      <section>
        <Element />
      </section>
    </>
  );
}
