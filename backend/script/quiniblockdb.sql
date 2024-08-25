-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-08-2024 a las 03:38:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `quiniblockdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticketsvendidos`
--

CREATE TABLE `ticketsvendidos` (
  `id` int(11) NOT NULL,
  `tx_hash` varchar(66) DEFAULT NULL,
  `numeros_elegidos` varchar(17) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `nro_sorteo` int(11) NOT NULL,
  `owner` varchar(42) NOT NULL,
  `estado` enum('pendiente','confirmada','fallida') NOT NULL DEFAULT 'pendiente',
  `ticketID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `ticketsvendidos`
--



--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
