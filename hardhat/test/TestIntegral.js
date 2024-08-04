const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

describe("TestIntegral", function () {

    let QuiniBlockContract;
    let quiniBlock;
    let owner;
    let addr1;
    let addr2;

    // const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
    // const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
    // const chosenNumbers3 = [1, 2, 3, 4, 5, 7];
    const ticketPrice = ethers.utils.parseEther("1");

    const basePotValue = ethers.utils.parseEther("2"); //entiendo que wei
    
    // const primaryPot= 1000;
    // const secondaryPot= 500;

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
        quiniBlock = await QuiniBlockContract.deploy(basePotValue,owner.address);
        await quiniBlock.deployed();

        // Guarda la dirección del nuevo contrato en el archivo
        fs.writeFileSync(contractAddressFile, quiniBlock.address, "utf-8");
        console.log(`Nuevo contrato desplegado en la dirección: ${quiniBlock.address}`);

        //Configuro el cotrato
        //pozos primario,secundario,reserva
        await quiniBlock.setPotValues(basePotValue,basePotValue,0); 
        //porcentajes de distribucion primario,secundario,reserva
        await quiniBlock.setPotPercentages(25,70,5); 
        //Cambio el precio del ticket 
        await quiniBlock.setTicketPrice(ticketPrice); 
    }

    // esta funcion ejecuta y verifica todo el evento de comprar un ticket, y muestra un mensaje a consola
    async function purchaseTicket(buyer, chosenNumbers, ticketPrice) {
        const currentTicketId = await quiniBlock.ticketCount();
        const currentDrawId = await quiniBlock.currentDrawId();
        //hay una verificacion de los numeros y piden que esten en orden
        const orderChosenNumbers = await quiniBlock.orderNumbers(chosenNumbers);
        await expect(quiniBlock.connect(buyer).purchaseTicket(chosenNumbers, { value: ticketPrice }))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, buyer.address);

        const ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(buyer.address);
        expect(ticket.drawId).to.equal(currentDrawId);
        const ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(orderChosenNumbers);
        console.log (`La address: ${buyer.address} compro el ticket numero: ${currentTicketId} y aposto a los numeros [${chosenNumbers}]`);
    }

    // Funcion para generar numeros aleatorios
    function generateUniqueNumbers() {
        const chosenNumbers = [];
        while (chosenNumbers.length < 6) {
            const randomNumber = Math.floor(Math.random() * 46); // Genera un número entre 0 y 45
            if (!chosenNumbers.includes(randomNumber)) {
                chosenNumbers.push(randomNumber);
            }
        }
        
        return chosenNumbers;
    }
    
    async function printBalances(momento){
        console.log(`\n########################## SALDOS ${momento} ##########################`);
        //Ver balances en el contrato y address luego de comprar
        const balanceAfter  = await ethers.provider.getBalance(addr1.address);
        console.log(`Balance de ${addr1.address} : ${ethers.utils.formatEther(balanceAfter )} ETH`);

        const balanceAfter2 = await ethers.provider.getBalance(addr2.address);
        console.log('\x1b[35m%s\x1b[0m',`Balance de ${addr2.address} : ${ethers.utils.formatEther(balanceAfter2)} ETH`); //Lo imprimo en color para diferenciar el ganador y sus saldos
 
        // Obtener el saldo del contrato antes de la compra
        const contractBalanceAfter  = await ethers.provider.getBalance(quiniBlock.address);
        console.log(`Balance del contrato : ${ethers.utils.formatEther(contractBalanceAfter )} ETH`);
        console.log('############################################################\n\n');
    }

    it("1. Inicio el sorteo. Compro varios tickets, sorteo con pozo vacante", async function () {

        [owner, addr1, addr2] = await ethers.getSigners();
      

        // Iniciamos un sorteo
        await quiniBlock.startDraw(); 
        const currentDrawId = await quiniBlock.currentDrawId();
        console.log (`Se inicio el sorteo: ${currentDrawId}`);

        const winnerNumber = generateUniqueNumbers();
        
        await printBalances("INICIO");

        //Ahora pasamos al proceso de compra
        await purchaseTicket(addr1, generateUniqueNumbers(), ticketPrice);        
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice);
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice); //este lo resuelvo asi para ganar al menos una vez

        await printBalances("DESPUES DE COMPRAR");

         //Finalizamos el Sorteo
         const pozo = await quiniBlock.primaryPot();
         const pozo1_eth= ethers.utils.formatEther(pozo);
         
         const tx_draw = await quiniBlock.emitDraw(winnerNumber);
         const ganadores = await quiniBlock.getDraw(currentDrawId);
         console.log (`Finalizo el sorteo: ${currentDrawId}`);
         console.log (`Pozo Primario: ${pozo1_eth} Eth`);
         const cantGanadores= ganadores.winners.length;

        if (cantGanadores>0){
            console.log (`El sorteo reparte: ${pozo_eth} ETH`);
            console.log ('\x1b[36m%s\x1b[0m',`Hubo ${cantGanadores} Ganadores`);
            console.log (ganadores.winners);
           // console.log (`Cada uno debio recibir ${ethers.utils.formatEther(pozo/cantGanadores)} eth`);
        }else{
            console.log ('\x1b[31m%s\x1b[0m', `No hubo Ganadores. Pozo vacante`);
        }         
        await printBalances("AL FINALIZAR");

        
    });

    it("2. Inicio el sorteo. Compro varios tickets, sorteo con 1 ganador", async function () {

        [owner, addr1, addr2] = await ethers.getSigners();
      

        // Iniciamos un sorteo
        await quiniBlock.startDraw(); 
        const currentDrawId = await quiniBlock.currentDrawId();
        console.log (`Se inicio el sorteo: ${currentDrawId}`);

        const winnerNumber = generateUniqueNumbers();
        
        await printBalances("INICIO");

        //Ahora pasamos al proceso de compra
        await purchaseTicket(addr1, generateUniqueNumbers(), ticketPrice);        
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice);
        await purchaseTicket(addr2, winnerNumber, ticketPrice); //este lo resuelvo asi para ganar al menos una vez

        await printBalances("DESPUES DE COMPRAR");

        //Finalizamos el Sorteo
        const pozo = await quiniBlock.primaryPot();
        const pozo1_eth= ethers.utils.formatEther(pozo);
        
        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const ganadores = await quiniBlock.getDraw(currentDrawId);
        console.log (`Finalizo el sorteo: ${currentDrawId}`);
        console.log (`Pozo Primario: ${pozo1_eth} Eth`);
        const cantGanadores= ganadores.winners.length;

        if (cantGanadores>0){
            const division = pozo.div(cantGanadores);
            const pozo_eth= ethers.utils.formatEther(division);
            console.log (`El sorteo reparte: ${pozo_eth} ETH por ganador`);
            console.log ('\x1b[36m%s\x1b[0m',`Hubo ${cantGanadores} Ganadores`);
            console.log (ganadores.winners);
           // console.log (`Cada uno debio recibir ${ethers.utils.formatEther(pozo/cantGanadores)} eth`);
        }else{
            console.log ('\x1b[31m%s\x1b[0m', `No hubo Ganadores. Pozo vacante`);
        }         
        await printBalances("AL FINALIZAR");

        
    });


    
});