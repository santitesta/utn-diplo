import React from 'react';
import Form from 'react-bootstrap/Form';
import PropTypes from 'prop-types';

const NumberInput = ({ placeholder, value, onChange }) => {
    const handleChange = (e) => {
        // Reemplaza la coma por punto y parsea el valor
        const newValue = e.target.value.replace(',', '.');
        const parsedValue = parseFloat(newValue);
        if (!isNaN(parsedValue)) {
            onChange(parsedValue);
        } else if (e.target.value === '') {
            // Si el campo está vacío, se considera como valor no definido
            onChange(null);
        }
    };

    return (
        <Form.Control
            type="number"
            step="any"
            placeholder={placeholder}
            value={value === null ? '' : value}  // Usa una cadena vacía si el valor es null
            onChange={handleChange}
            className="text-center"
            required
        />
    );
};

// Definir PropTypes para la validación de los props
NumberInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null])
    ]),
    onChange: PropTypes.func.isRequired,
};

export default NumberInput;
