-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 29-08-2024 a las 11:48:18
-- Versión del servidor: 9.0.1
-- Versión de PHP: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quiniblockDB`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sorteos`
--

CREATE TABLE `sorteos` (
  `id` int NOT NULL,
  `fechaInicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaFin` datetime DEFAULT NULL,
  `numerosGanadores` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticketsvendidos`
--

CREATE TABLE `ticketsvendidos` (
  `id` int NOT NULL,
  `tx_hash` varchar(66) DEFAULT NULL,
  `numeros_elegidos` varchar(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `nro_sorteo` int NOT NULL,
  `owner` varchar(42) NOT NULL,
  `estado` enum('pendiente','confirmada','fallida') NOT NULL DEFAULT 'pendiente',
  `ticketID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `sorteos`
--
ALTER TABLE `sorteos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sorteo_id` (`sorteo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sorteos`
--
ALTER TABLE `sorteos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  ADD CONSTRAINT `ticketsvendidos_ibfk_1` FOREIGN KEY (`sorteo_id`) REFERENCES `sorteos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
