import React from "react";
import "./loading-btn.scss";

const LoadingButton = ({ children, loading }) => {
  return (
    <div className="loading-btn">
      {loading ? <div className="spinner"></div> : children}
    </div>
  );
};

export default LoadingButton;
