import React from "react";
import supportImage from "../../public/assets/images/support.png"
const Support = () => {
  return (
    <div className="bg-info-subtle text-light py-5 border-bottom border-secondary">
      <div className="container">
        <div className="row align-items-center gy-4">
          {/* Text Content */}
          <div className="col-md-6">
            <h2 className="fw-bold display-5">
              <span className="position-relative d-inline-block">
                {/* Decorative Gradient Background (optional) */}
                <span
                  style={{
                    background:
                      "linear-gradient(to right, #44BCFF, #FF44EC, #FF675E)",
                    filter: "blur(10px)",
                    opacity: 0.3,
                    position: "absolute",
                    inset: 0,
                    borderRadius: "8px",
                    zIndex: 0,
                  }}
                ></span>
                <span className="position-relative z-1">
                  Let us know for support
                </span>
              </span>
            </h2>

            <p className="mt-4 text-light">
              I Am Founder Of Easy Learning Academy And Best Selling Online
              Instructor Around The World. My life’s mission is to help novice
              and professional software engineers increase their skills, make
              more money, and ultimately change their lives for the better.
            </p>

            <div className="d-flex flex-wrap gap-3 mt-4">
              <a href="#" className="btn btn-primary px-4 py-2 fw-semibold">
                Contact us
              </a>
              <a href="#" className="btn btn-dark px-4 py-2 fw-semibold">
                Call for support
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="col-md-6 text-center">
            <img
              src={supportImage}
              alt="Support"
              className="img-fluid rounded shadow"
              width="500"
              height="400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
