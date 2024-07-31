# Proyecto QuiniBlockContract

  

## Descripción del Proyecto

Este proyecto consiste en la realización de un contrato solidity para la gestion de una quinela online administrada a travez de la tecnologia blockchain.

  

## Requisitos e Instalación previa

Como este proyecto usa varias tecnologias se utiliza el gestor de repositorio de nodejs npm y git

  

1. Debemos tener instalado Nodejs, para esto acceder al sitio https://nodejs.org/en y descargar la ultima version correspondiente a tu sistema operativo

2. Se debe contar git en el sistema que es cliente para la gestion de versiones con github, se puede descargar desde https://git-scm.com/downloads

  

## Desacargar ultima version

Primero accedemos a una terminal y clonamos el proyecto

    git clone https://github.com/santitesta/utn-diplo.git

 Luego entramos al directorio

    cd utn-diplo

Aqui ya tenemos la ultima version del codigo, pero para este proyecto accedemos solo al directorio hardhat

     cd hardhat

## Descargar e instalar repositorio
Para comenzar a trabajar con este proyecto, una vez en el directorio ejecutamos

    npm install

Este comando demora un momento mientras descarga todas las dependencias del proyecto declaradas en el archivo package.json en el directorio node_modules

## Configuracion de hardhat

1. Para test usamos la Suit Ganache (https://archive.trufflesuite.com/ganache/) esta simula una blockchain local. Para eso en el archivo hardhat.config.js definimos lo siguiente:

    networks: {
        ganache:{
    	    url:  'HTTP://127.0.0.1:7545',
    	    // si no pongo ninguna cuenta toma todas las que tiene ganache
    	    //accounts: 				['0x445e5096691a960f888428aaac6feb34dedfd8b41f050cc19d54676bb2ff2cca'], //Clave privada de las wallets
        },
       

2. Para deploy podemos usar la testnet de sepolia y para eso debemos generar una apikey con infura
	ste proyecto utiliza Hardhat y algunas variables de entorno para su configuración. A continuación, se detallan las instrucciones para su uso:

- Registrarse en infura https://app.infura.io/register

- Se utilizan variables de sistema para configurar ciertos aspectos del proyecto. Estas variables se almacenan localmente en el sistema y no en el repositorio por razones de seguridad.

- Para utilizar una variable del sistema, invócala utilizando `vars.get["nombre de variable"]`.

- Puedes ver dónde están almacenadas las variables utilizando el comando `npx hardhat vars path`. Por ejemplo: `C:\Users\Enzo Meoniz\AppData\Roaming\hardhat-nodejs\Config\vars.json`.

- Para agregar nuevas variables, utiliza el comando `npx hardhat vars set NOMBRE_DE_LA_VARIABLE`.

- Para consultar el valor de una variable, utiliza el comando `npx hardhat vars get NOMBRE_DE_LA_VARIABLE`.

  

### Detalles de las variables agregadas hasta el momento

-  `TEST_INFURA_API_KEY`: API key generada desde Infura.

-  `TEST_ACCOUNT_PRIVATE_KEY`: La clave privada de mi wallet para realizar pruebas.

Para esta testnet tambien en el archivo hardhat.config.js definimos lo siguiente:

networks: {
    sepolia:{
	    url:  'https://sepolia.infura.io/v3/${INFURA_API_KEY}'
	    accounts: [vars.get("TEST_ACCOUNT_PRIVATE_KEY")],
    },

## Compilar y Test de hardhat

Comandos de hardhat

Para compilar

    npx hardhat compile
Para ejecutar todos los test

    npx hardhat test
También los test se pueden ejecutar individuales, ejemplo solo los que estan en el archivo QuiniBlockContract.js

    npx hardhat test --grep "QuiniBlockContract"

O puedo buscar por descripcion del it

    npx hardhat test --grep "1. Should start a new draw"

Hice un test que seria una prueba generar para un sorteo

    npx hardhat test --grep "TestIntegral"

    
  

## Contribuciones

¡Se anima a cualquier persona a contribuir al proyecto! Si deseas contribuir, asegúrate de seguir estas directrices:

- Realiza un fork del repositorio.

- Crea una nueva rama para tu contribución.

- Haz tus cambios y realiza un pull request.

  

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo LICENSE.md para obtener más detalles.

  

## Autor y Reconocimientos

Autor: Meoniz Enzo (TheFiveBlocks!)

  

## Estado del Proyecto

Actualmente, el proyecto se encuentra en desarrollo.

  

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme en [enzomeoniz@gmail.com](mailto:enzomeoniz@gmail.com).
