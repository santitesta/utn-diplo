const { expect } = require("chai");
const fs = require("fs");
const path = require("path");

describe("TestIntegral", function () {

    let QuiniBlockContract;
    let quiniBlock;
    let owner;
    let addr1;
    let addr2;
    let addr3;
    let addr4;

    const ticketPrice = ethers.utils.parseEther("1");

    const basePotValue = ethers.utils.parseEther("2"); //entiendo que wei

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
        console.log('\x1b[34m%s\x1b[0m',`\n############################## SALDOS ${momento} ##############################`);
        //Ver balances en el contrato y address luego de comprar
        const addresses = [
            { label: 'contrato', address: quiniBlock.address }, 
            { label: 'addr1', address: addr1.address },
            { label: 'addr2', address: addr2.address },
            { label: 'addr3', address: addr3.address },
            { label: 'addr4', address: addr4.address }
        ];
    
        for (let i = 0; i < addresses.length; i++) {
            const balance = await ethers.provider.getBalance(addresses[i].address);
            const label = addresses[i].label === 'contrato' ? 'Balance del contrato' : `Balance de ${addresses[i].address}`;
            let colorCode;
            if (addresses[i].label === 'contrato') {
                colorCode = '\x1b[31m%s\x1b[0m'; // Rojo para el contrato
            } else if (i === 2 || i === 4) {
                colorCode = '\x1b[35m%s\x1b[0m'; // Magenta para addr2 y addr4
            } else {
                colorCode = '%s'; // Sin color para el resto
            }
            console.log(colorCode, `${label} : ${ethers.utils.formatEther(balance)} ETH`);
        }
        console.log('\x1b[34m%s\x1b[0m','#################################################################################\n\n');
    }

    it("1. Inicio el sorteo. Compro varios tickets, sorteo con pozo vacante", async function () {

        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      

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
         const tx_draw = await quiniBlock.emitDraw(winnerNumber);
         const ganadores = await quiniBlock.getDraw(currentDrawId);
         console.log (`Finalizo el sorteo: ${currentDrawId}`);
         const pozo = await quiniBlock.primaryPot();
         const pozo1_eth= ethers.utils.formatEther(pozo);
         console.log (`Pozo Primario: ${pozo1_eth} Eth`);
 
         const pozo2 = await quiniBlock.secondaryPot();
         const pozo2_eth= ethers.utils.formatEther(pozo2);
         console.log (`Pozo Secundario: ${pozo2_eth} Eth`);
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

        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      

        // Iniciamos un sorteo
        await quiniBlock.startDraw(); 
        const currentDrawId = await quiniBlock.currentDrawId();
        console.log (`Se inicio el sorteo: ${currentDrawId}`);

        const winnerNumber = generateUniqueNumbers();
        
      //  await printBalances("INICIO");

        //Ahora pasamos al proceso de compra
        await purchaseTicket(addr1, generateUniqueNumbers(), ticketPrice);        
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice);
        await purchaseTicket(addr2, winnerNumber, ticketPrice); //este lo resuelvo asi para ganar al menos una vez

       // await printBalances("DESPUES DE COMPRAR");

        // Finalizamos el Sorteo
        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const receipt = await tx_draw.wait();

        // Escuchar el evento AdjustPots
        const event1 = receipt.events.find(event => event.event === 'PreAdjustPots');
        const event2 = receipt.events.find(event => event.event === 'AdjustPots');
        if (event1) {
            const [newPrimaryPot, newSecondaryPot, newBaseyPot] = event1.args;
            const newPrimaryPotEth = ethers.utils.formatEther(newPrimaryPot);
            const newSecondaryPotEth = ethers.utils.formatEther(newSecondaryPot);
            const newBaseyPotEth = ethers.utils.formatEther(newBaseyPot);
            console.log('\x1b[36m%s\x1b[0m',`PreAdjustPots event: Primary Pot - ${newPrimaryPotEth} Eth, Secondary Pot - ${newSecondaryPotEth} Eth , Secondary Pot - ${newBaseyPotEth} Eth`);
        } else {
            console.log('No AdjustPots event found.');
        }
        if (event2) {
            const [newPrimaryPot, newSecondaryPot] = event2.args;
            const newPrimaryPotEth = ethers.utils.formatEther(newPrimaryPot);
            const newSecondaryPotEth = ethers.utils.formatEther(newSecondaryPot);
            console.log('\x1b[36m%s\x1b[0m',`AdjustPots event: Primary Pot - ${newPrimaryPotEth} Eth, Secondary Pot - ${newSecondaryPotEth} Eth`);
        } else {
            console.log('No AdjustPots event found.');
        }
        
        const ganadores = await quiniBlock.getDraw(currentDrawId);
        console.log (`Finalizo el sorteo: ${currentDrawId}`);

        const pozo = await quiniBlock.primaryPot();
        const pozo1_eth= ethers.utils.formatEther(pozo);
        console.log (`Pozo Primario: ${pozo1_eth} Eth`);

        const pozo2 = await quiniBlock.secondaryPot();
        const pozo2_eth= ethers.utils.formatEther(pozo2);
        console.log (`Pozo Secundario: ${pozo2_eth} Eth`);
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

        const _pozo = await quiniBlock.primaryPot();
        const _pozo1_eth= ethers.utils.formatEther(_pozo);
        console.log (`Pozo Primario: ${_pozo1_eth} Eth`);

        const _pozo2 = await quiniBlock.secondaryPot();
        const _pozo2_eth= ethers.utils.formatEther(_pozo2);
        console.log (`Pozo Secundario: ${_pozo2_eth} Eth`);
        
    });


    
    it("3. Comprar mas ticket y dejar el sorteo abierto", async function () {

        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
      

        // Iniciamos un sorteo
        let currentDrawId;

        try {
            // Intentamos iniciar un sorteo
            await quiniBlock.startDraw(); 
            currentDrawId = await quiniBlock.currentDrawId();
            console.log(`Se inició el sorteo: ${currentDrawId}`);
        } catch (error) {
            // Si falla, significa que ya hay un sorteo activo
            currentDrawId = await quiniBlock.currentDrawId();
            console.log(`Existe sorteo activo: ${currentDrawId}`);
        }

        const winnerNumber = generateUniqueNumbers();
        
        await printBalances("INICIO");

        //Ahora pasamos al proceso de compra
        await purchaseTicket(addr1, generateUniqueNumbers(), ticketPrice);        
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice);
        await purchaseTicket(addr2, generateUniqueNumbers(), ticketPrice); 
        await purchaseTicket(addr3, generateUniqueNumbers(), ticketPrice);        
        await purchaseTicket(addr3, generateUniqueNumbers(), ticketPrice);
        await purchaseTicket(addr4, generateUniqueNumbers(), ticketPrice); 

        await printBalances("DESPUES DE COMPRAR");
        
    });
    it("4. Finalizar Sorteo", async function () {
        [owner, addr1, addr2, addr3, addr4] = await ethers.getSigners();
    
        const winnerNumber = generateUniqueNumbers();
        
        let currentDrawId = await quiniBlock.currentDrawId();
    
        try {
            // Intentamos finalizar el sorteo actual
            const tx_draw = await quiniBlock.emitDraw(winnerNumber);
            console.log(`Finalizo el sorteo: ${currentDrawId}`);
        } catch (error) {
            // Si falla, capturamos el error y verificamos que es porque no hay sorteos activos
            if (error.message.includes("No active draw in progress")) {
                const message = 'No hay sorteos activos. Verificando el último sorteo.';
                console.log('\x1b[31m%s\x1b[0m','#'.repeat(message.length))
                console.log('\x1b[31m%s\x1b[0m',message);
                console.log('\x1b[31m%s\x1b[0m','#'.repeat(message.length))
                currentDrawId = currentDrawId-1; // Restamos 1 para verificar el sorteo anterior
            } else {
                // Si es otro tipo de error, lanzamos la excepción
                throw error;
            }
        }
    
        const ganadores = await quiniBlock.getDraw(currentDrawId);
        const cantGanadores = ganadores.winners.length;
        const pozo = await quiniBlock.primaryPot();
        const pozo1_eth= ethers.utils.formatEther(pozo);
        console.log (`Pozo Primario: ${pozo1_eth} Eth`);

        const pozo2 = await quiniBlock.secondaryPot();
        const pozo2_eth= ethers.utils.formatEther(pozo2);
        console.log (`Pozo Secundario: ${pozo2_eth} Eth`);
    
        if (cantGanadores > 0) {
            const division = pozo.div(cantGanadores);
            const pozo_eth = ethers.utils.formatEther(division);
            console.log(`El sorteo reparte: ${pozo_eth} ETH por ganador`);
            console.log('\x1b[36m%s\x1b[0m', `Hubo ${cantGanadores} Ganadores`);
            console.log(ganadores.winners);
        } else {
            console.log('\x1b[31m%s\x1b[0m', `No hubo Ganadores. Pozo vacante`);
        }
    
        await printBalances("AL FINALIZAR");
    });
    it("5. Deploy", async function () {
        let currentDrawId;
        currentDrawId = await quiniBlock.currentDrawId();
        console.log(`Existe sorteo activo Numero: ${currentDrawId}`);
    });
});