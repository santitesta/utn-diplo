// Importamos Chai para las aserciones y la función expect
const { expect } = require("chai");

describe("QuiniBlockContract", function () {
    let QuiniBlockContract;
    let quiniBlock;
    let owner;
    let addr1;
    let addr2;

    // Configuramos el entorno antes de cada prueba
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // Obtenemos las cuentas de Ethereum
        QuiniBlockContract = await ethers.getContractFactory("QuiniBlockContract"); // Obtenemos la factoría del contrato
        quiniBlock = await QuiniBlockContract.deploy(owner.address); // Desplegamos el contrato
        await quiniBlock.deployed(); // Esperamos a que el contrato se despliegue
    });

    it("1. Should start a new draw", async function () {
        await expect(quiniBlock.startDraw(1000, 500))
        .to.emit(quiniBlock, 'DrawStarted')
        .withArgs(1, 1000); // Comprobamos que se emite el evento DrawStarted con los argumentos correctos

        const primaryPotValue = await quiniBlock.primaryPotValue();
        expect(primaryPotValue).to.equal(1000);

        const secondaryPotValue = await quiniBlock.secondaryPotValue();
        expect(secondaryPotValue).to.equal(500);

        const currentDrawId = await quiniBlock.currentDrawId();
        expect(currentDrawId).to.equal(1);
    });

    it("2. Should purchase one ticket", async function () {
        await quiniBlock.startDraw(1000, 500); // Iniciamos un sorteo

        const chosenNumbers1 = [1, 2, 3, 4, 5, 6];

        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1))
        .to.emit(quiniBlock, 'TicketPurchased')
        .withArgs(0, 1, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        const ticket1 = await quiniBlock.tickets(0);
        expect(ticket1.buyer).to.equal(addr1.address);
        expect(ticket1.drawId).to.equal(1);
    
        const ticketNumbers = await quiniBlock.getTicketNumbers(0);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

    });

    it("3. Should purchase multiple tickets with different owners", async function () {
        await quiniBlock.startDraw(1000, 500); // Iniciamos un sorteo

        const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
        const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
        const chosenNumbers3 = [1, 2, 3, 4, 5, 7];

        // Obtengo el número de jugada actual
        const currentDrawId = await quiniBlock.currentDrawId();

        // address1 compra su primer ticket
        let currentTicketId = await quiniBlock.ticketCount();
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        let ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        let ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address1 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers2))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers2);

        // address2 compra su primer ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address2 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers3))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers3);
    });

    
    it("4.1. Should find multiple winners after emit Draw with chosenNumbers1  as winner", async function () {
        await quiniBlock.startDraw(1000, 500); // Iniciamos un sorteo

        const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
        const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
        const chosenNumbers3 = [1, 2, 3, 4, 5, 7];
        const winnerNumber = [1, 2, 3, 4, 5, 6];

        // Obtengo el número de jugada actual
        const currentDrawId = await quiniBlock.currentDrawId();

        // address1 compra su primer ticket
        let currentTicketId = await quiniBlock.ticketCount();
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        let ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        let ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address1 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers2))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers2);

        // address2 compra su primer ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address2 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers3))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers3);

        tx_draw = await quiniBlock.emitDraw(winnerNumber);
        //obtengo el numero de bloque para obtener la hora del bloque
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);

        //verificar datos seteados en el sorteo
        draw = await quiniBlock.getDraw(currentDrawId);
        // console.log('Draw',draw);

        await expect(tx_draw)
        .to.emit(quiniBlock, 'DrawDone')
        .withArgs(
            currentDrawId,
            block.timestamp,
            winnerNumber,
            [addr1.address, addr2.address]
        );
    });

    it("4.2. Should found one winner after emit Draw with chosenNumbers3  as winner", async function () {
        await quiniBlock.startDraw(1000, 500); // Iniciamos un sorteo

        const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
        const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
        const chosenNumbers3 = [1, 2, 3, 4, 5, 7];
        const winnerNumber = [1, 2, 3, 4, 5, 7];

        // Obtengo el número de jugada actual
        const currentDrawId = await quiniBlock.currentDrawId();

        // address1 compra su primer ticket
        let currentTicketId = await quiniBlock.ticketCount();
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        let ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        let ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address1 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers2))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers2);

        // address2 compra su primer ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address2 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers3))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers3);

        tx_draw = await quiniBlock.emitDraw(winnerNumber);
        //obtengo el numero de bloque para obtener la hora del bloque
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);

        //verificar datos seteados en el sorteo
        draw = await quiniBlock.getDraw(currentDrawId);
        // console.log('Draw',draw);

        await expect(tx_draw)
        .to.emit(quiniBlock, 'DrawDone')
        .withArgs(
            currentDrawId,
            block.timestamp,
            winnerNumber,
            [addr2.address]
        );
    });

    it("5. The pot was left vacant as there was no winner", async function () {
        await quiniBlock.startDraw(1000, 500); // Iniciamos un sorteo

        const chosenNumbers1 = [1, 2, 3, 4, 5, 6];
        const chosenNumbers2 = [5, 6, 7, 8, 9, 10];
        const chosenNumbers3 = [1, 2, 3, 4, 5, 7];
        const winnerNumber = [1, 20, 30, 18, 45, 6];

        // Obtengo el número de jugada actual
        const currentDrawId = await quiniBlock.currentDrawId();

        // address1 compra su primer ticket
        let currentTicketId = await quiniBlock.ticketCount();
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        let ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        let ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address1 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers2))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr1.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers2);

        // address2 compra su primer ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers1))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);

        // address2 compra su segundo ticket
        currentTicketId = await quiniBlock.ticketCount(); // Incrementa para el siguiente ticket
        await expect(quiniBlock.connect(addr2).purchaseTicket(chosenNumbers3))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(currentTicketId, currentDrawId, addr2.address); // Comprobamos que se emite el evento TicketPurchased con los argumentos correctos

        ticket = await quiniBlock.tickets(currentTicketId);
        expect(ticket.buyer).to.equal(addr2.address);
        expect(ticket.drawId).to.equal(currentDrawId);

        ticketNumbers = await quiniBlock.getTicketNumbers(currentTicketId);
        expect(ticketNumbers).to.deep.equal(chosenNumbers3);

        tx_draw = await quiniBlock.emitDraw(winnerNumber);
        //obtengo el numero de bloque para obtener la hora del bloque
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);

        //verificar datos seteados en el sorteo
        draw = await quiniBlock.getDraw(currentDrawId);
        // console.log('Draw',draw);

        await expect(tx_draw)
        .to.emit(quiniBlock, 'DrawDone')
        .withArgs(
            currentDrawId,
            block.timestamp,
            winnerNumber,
            []
        );
    });

});
