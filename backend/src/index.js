const express = require('express')
const cors = require('cors');
const app = express();
const fs = require("fs");
const mysql = require('mysql2'); // Asegúrate de que esta línea esté presente
const port = 5000
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configura CORS para permitir solicitudes desde cualquier origen
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174']
}));


/*  Configuracion para interacutuar con un SmartContract */
const { ethers } = require('ethers');
const path = require('path'); // Para manejar rutas

// Configurar conexión a AMOY POLYGON
const url = "https://polygon-amoy.g.alchemy.com/v2/hNPbkU-NvBYB1-lLHafI3SbTduYNPKbz";
const provider = new ethers.JsonRpcProvider(url);

// Ruta al archivo ABI 
const contractJson = require('../abi_contracts/QuiniBlockContract.sol/QuiniBlockContract.json');
const contractABI = contractJson.abi; // Extraer solo la ABI

const contractAddress = "0x8c65ee76addbef9b2342e9bc2f759e6a7f894d63";//fs.readFileSync(contractAddressFile, "utf-8").trim();

// Crear una instancia del contrato
const contract = new ethers.Contract(contractAddress, contractABI, provider);


//CONEXION A LA BASE DE DATOS
const connection = mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'fiveblocks',
    password: process.env.DB_PASSWORD || 'password.24!',
    database: process.env.DB_NAME || 'quiniblockDB',
    port: process.env.DB_PORT || 33066
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
        const contractState = await contract.getContractState();
        const ticketPriceInEth = ethers.formatEther(contractState._ticketPrice);
        const primaryPotInEth = ethers.formatEther(contractState._primaryPot);
        const secondaryPotInEth = ethers.formatEther(contractState._secondaryPot);
        const reservePotInEth = ethers.formatEther(contractState._reservePot);
        const balanceInEth = ethers.formatEther(contractState._balance);
        const basePotValueInEth = ethers.formatEther(contractState._basePotValue);
    

        let ultimoSorteoId = BigInt(contractState._currentDrawId);
        let ultimoSorteo = await contract.getDraw(ultimoSorteoId);

        if (ultimoSorteo.drawDate > 0n) {
            //console.log('No hay sorteo en Curso. Finalizado.');
        } else {
            //console.log('Sorteo en Curso');
            ultimoSorteoId = ultimoSorteoId - 1n;
            ultimoSorteo = await contract.getDraw(ultimoSorteoId);
        }
        // Convertir `ultimoSorteo` a un formato legible
        //console.log('Ultimo Sorteo');
        const drawDate = new Date(Number(ultimoSorteo.drawDate) * 1000);
        const drawDateGmtMinus3 = drawDate.toLocaleString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
        //console.log(`Fecha: ${drawDateGmtMinus3}`);
        const winningNumbers = ultimoSorteo.winningNumbers.map(num => Number(num));
        //console.log(`Numeros Ganadores: [${winningNumbers}]`);
        const winners = ultimoSorteo.winners;
        //console.log(`Address Ganadores: [${winners}]`);

        res.json({
            contrato: {
                owner: contractState._owner,
                balance: balanceInEth,
                basePot: basePotValueInEth,
                ticketPrice: ticketPriceInEth,
                contadorTicket: contractState._ticketCount.toString(),
                isDrawActive: contractState._isDrawActive,
                isPaused: contractState._isContractPaused,
            },
            sorteo: {
                numero: contractState._currentDrawId.toString(),
                anterior: {
                    numero: ultimoSorteoId.toString(),
                    drawDate: drawDateGmtMinus3,
                    winningNumbers: winningNumbers,
                    winners: winners
                }
            },
            pozo: {
                primario: primaryPotInEth,
                secundario: secondaryPotInEth,
                reserva: reservePotInEth
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al interactuar con el contrato');
    }
})

