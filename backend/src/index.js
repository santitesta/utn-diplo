const express = require('express')
const cors = require('cors');
const app = express();
const port = 3000
// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors({
    origin: 'http://localhost:5173',
}));

/*  Configuracion para interacutuar con un SmartContract */
const { ethers } = require('ethers');
const path = require('path'); // Para manejar rutas

// Configurar conexión a Ganache
// const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:7545');
const url = 'http://127.0.0.1:7545';
const provider = new ethers.JsonRpcProvider(url);


// Ruta al archivo ABI //C:\Users\emeoniz\Documents\REPOSITORIOS\000- GITHUB\utn-diplo\backend\artifacts
const contractJson = require('C:/Users/emeoniz/Documents/REPOSITORIOS/000- GITHUB/utn-diplo/backend/artifacts/contracts/QuiniBlockContract.sol/QuiniBlockContract.json');
const contractABI = contractJson.abi; // Extraer solo la ABI

const contractAddress = '0x481636196bb539bBc81A05F8a23c52F107f6b8d7';

// Crear una instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, provider);


/* RUTAS DE NAVEGACION */
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`El servicio Backend esta corriendo por el port ${port}`)
})

app.get('/estadoContrato', async (req, res) => {
    try {
        // Obtener del contrato
        const balance = await provider.getBalance(contractAddress);
        const balanceInEth = ethers.formatEther(balance);
        console.log(`balanceInEth: ${balanceInEth} ETH`);

        const basePotValue = await contract.basePotValue();
        const basePotValueInEth = ethers.formatEther(basePotValue);
        console.log(`basePotValue: ${basePotValueInEth} ETH`);

        const ticketPrice = await contract.ticketPrice();
        const ticketPriceInEth = ethers.formatEther(ticketPrice);
        console.log(`ticketPrice: ${ticketPriceInEth} ETH`);

        const ticketCount = await contract.ticketCount();
        console.log(`ticketCount: ${ticketCount}`);

        const isDrawActive = await contract.isDrawActive();
        console.log(`isDrawActive: ${isDrawActive}`);

        // Obtener la dirección del owner
        const owner = await contract.owner();
        console.log(`owner: ${owner}`);

        // Obtener información de sorteos
        const currentDrawId = await contract.currentDrawId();
        console.log(`currentDrawId: ${currentDrawId.toString()}`);

        let ultimoSorteoId = BigInt(currentDrawId);
        let ultimoSorteo = await contract.getDraw(ultimoSorteoId);

        if (ultimoSorteo.drawDate > 0n) {
            console.log('No hay sorteo en Curso. Finalizado.');
        } else {
            console.log('Sorteo en Curso');
            ultimoSorteoId = ultimoSorteoId - 1n;
            ultimoSorteo = await contract.getDraw(ultimoSorteoId);
        }

        // Convertir `ultimoSorteo` a un formato legible
        console.log('Ultimo Sorteo');
        const drawDate = new Date(Number(ultimoSorteo.drawDate) * 1000);
        const drawDateGmtMinus3 = drawDate.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
        console.log(`Fecha: ${drawDateGmtMinus3}`);
        const winningNumbers = ultimoSorteo.winningNumbers.map(num => Number(num));
        console.log(`Numeros Ganadores: [${winningNumbers}]`);
        const winners = ultimoSorteo.winners;
        console.log(`Address Ganadores: [${winners}]`);

        // Información de los Pozos
        const pozo = await contract.primaryPot();
        const pozoInEth = ethers.formatEther(pozo);
        console.log(`Pozo Primario: ${pozoInEth.toString()} ETH`);

        const pozo2 = await contract.secondaryPot();
        const pozo2InEth = ethers.formatEther(pozo2);
        console.log(`Pozo Secundario: ${pozo2InEth.toString()} ETH`);

        const reservePot = await contract.reservePot();
        const reservePotInEth = ethers.formatEther(reservePot);
        console.log(`Pozo Reserva: ${reservePotInEth.toString()} ETH`);

        res.json({
            contrato: {
                owner: owner,
                balance: balanceInEth,
                basePot: basePotValueInEth,
                ticketPrice: ticketPriceInEth,
                contadorTicket: ticketCount.toString(),
                isDrawActive: isDrawActive,
            },
            sorteo: {
                numero: currentDrawId.toString(),
                anterior: {
                    numero: ultimoSorteoId.toString(),
                    drawDate: drawDateGmtMinus3,
                    winningNumbers: winningNumbers,
                    winners: winners
                }
            },
            pozo: {
                primario: pozoInEth,
                secundario: pozo2InEth,
                reserva: reservePotInEth
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al interactuar con el contrato');
    }
});


app.get('/estadoContratoStatico', (req, res) => {
    const staticData = {
        contrato: {
            owner: "0x0b433B0910f195eB323A3648Dec0a5290Ffd2fF2",
            balance: "2.5",
            basePot: "2.0",
            ticketPrice: "1.0",
            contadorTicket: "6",
            isDrawActive: true,
        },
        sorteo: {
            numero: "2",
            anterior: {
                numero: "2",
                drawDate: "4/8/2024, 07:07:06",
                winningNumbers: [7, 18, 19, 29, 32, 39],
                winners: ["0x5ABBBB031ea0f2F1C26591E2698ff51943A760D6"]
            }
        },
        pozo: {
            primario: "2.0",
            secundario: "4.7",
            reserva: "0.3"
        }
    };

    res.json(staticData);
});
