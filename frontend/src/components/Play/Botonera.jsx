import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import CardTicket from "./CardTicket";
import CardSorteo from "./CardSorteo";
import InformacionContrato from "./InformacionContrato";

function Botonera() {

    const [pozoPrimario, setPozoPrimario] = useState(0); // Estado para rastrear los valores de los inputs
    const [pozoSecundario, setPozoSecundario] = useState(0); // Estado para rastrear los valores de los inputs

    const count = 6; //cantidad de numeros por ticket
    const [numeros, setNumeros] = useState(Array(count).fill(null)); // Estado para rastrear los valores de los inputs

    const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null)); // Estado para rastrear los valores de los inputs


    const handleComprarTicket = () => {
        const numerosOrdenados= [...numeros].sort((a, b) => a - b);
        console.log(`El usuario compro el ticket con los numeros: [${numerosOrdenados}]`);
    };

    const handleIniciarSorteo = () => {
        console.log(`Inicio de Sorte. Pozo Primario[${pozoPrimario}]  Pozo Primario[${pozoSecundario}]`);
    };

    const handleFinSorteo = () => {
        const numerosOrdenados= [...numerosGanadores].sort((a, b) => a - b);
        console.log(`Se finalizo el sorteo con los numeros [${numerosOrdenados}] como ganadores`);
    };

    const [address, setAddress] = useState(null); // Estado para rastrear los valores de los inputs

    const handleLogin = async () => {
        if (window.ethereum) {
            try {
                // Solicitar acceso a la cuenta de MetaMask
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setAddress(accounts[0]); // Guardar la dirección de la cuenta seleccionada
                console.log(`Logged in with address: ${accounts[0]}`);
            } catch (error) {
                console.error('User denied account access', error);
            }
        } else {
            console.error('MetaMask not detected');
        }
    };

  return (
    <Row>
        <Col className="d-grid gap-2">
            <Button variant="outline-warning" onClick={handleLogin}>Conectar Wallet</Button>
            {address && <p>Address Conectada: {address}</p>}
            <hr/>
            <CardSorteo title={"Sorteo"} buttonText={"Iniciar Sorteo"} pozoPrimario={pozoPrimario}  setPozoPrimario={setPozoPrimario}  pozoSec={pozoSecundario}  setPozoSec={setPozoSecundario}  handleButton={()=>handleIniciarSorteo()}/>
            <hr/>
            <CardTicket count={6} title={"Ticket"} buttonText={"Comprar Ticket"} handleButton= {()=> handleComprarTicket()} numeros={numeros} setNumeros ={(x)=>setNumeros(x)}/>
            <hr/>
            <CardTicket count={6} variant="outline-success" title={"Ganador"} buttonText={"Fin Sorteo"} handleButton= {()=> handleFinSorteo()} numeros={numerosGanadores} setNumeros ={(x)=>setNumerosGanadores(x)}/>
        </Col>
    </Row>
  );
}

export default Botonera;
