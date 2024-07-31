const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

describe("TestIntegral", function () {

    let QuiniBlockContract;
    let quiniBlock;
    let owner;
    let addr1;
    let addr2;

    const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
    const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
    const chosenNumbers3 = [1, 2, 3, 4, 5, 7];
    const ticketPrice = ethers.utils.parseEther("0.001");

    const primaryPot= 1000;
    const secondaryPot= 500;

    // Configuramos el entorno antes de cada prueba
    const contractAddressFile = path.join(__dirname, "contractAddress.txt"); 
    before(async function () {
        //tomo address del entorno, la primera sera el owner el resto para test
        [owner, addr1, addr2] = await ethers.getSigners();
        // Factory para deploy del contrato
        QuiniBlockContract = await ethers.getContractFactory("QuiniBlockContract");
        //
        //  Hago una unica vez deploy asi que guardo el address del contrato 
        //  y luego hago muchas pruebas sobre el mismo contrato
        //
        if (fs.existsSync(contractAddressFile)) {
            const contractAddress = fs.readFileSync(contractAddressFile, "utf-8").trim();
            
            // Intenta conectar el contrato usando la dirección guardada
            try {
                quiniBlock = await QuiniBlockContract.attach(contractAddress);
                console.log(`Contrato conectado en la dirección: ${contractAddress}`);
            } catch (error) {
                console.error("Error al conectar con el contrato en la dirección guardada:", error);
                console.log("Desplegando un nuevo contrato...");
                await deployNewContract();
            }
        } else {
            // Si no existe el archivo, despliega un nuevo contrato
            console.log("No se encontró una dirección de contrato. Desplegando un nuevo contrato...");
            await deployNewContract();
        }
    });

    // Si no existe ya el contrato uso esta funcion para deployarlo
    async function deployNewContract() {
        quiniBlock = await QuiniBlockContract.deploy(owner.address);
        await quiniBlock.deployed();

        // Guarda la dirección del nuevo contrato en el archivo
        fs.writeFileSync(contractAddressFile, quiniBlock.address, "utf-8");
        console.log(`Nuevo contrato desplegado en la dirección: ${quiniBlock.address}`);
    }

    // esta funcion ejecuta y verifica todo el evento de comprar un ticket, y muestra un mensaje a consola
    async function purchaseTicket(address, chosenNumbers, ticketPrice) {
        const currentTicketId = await quiniBlock.ticketCount();
        const currentDrawId = await quiniBlock.currentDrawId();
        await expect(quiniBlock.connect(address).purchaseTicket(chosenNumbers, { value: ticketPrice }))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, address.address);
        const ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(address.address);
        expect(ticket.drawId).to.equal(currentDrawId);
        const ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers);
        console.log (`La address: ${address.address} compro el ticket numero: ${currentTicketId} y aposto a los numeros [${chosenNumbers}]`);
    }

    it("1. Verificacion del proyecto con un sorteo", async function () {

        // Iniciamos un sorteo
        await quiniBlock.startDraw(primaryPot, secondaryPot); 
        const currentDrawId = await quiniBlock.currentDrawId();
        console.log (`Se inicio el sorteo: ${currentDrawId}`);

        //Ahora pasamos al proceso de compra
        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);        
        await purchaseTicket(addr1, chosenNumbers2, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers3, ticketPrice);

        //Finalizamos el Sorteo
        const winnerNumber = chosenNumbers1; // Aca podemos variar la seleccion de numeros para cambiar los ganadores

        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const ganadores = await quiniBlock.getDraw(currentDrawId);
        console.log (`Finalizo el sorteo: ${currentDrawId}`);
        const cantGanadores=ganadores.winners.length;
        if (cantGanadores>0){
            console.log (`Hubo ${cantGanadores} Ganadores`);
            console.log (ganadores.winners);
        }else{
            console.log (`No hubo Ganadores. Pozo vacante`);
        }         


        
    });

});