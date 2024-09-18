import { useState } from "react";
import { Button, Col, Row,  } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import CardWaitForTx from '../CardWaitForTx/CardWaitForTx'; // Importa el nuevo componente
//{ hash, title, children, error , isPending, isConfirmed}
function CardTicket({ count, title,header, handleButton, numeros, setNumeros, error , isPending, isConfirmed,children}) {
    const [validity, setValidity] = useState(Array(count).fill(true)); // Estado para rastrear la validez de cada input

    const handleInputChange = (index, value) => {
        const newNumeros = [...numeros];
        newNumeros[index] = value;
        setNumeros(newNumeros); // Actualiza el estado en el componente padare
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
        //{ hash, title, children, error , isPending, isConfirmed}
        <CardWaitForTx  error ={error} isPending ={isPending}  isConfirmed = {isConfirmed} title={title}>
            <Form className="p-1" onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>{header}</Form.Label>
                    <Row>
                        {[...Array(count)].map((_, index) => (
                            <Col xs sm="6" md="2" className="d-flex justify-content-center p-1" key={index}>
                                <Form.Control
                                    type="text"
                                    id={`ticketBuy-${index}`} // Id único para cada campo basado en el índice
                                    placeholder={`#${index + 1}`}
                                    value={numeros[index] || ''} // Muestra el valor actual
                                    onChange={(e) => handleInputChange(index, parseInt(e.target.value, 10))} // Actualiza el estado de numeros
                                    className={`text-center ${!validity[index] ? 'is-invalid' : ''}`}
                                />
                            </Col>
                        ))}
                    </Row>                    
                </Form.Group>
                {children}
            </Form>
        </CardWaitForTx>
    );
}

// Definir PropTypes para la validación de los props
CardTicket.propTypes = {
    count: PropTypes.number.isRequired, // Asegura que count es un número y es requerido
    title: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    header: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    handleButton: PropTypes.func.isRequired, // Asegura que handleButton es una función y es requerido
    numeros: PropTypes.arrayOf(PropTypes.number).isRequired, // Asegura que numeros es un array de cadenas y es requerido
    setNumeros: PropTypes.func.isRequired, // Asegura que setNumeros es una función y es requerido
    // isPending: PropTypes.bool,
    isConfirmed: PropTypes.bool,
    // hash: PropTypes.oneOfType([
    //     PropTypes.string,
    //     PropTypes.oneOf([null])
    // ]),
    // error: PropTypes.oneOfType([
    //     PropTypes.object,
    //     PropTypes.oneOf([null])
    // ]),
    children: PropTypes.node, // Agregar la definición de children
};

export default CardTicket;
