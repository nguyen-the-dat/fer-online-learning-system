import { ProgressBar } from "react-bootstrap";

const colorByVariant = {
  default: "text-primary",
  success: "text-success",
};

const sizeByVariant = {
  default: "fs-6",
  sm: "fs-7",
};

export const CourseProgress = ({
  value = 0,
  variant = "default",
  size = "default",
}) => {
  const textColor = colorByVariant[variant] || "text-primary";
  const textSize = sizeByVariant[size] || "fs-6";

  return (
    <div>
      <ProgressBar
        now={value}
        variant={variant === "success" ? "success" : "primary"}
        style={{ height: "8px" }}
      />
      <p className={`mt-2 fw-medium ${textColor} ${textSize}`}>
        {Math.round(value)}% Complete
      </p>
    </div>
  );
};
