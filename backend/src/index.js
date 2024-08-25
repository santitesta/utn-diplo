const express = require('express')
const cors = require('cors');
const app = express();
const fs = require("fs");
const mysql = require('mysql'); // Asegúrate de que esta línea esté presente
const port = 3000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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


// Ruta al archivo ABI 
const contractJson = require('../../hardhat/artifacts/contracts/QuiniBlockContract.sol/QuiniBlockContract.json');
const contractABI = contractJson.abi; // Extraer solo la ABI

//const contractAddress = '0x481636196bb539bBc81A05F8a23c52F107f6b8d7';
const contractAddressFile = path.join("../hardhat/test/", "contractAddress.txt"); 
const contractAddress = fs.readFileSync(contractAddressFile, "utf-8").trim();
// Crear una instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, provider);


//CONEXION A LA BASE DE DATOS
// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'quiniblockDB'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

/* RUTAS DE NAVEGACION */
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

app.post('/registrarCompra', async (req, res) => {
    try {
        const { chosenNumbers, drawId, ownerAddress } = req.body;
        // La consulta SQL (sin hash y estado pendiente)
        const query = 'INSERT INTO ticketsvendidos (numeros_elegidos, Fecha, Nro_Sorteo, owner) VALUES (?, NOW(), ?, ?)';
        const values = [
            JSON.stringify(chosenNumbers), // Convierte el array a string para almacenarlo en la BD
            drawId,
            ownerAddress
        ];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al insertar los datos en la base de datos:', err);
                res.status(500).send('Error al registrar la transacción en la base de datos');
                return;
            }

            // `results.insertId` contiene el ID del registro insertado
            console.log('Transacción registrada correctamente:', results);
            res.status(200).json({
                message: 'Transacción registrada correctamente',
                id: results.insertId // Devolver el ID insertado
            });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put('/actualizarCompra/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { txHash, estado, ticketID } = req.body;

        // Actualizar el registro en la base de datos con el hash de la transacción y el estado
        const query = 'UPDATE ticketsvendidos SET tx_hash = ?, estado = ?, ticketID= ? WHERE id = ?';
        const values = [txHash, estado,ticketID, id];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al actualizar la transacción en la base de datos:', err);
                res.status(500).send('Error al actualizar la transacción');
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).send('Transacción no encontrada');
                return;
            }

            console.log('Transacción actualizada correctamente:', results);
            res.status(200).send('Transacción actualizada correctamente');
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});
