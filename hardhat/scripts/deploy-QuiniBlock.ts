import { ethers, upgrades } from "hardhat";

const OWNER_ADDRESS = "0x967B2384c4316Ad022EF9973620F3385aFeE58AA" // Esta es mi wallet
const PRECIO_INICIAL = ethers.parseEther("0.01");
async function main () {
  const QuiniBlockFactory = await ethers.getContractFactory('QuiniBlockContract');
  console.log('Deploying QuiniBlockContract...');
  const quiniBlock = await upgrades.deployProxy(QuiniBlockFactory, [PRECIO_INICIAL, OWNER_ADDRESS], { initializer: 'initialize' });
  await quiniBlock.waitForDeployment();
  console.log('QuiniBlockContract deployed to:', await quiniBlock.getAddress());
}

main();



// const Pizza = await ethers.getContractFactory('Pizza');
// console.log('Deploying Pizza...');
// function initialize(uint256 _basePotValue, address initialOwner) public initializer override{

// const pizza = await upgrades.deployProxy(Pizza, [7, OWNER_ADDRESS], { initializer: 'initialize' });
// await pizza.waitForDeployment();
// console.log('Pizza deployed to:', await pizza.getAddress());