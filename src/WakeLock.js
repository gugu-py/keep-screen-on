import React, { useState } from "react";

const WakeLock = () => {
  const [wakeLock, setWakeLock] = useState(null);
  const [isActive, setIsActive] = useState(false);

  // Function to request Wake Lock
  const enableWakeLock = async () => {
    try {
      if ("wakeLock" in navigator) {
        const lock = await navigator.wakeLock.request("screen");
        setWakeLock(lock);
        setIsActive(true);

        // Handle release when visibility changes
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible" && !wakeLock) {
            enableWakeLock();
          }
        });

        lock.addEventListener("release", () => {
          console.log("Wake Lock released");
          setIsActive(false);
        });

        console.log("Wake Lock enabled");
      } else {
        alert("Wake Lock API is not supported in this browser.");
      }
    } catch (err) {
      console.error("Failed to enable Wake Lock:", err);
    }
  };

  // Function to release Wake Lock
  const disableWakeLock = () => {
    if (wakeLock) {
      wakeLock.release();
      setWakeLock(null);
      setIsActive(false);
      console.log("Wake Lock disabled");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Keep Screen On</h1>
      <button onClick={enableWakeLock} disabled={isActive}>
        Enable Screen Wake Lock
      </button>
      <button onClick={disableWakeLock} disabled={!isActive}>
        Disable Screen Wake Lock
      </button>
      <p>
        Wake Lock is currently: <b>{isActive ? "Active" : "Inactive"}</b>
      </p>
    </div>
  );
};

export default WakeLock;
