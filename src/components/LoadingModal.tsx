import { CircularProgress } from "@mui/material";

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
