
# Proyecto de Lotería Blockchain

Este proyecto es una aplicación de lotería descentralizada creada en Solidity utilizando Hardhat para el desarrollo de contratos inteligentes. El sistema se compone de varios componentes principales: el backend en Node.js con Express que interactúa con una base de datos MySQL, el frontend en React que utiliza `wagmi` para conectarse al contrato inteligente y el sistema de contenedores Docker para simplificar la infraestructura del proyecto.

## Estructura del Proyecto

La estructura del proyecto está dividida en los siguientes directorios principales:

- **backend/**: Contiene el código del servidor Node.js que maneja la API y realiza consultas a la base de datos MySQL.
- **frontend/**: Contiene el frontend desarrollado en React.js, el cual se conecta al contrato inteligente y al backend a través de la API.
- **hardhat/**: Contiene el contrato inteligente escrito en Solidity y las configuraciones de Hardhat para desplegarlo en la blockchain.
- **docker-compose.yml**: Archivo de configuración que levanta toda la infraestructura utilizando Docker.

Cada directorio (backend, frontend y hardhat) contiene su propio archivo `README.md` con instrucciones específicas para compilar o ejecutar cada parte de manera individual.

## Requisitos

- [Docker](https://www.docker.com/get-started) instalado en tu máquina.
- [Docker Compose](https://docs.docker.com/compose/install/) para la orquestación de contenedores.

## Clonar el Repositorio

Para comenzar, clona la última versión del repositorio desde GitHub:

```bash
git clone https://github.com/santitesta/utn-diplo.git
cd utn-diplo
```

## Puesta en Marcha del Proyecto Completo

Para levantar el proyecto completo y todos sus componentes (backend, frontend, base de datos y contrato inteligente), sigue estos pasos:

### 1. Construir e Iniciar el Proyecto

Desde la raíz del proyecto, ejecuta el siguiente comando para construir y levantar toda la infraestructura de manera automática utilizando Docker:

```bash
docker-compose up --build
```

Este comando realiza lo siguiente:
- **Construye** las imágenes de Docker necesarias para el backend, frontend y Base de datos. **Hardhat** ya esta compilado y desplegado en la blockchain, no seria necesario volver a ejecutarlo, solo es para que nos quede el proyecto.
- **Levanta** los servicios de MySQL, backend y frontend.
- **Despliega** el backend y frontend para utilzarlo localmente.

### 2. Acceder a la Aplicación

Una vez que Docker Compose haya iniciado los servicios, podrás acceder a la aplicación en las siguientes URLs:

- **Frontend**: [http://localhost:3000](http://localhost:3000) - La interfaz de usuario de la lotería.
- **Backend API**: [http://localhost:5000](http://localhost:5000) - La API del backend para consultas y operaciones.
- **phpMyAdmin**: [http://localhost:8080](http://localhost:8080) - Gestor de la base de datos MySQL.

### 3. Detener el Proyecto

Cuando quieras detener el proyecto y limpiar los recursos, ejecuta el siguiente comando:

```bash
docker-compose down
```

Este comando:
- **Detiene** y **elimina** los contenedores.
- **Preserva** los datos en volúmenes persistentes, como los datos de la base de datos.

## Documentación Individual

Si deseas trabajar con cada componente por separado (backend, frontend o contrato inteligente), consulta los archivos `README.md` de cada directorio:

- [backend/README.md](backend/README.md)
- [frontend/README.md](frontend/README.md)
- [hardhat/README.md](hardhat/README.md)

Cada uno contiene instrucciones detalladas sobre cómo ejecutar las partes individuales sin Docker.

## Notas Finales

Este proyecto utiliza Docker para simplificar la configuración del entorno. Si no estás familiarizado con Docker, los comandos proporcionados (`docker-compose up --build` y `docker-compose down`) son los únicos que necesitas para ejecutar y detener todo el sistema sin problemas.

Para más detalles sobre cómo interactuar con los contratos inteligentes, cómo funciona la API del backend o cómo se gestionan los datos de la lotería, consulta la documentación en los directorios respectivos.


## Authors 

**THE FIVEBLOCKS!**
- [@aguirrejuan](https://github.com/)
- [@brizioagustin](https://github.com/)
- [@galvanezequiel](https://github.com/ezequielgalvan1985)
- [@meonizenzo](https://github.com/EnzoArg)
- [@testasantiago](https://github.com/santitesta)

