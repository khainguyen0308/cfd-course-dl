import { useAuthContext } from "../../context/AuthContext";
import { useMainContext } from "../../context/MainContext";
import React from "react";

const Overlay = () => {
  const { handleShowNavbar } = useMainContext();
  const { handleCloseDropdown } = useAuthContext();
  return (
    <div
      className="overlay"
      onClick={() => {
        handleShowNavbar(false), handleCloseDropdown(false);
      }}
    />
  );
};

export default Overlay;
