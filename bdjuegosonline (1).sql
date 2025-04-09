-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 09-04-2025 a las 20:17:46
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bdjuegosonline`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `CAT_ID` int(11) NOT NULL,
  `CAT_NOMBRE` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`CAT_ID`, `CAT_NOMBRE`) VALUES
(3, 'Action'),
(6, 'Adventure'),
(4, 'Platformer'),
(2, 'Puzzle'),
(1, 'Simulation'),
(5, 'Visual Novel');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito`
--

CREATE TABLE `favorito` (
  `FAV_ID` int(11) NOT NULL,
  `USU_ID_FAVORITO` int(11) DEFAULT NULL,
  `JUE_ID_FAVORITO` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorito`
--

INSERT INTO `favorito` (`FAV_ID`, `USU_ID_FAVORITO`, `JUE_ID_FAVORITO`) VALUES
(1, 1, 1),
(2, 1, 3),
(3, 2, 5),
(4, 3, 10),
(5, 4, 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

CREATE TABLE `juego` (
  `JUE_ID` int(11) NOT NULL,
  `JUE_TITULO` varchar(100) NOT NULL,
  `JUE_DESCRIPCION` varchar(200) NOT NULL,
  `JUE_URL` varchar(500) NOT NULL,
  `CAT_ID_JUEGO` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `juego`
--

INSERT INTO `juego` (`JUE_ID`, `JUE_TITULO`, `JUE_DESCRIPCION`, `JUE_URL`, `CAT_ID_JUEGO`) VALUES
(1, 'Astro Prospector', 'Juego de simulación espacial', 'https://delunado.itch.io/astro-prospector', 1),
(2, 'PlantDaddy', 'Simulador de cuidado de plantas', 'https://overfull.itch.io/plantdaddy', 1),
(3, 'Growmi', 'Juego de puzzles con mecánicas únicas', 'https://carlospedroso.itch.io/growmi', 2),
(4, 'Frogguide', 'Puzzle game con ranas', 'https://birdboygames.itch.io/frogguide', 2),
(5, 'Vampire Survivors', 'Juego de acción y supervivencia', 'https://poncle.itch.io/vampire-survivors', 3),
(6, 'Red Handed', 'Juego de acción y sigilo', 'https://badpiggy.itch.io/red-handed', 3),
(7, 'New Super Mario Bros - Mario Vs Luigi', 'Clásico juego de plataformas', 'https://ipodtouch0218.itch.io/nsmb-mariovsluigi', 4),
(8, 'Platformer Toolkit', 'Herramientas para crear plataformeros', 'https://gmtk.itch.io/', 4),
(9, 'Intertwine', 'Novela visual emocionante', 'https://crescence-studio.itch.io/intertwine', 5),
(10, 'There\'s this girl', 'Novela visual romántica', 'https://zephyo.itch.io/theres-this-girl', 5),
(11, 'Melanie and the Magic Forest', 'Aventura mágica en el bosque', 'https://toadstoolpicnic.itch.io/melanie-and-the-magic-forest', 6),
(12, 'Space Frog', 'Aventura espacial con una rana', 'https://npckc.itch.io/space-frog', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reciente`
--

CREATE TABLE `reciente` (
  `REC_ID` int(11) NOT NULL,
  `USU_ID_RECIENTE` int(11) DEFAULT NULL,
  `JUE_ID_RECIENTE` int(11) DEFAULT NULL,
  `REC_FECHA` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reciente`
--

INSERT INTO `reciente` (`REC_ID`, `USU_ID_RECIENTE`, `JUE_ID_RECIENTE`, `REC_FECHA`) VALUES
(1, 1, 2, '2025-04-07 22:21:19'),
(2, 2, 6, '2025-04-07 22:21:19'),
(3, 3, 12, '2025-04-07 22:21:19'),
(4, 4, 9, '2025-04-07 22:21:19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `USU_ID` int(11) NOT NULL,
  `USU_NOMBRE` varchar(20) NOT NULL,
  `USU_EMAIL` varchar(100) NOT NULL,
  `USU_PASSWORD` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`USU_ID`, `USU_NOMBRE`, `USU_EMAIL`, `USU_PASSWORD`) VALUES
(1, 'Carlos', 'carlos@example.com', '1234'),
(2, 'Lucía', 'lucia@example.com', 'abcd'),
(3, 'Marco', 'marco@example.com', 'pass123'),
(4, 'Elena', 'elena@example.com', 'qwerty');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`CAT_ID`),
  ADD UNIQUE KEY `CAT_NOMBRE` (`CAT_NOMBRE`);

--
-- Indices de la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD PRIMARY KEY (`FAV_ID`),
  ADD KEY `USU_ID_FAVORITO` (`USU_ID_FAVORITO`),
  ADD KEY `JUE_ID_FAVORITO` (`JUE_ID_FAVORITO`);

--
-- Indices de la tabla `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`JUE_ID`),
  ADD KEY `CAT_ID_JUEGO` (`CAT_ID_JUEGO`);

--
-- Indices de la tabla `reciente`
--
ALTER TABLE `reciente`
  ADD PRIMARY KEY (`REC_ID`),
  ADD KEY `USU_ID_RECIENTE` (`USU_ID_RECIENTE`),
  ADD KEY `JUE_ID_RECIENTE` (`JUE_ID_RECIENTE`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`USU_ID`),
  ADD UNIQUE KEY `USU_EMAIL` (`USU_EMAIL`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `CAT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `favorito`
--
ALTER TABLE `favorito`
  MODIFY `FAV_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `juego`
--
ALTER TABLE `juego`
  MODIFY `JUE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `reciente`
--
ALTER TABLE `reciente`
  MODIFY `REC_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `USU_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `favorito`
--
ALTER TABLE `favorito`
  ADD CONSTRAINT `favorito_ibfk_1` FOREIGN KEY (`USU_ID_FAVORITO`) REFERENCES `usuario` (`USU_ID`),
  ADD CONSTRAINT `favorito_ibfk_2` FOREIGN KEY (`JUE_ID_FAVORITO`) REFERENCES `juego` (`JUE_ID`);

--
-- Filtros para la tabla `juego`
--
ALTER TABLE `juego`
  ADD CONSTRAINT `juego_ibfk_1` FOREIGN KEY (`CAT_ID_JUEGO`) REFERENCES `categoria` (`CAT_ID`);

--
-- Filtros para la tabla `reciente`
--
ALTER TABLE `reciente`
  ADD CONSTRAINT `reciente_ibfk_1` FOREIGN KEY (`USU_ID_RECIENTE`) REFERENCES `usuario` (`USU_ID`),
  ADD CONSTRAINT `reciente_ibfk_2` FOREIGN KEY (`JUE_ID_RECIENTE`) REFERENCES `juego` (`JUE_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
