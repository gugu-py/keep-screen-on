import React, { useState } from "react";
import "./WakeLock.css";

const WakeLock = () => {
  const [wakeLock, setWakeLock] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const toggleWakeLock = async () => {
    try {
      if (!isActive) {
        if ("wakeLock" in navigator) {
          const lock = await navigator.wakeLock.request("screen");
          setWakeLock(lock);
          setIsActive(true);

          document.addEventListener("visibilitychange", () => {
            if (document.visibilityState === "visible" && !wakeLock) {
              toggleWakeLock();
            }
          });

          lock.addEventListener("release", () => {
            setIsActive(false);
          });
        } else {
          alert("Wake Lock API is not supported in this browser.");
        }
      } else {
        if (wakeLock) {
          wakeLock.release();
          setWakeLock(null);
          setIsActive(false);
        }
      }
    } catch (err) {
      console.error("Failed to toggle Wake Lock:", err);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Keep Screen On</h1>
      <button
        className={`toggle-button ${isActive ? "active" : ""}`}
        onClick={toggleWakeLock}
      >
        {isActive ? "Disable Wake Lock" : "Enable Wake Lock"}
      </button>
      <p className="status">
        Wake Lock is: <b>{isActive ? "Active" : "Inactive"}</b>
      </p>
    </div>
  );
};

export default WakeLock;
