const { expect } = require("chai");

describe("QuiniBlockContract", function () {
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
    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners(); // Obtenemos las cuentas de Ethereum
        QuiniBlockContract = await ethers.getContractFactory("QuiniBlockContract"); // Obtenemos la factoría del contrato
        quiniBlock = await QuiniBlockContract.deploy(owner.address); // Desplegamos el contrato
        await quiniBlock.deployed(); // Esperamos a que el contrato se despliegue
    });

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
    }

    it("1. Should start a new draw", async function () {
        await expect(quiniBlock.startDraw(primaryPot, secondaryPot))
            .to.emit(quiniBlock, 'DrawStarted')
            .withArgs(1, primaryPot);

        const primaryPotValue = await quiniBlock.primaryPotValue();
        expect(primaryPotValue).to.equal(primaryPot);

        const secondaryPotValue = await quiniBlock.secondaryPotValue();
        expect(secondaryPotValue).to.equal(secondaryPot);

        const currentDrawId = await quiniBlock.currentDrawId();
        expect(currentDrawId).to.equal(1);
    });

    it("2. Should purchase one ticket", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Iniciamos un sorteo

        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);
    });

    it("3. Should purchase multiple tickets with different owners", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Iniciamos un sorteo

        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr1, chosenNumbers2, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers3, ticketPrice);
    });

    it("4.1. Should find multiple winners after emit Draw with chosenNumbers1 as winner and verify prize distribution", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Iniciamos un sorteo

        const winnerNumber = [1, 2, 3, 4, 5, 6];

        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr1, chosenNumbers2, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers3, ticketPrice);

        const addr1BalanceBefore = await ethers.provider.getBalance(addr1.address);
        const addr2BalanceBefore = await ethers.provider.getBalance(addr2.address);

        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);
        const currentDrawId = await quiniBlock.currentDrawId();

        await expect(tx_draw)
            .to.emit(quiniBlock, 'DrawDone')
            .withArgs(currentDrawId, block.timestamp, winnerNumber, [addr1.address, addr2.address]);

        const addr1BalanceAfter = await ethers.provider.getBalance(addr1.address);
        const addr2BalanceAfter = await ethers.provider.getBalance(addr2.address);

        // Verificamos que addr1 y addr2 han recibido el premio correspondiente
        expect(addr1BalanceAfter).to.be.above(addr1BalanceBefore);
        expect(addr2BalanceAfter).to.be.above(addr2BalanceBefore);
    });

    it("4.2. Should find one winner after emit Draw with chosenNumbers3 as winner and verify prize distribution", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Iniciamos un sorteo

        const winnerNumber = [1, 2, 3, 4, 5, 7];

        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr1, chosenNumbers2, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers3, ticketPrice);

        const addr2BalanceBefore = await ethers.provider.getBalance(addr2.address);

        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);
        const currentDrawId = await quiniBlock.currentDrawId();

        await expect(tx_draw)
            .to.emit(quiniBlock, 'DrawDone')
            .withArgs(currentDrawId, block.timestamp, winnerNumber, [addr2.address]);

        const addr2BalanceAfter = await ethers.provider.getBalance(addr2.address);

        // Verificamos que addr2 ha recibido el premio correspondiente
        expect(addr2BalanceAfter).to.be.above(addr2BalanceBefore);
    });

    it("5. The pot was left vacant as there was no winner", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Iniciamos un sorteo

        const winnerNumber = [1, 20, 30, 18, 45, 6];

        await purchaseTicket(addr1, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr1, chosenNumbers2, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers1, ticketPrice);
        await purchaseTicket(addr2, chosenNumbers3, ticketPrice);

        const tx_draw = await quiniBlock.emitDraw(winnerNumber);
        const receipt = await tx_draw.wait();
        const block = await ethers.provider.getBlock(receipt.blockNumber);
        const currentDrawId = await quiniBlock.currentDrawId();

        await expect(tx_draw)
            .to.emit(quiniBlock, 'DrawDone')
            .withArgs(currentDrawId, block.timestamp, winnerNumber, []);
    });

    it("6. Should fail to purchase a ticket when contract is paused, and purchase a ticket successfully after contract is unpaused", async function () {
        await quiniBlock.startDraw(primaryPot, secondaryPot); // Start a draw
        await quiniBlock.pause(); // Pause the contract
    
        // Attempt to purchase a ticket while paused
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1, { value: ticketPrice }))
            .to.be.revertedWith("EnforcedPause"); // Expect the custom revert reason
    
        await quiniBlock.unpause(); // Unpause the contract
    
        await expect(quiniBlock.connect(addr1).purchaseTicket(chosenNumbers1, { value: ticketPrice }))
            .to.emit(quiniBlock, 'TicketPurchased')
            .withArgs(0, 1, addr1.address); // Asegúrate de ajustar los valores según corresponda
        
        const ticket = await quiniBlock.tickets(0); // Obtener el ticket recién comprado
        expect(ticket.buyer).to.equal(addr1.address);
        expect(ticket.drawId).to.equal(1);
        const ticketNumbers = await quiniBlock.getTicketNumbers(0);
        expect(ticketNumbers).to.deep.equal(chosenNumbers1);
    });
    
});
