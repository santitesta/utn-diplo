# Proyecto QuiniBlockContract backend

  

## Descripción del Proyecto

Este proyecto consiste en la realización de un backend Nodejs y express para interactuar con un contrato y la web

  

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

     cd backend

## Descargar e instalar repositorio
Para comenzar a trabajar con este proyecto, una vez en el directorio ejecutamos

    npm install
    npm install ethers


Este comando demora un momento mientras descarga todas las dependencias del proyecto declaradas en el archivo package.json en el directorio node_modules

## Configuracion de node/express

el archivo src/index.js debe reconfigurarse para el entorno seteando las variables, deberia tomarlas bien si ejecutamos todo desde el mismo repo, pero si usamos path distintos se debe setear donde levantar estos valores
    
    const url = 'http://127.0.0.1:7545';
    // Ruta al archivo ABI
    const contractJson = require('../../hardhat/artifacts/contracts/QuiniBlockContract.sol/QuiniBlockContract.json');
    const contractAddressFile = path.join("../hardhat/test/", "contractAddress.txt"); 
    const contractAddress = fs.readFileSync(contractAddressFile, "utf-8").trim();


## Compilar y Test de hardhat

Para correr el node web

    node src/index.js


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
