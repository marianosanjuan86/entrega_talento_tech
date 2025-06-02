import React from "react";

const Loader = ({ mensaje = "Cargando..." }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem",
        gap: "1rem",
      }}
    >
      {/* Spinner CSS */}
      <div
        className="spinner"
        style={{
          width: "60px",
          height: "60px",
          border: "6px solid #f3f3f3",
          borderTop: "6px solid #e91e63",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      ></div>

      <p
        style={{
          fontSize: "1.2rem",
          color: "#666",
          fontWeight: "bold",
          margin: 0,
          textAlign: "center",
        }}
      >
        {mensaje}
      </p>

      {/* Estilos CSS sin jsx */}
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default Loader;
