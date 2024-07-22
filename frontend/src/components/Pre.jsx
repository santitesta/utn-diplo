import React from "react";
import PropTypes from "prop-types";

function Pre(props) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

// Definición de PropTypes para el componente Pre
Pre.propTypes = {
  load: PropTypes.bool.isRequired,
};

export default Pre;
