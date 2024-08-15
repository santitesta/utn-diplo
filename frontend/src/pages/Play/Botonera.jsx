import { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account from '../../components/Account';
import { Connect } from '../../components/Connect';
import PropTypes from 'prop-types';
import CardSorteo from "./CardSorteo";
import CardTicket from "./CardTicket";

// WAGMI
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi, parseEther } from 'viem';

function Botonera({ owner }) {
    // CONFIGURACION WAGMI
    const { isConnected, address } = useAccount();

    // Estado para manejar los pozos
    const [pozoPrimario, setPozoPrimario] = useState(null);
    const [pozoSecundario, setPozoSecundario] = useState(null);
    const [reservePot, setReservePot] = useState(null);

    const count = 6; // cantidad de numeros por ticket
    const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null)); 
    const [numeros, setNumeros] = useState(Array(count).fill(null)); 

    // Estado y funciones para la primera transacción (Setear Pozos)
    const { data: hash1, error: error1, isPending: isPending1, writeContract: writeContract1 } = useWriteContract({ chainId: 5777 });
    const { isLoading: isConfirming1, isSuccess: isConfirmed1 } = useWaitForTransactionReceipt({ hash: hash1 });

    const handleSetearPozos = (e) => {
        e.preventDefault();
        let primaryInWei = BigInt(pozoPrimario * 1e18);
        let secondaryInWei = BigInt(pozoSecundario * 1e18);
        let reserveInWei = BigInt(reservePot * 1e18);
        if (isConnected) {
            writeContract1({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: parseAbi(['function setPotValues(uint256 _primaryPot, uint256 _secondaryPot, uint256 _reservePot) payable']),
                functionName: 'setPotValues',
                args: [primaryInWei, secondaryInWei, reserveInWei],
            });
            console.log(`Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        } else {
            console.log(`Debe iniciar sesión para cambiar Pozos. Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        }
    };

    // Estado y funciones para la segunda transacción (Iniciar Sorteo)
    //comparten el card asi que los mensajes tambien
    const handleIniciarSorteo = (e) => {
        e.preventDefault();
        if (isConnected) {
            writeContract1({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: parseAbi(['function startDraw()']),
                functionName: 'startDraw',
            });
            console.log(`Inicio de Sorteo.`);
        } else {
            console.log(`Debe iniciar sesión para inicializar un Sorteo.`);
        }
    };

    // Estado y funciones para la tercera transacción (Comprar Ticket)
    const { data: hash3, error: error3, isPending: isPending3, writeContract: writeContract3 } = useWriteContract({ chainId: 5777 });
    const { isLoading: isConfirming3, isSuccess: isConfirmed3 } = useWaitForTransactionReceipt({ hash: hash3 });

    const handleComprarTicket = () => {
        console.log(`Se compró ticket con números [${numeros}]`);
    
        const abi = parseAbi(['function purchaseTicket(uint32[6] _chosenNumbers) payable']);
        let numerosOrdenados = [...numeros].sort((a, b) => a - b);
        if (isConnected) {
            writeContract3({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: abi,
                functionName: 'purchaseTicket',
                args: [numerosOrdenados],
                value: parseEther('1')
            })
            console.log("Compra de ticket realizada con éxito.");
        }else{
            console.log("Sin conexion.");
        }
       
    };

    // Estado y funciones para la cuarta transacción (Finalizar Sorteo)
    const { data: hash4, error: error4, isPending: isPending4, writeContract: writeContract4 } = useWriteContract({ chainId: 5777 });
    const { isLoading: isConfirming4, isSuccess: isConfirmed4 } = useWaitForTransactionReceipt({ hash: hash4 });

    const handleFinalizoSorteo = () => {
        console.log(`Se finalizó el sorteo. Ganadores numeros: [${numerosGanadores}] `);
        const abi = parseAbi(['function emitDraw(uint32[6] memory _winningNumbers)']);
        let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
        if (isConnected) {
            writeContract4({
                address: `${window.CONTRACT_ADDRESS}`,
                abi: abi,
                functionName: 'emitDraw',
                args: [numerosOrdenados],
            });
            console.log("Fin del sorteo exitoso.");
        }else{
            console.log("Sin conexion.");
        }
    };

    return (
        <Row>
            <Col className="d-grid gap-2">
                <>
                    {isConnected ? <Account owner={owner} /> : <Connect />}
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
                            isPending={isPending1}
                            isConfirming={isConfirming1}
                            isConfirmed={isConfirmed1}
                            error={error1}
                            hash={hash1}
                        />
                        <hr />
                    </>
                )}

                <CardTicket 
                    count={6} 
                    title={"Ticket"} 
                    header={"Numeros Elegidos"} 
                    buttonText={"Comprar Ticket"} 
                    handleButton={handleComprarTicket} 
                    variant="primary"
                    numeros={numeros}
                    setNumeros={setNumeros}
                    isPending={isPending3}
                    isConfirming={isConfirming3}
                    isConfirmed={isConfirmed3}
                    error={error3}
                    hash={hash3}
                />
                
                <hr />
                {address === owner && (
                <>
                    <CardTicket 
                        count={6} 
                        title={"Sorteo"} 
                        header={"Numeros Ganadores"} 
                        buttonText={"Finalizar"} 
                        handleButton={handleFinalizoSorteo} 
                        variant="success"
                        numeros={numerosGanadores}
                        setNumeros={setNumerosGanadores}
                        isPending={isPending4}
                        isConfirming={isConfirming4}
                        isConfirmed={isConfirmed4}
                        error={error4}
                        hash={hash4}
                    />
                    <hr />
                </>
                )}
            </Col>
        </Row>
    );
}

Botonera.propTypes = {
    owner: PropTypes.string.isRequired,
};

export default Botonera;
