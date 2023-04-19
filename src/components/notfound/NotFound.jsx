import React from "react";

function NotFound() {
  return (
    <div
      style={{
        position: "relative",
        background: "#121212",
        color: "black",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <h1 style={{ textShadow: "rgb(3 218 198) -1px -1px 3px" }}>
          <span>404</span> | Page Not Found
        </h1>
      </div>
    </div>
  );
}

export default NotFound;
