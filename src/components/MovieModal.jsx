import React from "react";
import YouTubePlayer from './YoutubePlayer'
import '../styles/modal.scss'


const MovieModal = ({ isOpen, onClose, videoKey }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
    <div className="modal-content">
      <button className="modal-close" onClick={onClose}>&times;</button>
      {videoKey ? (
              <YouTubePlayer videoKey={videoKey} />
            ) : (
              <div style={{ padding: "30px" }}>
                <h6>no trailer available. Try another movie</h6>
              </div>
            )}
    </div>
  </div>
  );
};

export default MovieModal;
