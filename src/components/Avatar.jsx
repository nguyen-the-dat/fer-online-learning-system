import React from "react";

export default function Avatar({ src="https://i.pravatar.cc", alt = "", fallback = "?" }) {
  const [imageError, setImageError] = React.useState(false);

  const avatarStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#e9ecef", 
    color: "#6c757d", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    fontSize: "14px",
    fontWeight: "500",
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  return (
    <div style={avatarStyle}>
      {!imageError && src ? (
        <img
          src={src}
          alt={alt}
          style={imageStyle}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
