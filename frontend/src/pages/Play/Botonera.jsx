import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account  from '../../components/Account';
import { Connect } from '../../components/Connect';
import PropTypes from 'prop-types';
import CardSorteo from "./CardSorteo"; // Si lo importas aquí, no debes declarar el componente en el mismo archivo.
import CardTicket from "./CardTicket";

//WAGMI
import { useWriteContract } from 'wagmi';
import { parseAbi, parseEther } from 'viem';

function Botonera({ owner }) {
    //CONFIGURACION WAGMI
    const { isConnected, address } = useAccount();
    const { data: hash, error, isPending, writeContract } = useWriteContract({
        chainId: 5777, // Asegúrate de especificar la cadena local
    });

    //POZOS
    const [pozoPrimario, setPozoPrimario] =useState(null);
    const [pozoSecundario, setPozoSecundario] = useState(null);
    const [reservePot, setReservePot] = useState(null);

    const count = 6; //cantidad de numeros por ticket
    const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null)); // Estado para rastrear los valores de los inputs
    const [numeros, setNumeros] = useState(Array(count).fill(null)); // Estado para rastrear los valores de los inputs

    const handleSetearPozos = (e) => {
        e.preventDefault();
        let primaryInWei = BigInt(pozoPrimario*1e18);
        let secondaryInWei = BigInt(pozoSecundario*1e18);
        let reserveInWei = BigInt(reservePot*1e18);
        if(isConnected ){
            writeContract({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: parseAbi(['function setPotValues(uint256 _primaryPot, uint256 _secondaryPot, uint256 _reservePot) payable']),
                functionName: 'setPotValues',
                args: [primaryInWei,secondaryInWei,reserveInWei], //ETH to wei
            });
            console.log(`Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        }else{
            console.log(`Debe inciar Sesion para para cambiar Pozos. Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        }
    };

    const handleIniciarSorteo = (e) => {
        e.preventDefault();
        let primaryInWei = BigInt(pozoPrimario*1e18);
        let secondaryInWei = BigInt(pozoSecundario*1e18);
        let reserveInWei = BigInt(reservePot*1e18);
        if(isConnected ){
            writeContract({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: parseAbi(['function setPotValues(uint256 _primaryPot, uint256 _secondaryPot, uint256 _reservePot) payable']),
                functionName: 'setPotValues',
                args: [primaryInWei,secondaryInWei,reserveInWei], //ETH to wei
            });
            console.log(`Inicio de Sorteo.`);
        }else{
            console.log(`Debe inciar Sesion para inicializar un Sorteo.`);
        }
    };

    const handleComprarTicket = () => {
        console.log(`Se compro ticket. con numeros [${numeros}] `);

        const abi = parseAbi(['function purchaseTicket(uint32[6] _chosenNumbers) payable']);
        let numerosOrenados = [...numeros].sort((a, b) => a - b);
        writeContract({
            address: `${window.CONTRACT_ADDRESS}`,
            abi: abi,
            functionName: 'purchaseTicket',
            args: [numerosOrenados],  // Asegúrate de que los números elegidos sean correctos
            value: parseEther('1')  // Asumiendo que 1 ETH es el valor a enviar
        })
    };

    const handleFinalizoSorteo = () => {
        console.log(`Se cofinalizo el sorteo. Ganadores numeros: [${numerosGanadores}] `);
        const abi = parseAbi(['function emitDraw(uint32[6] memory _winningNumbers)']);
        let numerosOrenados = [...numerosGanadores].sort((a, b) => a - b);
        writeContract({
            address: `${window.CONTRACT_ADDRESS}`,
            abi: abi,
            functionName: 'emitDraw',
            args: [numerosOrenados],  // Asegúrate de que los números elegidos sean correctos
        })
    };

    return (
        <Row>
            <Col className="d-grid gap-2">
                <>
                    {isConnected ? <Account owner={owner}/> : <Connect />}
                </>
                <hr />
                {address === owner && (
                    <>
                       <CardSorteo
                            title={"Sorteo"} 
                            buttonText={"Cambiar Pozos"} 
                            buttonText2={"Iniciar Sorteo"} 
                            pozoPrimario={pozoPrimario}  
                            pozoSec={pozoSecundario}  
                            reservePot={reservePot}  
                            setPozoPrimario={setPozoPrimario}  
                            setPozoSec={setPozoSecundario}  
                            setReservePot={setReservePot}  
                            handleSubmit={handleSetearPozos}
                            handleSubmit2={handleIniciarSorteo}
                            buttonEnable = {isPending}
                            error = {error}
                            hash = {hash}
                        />
                        <hr />
                    </>
                )}

                <CardTicket 
                    count={6} 
                    title={"Ticket"} 
                    header={"Numeros Elegidos"} 
                    buttonText={"Comprar Ticket"} 
                    handleButton= { handleComprarTicket} 
                    variant="primary"
                    numeros= {numeros}
                    setNumeros={setNumeros}
                    buttonEnable = {isPending}
                    error = {error}
                    hash = {hash}
                />
                
                <hr />
                {address === owner && (
                <>
                    <CardTicket 
                        count={6} 
                        title={"Sorteo"} 
                        header={"Numeros Ganadores"} 
                        buttonText={"Finalizar"} 
                        handleButton= { handleFinalizoSorteo} 
                        variant="success"
                        numeros= {numerosGanadores}
                        setNumeros={setNumerosGanadores}
                        buttonEnable = {isPending}
                        error = {error}
                        hash = {hash}
                    />
                </>
                )}
            </Col>
        </Row>
    );
}

Botonera.propTypes = {
    owner: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
};

export default Botonera;