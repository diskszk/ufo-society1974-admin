import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingModal: React.FC = () => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <CircularProgress size={64} />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
