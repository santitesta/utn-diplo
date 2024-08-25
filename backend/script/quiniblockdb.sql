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

INSERT INTO `ticketsvendidos` (`id`, `tx_hash`, `numeros_elegidos`, `fecha`, `nro_sorteo`, `owner`, `estado`, `ticketID`) VALUES
(49, '0x469f2ac3f352ae227227e4e47508efbc584c32058d90e2237b8d54f9c7a4e3c9', '[1,2,3,4,5,6]', '2024-08-22 18:36:53', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 50),
(50, NULL, '[3,5,7,8,9,22]', '2024-08-22 18:47:35', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'pendiente', NULL),
(51, NULL, '[3,5,7,8,9,22]', '2024-08-22 18:50:02', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'pendiente', NULL),
(52, '0x552c30143eba1d0417ebd3bbc245ad041f727232fb4fccf6bc8c8a98f4fa685a', '[3,5,7,8,9,22]', '2024-08-22 18:52:28', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 53),
(53, '0x1b0c47668684d894c01edd7c684222df4619fdc8eb3a6961e8d650f184e3b09d', '[3,5,7,8,9,22]', '2024-08-22 18:54:00', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 54),
(54, '0x224c9480a0208ff2f869c3aa5f10da4dcce133423d99f5c79a4229d40c340be6', '[1,3,5,8,9,40]', '2024-08-22 18:59:57', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 55),
(55, '0xd2b7f649320a5c3eced3ec668b689ff7cd44352ef2de0def5a0a0e7cd4d80bdd', '[2,3,4,5,8,22]', '2024-08-22 19:01:36', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 56),
(56, '0x247016af672ee95deb26f0a3cda34d3566d6bc02867cdf5524d4a29cc560244f', '[10,11,12,13,14,1', '2024-08-22 19:02:42', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 57),
(57, '0x37c93dbf0fef3e55c6684e909031934715d55401c84d516105803de3dad46d74', '[4,8,12,16,20,24]', '2024-08-22 19:03:57', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 58),
(58, '0x684f5fce5e2daca744a523a798a3c4a50ae8c5838e1198a12166707b848a23e5', '[1,2,3,4,5,22]', '2024-08-22 19:07:45', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 59),
(59, '0xf8fdd964481c8ec08cf130f1180763473d454fbfc22e989d98f0be51356ea65e', '[1,5,8,12,25,30]', '2024-08-22 19:09:09', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 60),
(60, '0x0d1ac2460aba8fd7d93b342f4368725fe6dc5ba739826022d5d29410e49a630a', '[1,2,5,7,8,9]', '2024-08-22 19:12:35', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 61),
(61, '0x4873ce948c97407982193d98a4c07f64dbf352c68d198981cb044a093d980cdf', '[1,2,3,5,7,8]', '2024-08-22 19:17:12', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 62),
(62, '0x29f5b2738cbe45e1ffb8d6197b6a93d53df66369fe9a0e666ff1d6f64f9edf4b', '[1,2,5,7,8,9]', '2024-08-22 19:47:29', 2, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'confirmada', 63),
(63, NULL, '[4,5,7,8,9,11]', '2024-08-24 17:20:31', 3, '0x2FD0659039Fa6Ad73550CAeD739e3E8f5235dbC1', 'pendiente', NULL),
(64, '0x3d1bf15c18a583915984b156ed35c4b68bd5de067a8cf4f9829a73e6e8f83921', '[2,4,6,8,10,12]', '2024-08-24 17:40:02', 3, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 64),
(65, '0x29da16b18f332338d58984f72d86ab2ab2da5742ccc354102170652ff682fefa', '[1,2,3,4,5,6]', '2024-08-24 17:42:31', 3, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 65),
(66, NULL, '[2,4,5,6,8,9]', '2024-08-24 18:02:35', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'pendiente', NULL),
(67, NULL, '[2,4,5,6,8,9]', '2024-08-24 18:03:12', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'pendiente', NULL),
(68, NULL, '[5,7,8,9,11,18]', '2024-08-24 18:05:09', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'pendiente', NULL),
(69, '0x9425bcf4bcd8ca10ab1e04a816dd760e05386b54200798721a2f85d60c58c3a7', '[1,4,5,7,8,15]', '2024-08-24 18:06:26', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 69),
(70, NULL, '[1,2,3,4,5,6]', '2024-08-24 18:11:33', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'pendiente', NULL),
(71, NULL, '[1,2,3,4,5,6]', '2024-08-24 18:14:42', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'pendiente', NULL),
(72, '0x29cb3c94cf94f125e15247b8e7dcca2c7f534b4dfb5b5ed90e42c98ffb9465a8', '[1,2,3,4,5,6]', '2024-08-24 18:15:22', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 72),
(73, '0x6747b00249c8f875cc890204b01b45b1c16e650f3aa34212a85078b68919f837', '[4,5,6,7,8,9]', '2024-08-24 18:17:43', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 73),
(74, '0x119b72f57871a81fc2f8bb0a63fcc9059326899ff1bdc5a363c684737d74ff76', '[1,3,5,7,9,11]', '2024-08-24 18:22:31', 4, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 74),
(75, '0xa7424c7a429853fe6f175682d1b2a71fb8e501ccce89083c284cf06f4289764c', '[1,2,3,4,5,6]', '2024-08-24 20:07:10', 5, '0x012DB5e9C2f16B665938d6683d1949A189292B90', 'confirmada', 75);

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