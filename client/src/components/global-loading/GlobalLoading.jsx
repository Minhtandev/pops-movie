import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./global-loading.scss";
const GlobalLoading = () => {
  const { globalLoading } = useSelector((state) => state.globalLoading);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (globalLoading) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [globalLoading]);
  return (
    <div
      className="global-loading"
      style={{
        backgroundColor: "#000",
        display: isLoading ? "block" : "none",
        pointerEvents: "none",
        transition: "all .3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 999,
      }}>
      <div
        className="spinner-container"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}>
        <div className="spinner"></div>
      </div>
    </div>
  );
};

export default GlobalLoading;
