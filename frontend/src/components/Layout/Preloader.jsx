import React from "react";
import PropTypes from "prop-types";

function Preloader(props) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

// Definición de PropTypes para el componente Pre
Preloader.propTypes = {
  load: PropTypes.bool.isRequired,
};

export default Preloader;
