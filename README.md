
# UTN Diplo - Five Blocks

Proyecto de prueba para la Diplomatura en Blockchain y Finanzas Digitales de UTN

## Dependencias

Instalar globalmente Truffle:
```bash
npm install -g truffle
```

Instalar Ganache:
[Descargar Ganache](https://archive.trufflesuite.com/ganache/)
- Quickstart empieza a correr localmente una blockchain con la cual interactuar.

## Compilar, Migrar y Consola de Truffle

### Compilar

Para compilar los contratos inteligentes, usa el comando:
```bash
truffle compile
```
Esto compilará todos los contratos en el directorio `contracts` y generará los archivos de artefacto en el directorio `build/contracts`.

### Migrar

Para desplegar los contratos compilados a la blockchain (local o remota), usa:
```bash
truffle migrate
```
Este comando ejecutará los scripts de migración en el directorio `migrations` y desplegará los contratos a la red configurada.

### Consola de Truffle

Para interactuar con los contratos desplegados, abre la consola de Truffle:
```bash
truffle console
```

## Comandos Básicos para Interactuar con el Contrato Desplegado

Suponiendo que has desplegado el contrato `QuiniBlock` y tienes el artefacto del contrato disponible, aquí hay algunos comandos básicos:

### Obtener la instancia del contrato

```javascript
const QuiniBlock = artifacts.require("QuiniBlock");
let instance = await QuiniBlock.deployed();
```

### Comprar un Ticket

```javascript
let drawId = 0; // ID del sorteo al cual quieres comprar el ticket
let chosenNumbers = [1, 2, 3, 4, 5]; // Números elegidos para el ticket
await instance.purchaseTicket(drawId, chosenNumbers, { from: web3.eth.accounts[0] });
```

### Crear un Nuevo Sorteo

```javascript
let winningNumbers = [1, 2, 3, 4, 5]; // Números ganadores del sorteo
await instance.createDraw(winningNumbers, { from: web3.eth.accounts[0] });
```

### Establecer Valores del Bote

```javascript
let primaryPotValue = web3.utils.toWei("10", "ether"); // Valor del bote principal
let secondaryPotValue = web3.utils.toWei("5", "ether"); // Valor del bote secundario
await instance.setPotValues(primaryPotValue, secondaryPotValue, { from: web3.eth.accounts[0] });
```

Estos comandos te permiten interactuar con el contrato `QuiniBlock` desplegado en tu blockchain local o remota usando Truffle y Web3.js.
