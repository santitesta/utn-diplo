const { expect } = require("chai");

describe("QuiniBlockPotManager", function () {
    let QuiniBlockPotManager;
    let potManager;
    let owner;

    const basePotValue = 1000;
    const primaryPot = 500;
    const secondaryPot = 300;
    const reservePot = 200;

    const primaryPotPercentage = 30;
    const secondaryPotPercentage = 60;
    const reservePotPercentage = 10;

    // Configuramos el entorno antes de cada prueba
    beforeEach(async function () {
        [owner] = await ethers.getSigners(); // Obtenemos las cuentas de Ethereum
        QuiniBlockPotManager = await ethers.getContractFactory("QuiniBlockPotManager"); // Obtenemos la factoría del contrato
        potManager = await QuiniBlockPotManager.deploy(basePotValue, owner.address); // Desplegamos el contrato con el valor base del pozo
        await potManager.deployed(); // Esperamos a que el contrato se despliegue
    });

    it("1. Should create the contract and set the base pot, set pot values and set percentages", async function () {
        // Verificar que el valor base del pozo esté establecido correctamente
        expect(await potManager.basePotValue()).to.equal(basePotValue);

        // Establecer los valores de los pozos
        await potManager.setPotValues(primaryPot, secondaryPot, reservePot);
        expect(await potManager.primaryPot()).to.equal(primaryPot);
        expect(await potManager.secondaryPot()).to.equal(secondaryPot);
        expect(await potManager.reservePot()).to.equal(reservePot);

        // Establecer los porcentajes de los pozos
        await potManager.setPotPercentages(primaryPotPercentage, secondaryPotPercentage, reservePotPercentage);
        expect(await potManager.primaryPotPercentage()).to.equal(primaryPotPercentage);
        expect(await potManager.secondaryPotPercentage()).to.equal(secondaryPotPercentage);
        expect(await potManager.reservePotPercentage()).to.equal(reservePotPercentage);
    });

    it("2. Should increment pots correctly", async function () {
        const totalIncrement = 1000;
        const expectedPrimaryIncrement = (totalIncrement * primaryPotPercentage) / 100;
        const expectedSecondaryIncrement = (totalIncrement * secondaryPotPercentage) / 100;
        const expectedReserveIncrement = (totalIncrement * reservePotPercentage) / 100;

        // Establecer los valores iniciales de los pozos
        await potManager.setPotValues(primaryPot, secondaryPot, reservePot);
        await potManager.setPotPercentages(primaryPotPercentage, secondaryPotPercentage, reservePotPercentage);

        await potManager.incrementPots(totalIncrement);

        const newPrimaryPot = await potManager.primaryPot();
        const newSecondaryPot = await potManager.secondaryPot();
        const newReservePot = await potManager.reservePot();

        expect(newPrimaryPot).to.equal(primaryPot + expectedPrimaryIncrement);
        expect(newSecondaryPot).to.equal(secondaryPot + expectedSecondaryIncrement);
        expect(newReservePot).to.equal(reservePot + expectedReserveIncrement);
    });

    it("3. Should validate funds correctly", async function () {
        const validPrimaryAmount = 100;
        const validSecondaryAmount = 100;
        const validReserveAmount = 100;

        const invalidPrimaryAmount = 600; // primaryPot is initially set to 500
        const invalidSecondaryAmount = 400; // secondaryPot is initially set to 300
        const invalidReserveAmount = 300; // reservePot is initially set to 200

        await owner.sendTransaction({
            to: potManager.address,
            value: ethers.utils.parseEther("1.0") // Add 1 ether to the contract
        });

        // Establecer los valores iniciales de los pozos
        await potManager.setPotValues(primaryPot, secondaryPot, reservePot);

        // Test validateFundsPrimary
        expect(await potManager.validateFundsPrimary(validPrimaryAmount)).to.be.true;
        expect(await potManager.validateFundsPrimary(invalidPrimaryAmount)).to.be.false;

        // Test validateFundsSecondary
        expect(await potManager.validateFundsSecondary(validSecondaryAmount)).to.be.true;
        expect(await potManager.validateFundsSecondary(invalidSecondaryAmount)).to.be.false;

        // Test validateFundsReserve
        expect(await potManager.validateFundsReserve(validReserveAmount)).to.be.true;
        expect(await potManager.validateFundsReserve(invalidReserveAmount)).to.be.false;

        // Test validateFunds with sufficient contract balance
        expect(await potManager.validateFunds(validPrimaryAmount, validSecondaryAmount, validReserveAmount)).to.be.true;

        // Test validateFunds with insufficient primary pot
        expect(await potManager.validateFunds(invalidPrimaryAmount, validSecondaryAmount, validReserveAmount)).to.be.false;

        // Test validateFunds with insufficient secondary pot
        expect(await potManager.validateFunds(validPrimaryAmount, invalidSecondaryAmount, validReserveAmount)).to.be.false;

        // Test validateFunds with insufficient reserve pot
        expect(await potManager.validateFunds(validPrimaryAmount, validSecondaryAmount, invalidReserveAmount)).to.be.false;

        // Test validateFunds with insufficient total funds in the contract
        const excessAmount = ethers.utils.parseEther("2.0");
        await owner.sendTransaction({
            to: potManager.address,
            value: excessAmount // Add more ether to ensure the balance is sufficient
        });
        expect(await potManager.validateFunds(validPrimaryAmount, validSecondaryAmount, validReserveAmount)).to.be.true;
    });
    
    it("4. Should reset primary pot and adjust secondary pot correctly", async function () {
        // Incrementar el primaryPot por encima del basePotValue para poder resetearlo
        await potManager.incrementPots(1000);

        const primaryPotBeforeReset = await potManager.primaryPot();
        const secondaryPotBeforeReset = await potManager.secondaryPot();

        await potManager.resetPrimaryPot();

        const primaryPotAfterReset = await potManager.primaryPot();
        const secondaryPotAfterReset = await potManager.secondaryPot();

        expect(primaryPotAfterReset).to.equal(basePotValue);
        expect(secondaryPotAfterReset).to.equal(secondaryPotBeforeReset - (primaryPotBeforeReset - basePotValue));
    });
});
