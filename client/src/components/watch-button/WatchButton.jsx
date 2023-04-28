import React from "react";
import "./watch-button.scss";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { routesGen } from "../../routes/routes";
const WatchButton = ({ mediaType = "tv", mediaId = "1" }) => {
  return (
    <Button className="watch-button" variant="primary">
      <Link to={routesGen.mediaDetail(mediaType, mediaId)}>
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24">
          <path d="M20.748 10.945a4.505 4.505 0 00-1.923-1.976L8.377 2.729a4.328 4.328 0 00-2.667-.71 2.698 2.698 0 00-1.978 1.143A4.504 4.504 0 003 5.86v12.28a4.502 4.502 0 00.732 2.698 2.696 2.696 0 001.978 1.144 4.328 4.328 0 002.667-.71l10.448-6.063a4.483 4.483 0 001.923-1.987 2.701 2.701 0 000-2.277z"></path>
        </svg>
        WATCH NOW
      </Link>
    </Button>
  );
};

export default WatchButton;
