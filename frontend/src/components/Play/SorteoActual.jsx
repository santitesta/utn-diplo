
import { useState, useEffect } from "react";
import {Container, Col, Row, Button } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account from '../Web3/Account';
import { Connect } from '../Web3/Connect';
import CardTicket from "../CardTicket/CardTicket";
import axios from 'axios';

import {
    useComprarTicket ,
} from '../../services/comprarTicketService';

//icono
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";


function SorteoActual({ sorteoID, estadoContrato }) {
    const { isConnected, address } = useAccount();
    const precio = estadoContrato?.contrato.ticketPrice;
    const count = 6;
    const [numeros, setNumeros] = useState(Array(count).fill(null));
    const [registroID, setRegistroID] = useState(null);
    const [isSorteoActivo, setIsSorteoActivo] = useState(false);
    const { comprarTicket, returnedTicketID:ticketID ,isSuccess,hash ,errorMessage,isPending,isError } = useComprarTicket();

    useEffect(() => {
        if (estadoContrato) {
          const { contrato } = estadoContrato;
          const estado = contrato?.isDrawActive ? contrato.isDrawActive : false;
          setIsSorteoActivo(estado);
          console.log('estado',estado);
        }
    }, [estadoContrato]);

    const handleComprarTicket = async () => {
        if(window.TEST) console.log(`Trata de comprar ticket con números [${numeros}]`);
        let numerosOrdenados = [...numeros].sort((a, b) => a - b);
        if (isConnected && precio> 0) {
            const response = await axios.post(`${window.URL_BACKEND}/registrarCompra`, {
                chosenNumbers: numerosOrdenados,
                drawId: sorteoID,
                ownerAddress: address
            });
            setRegistroID(response.data.id);
            if(window.TEST) console.log("Respuesta de la API:", response.data);
            comprarTicket(`${window.CONTRACT_ADDRESS}`, numerosOrdenados, precio);
        } else {
            if(window.TEST) console.log("Sin conexión.");
            alert('No esta conectado a su wallet')
        }
    };

    useEffect(() => {
        const array_nulo = Array(count).fill(null);
        if (isSuccess && ticketID > 0 && numeros !== array_nulo) {
            const estado = isSuccess ? 'confirmada' : 'fallida';
            if(window.TEST) console.log(`tx [${registroID}]=> ticketID[${ticketID}] => [${estado}]=>hash [${hash}]`);
            alert(`Se compró ticket[${ticketID}] con números [${numeros}].`);
            axios.put(`${window.URL_BACKEND}/actualizarCompra/${registroID}`, {
                txHash: hash,
                estado: estado,
                ticketID: ticketID
            });
            setNumeros(array_nulo);
        }
    }, [isSuccess, ticketID]);

    useEffect(() => {
        if(ticketID == -1)
        {
            const shortMessage= errorMessage?.shortMessage || "Unknown error";
            const array_nulo = Array(count).fill(null);
            const estado = 'fallida';
            axios.put(`${window.URL_BACKEND}/actualizarCompra/${registroID}`, {
                txHash: null,
                estado: estado,
                ticketID: null,
                errorMessage: shortMessage,
            });
            setNumeros(array_nulo);
        }
    }, [errorMessage, ticketID]);

    const setRandonNumbers = ()=>{
        const array_random = generateRandomNumbers(); // Generar los números aleatorios
        setNumeros(array_random);
      }
    const generateRandomNumbers = () => {
        const numbers = [];
        while (numbers.length < 6) {
          const randomNumber = Math.floor(Math.random() * 45) + 1;
          if (!numbers.includes(randomNumber)) {
            numbers.push(randomNumber);
          }
        }
        return numbers;
    };

    return (
        <Row>
            <Col className="d-grid gap-2">
                {isConnected && <Account /> }
                <hr />
                <CardTicket
                    count={6}
                    title={"Comprar un Ticket"}
                    header={"Seleccione los numeros para participar"}
                    handleButton={handleComprarTicket}
                    numeros={numeros}
                    setNumeros={setNumeros}
                    isPending={isPending}
                    isConfirmed={isSuccess}
                    error={isError?errorMessage:null}
                    hash={hash}
                >                
                    {isConnected ? <>
                        <Button variant="success" className="me-2" onClick={setRandonNumbers}>
                            <GiPerspectiveDiceSixFacesRandom size={25} />
                            Probar Suerte 
                        </Button>
                        <Button 
                            variant="primary" 
                            type="submit"  
                            disabled={ !isSorteoActivo || (isPending && !isSuccess && !errorMessage)?true:false}
                            // deshabilitado si no hay sorteo activo o esta pendiente una tx
                            >
                                Comprar Ticket ({precio} {window.SYMBOL})
                        </Button>
                        </>
                        : 
                        <Connect/> 
                    } 
                </CardTicket>
            </Col>
        </Row>
    );
}

export default SorteoActual;