app.post('/registrarCompra', async (req, res) => {
    try {
        const { chosenNumbers, drawId, ownerAddress } = req.body;
        // La consulta SQL (sin hash y estado pendiente)
        const query = 'INSERT INTO ticketsvendidos (numeros_elegidos, Fecha, sorteo_id, owner) VALUES (?, NOW(), ?, ?)';
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
        const { txHash, estado, ticketID, errorMessage } = req.body;

        console.log(req.body);
        // Actualizar el registro en la base de datos con el hash de la transacción y el estado
        const query = 'UPDATE ticketsvendidos SET tx_hash = ?, estado = ?, ticketID = ? WHERE id = ?';
        const values = [txHash, estado, ticketID, id];

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

            // Si hay un errorMessage, insertar en la tabla correspondiente
            if (errorMessage) {
                const query_fail = 'INSERT INTO errorMessage (tx_id, error) VALUES (?, ?)';
                const values_fail = [id, errorMessage];

                connection.query(query_fail, values_fail, (err, results) => {
                    if (err) {
                        console.error('Error salvando el mensaje de error:', err);
                        res.status(500).send('Error al guardar el mensaje de error');
                        return;
                    }

                    console.log('Mensaje de error guardado correctamente:', results);
                    res.status(200).send('Transacción y mensaje de error actualizados correctamente');
                });
            } else {
                res.status(200).send('Transacción actualizada correctamente');
            }
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.get('/historial/:address', async (req, res) => {
    try {
        const { address } = req.params;

        const query = 'SELECT * FROM ticketsvendidos WHERE owner = ? ORDER By ticketID desc';
        const values = [
            address, 
        ];
        
        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al insertar los datos en la base de datos:', err);
                res.status(500).send('Error al registrar la transacción en la base de datos');
                return;
            }

            const contractState = contract.getContractState();

            // `results.insertId` contiene el ID del registro insertado
            console.log('Transacción registrada correctamente:', results);
            res.status(200).json({
                message: 'Historial de transacciones',
                historial: results ,// Devolver el ID insertado
                sorteo: contractState._currentDrawId,

            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al interactuar con el contrato');
    }
})


app.post('/sorteos/iniciar', async (req, res) => {
    try {
        const { drawId } = req.body;
        // Insertar un nuevo sorteo con la fecha de inicio actual
        const query = 'INSERT INTO sorteos (id,fechaInicio) VALUES (?,NOW())';
        
        const values = [drawId];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error el consultar la base de datos:', err);
                res.status(500).send('Error el consultar la base de datos');
                return;
            }

            // `results.insertId` contiene el ID del sorteo iniciado
            console.log('Sorteo iniciado correctamente:', results);
            res.status(200).json({
                message: 'Sorteo iniciado correctamente',
                drawId: results.insertId // Devolver el ID del sorteo iniciado
            });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});

app.put('/sorteos/finalizar', async (req, res) => {
    try {
        const { drawId, numerosGanadores, pozoSorteado,cantGanadores, ganadores, maxNroTicket } = req.body;
        console.log(ganadores)
        // Verificar que se envíen los números ganadores y el ID del sorteo
        if (!drawId || !numerosGanadores) {
            return res.status(400).send('Se requiere drawId y numerosGanadores');
        }

        // Convertir el array de números ganadores a un string
        const numerosGanadoresStr = JSON.stringify(numerosGanadores);

        // Actualizar el sorteo con la fecha de finalización y los números ganadores
        const query = `
            UPDATE sorteos 
            SET fechaFin = NOW(), numerosGanadores = ?, pozoSorteado = ? , cantGanadores = ?, maxNroTicket= ?
            WHERE id = ?
        `;
        const values = [numerosGanadoresStr, pozoSorteado,cantGanadores,maxNroTicket,drawId];

        connection.query(query, values, (err, results) => {
            if (err) {
                console.error('Error al finalizar el sorteo en la base de datos:', err);
                res.status(500).send('Error al finalizar el sorteo en la base de datos');
                return;
            }

            if (results.affectedRows === 0) {
                res.status(404).send('No se encontró el sorteo con el ID especificado');
                return;
            }

            console.log('Sorteo finalizado correctamente:', results);
            res.status(200).json({
                message: 'Sorteo finalizado correctamente'
             });
        });
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        res.status(500).send('Error interno del servidor');
    }
});


app.get('/sorteos/historial', async (req, res) => {
    try {
        const query = 'SELECT * FROM sorteos WHERE fechaFin > 0 ORDER By id DESC';

        connection.query(query,  (err, results) => {
            if (err) {
                console.error('Error el consultar la base de datos:', err);
                res.status(500).send('Error el consultar la base de datos');
                return;
            }

            // `results.insertId` contiene el ID del registro insertado
            console.log('Transacción registrada correctamente:', results);
            res.status(200).json({
                message: 'Historial de Sorteos',
                historial: results // Devolver el ID insertado
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al interactuar con la base de datos');
    }
})