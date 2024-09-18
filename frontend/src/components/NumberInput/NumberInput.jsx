import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const NumberInput = ({ placeholder, value,id, onChange ,className:addClassName }) => {
     // Manejador para validar y actualizar solo valores positivos
     const handleChange = (event) => {
        const inputValue = parseFloat(event.target.value);
        if (!isNaN(inputValue) && inputValue >= 0 || event.target.value === '') {
            onChange(inputValue);
        }
        
    };
    return (
        <Form.Control
            type="number"
            step="any"
            min="0" // Establece el mínimo permitido a 0 para números positivos
            placeholder={placeholder}
            id={id}
            value={ value !== null ? value : ''}  // Usa una cadena vacía si el valor es null
            onChange={handleChange}
            className= {`text-center ${addClassName}`}
            required
        />
    );
};

// Definir PropTypes para la validación de los props
NumberInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default NumberInput;
