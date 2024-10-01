-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: mysqldb
-- Tiempo de generación: 30-09-2024 a las 23:07:37
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
-- Estructura de tabla para la tabla `errorMessage`
--

CREATE TABLE `errorMessage` (
  `tx_id` int NOT NULL,
  `error` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `errorMessage`
--

INSERT INTO `errorMessage` (`tx_id`, `error`) VALUES
(224, 'User rejected the request.'),
(227, 'User rejected the request.'),
(229, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(232, 'User rejected the request.'),
(233, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(236, 'User rejected the request.'),
(237, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(238, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(241, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(241, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(255, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(266, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(268, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(269, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(270, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(272, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(275, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(276, 'User rejected the request.'),
(280, 'User rejected the request.'),
(281, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(282, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(283, 'User rejected the request.'),
(286, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(287, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(289, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(290, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(283, 'User rejected the request.'),
(294, 'User rejected the request.'),
(294, 'User rejected the request.'),
(295, 'User rejected the request.'),
(295, 'User rejected the request.'),
(298, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(298, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(300, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(301, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(302, 'The contract function \"purchaseTicket\" reverted with the following reason:\nInternal JSON-RPC error.'),
(306, 'User rejected the request.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sorteos`
--

CREATE TABLE `sorteos` (
  `id` int NOT NULL,
  `fechaInicio` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaFin` datetime DEFAULT NULL,
  `numerosGanadores` varchar(20) DEFAULT NULL,
  `pozoSorteado` double DEFAULT NULL,
  `cantGanadores` int NOT NULL DEFAULT '0',
  `maxNroTicket` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `sorteos`
--

INSERT INTO `sorteos` (`id`, `fechaInicio`, `fechaFin`, `numerosGanadores`, `pozoSorteado`, `cantGanadores`, `maxNroTicket`) VALUES
(1, '2024-09-09 20:11:58', '2024-09-11 20:11:58', '2,4,6,8,10,12', 0, 0, 0),
(2, '2024-09-09 20:11:58', '2024-09-10 20:11:58', '4,8,18,22,33,41', 0.07, 0, 60),
(3, '2024-09-13 20:38:14', '2024-09-17 11:15:15', '2,4,6,8,10,12', 0.1, 1, 63),
(4, '2024-09-17 11:16:00', '2024-09-17 12:00:00', '1,2,6,7,8,22', 0.01, 0, 64),
(5, '2024-09-17 16:41:21', NULL, '2,4,6,8,10', 0.01, 0, 64),
(6, '2024-09-17 16:46:46', NULL, NULL, NULL, 0, NULL),
(7, '2024-09-17 17:02:17', NULL, NULL, NULL, 0, NULL),
(8, '2024-09-17 17:06:32', NULL, NULL, NULL, 0, NULL),
(9, '2024-09-17 16:44:46', NULL, NULL, NULL, 0, NULL),
(10, '2024-09-17 17:18:18', NULL, NULL, NULL, 0, NULL),
(11, '2024-09-17 17:20:11', NULL, NULL, NULL, 0, NULL),
(12, '2024-09-17 17:24:51', NULL, NULL, NULL, 0, NULL),
(13, '2024-09-17 17:27:44', NULL, NULL, NULL, 0, NULL),
(14, '2024-09-17 17:30:43', NULL, NULL, NULL, 0, NULL),
(15, '2024-09-17 17:36:18', '2024-09-17 17:48:29', '\"[1,2,3,4,5,6]\"', 0.01, 1, 69),
(16, '2024-09-17 17:38:10', NULL, NULL, NULL, 0, NULL),
(17, '2024-09-17 17:49:36', '2024-09-17 17:51:36', '[2,4,6,8,10,12]', 0.01, 0, 72),
(18, '2024-09-17 21:20:32', '2024-09-17 21:33:31', '[1,3,4,5,6,8]', 0.01, 0, 74),
(19, '2024-09-17 21:36:00', '2024-09-17 21:42:14', '[40,37,36,45,9,43]', 0.01, 1, 74),
(20, '2024-09-17 21:59:55', '2024-09-17 22:19:07', '[39,22,19,25,33,14]', 0.06, 0, 81),
(21, '2024-09-17 22:21:59', '2024-09-17 22:28:02', '[8,29,5,7,38,40]', 0.0635, 1, 82),
(22, '2024-09-17 22:32:14', '2024-09-17 22:38:33', '[18,43,8,40,42,41]', 0.0635, 0, 82),
(23, '2024-09-17 22:42:31', '2024-09-17 22:45:54', '[24,23,33,35,36,1]', 0.0635, 1, 82),
(24, '2024-09-17 22:49:27', '2024-09-17 23:13:09', '[18,44,28,17,31,43]', 0.0985, 1, 92),
(25, '2024-09-17 23:15:46', '2024-09-18 23:17:56', '[2,17,27,36,38,42]', 0.1125, 0, 96),
(26, '2024-09-18 23:25:28', NULL, NULL, NULL, 0, NULL),
(27, '2024-09-29 14:28:30', NULL, NULL, NULL, 0, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ticketsvendidos`
--

CREATE TABLE `ticketsvendidos` (
  `id` int NOT NULL,
  `tx_hash` varchar(66) DEFAULT NULL,
  `numeros_elegidos` varchar(20) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `sorteo_id` int NOT NULL,
  `owner` varchar(42) NOT NULL,
  `estado` enum('pendiente','confirmada','fallida') NOT NULL DEFAULT 'pendiente',
  `ticketID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Volcado de datos para la tabla `ticketsvendidos`
--

INSERT INTO `ticketsvendidos` (`id`, `tx_hash`, `numeros_elegidos`, `fecha`, `sorteo_id`, `owner`, `estado`, `ticketID`) VALUES
(176, '0xb339da2ecd8c324ab9efa80ba5bd9f6c42ccf9ec6a0f87d693c77f6423f1a387', '[1,2,22,25,33,45]', '2024-09-10 02:45:32', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 36),
(181, '0x7694af7fca85a39f2561f3737ccc8bd1a66efe14737fccc2f33e428736e76db4', '[10,20,25,30,40,44]', '2024-09-10 02:48:30', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 37),
(187, '0xb98430abdfda37396d2a5048bb847b4230aef21f77d80d687bc88caa92c490ed', '[2,3,4,8,9,11]', '2024-09-10 02:53:23', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 38),
(189, '0xbd6ede3ffb66e6e9770074b301d090dbd43d5a2e3b223140c83d3d8de0a9bc04', '[2,4,5,6,8,25]', '2024-09-10 02:54:11', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 39),
(195, '0xab53005c39b056884389d32f31d718cfe8d2760dd521fb25a5cc70091b120955', '[2,5,7,9,11,12]', '2024-09-10 03:03:38', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 41),
(196, '0xab53005c39b056884389d32f31d718cfe8d2760dd521fb25a5cc70091b120955', '[2,4,5,6,8,18]', '2024-09-10 03:08:24', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 41),
(203, '0x4f21f12b90d29430cf7c5926c6a072ab9744a16b0e6d8baef2cb530206caf7a2', '[1,2,3,4,5,6]', '2024-09-10 11:19:18', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 42),
(207, '0x90d53766d0e9c4a1cd2e12b02b4c70c98b8c51168cd9799835ec05e21ee6abf1', '[1,2,3,4,5,6]', '2024-09-10 11:30:03', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 43),
(208, '0xa188d7be7f78ef6ce447239561814bae4d249f95f8a982d0ec5e8dcbd9081894', '[5,8,9,13,15,22]', '2024-09-10 11:34:42', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 44),
(211, '0xcdb138d648be46797e89795e99c498dbc3bcbf0023eb3cda4c9a85ca88b60e0b', '[1,2,5,6,11,19]', '2024-09-10 11:41:24', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 45),
(213, '0x0771440ea31cb5b457874b3a3975f226e9b0b34d56f78685a03dbac1e6232719', '[1,2,3,4,5,6]', '2024-09-10 11:42:22', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 46),
(214, '0xd557e857c6368c3b25f4a97f4a7289710c3b36fae87241273559d600c1daf24d', '[4,8,9,18,25,33]', '2024-09-10 11:42:54', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 47),
(218, '0xaf9e21313ccb7e453191110a4f60b07963f5e090ad23d7e84b6d93d3214950ea', '[1,2,3,4,5,6]', '2024-09-10 11:58:18', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 49),
(219, '0x760ec12deffb6f0c96ac86a86f74777a4ae165c5edb43b78851797df98d8f1cf', '[4,8,15,22,33,35]', '2024-09-10 11:59:27', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 50),
(221, '0x5f95343e030c0eb84981be620535414df8f10345e0e072f6b2d4d48551f00a7a', '[1,2,3,4,5,6]', '2024-09-10 12:04:57', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 51),
(224, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:11:29', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(225, NULL, '[1,3,5,7,9,12]', '2024-09-10 12:22:51', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(226, '0xb8f9429d6141fb0dd17c41f919328a2a067334afaa5595240e86a37f1b447e1d', '[2,4,5,6,8,10]', '2024-09-10 12:25:43', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 52),
(227, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:26:24', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(229, NULL, '[3,7,8,14,15,25]', '2024-09-10 12:28:21', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(230, '0x46c422c0fd18caec5454ec976b2441ec2af451308a339fcb96ca7adfb7bd7dc4', '[1,2,3,5,8,25]', '2024-09-10 12:34:08', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 53),
(231, '0xcd1d8bcb385adb796c7c13ef5d99527af0fe7395683bcbcba2c41b9c11833c68', '[2,8,9,10,11,12]', '2024-09-10 12:44:35', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 54),
(232, NULL, '[2,4,5,6,8,11]', '2024-09-10 12:45:46', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(233, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:52:10', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(235, '0x56b9934bc3d6ddf4340e9978f6b4bdfea367cc92da40067252397097e40c2791', '[1,2,3,4,5,6]', '2024-09-10 12:52:49', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 56),
(236, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:55:07', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(237, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:55:22', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(238, NULL, '[1,2,3,4,5,6]', '2024-09-10 12:55:41', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(239, '0xd186eedb3278396ebda1d0f99721b64261b092773b70d9c933c911ddd7f21b18', '[1,2,4,5,6,8]', '2024-09-10 12:55:56', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 57),
(240, '0xbdd2724b653c6298a4bddb9aca063141e6dfec01c87d93c9ac98429bfb35b9c4', '[4,8,12,16,18,20]', '2024-09-10 12:56:44', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 58),
(241, NULL, '[31,32,33,34,35,36]', '2024-09-10 12:57:43', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(242, '0x297887bac4b4407741e434e1dbe8e0d494e955dfc1c1e0a36eb99173a7e92b17', '[2,4,6,8,10,12]', '2024-09-10 12:58:41', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 59),
(243, '0x16cd2747fe871abe37184145dc14ae9420bd2267e6d12a4a0091c25e2066742e', '[2,4,6,8,10,12]', '2024-09-10 13:00:21', 2, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 60),
(250, '0x45cc67c8b912f8165412f1ce2281b089515eb0d633167746590756e3fefe779c', '[1,2,3,5,8,9]', '2024-09-13 20:38:21', 3, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 61),
(251, '0xf7b8d57883ec02834b8edc0ce2ff905a0e3759832cae73b67c91712dac616da6', '[4,8,9,24,32,45]', '2024-09-13 20:39:01', 3, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 62),
(252, '0x25705d44c702327eed5a71230e36cb29070230b739b7a17c4494fc3927aabf74', '[2,4,6,8,10,12]', '2024-09-17 14:12:41', 3, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 63),
(253, '0x4cba38f3729372590fb07f3f0cda7d281b1d49cf05d76d8acd5c8cee28d2bf7d', '[2,4,6,8,10,12]', '2024-09-17 14:25:59', 4, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 64),
(254, '0xb1145ace5309074dc0aa74139cc9166e3653c3157e1839f2f9ab4c8c2c0a42cb', '[1,2,3,4,5,6]', '2024-09-17 17:20:30', 11, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 65),
(255, NULL, '[1,2,3,4,5,6]', '2024-09-17 17:21:18', 11, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(256, NULL, '[1,2,3,4,5,6]', '2024-09-17 17:21:37', 11, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'pendiente', NULL),
(257, '0xe2d17246695bb82ad1b93fc9f670c6f62278735b86eadcfbe18479384e5f07ab', '[1,2,3,4,5,6]', '2024-09-17 17:25:00', 12, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 67),
(258, '0x04964e5101901d0711b1df832eddf8747bc3265308fa66b312673db65b80bd7b', '[2,4,6,8,10,12]', '2024-09-17 17:25:21', 12, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 68),
(259, '0x411967905f11a8bb2d170ea509b4e85034905a196ff88c759eb94f71638d9548', '[1,2,3,5,8,9]', '2024-09-17 17:38:20', 16, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 69),
(260, '0xee02f08e0e1416994a7b0b71f233b6ee3a4096e9c8b1822ade8a9d6c288fa9af', '[1,2,3,4,5,6]', '2024-09-17 17:49:50', 17, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 70),
(261, '0x87fe506c980feb58d981f7b7a8883f990957349ff29894568607b56adb5ce1bb', '[2,4,6,8,10,12]', '2024-09-17 17:50:09', 17, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 71),
(262, '0x0d35c6578b2c969d6f07a583a1cc79ec8710d4caf8edae9885e7d1548ce74918', '[3,6,9,12,15,18]', '2024-09-17 17:50:40', 17, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 72),
(263, '0x34a1d886b4b458659c24cdc579bdfe77468a332e7725c746aae779b9339de8a6', '[1,2,3,4,5,6]', '2024-09-17 21:27:01', 18, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 73),
(264, '0x9b77269d90996b710b3b2aeda4b714f0d927d1b652588838557a22a9360776a9', '[1,2,11,12,21,22]', '2024-09-17 21:27:52', 18, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 74),
(265, '0x9e4cd02a3b58a9925aabe061d705167637a128acac44b6d2d0f041c9e2636f12', '[1,2,4,6,15,24]', '2024-09-17 22:00:46', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 75),
(266, NULL, '[18,21,29,33,41,42]', '2024-09-17 22:01:09', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(267, '0xa203b36e3da83fc66aa3524f93b650b68efc739e3736614770b0e051e7306161', '[16,19,24,29,32,43]', '2024-09-17 22:01:22', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 76),
(268, NULL, '[7,19,20,35,38,44]', '2024-09-17 22:02:12', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(269, NULL, '[5,8,18,19,26,42]', '2024-09-17 22:02:46', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(270, NULL, '[4,5,31,37,41,43]', '2024-09-17 22:03:27', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(271, '0xc0b216820140d2fc959d0cc1130c4212694fa2839b42d7716cfcd8138cfa3bfb', '[2,9,10,11,16,23]', '2024-09-17 22:03:42', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 77),
(272, NULL, '[3,8,11,29,32,39]', '2024-09-17 22:04:01', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(273, '0x48902424e53c362070cf399e47d32bf5d39f617e1c30222e305eb1a0fb633d0c', '[1,7,26,29,30,35]', '2024-09-17 22:04:23', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 78),
(274, '0xd6dca81d0dfbe8aec243d320403f274355e44509334509ffce074be217b17b62', '[5,9,24,29,35,38]', '2024-09-17 22:07:25', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 79),
(275, NULL, '[20,27,30,31,34,38]', '2024-09-17 22:07:46', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(276, NULL, '[10,23,25,26,42,44]', '2024-09-17 22:08:04', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(277, '0x9693824bc2a8e20fa5ce781655929b481c64c3ab1837b9983184e1dab40f92e0', '[7,11,37,39,41,43]', '2024-09-17 22:08:58', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 80),
(278, '0x60e9ac13748f53a962e06c31a0758414845b961daec34976cb54a9ad06cb6061', '[6,8,20,25,33,38]', '2024-09-17 22:15:36', 20, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 81),
(279, '0x97082fb8109e189619b157cb58fc98396b30f1ce1c1a64355904e3c7c88529e8', '[4,5,13,29,30,32]', '2024-09-17 22:22:48', 21, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 82),
(280, NULL, '[1,8,22,29,30,42]', '2024-09-17 22:23:34', 21, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(281, NULL, '[7,17,27,32,41,44]', '2024-09-17 22:25:35', 21, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(282, NULL, '[5,10,30,35,38,39]', '2024-09-17 22:25:56', 21, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(283, NULL, '[8,31,36,37,38,39]', '2024-09-17 22:26:07', 21, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(284, '0xced3365b4d137bf389ec0d1674638964de504a893a170b89fd8659530f097df9', '[1,7,21,24,41,45]', '2024-09-17 22:49:39', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 83),
(285, '0xe8d2b28bf010b5e8f7bf55e9073139f0f98c2b5d76608b31c8498bd50e09a5d2', '[10,14,21,24,36,44]', '2024-09-17 22:50:14', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 84),
(286, NULL, '[5,6,19,22,32,38]', '2024-09-17 22:52:25', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(287, NULL, '[1,5,19,26,27,28]', '2024-09-17 22:53:09', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(288, '0xf07a3600e8cb191d9b532ec7a83f02c4201acbfbab009c893da6b436ef22a480', '[5,8,14,41,44,45]', '2024-09-17 22:53:30', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 85),
(289, NULL, '[1,16,21,23,39,41]', '2024-09-17 22:53:56', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(290, NULL, '[9,24,25,27,28,30]', '2024-09-17 22:54:07', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(291, NULL, '[8,13,28,33,38,41]', '2024-09-17 22:54:18', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'pendiente', NULL),
(292, '0x25b2a4f1f4773a5ab9dde4daf4e635f3523ffd111f5e8cf2e7b1c4c25275705d', '[2,22,23,31,41,44]', '2024-09-17 22:54:26', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 87),
(293, '0xcf850a911b217509a141cc2443603ac7a9229e585393da1172553bf6a240e557', '[10,20,25,34,35,36]', '2024-09-17 22:56:18', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 88),
(294, NULL, '[8,10,12,23,29,33]', '2024-09-17 22:58:00', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(295, NULL, '[11,18,24,28,39,41]', '2024-09-17 22:58:58', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(296, '0x72ff88612d285c5bd79cfbc4558a765737f1d2d63dd0f98b1e9ddd7ed0282a3b', '[1,3,13,17,36,40]', '2024-09-17 22:59:38', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 89),
(297, '0x87d31448748a9ece6bb2ca8c4abb9062ac31dacd6a73478dd600f23432e1a608', '[8,10,19,35,37,42]', '2024-09-17 23:05:18', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 90),
(298, NULL, '[10,12,17,18,21,40]', '2024-09-17 23:07:07', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(299, '0xd5465ea9d3a187e6fc514bd8fcdcfaf0a1b69ec47ee06f123fffdc1870462130', '[10,18,28,37,42,43]', '2024-09-17 23:07:56', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 91),
(300, NULL, '[10,16,24,31,32,39]', '2024-09-17 23:08:40', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(301, NULL, '[15,16,25,29,36,39]', '2024-09-17 23:09:01', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(302, NULL, '[5,6,17,30,34,41]', '2024-09-17 23:10:01', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(303, '0x053e2ec2c787e3a6cfc43ca9c7f24e36ebc7160f90b115d8bebd07ab5340ca21', '[4,10,14,17,33,36]', '2024-09-17 23:10:16', 24, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 92),
(304, '0xc53351ba3c0a06d689d1265c4e20991e10678093e1f46998e65e4123bab13985', '[8,12,23,26,38,42]', '2024-09-18 22:42:23', 25, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 93),
(305, '0xb38dc4da4dba5e214f4600ba72968e5c528605ea30dd08f0699a96be29ef1ee6', '[10,12,18,32,34,38]', '2024-09-18 22:44:11', 25, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 94),
(306, NULL, '[4,18,23,30,33,45]', '2024-09-18 22:45:54', 25, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'fallida', NULL),
(307, '0xafdde9f2ec06ab66b024206d1435581a55cd3ec7f486cd63ce359563b10d97ac', '[18,23,26,34,40,45]', '2024-09-18 22:51:43', 25, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 95),
(308, '0x440817725c8bdfdb904c644b17122224527dc8a266eae7504fe68f9b7d0fe8dd', '[5,17,23,38,39,40]', '2024-09-18 22:53:35', 25, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 96),
(309, '0x8cc6fdeaf976eda64a00be205585a1deb427bc8dddd071a8ce1ffc0777d9a0ba', '[1,7,8,20,26,44]', '2024-09-27 01:09:48', 26, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 97),
(310, '0xc4272b2f4bcbc39fce845b4334d5f84eb257a9fb4fc4dab720e08b8ba1a32092', '[12,17,20,33,39,45]', '2024-09-29 14:28:55', 27, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 98),
(311, '0x9e222de5ae599645450c88195e224ec7f9fcd502643e70218cfdd25772a1c5a8', '[6,13,16,22,26,27]', '2024-09-29 14:36:52', 27, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 99),
(312, '0xcdfcd683fc96d342481747dd18a35b317c56420f33d418062ca899e9c77b5315', '[4,7,9,15,16,40]', '2024-09-29 14:52:04', 27, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 100),
(313, '0x77434f5aa162f7692029adb4a3be6a83b510c2cf399aed5fc7171b6557487556', '[4,15,20,30,37,39]', '2024-09-29 14:53:10', 27, '0x967B2384c4316Ad022EF9973620F3385aFeE58AA', 'confirmada', 101);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `errorMessage`
--
ALTER TABLE `errorMessage`
  ADD KEY `tx_id_error` (`tx_id`);

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
  ADD KEY `ticketsvendidos_ibfk_1` (`sorteo_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `sorteos`
--
ALTER TABLE `sorteos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=314;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `errorMessage`
--
ALTER TABLE `errorMessage`
  ADD CONSTRAINT `tx_id_error` FOREIGN KEY (`tx_id`) REFERENCES `ticketsvendidos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Filtros para la tabla `ticketsvendidos`
--
ALTER TABLE `ticketsvendidos`
  ADD CONSTRAINT `ticketsvendidos_ibfk_1` FOREIGN KEY (`sorteo_id`) REFERENCES `sorteos` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
