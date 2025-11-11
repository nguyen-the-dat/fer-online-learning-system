import { Badge } from "react-bootstrap";

const IconBadge = ({ icon: Icon, variant = "default", size = "default" }) => {
  // Map kiểu màu
  const backgroundClass = {
    default: "bg-success-subtle",
    success: "bg-success-subtle", // Bootstrap 5.3
  }[variant] || "bg-light";

  // Map kiểu kích thước
  const paddingClass = {
    default: "p-2",
    sm: "p-1",
  }[size] || "p-2";

  const iconSize = {
    default: 24,
    sm: 16,
  }[size] || 24;

  const textColorClass = {
    default: "text-success",
    success: "text-success",
  }[variant] || "text-dark";

  return (
    <Badge
      className={`rounded-circle d-inline-flex align-items-center justify-content-center ${backgroundClass} ${paddingClass}`}
    >
      <Icon size={iconSize} className={textColorClass} />
    </Badge>
  );
};

export default IconBadge;
