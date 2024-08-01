import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function CardTicket({ variant, count, title, buttonText, handleButton, numeros, setNumeros }) {
    const [validity, setValidity] = useState(Array(count).fill(true)); // Estado para rastrear la validez de cada input

    const handleInputChange = (index, value) => {
        const newNumeros = [...numeros];
        newNumeros[index] = value;
        setNumeros(newNumeros); // Actualiza el estado en el componente padre
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let allValid = true;
        const newValidity = [...validity];
        const seenNumbers = new Set();
        //Validacion de uqe sean numeros entre 00-45 y que no haya repetidos
        for (let i = 0; i < count; i++) {
            const value = numeros[i];
            if (isNaN(value) || value < 0 || value > 45 || value === ""|| value ===null ) {
                newValidity[i] = false;
                allValid = false;
            } else if (seenNumbers.has(value)) {
                // Si el número ya ha sido visto, marca este input como inválido
                newValidity[i] = false;
                allValid = false;
            } else {
                newValidity[i] = true;
                seenNumbers.add(value); // Marca el número como visto
            }
        }

        setValidity(newValidity);

        if (allValid) {
            handleButton(); // Llama a la función handleButton cuando todos los inputs sean válidos
        } else {
            console.log("Uno o más números son inválidos.");
        }
    };

    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Form className="p-1" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="ticketBuy">
                    <Form.Label>Numeros</Form.Label>
                    <Row>
                        {[...Array(count)].map((_, index) => (
                            <Col xs={2} className="d-flex justify-content-center" key={index}>
                                <Form.Control
                                    type="text"
                                    placeholder={`#${index + 1}`}
                                    value={numeros[index] || ''} // Muestra el valor actual
                                    onChange={(e) => handleInputChange(index, parseInt(e.target.value, 10))} // Actualiza el estado de numeros
                                    className={`text-center ${!validity[index] ? 'is-invalid' : ''}`}
                                />
                            </Col>
                        ))}
                    </Row>
                </Form.Group>
                <Button variant={variant} type="submit">{buttonText}</Button>
            </Form>
        </Card>
    );
}

// Definir PropTypes para la validación de los props
CardTicket.propTypes = {
    count: PropTypes.number.isRequired, // Asegura que count es un número y es requerido
    title: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    buttonText: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    handleButton: PropTypes.func.isRequired, // Asegura que handleButton es una función y es requerido
    numeros: PropTypes.arrayOf(PropTypes.number).isRequired, // Asegura que numeros es un array de cadenas y es requerido
    setNumeros: PropTypes.func.isRequired, // Asegura que setNumeros es una función y es requerido
};

export default CardTicket;