-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 12-06-2023 a las 11:13:47
-- Versión del servidor: 10.4.24-MariaDB
-- Versión de PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto_final`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calendario`
--

CREATE TABLE `calendario` (
  `role` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT '[N]o disponible, [R]eservado',
  `usuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Usuario del cuidador',
  `calfechinicio` datetime NOT NULL,
  `calfechfin` datetime NOT NULL,
  `idreserva` varchar(23) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `calendario`
--

INSERT INTO `calendario` (`role`, `usuario`, `calfechinicio`, `calfechfin`, `idreserva`, `id`) VALUES
('R', 'Dalila', '2023-06-12 10:39:00', '2023-06-12 18:34:00', '64836350521d1', 68),
('R', 'Dalila', '2023-06-25 07:49:00', '2023-06-25 17:49:00', '6483821a06715', 69),
('R', 'Dalila', '2023-06-22 08:23:00', '2023-06-22 18:23:00', '6483821a07275', 70);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `idmascota` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tipo` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'P' COMMENT '[P]erro,[G]ato',
  `raza` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `tamano` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT '0' COMMENT '[T]oy, [P]equeño, [M]ediano, [G]rande, [E]norme. [0] gato ',
  `sexo` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'M' COMMENT '[M]acho, [H]embra',
  `anos` tinyint(4) NOT NULL DEFAULT 1,
  `meses` tinyint(2) NOT NULL DEFAULT 0,
  `microchip` tinyint(1) NOT NULL DEFAULT 0,
  `esterilizacion` tinyint(1) NOT NULL DEFAULT 0,
  `socninos` tinyint(1) NOT NULL DEFAULT 0,
  `socperros` tinyint(1) NOT NULL DEFAULT 0,
  `socgatos` tinyint(1) NOT NULL DEFAULT 0,
  `dueno` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`idmascota`, `nombre`, `tipo`, `raza`, `tamano`, `sexo`, `anos`, `meses`, `microchip`, `esterilizacion`, `socninos`, `socperros`, `socgatos`, `dueno`) VALUES
(129, 'Asdsad', 'P', 'Asd', 'T', 'M', 1, 0, 1, 0, 0, 0, 1, 'degived'),
(134, 'Dasd', 'P', 'Asdsa', 'T', 'M', 1, 0, 1, 0, 1, 0, 1, 'degived'),
(137, 'Gatito', 'G', 'Siames', 'T', 'M', 8, 0, 1, 1, 1, 1, 1, 'hillemeem'),
(186, 'Mimbrero', 'G', 'Gatitaooaa', 'T', 'M', 2, 2, 0, 1, 0, 1, 0, 'mariola'),
(187, 'Nuevo Nombre', 'G', 'Gatito', 'T', 'M', 2, 2, 0, 1, 0, 1, 1, 'mariola'),
(188, 'Nala', 'G', 'Gatitaooaa', 'T', 'M', 4, 2, 0, 0, 1, 1, 1, 'mariola'),
(207, 'Nuevo Nombre2', 'G', 'Gatitaooaa', 'T', 'M', 1, 0, 1, 1, 0, 1, 1, 'propietario'),
(209, 'Nuevo Nombre', 'G', 'Gatito', 'T', 'M', 2, 0, 1, 1, 0, 1, 1, 'dalila'),
(210, 'Max', 'G', 'Labrador Retriever', 'T', 'M', 7, 3, 1, 0, 0, 1, 1, 'pablo88'),
(211, 'Luna', 'P', 'Siamese', 'T', 'H', 3, 1, 0, 0, 1, 1, 1, 'pablo88'),
(212, 'Bella', 'G', 'Bulldog Francés', 'T', 'M', 7, 2, 0, 1, 1, 1, 1, 'propietarioPrueba'),
(213, 'Perro De Prueba', 'G', 'Asdsa', 'T', 'M', 2, 0, 1, 0, 1, 0, 1, 'propietarioPrueba'),
(215, 'Simba', 'P', 'Persa', 'T', 'M', 3, 0, 1, 1, 1, 0, 0, 'propietarioPrueba'),
(216, 'Gizmo', 'P', 'Scottish Fold', 'T', 'M', 6, 2, 1, 0, 1, 0, 1, 'luciasan'),
(217, 'Rocky', 'G', 'Bulldog Inglés', 'T', 'M', 7, 0, 1, 0, 0, 0, 1, 'luciasan'),
(218, 'Charlie', 'P', 'Beagle', 'T', 'M', 7, 0, 1, 0, 0, 1, 1, 'luciasan'),
(219, 'Mia ', 'P', 'Ragdoll', 'T', 'M', 6, 0, 0, 1, 1, 1, 1, 'alejandrarod');

--
-- Disparadores `mascotas`
--
DELIMITER $$
CREATE TRIGGER `delmasc_BD` BEFORE DELETE ON `mascotas` FOR EACH ROW BEGIN

DELETE FROM reservas WHERE idmascota=old.idmascota AND estado = "F";



END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas_detalles`
--

CREATE TABLE `mascotas_detalles` (
  `idmascota` int(11) NOT NULL,
  `actividad` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'N' COMMENT '[M]uy activo, [N]ormal, [T]ranquilo',
  `necesidades` tinyint(1) NOT NULL DEFAULT 2 COMMENT 'Tiempo de hacer necesidades.  [2]horas, [4]horas, [6]horas',
  `paseo` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT '[M]añana, [T]arde, [N]oche',
  `raciones` tinyint(4) NOT NULL DEFAULT 1 COMMENT 'Raciones diarias de comida',
  `medtipo` varchar(1) COLLATE utf8mb4_spanish_ci DEFAULT NULL COMMENT '[O]ral, [T]ópica, [I]nyectable',
  `mednom` varchar(25) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `masdetalles` tinytext COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `mascotas_detalles`
--

INSERT INTO `mascotas_detalles` (`idmascota`, `actividad`, `necesidades`, `paseo`, `raciones`, `medtipo`, `mednom`, `masdetalles`) VALUES
(134, 'N', 2, 'T', 3, NULL, NULL, NULL),
(137, 'M', 2, 'M', 0, 'T', 'Crema De La Alergia', 'Es muy travieso\r\n'),
(207, 'M', 2, 'M', 1, NULL, NULL, 'adasd'),
(212, 'M', 4, 'M', 5, NULL, NULL, 'Es una perrita muy cariñosa, sociable con todo tipo de perros y gatos.'),
(213, 'M', 2, 'M', 4, NULL, NULL, 'asdsadasdasdasd'),
(215, 'M', 2, 'M', 4, NULL, NULL, 'Mensaje personalizado de mi nueva mascota');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas_imagenes`
--

CREATE TABLE `mascotas_imagenes` (
  `idmascota` int(11) NOT NULL,
  `camino` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `posicion` tinyint(2) NOT NULL DEFAULT 0 COMMENT '[0]perfil, [1]galeria,\r\n[2]galeria, etc	',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `mascotas_imagenes`
--

INSERT INTO `mascotas_imagenes` (`idmascota`, `camino`, `posicion`, `id`) VALUES
(188, '188/188-0.png', 0, 373),
(207, '207/207-0.png', 0, 464),
(207, '207/207-1.png', 1, 465),
(210, '210/210-0.png', 0, 466),
(211, '211/211-0.png', 0, 467),
(212, '212/212-1.png', 1, 469),
(212, '212/212-2.png', 2, 470),
(212, '212/212-3.png', 3, 471),
(212, '212/212-4.png', 4, 472),
(213, '213/213-0.png', 0, 473),
(213, '213/213-1.png', 1, 474),
(213, '213/213-2.png', 2, 475),
(213, '213/213-3.png', 3, 476),
(213, '213/213-4.png', 4, 477),
(213, '213/213-5.png', 5, 478),
(213, '213/213-6.png', 6, 479),
(215, '215/215-0.png', 0, 485),
(215, '215/215-1.png', 1, 486),
(215, '215/215-2.png', 2, 487),
(215, '215/215-3.png', 3, 488),
(215, '215/215-4.png', 4, 489),
(212, '212/212-10.png', 10, 494),
(216, '216/216-0.png', 0, 495),
(217, '217/217-0.png', 0, 496),
(218, '218/218-0.png', 0, 497),
(219, '219/219-0.png', 0, 498),
(212, '212/212-0.png', 0, 499);

--
-- Disparadores `mascotas_imagenes`
--
DELIMITER $$
CREATE TRIGGER ` modmascimg_BA` BEFORE UPDATE ON `mascotas_imagenes` FOR EACH ROW BEGIN

DECLARE  imagen_no_dispobible VARCHAR(150);

IF new.camino = "" THEN
	SET new.camino = "imagen_no_disponible";
END IF;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insmascimg_BI` BEFORE INSERT ON `mascotas_imagenes` FOR EACH ROW BEGIN
DECLARE cantidad INT;
DECLARE  imagen_no_dispobible VARCHAR(150);
DECLARE mensaje VARCHAR(150);

SELECT count(*) INTO @cantidad FROM mascotas_imagenes WHERE camino = new.camino AND idmascota = new.idmascota;


IF @cantidad > 0 THEN

/*Mensaje personalizado*/
SELECT CONCAT("Imagen ya subida") INTO @mensaje;

/*Lanzar error personalizado*/
SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = @mensaje;
      
ELSEIF new.camino = "" THEN

/*Formar ruta predeterminada si la ruta está vacía*/
SELECT CONCAT(new.idmascota,  "/imagen_no_dispobible.png") INTO @imagen_no_dispobible;

	SET new.camino = @imagen_no_dispobible;
END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `poblaciones`
--

CREATE TABLE `poblaciones` (
  `poblacion` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `codpostal` varchar(5) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `poblaciones`
--

INSERT INTO `poblaciones` (`poblacion`, `codpostal`) VALUES
('Tíjola', '04880'),
('Barcelona', '08001'),
('Granada', '18001'),
('Huesa', '23487'),
('Madrid', '28001'),
('Málaga', '29001'),
('Montederramo', '32750'),
('Villavieja De Yelte', '37260'),
('Valencia', '46001'),
('Valencia', '46002'),
('Bizkaia', '48001');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `idreserva` varchar(23) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Id creado desde php, tiene que hacerse así porque sino da error el disparador BI',
  `fechinicio` datetime NOT NULL,
  `fechfin` datetime NOT NULL,
  `propietario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Usuario del propietario que obtiene el servicio del cuidador',
  `cuidador` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT 'Usuario del cuidador al que se le asigna la reserva',
  `importe` int(11) NOT NULL DEFAULT 0,
  `servicio` int(11) NOT NULL,
  `estado` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'A' COMMENT '[A]ctiva, [F]inalizada, .[V]enidera',
  `transporte` tinyint(1) NOT NULL DEFAULT 0,
  `mensaje` tinytext COLLATE utf8mb4_spanish_ci NOT NULL,
  `idmascota` int(11) NOT NULL,
  `direccion` varchar(60) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `poblacion` varchar(25) COLLATE utf8mb4_spanish_ci DEFAULT NULL,
  `codpostal` varchar(9) COLLATE utf8mb4_spanish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`idreserva`, `fechinicio`, `fechfin`, `propietario`, `cuidador`, `importe`, `servicio`, `estado`, `transporte`, `mensaje`, `idmascota`, `direccion`, `poblacion`, `codpostal`) VALUES
('648363505126d', '2023-06-10 10:38:00', '2023-06-10 19:30:00', 'propietarioPrueba', 'Dalila', 90, 2, 'F', 1, '', 213, NULL, NULL, NULL),
('6483635051cdd', '2023-06-11 16:39:00', '2023-06-11 19:30:00', 'propietarioPrueba', 'Dalila', 90, 2, 'F', 1, '', 213, NULL, NULL, NULL),
('64836350521d1', '2023-06-12 10:39:00', '2023-06-12 18:34:00', 'propietarioPrueba', 'Dalila', 90, 2, 'A', 1, '', 213, NULL, NULL, NULL),
('6483821a06715', '2023-06-25 07:49:00', '2023-06-25 17:49:00', 'propietarioPrueba', 'Dalila', 50, 2, 'V', 1, '', 212, NULL, NULL, NULL),
('6483821a07275', '2023-06-22 08:23:00', '2023-06-22 18:23:00', 'propietarioPrueba', 'Dalila', 50, 2, 'V', 1, '', 212, NULL, NULL, NULL);

--
-- Disparadores `reservas`
--
DELIMITER $$
CREATE TRIGGER `delresrv_AD` AFTER DELETE ON `reservas` FOR EACH ROW BEGIN

DELETE FROM calendario WHERE idreserva = OLD.idreserva;


END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insresrv_AI` BEFORE INSERT ON `reservas` FOR EACH ROW BEGIN


/*Declaración variables dirrecion, poblacion y codpostal*/
DECLARE direccion VARCHAR(60);
DECLARE poblacion VARCHAR(25);
DECLARE codpostal VARCHAR(9);
DECLARE idpropietario VARCHAR(20);
DECLARE roleprop CHARACTER;

/*Si la mascota de la reserva es del propietario que se va a insertar */
SELECT dueno INTO @idpropietario FROM mascotas WHERE idmascota = new.idmascota;
SELECT role INTO @roleprop FROM usuarios WHERE idusuario = new.propietario;

IF @idpropietario = new.propietario AND @roleprop = "P" THEN

/*Insertar direccion si hay transporte*/
IF new.transporte = 1 THEN
	SELECT direccion, poblacion, codpostal  INTO @direccion, @poblacion, @codpostal FROM usuarios WHERE idusuario = 		new.propietario;
	SET new.direccion =  @direccion, new.poblacion = @poblacion, new.codpostal = @codpostal;
  
END IF;

/*Insertar fechas en el calendario*/
INSERT INTO calendario VALUES ("R", new.cuidador, new.fechinicio, new.fechfin, new.idreserva, null);

ELSE 
/*Lanzar error personalizado*/
SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La mascota no corresponde con ese propietario';
END IF;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modresrv_AU` AFTER UPDATE ON `reservas` FOR EACH ROW BEGIN


/*si la reserva ha finalizado borrar del calendario*/
IF new.estado = "F" THEN
	DELETE FROM calendario WHERE usuario = new.cuidador AND idreserva = new.idreserva;

 ELSE 
    UPDATE calendario SET usuario = new.cuidador, calfechinicio = new.fechinicio, calfechfin= new.fechfin , idreserva = new.idreserva WHERE idreserva = new.idreserva;
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modresrv_BU` BEFORE UPDATE ON `reservas` FOR EACH ROW BEGIN 
DECLARE importeServicio INT;
DECLARE importeTransporte INT;

IF new.transporte = 1 THEN

/*seleccionar importe servicio*/
SELECT precio INTO @importeServicio FROM tarifas_cuidador WHERE usuario = new.cuidador AND servicio = new.servicio;

/*seleccionar plus transporte*/
SELECT plustransporte INTO @importeTransporte FROM tarifas_cuidador WHERE usuario = new.cuidador AND servicio = new.servicio;

 SET new.importe =  @importeServicio + @importeTransporte;

END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `idservicio` int(11) NOT NULL,
  `nombre` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`idservicio`, `nombre`) VALUES
(1, 'Alojamiento'),
(2, 'Guardería'),
(3, 'Paseo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarifas_cuidador`
--

CREATE TABLE `tarifas_cuidador` (
  `usuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `precio` tinyint(3) NOT NULL COMMENT 'Máximo 100€',
  `servicio` int(11) NOT NULL,
  `plustransporte` tinyint(2) DEFAULT 0 COMMENT 'Máximo 50€',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `tarifas_cuidador`
--

INSERT INTO `tarifas_cuidador` (`usuario`, `precio`, `servicio`, `plustransporte`, `id`) VALUES
('degived', 10, 3, 0, 106),
('Dalila', 1, 1, 1, 111),
('Dalila', 50, 2, 40, 112),
('degived', 1, 1, 1, 114),
('degived', 2, 2, 0, 118),
('mariola', 10, 1, 50, 119),
('mariola', 40, 2, 10, 120),
('mariola', 15, 3, 0, 124),
('cals1969', 10, 3, 0, 128),
('mariag92', 50, 2, 20, 130),
('pablo88', 40, 3, 0, 133),
('diegorod', 50, 3, 0, 138),
('cuidadorprueba', 10, 1, 10, 139),
('luciasan', 50, 3, 0, 143),
('alejo_89', 30, 3, 0, 146),
('carlosm_78', 10, 3, 0, 149),
('alejandrarod', 20, 3, 0, 152);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idusuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `contrasena` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `role` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'P' COMMENT '[P]ropietario, [C]uidador, [A]dmin',
  `apenom` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `direccion` varchar(60) COLLATE utf8mb4_spanish_ci NOT NULL,
  `poblacion` varchar(25) COLLATE utf8mb4_spanish_ci NOT NULL,
  `codpostal` varchar(5) COLLATE utf8mb4_spanish_ci NOT NULL,
  `dni` varchar(9) COLLATE utf8mb4_spanish_ci NOT NULL,
  `fechanac` date NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL,
  `telefono` varchar(9) COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idusuario`, `contrasena`, `role`, `apenom`, `direccion`, `poblacion`, `codpostal`, `dni`, `fechanac`, `email`, `telefono`) VALUES
('alejandrarod', '$2y$10$GeHw0rVFe5gz9gnmJkZ37.MWZaboLUAeDk6i9eliafgbb9.1tWQ/.', 'C', 'Alejandra Rodríguez Sánchez', 'Calle Colón, 25', 'Valencia', '46002', '34567890K', '2005-06-11', 'alejandra.rodriguez@example.com', '609012345'),
('alejo_89', '$2y$10$W2x5COPZz2KODjRI2Sk.QeLEgV5kTxDDi32kDJYhgkcK/w6F/a2o2', 'C', ' Alejandro Gómez Jiménez', 'Plaza De La Merced, 3', 'Málaga', '29001', '65143210E', '2005-06-09', 'alejandro.gomez@example.com', '604567890'),
('cals1969', '$2y$10$jcFxFynAR2egEIGlhRWOAeq8AqeX9ALYihRdJKb6SgRiNk8KKHWpe', 'C', 'Jules Dueñas Cordero', 'San Andrés, 35', 'Villavieja De Yelte', '37260', '21321312A', '2005-05-04', 'julesduenascordero@superrito.com', '696640012'),
('carlosm_78', '$2y$10$RwgifNOEz9Jv4uUqYY2IY.1CKurjdVhCYKhX7U2kCyG58nGY7JLFC', 'C', 'Carlos Martín Sánchez', ' Avenida Del Puerto, 5', 'Valencia', '46001', '98765432C', '2005-06-01', 'carlos.martin@example.com', '602345672'),
('cuidadorprueba', '$2y$10$ay.U1rBGejlNcpBLDEZmDuGiJHJTh5pxBN.t/VkLa0YWKhs7tGLBi', 'C', 'Cuidador Prueba', 'Rampas De Uribitarte, 8', 'Bizkaia', '48001', '12345678J', '2005-06-07', 'correocuidadorprueba@gmail.com', '634789464'),
('Dalila', '$2y$10$zjCsOnVhTFLMiwUjB.GSbezMwNjRa1.e2uRw9xjfAT9wlNLfnkyt2', 'C', 'Dalila Valles Mota', 'Caño, 97', 'Montederramo', '32750', '76442355S', '2005-03-03', 'dalilavallesmota@jourrapide.com', '669 527 7'),
('degived', '$2y$10$Sq8uMi0MblYhcSEnH4DGt.11ESY4o1Nwj7oZkLcibiBGllJIltWT6', 'C', 'Clarabella Griego Mejía', 'C/ Libertad, 17', 'Tíjola', '04880', '28110386Q', '2005-01-27', 'clarabellagriegomejia@dayrep.com', '738 621 7'),
('diegorod', '$2y$10$ANg0il/MtYrNXST212i9qONYTCKgEdnmGq8VDfW1kPhGJLLx7EmA6', 'C', 'Diego Rodríguez Gutiérrez', 'Calle Gran Vía, 15', 'Bilbao', '48001', '01234567N', '2005-06-02', 'diego.rodriguez@example.com', '606789012'),
('hillemeem', '$2y$10$XnJkKcb7NujrrMsizW23EuZBsXmgu2BPqQMDCNIR6IQ6B.B0U4ryi', 'P', 'Charo Rodarte Almonte', 'C/ Señores Curas, 43', ' Albocàsser', '12140', '34122240S', '2005-03-03', 'shonascott@gustr.com', '781 745 5'),
('luciasan', '$2y$10$kyQ1QIYz3VzvMt9U0LWia.EgwgDJcvD2IQnZXmY69uUoHWN9Y4F7G', 'C', ' Lucía Sánchez Martín', 'Avenida De La Constitución, 8', 'Granada', '18001', '67890123H', '2005-05-13', 'lucia.sanchez@example.com', '607890123'),
('mariag92', '$2y$10$2ROAn.7K8dYBLaP2rkC4GOSFhkQKq3M9gFN', 'C', 'María González López', 'Calle Mayor, 1', 'Madrid', '28001', '12345678A', '2004-11-11', 'maria.gonzalez@example.com', '600123456'),
('mariola', '$2y$10$0h9EsouDWJsg5iLVVIyzFOpa1EI4dIHEQm5wjhjNNo6cUjBEm1GpK', 'C', 'Gigí Barrera Rentería', 'C/ Angosto, 95', 'Huesa', '23487', '69502521A', '2005-02-05', 'usuario@user', '695 025 1'),
('pablo88', '$2y$10$U3dJWnvZQILfHQVKMbsCxOlBHLXNNSKRszavLY3U7Cmpdpfv1mV4S', 'C', 'Pablo López Martínez', 'Calle Mayor, 1', 'Barcelona', '08001', '87654321B', '2005-03-16', 'pablo.lopez@example.com', '601234567'),
('propietario', '$2y$10$hpihjWGMvSerVqel2IO6fOPLhHUtVeK8AhwzoOWCKymtxenedr696', 'P', 'Propietario Apellido', 'Carrer De Les Ramelleres, 16', 'Barcelona', '08001', '21212312A', '2005-04-13', 'propietario@propietario.com', '464564564'),
('propietarioprueba', '$2y$10$6wX3OyIq2NSkLfvmWNoZ7OvFyUwW4KGaRQ6.QF85WD3ooQg4bvsQS', 'P', 'Propietario De Prueba ', 'Av. República Argentina, 4, Piso 1', ' Cuenca', '16001', '18571851A', '2005-05-30', 'correpropietarioprueba@gmail.com', '698498494');

--
-- Disparadores `usuarios`
--
DELIMITER $$
CREATE TRIGGER `delusu_AD` AFTER DELETE ON `usuarios` FOR EACH ROW BEGIN
DECLARE cantidad INT;

SELECT COUNT(*) INTO @cantidad FROM usuarios WHERE codpostal=old.codpostal AND role = "C";


    IF @cantidad < 1 THEN
       	 DELETE  FROM poblaciones WHERE codpostal = old.codpostal;
         END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delusu_BD` BEFORE DELETE ON `usuarios` FOR EACH ROW BEGIN 

DELETE FROM reservas WHERE (propietario = old.idusuario OR cuidador = old.idusuario) AND estado = "F";

DELETE FROM calendario WHERE usuario = old.idusuario;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insusu_BI` BEFORE INSERT ON `usuarios` FOR EACH ROW BEGIN
DECLARE cantidad INT;

/*Nuevo rol del usuario*/
DECLARE role VARCHAR(1);

/*Asignar cantidad de poblaciones*/
SELECT COUNT(*) INTO @cantidad FROM poblaciones WHERE codpostal=new.codpostal;

   IF @cantidad=0 AND new.role="C" THEN
       	 INSERT INTO poblaciones VALUES (new.poblacion, new.codpostal);
         END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modusu_AU` AFTER UPDATE ON `usuarios` FOR EACH ROW BEGIN
/*Cantidad de poblaciones con el nuevo código postal*/
DECLARE cantidadPoblacion INT;

/*Cantidad de cuidadores con el nuevo código postal*/
DECLARE cantidadCuid INT;



/*Asignar cantidad de poblaciones*/
SELECT COUNT(*) INTO @cantidadPoblacion FROM poblaciones WHERE codpostal=new.codpostal;

/*Asignar cantidad de cuidadores*/
SELECT COUNT(*) INTO @cantidadCuid FROM usuarios WHERE codpostal=new.codpostal AND role = "C";

/*Si no existe población con ese codpostal y el role del usuario es cuidador*/
	IF @cantidadCuid = 0 THEN
		DELETE FROM poblaciones WHERE codpostal=old.codpostal;
	END IF;
/*Si no quedan cuidadores con el antiguo codpostal, eliminar de la
tabla poblaciones*/
	IF @cantidadPoblacion = 0 AND new.role = "C" THEN
		INSERT INTO poblaciones VALUES (new.poblacion, new.codpostal);
	END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_detalles`
--

CREATE TABLE `usuarios_detalles` (
  `usuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `cuidperro` tinyint(1) NOT NULL DEFAULT 0,
  `cuidgato` tinyint(1) NOT NULL DEFAULT 0,
  `jardin` tinyint(1) NOT NULL DEFAULT 0,
  `fumadores` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1-> no fumadores 0->fumadores',
  `cama` tinyint(1) NOT NULL DEFAULT 0,
  `muebles` tinyint(1) NOT NULL DEFAULT 0,
  `tamanocasa` varchar(1) COLLATE utf8mb4_spanish_ci NOT NULL COMMENT '[P]equeña, [M]ediana, [G]rande',
  `noninos` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1-> no hay niños 0->si hay',
  `ninosmenos` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Niños de menos de 12 años',
  `ninosmas` tinyint(1) NOT NULL DEFAULT 0 COMMENT 'Niños de más de 12 años\r\n',
  `hayperros` tinyint(1) NOT NULL DEFAULT 0,
  `haygatos` tinyint(1) NOT NULL DEFAULT 0,
  `perroscastr` tinyint(1) NOT NULL DEFAULT 0 COMMENT '1->acepta perros no castrados\r\n0-> no acepta\r\n',
  `perrasester` tinyint(1) NOT NULL DEFAULT 0,
  `gatoscastr` tinyint(1) NOT NULL DEFAULT 0,
  `gatasester` tinyint(1) NOT NULL DEFAULT 0,
  `coche` tinyint(1) NOT NULL DEFAULT 0,
  `medoral` tinyint(1) DEFAULT 0,
  `medinyec` tinyint(1) NOT NULL DEFAULT 0,
  `ejercicio` tinyint(1) NOT NULL DEFAULT 0,
  `perrotoy` tinyint(1) NOT NULL DEFAULT 0,
  `perropequeno` tinyint(1) NOT NULL DEFAULT 0,
  `perromediano` tinyint(1) NOT NULL DEFAULT 0,
  `perrogrande` tinyint(1) NOT NULL DEFAULT 0,
  `perroenorme` tinyint(1) NOT NULL DEFAULT 0,
  `cachorro` tinyint(1) NOT NULL DEFAULT 0,
  `adulto` tinyint(1) NOT NULL DEFAULT 0,
  `descripcion` text COLLATE utf8mb4_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios_detalles`
--

INSERT INTO `usuarios_detalles` (`usuario`, `cuidperro`, `cuidgato`, `jardin`, `fumadores`, `cama`, `muebles`, `tamanocasa`, `noninos`, `ninosmenos`, `ninosmas`, `hayperros`, `haygatos`, `perroscastr`, `perrasester`, `gatoscastr`, `gatasester`, `coche`, `medoral`, `medinyec`, `ejercicio`, `perrotoy`, `perropequeno`, `perromediano`, `perrogrande`, `perroenorme`, `cachorro`, `adulto`, `descripcion`) VALUES
('alejandrarod', 1, 1, 1, 1, 1, 1, 'M', 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 'Mensaje del cuidador: ¡Hola a todos! Soy Alejandra, una amante de los animales y cuidadora responsable. Ofrezco servicios de alojamiento y paseo para tus mascotas. Puedes confiar en mí para brindarles el cuidado y la diversión que necesitan mientras estás ocupado.'),
('alejo_89', 1, 1, 1, 1, 1, 1, 'M', 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 'Mensaje del cuidador: ¡Hola a todos! Soy Alejandro, un verdadero amante de los animales. Mi objetivo principal es brindarles un ambiente cómodo y lleno de alegría. Estoy disponible para servicios.'),
('cals1969', 1, 1, 0, 0, 0, 0, '', 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 'Solo cuido a perros o gatos cachorros y pequeños, puedo ofrecer transporte para alojamiento'),
('carlosm_78', 1, 0, 1, 1, 1, 1, 'M', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1, '¡Hola! Soy Carlos, un amante de los animales y cuidador con experiencia. Estoy comprometido en proporcionar el mejor cuidado posible para tus adorables mascotas. Ofrezco servicios de alojamiento, guardería y paseo. ¡Juntos crearemos momentos inolvidables!'),
('cuidadorprueba', 1, 1, 1, 1, 1, 0, 'P', 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 'Mensaje del Cuidador de Prueba '),
('Dalila', 1, 0, 1, 1, 0, 0, 'G', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 0, 'Me gustan mucho los animales, desde pequeñ@ he tenido mascotas en casa. Los entiendo como un@ más, les puedo brindar mucho cariño y cuidados. Cualquier pregunta pueden mandarme un Whatsapp a mi número de teléfono o a mi correo electrónico'),
('Degived', 1, 1, 0, 0, 0, 0, '', 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1, 'Me gustan mucho los animales, desde pequeñ@ he tenido mascotas en casa. Los entiendo como un@ más, les puedo brindar mucho cariño y cuidados. Cualquier pregunta pueden mandarme un Whatsapp a mi número de teléfono o a mi correo electrónico'),
('diegorod', 1, 1, 0, 1, 1, 0, 'P', 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, ' ¡Hola a todos! Soy Diego, un cuidador dedicado y amante de los animales. Ofrezco servicios de guardería para tus mascotas. Puedes estar tranquilo sabiendo que estarán bien cuidadas y entretenidas mientras estás fuera.'),
('luciasan', 1, 1, 1, 1, 0, 1, 'G', 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 'Mensaje del cuidador: ¡Hola! Soy Lucía, una amante de los paseos al aire libre y los animales. Estoy disponible para llevar a tus mascotas a disfrutar de paseos divertidos y saludables. Juntos exploraremos los parques y lugares más bonitos de la ciudad.'),
('mariag92', 1, 0, 1, 1, 1, 1, 'P', 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, '¡Hola! Soy María, una amante de los animales y cuidadora con experiencia. Me encanta proporcionar un ambiente cálido y acogedor para tus mascotas. Ofrezco servicios de alojamiento, guardería y paseo. ¡Tu peludo amigo estará en las mejores manos!'),
('mariola', 1, 1, 1, 1, 1, 1, 'G', 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 'Me gustan mucho los animales, desde pequeñ@ he tenido mascotas en casa. Los entiendo como un@ más, les puedo brindar mucho cariño y cuidados. Cualquier pregunta pueden mandarme un Whatsapp a mi número de teléfono o a mi correo electrónico'),
('pablo88', 1, 1, 0, 0, 0, 0, '', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1, '¡Hola! Soy Pablo, un apasionado de los animales y cuidador comprometido. Mi objetivo es brindar un entorno seguro y divertido para tus mascotas. Estoy disponible para servicios de alojamiento, guardería y paseo. ¡Juntos disfrutaremos de grandes momentos llenos de diversión!');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_imagenes`
--

CREATE TABLE `usuarios_imagenes` (
  `usuario` varchar(20) COLLATE utf8mb4_spanish_ci NOT NULL,
  `camino` varchar(255) COLLATE utf8mb4_spanish_ci NOT NULL DEFAULT 'ruta_imagen_no_encontrada',
  `posicion` tinyint(2) NOT NULL DEFAULT 0 COMMENT '[0]perfil, [1]galeria,\r\n[2]galeria, etc',
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_spanish_ci;

--
-- Volcado de datos para la tabla `usuarios_imagenes`
--

INSERT INTO `usuarios_imagenes` (`usuario`, `camino`, `posicion`, `id`) VALUES
('Dalila', 'Dalila/Dalila-0.png', 0, 191),
('propietario', 'propietario/propietario-0.png', 0, 209),
('cals1969', 'cals1969/cals1969-0.png', 0, 224),
('cals1969', 'cals1969/cals1969-1.png', 1, 225),
('cals1969', 'cals1969/cals1969-2.png', 2, 226),
('cals1969', 'cals1969/cals1969-3.png', 3, 227),
('cals1969', 'cals1969/cals1969-4.png', 4, 228),
('cals1969', 'cals1969/cals1969-5.png', 5, 229),
('cals1969', 'cals1969/cals1969-6.png', 6, 230),
('cals1969', 'cals1969/cals1969-7.png', 7, 231),
('cals1969', 'cals1969/cals1969-8.png', 8, 232),
('cals1969', 'cals1969/cals1969-9.png', 9, 233),
('mariag92', 'mariag92/mariag92-0.png', 0, 234),
('mariag92', 'mariag92/mariag92-1.png', 1, 235),
('mariag92', 'mariag92/mariag92-2.png', 2, 236),
('mariag92', 'mariag92/mariag92-3.png', 3, 237),
('mariag92', 'mariag92/mariag92-4.png', 4, 238),
('mariag92', 'mariag92/mariag92-5.png', 5, 239),
('mariag92', 'mariag92/mariag92-6.png', 6, 240),
('mariag92', 'mariag92/mariag92-7.png', 7, 241),
('mariag92', 'mariag92/mariag92-8.png', 8, 242),
('pablo88', 'pablo88/pablo88-0.png', 0, 243),
('pablo88', 'pablo88/pablo88-1.png', 1, 244),
('pablo88', 'pablo88/pablo88-2.png', 2, 245),
('pablo88', 'pablo88/pablo88-3.png', 3, 246),
('pablo88', 'pablo88/pablo88-4.png', 4, 247),
('pablo88', 'pablo88/pablo88-5.png', 5, 248),
('pablo88', 'pablo88/pablo88-6.png', 6, 249),
('pablo88', 'pablo88/pablo88-7.png', 7, 250),
('diegorod', 'cuidador/cuidador-0.png', 0, 262),
('diegorod', 'cuidador/cuidador-1.png', 1, 263),
('diegorod', 'cuidador/cuidador-2.png', 2, 264),
('diegorod', 'cuidador/cuidador-3.png', 3, 265),
('diegorod', 'cuidador/cuidador-4.png', 4, 266),
('diegorod', 'cuidador/cuidador-5.png', 5, 267),
('diegorod', 'cuidador/cuidador-6.png', 6, 268),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-0.png', 0, 269),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-1.png', 1, 270),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-2.png', 2, 271),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-3.png', 3, 272),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-4.png', 4, 273),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-5.png', 5, 274),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-6.png', 6, 275),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-7.png', 7, 276),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-8.png', 8, 277),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-9.png', 9, 278),
('cuidadorprueba', 'cuidadorprueba/cuidadorprueba-10.png', 10, 279),
('propietarioprueba', 'propietarioprueba/propietarioprueba-0.png', 0, 280),
('luciasan', 'luciasan/luciasan-0.png', 0, 291),
('luciasan', 'luciasan/luciasan-1.png', 1, 292),
('luciasan', 'luciasan/luciasan-2.png', 2, 293),
('luciasan', 'luciasan/luciasan-3.png', 3, 294),
('luciasan', 'luciasan/luciasan-4.png', 4, 295),
('luciasan', 'luciasan/luciasan-5.png', 5, 296),
('luciasan', 'luciasan/luciasan-6.png', 6, 297),
('luciasan', 'luciasan/luciasan-7.png', 7, 298),
('luciasan', 'luciasan/luciasan-8.png', 8, 299),
('alejo_89', 'alejo 89/alejo 89-0.png', 0, 300),
('alejo_89', 'alejo 89/alejo 89-1.png', 1, 301),
('alejo_89', 'alejo 89/alejo 89-2.png', 2, 302),
('alejo_89', 'alejo 89/alejo 89-3.png', 3, 303),
('alejo_89', 'alejo 89/alejo 89-4.png', 4, 304),
('alejo_89', 'alejo 89/alejo 89-5.png', 5, 305),
('alejo_89', 'alejo 89/alejo 89-6.png', 6, 306),
('alejo_89', 'alejo 89/alejo 89-7.png', 7, 307),
('alejo_89', 'alejo 89/alejo 89-8.png', 8, 308),
('carlosm_78', 'carlosm_78/carlosm_78-0.png', 0, 309),
('carlosm_78', 'carlosm_78/carlosm_78-1.png', 1, 310),
('carlosm_78', 'carlosm_78/carlosm_78-2.png', 2, 311),
('carlosm_78', 'carlosm_78/carlosm_78-3.png', 3, 312),
('carlosm_78', 'carlosm_78/carlosm_78-4.png', 4, 313),
('carlosm_78', 'carlosm_78/carlosm_78-5.png', 5, 314),
('carlosm_78', 'carlosm_78/carlosm_78-6.png', 6, 315),
('carlosm_78', 'carlosm_78/carlosm_78-7.png', 7, 316),
('carlosm_78', 'carlosm_78/carlosm_78-8.png', 8, 317),
('carlosm_78', 'carlosm_78/carlosm_78-9.png', 9, 318),
('alejandrarod', 'alejandrarod/alejandrarod-0.png', 0, 319),
('alejandrarod', 'alejandrarod/alejandrarod-1.png', 1, 320),
('alejandrarod', 'alejandrarod/alejandrarod-2.png', 2, 321),
('alejandrarod', 'alejandrarod/alejandrarod-3.png', 3, 322),
('alejandrarod', 'alejandrarod/alejandrarod-4.png', 4, 323),
('alejandrarod', 'alejandrarod/alejandrarod-5.png', 5, 324),
('alejandrarod', 'alejandrarod/alejandrarod-6.png', 6, 325),
('alejandrarod', 'alejandrarod/alejandrarod-7.png', 7, 326),
('alejandrarod', 'alejandrarod/alejandrarod-8.png', 8, 327);

--
-- Disparadores `usuarios_imagenes`
--
DELIMITER $$
CREATE TRIGGER `insimg_BI` BEFORE INSERT ON `usuarios_imagenes` FOR EACH ROW BEGIN
DECLARE cantidad INT;
DECLARE mensaje VARCHAR(150);

SELECT count(*) INTO @cantidad FROM usuarios_imagenes WHERE camino = new.camino AND usuario = new.usuario;


IF @cantidad > 0 THEN

/*Mensaje personalizado*/
SELECT CONCAT("Imagen ya subida") INTO @mensaje;

/*Lanzar error personalizado*/
SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = @mensaje;
      
ELSEIF new.camino = "" THEN
	SET new.camino = "imagen_no_disponible.png";
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `modimg_BA` BEFORE UPDATE ON `usuarios_imagenes` FOR EACH ROW BEGIN

DECLARE  imagen_no_dispobible VARCHAR(150);

IF new.camino = "" THEN

/*Formar ruta predeterminada si la ruta está vacía*/
SELECT CONCAT(new.usuario,  "/imagen_no_dispobible") INTO @imagen_no_dispobible;

	SET new.camino = @imagen_no_dispobible;
END IF;

END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `calendario`
--
ALTER TABLE `calendario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `idreserva` (`idreserva`),
  ADD KEY `usuario` (`usuario`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`idmascota`),
  ADD KEY `dueño` (`dueno`);

--
-- Indices de la tabla `mascotas_detalles`
--
ALTER TABLE `mascotas_detalles`
  ADD PRIMARY KEY (`idmascota`);

--
-- Indices de la tabla `mascotas_imagenes`
--
ALTER TABLE `mascotas_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idmascota` (`idmascota`);

--
-- Indices de la tabla `poblaciones`
--
ALTER TABLE `poblaciones`
  ADD PRIMARY KEY (`codpostal`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`idreserva`),
  ADD KEY `idmascota` (`idmascota`),
  ADD KEY `servicio` (`servicio`),
  ADD KEY `propietario` (`propietario`),
  ADD KEY `cuidador` (`cuidador`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`idservicio`);

--
-- Indices de la tabla `tarifas_cuidador`
--
ALTER TABLE `tarifas_cuidador`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `servicio` (`servicio`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idusuario`);

--
-- Indices de la tabla `usuarios_detalles`
--
ALTER TABLE `usuarios_detalles`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `usuarios_imagenes`
--
ALTER TABLE `usuarios_imagenes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `calendario`
--
ALTER TABLE `calendario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=71;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `idmascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=220;

--
-- AUTO_INCREMENT de la tabla `mascotas_imagenes`
--
ALTER TABLE `mascotas_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=500;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `idservicio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `tarifas_cuidador`
--
ALTER TABLE `tarifas_cuidador`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=153;

--
-- AUTO_INCREMENT de la tabla `usuarios_imagenes`
--
ALTER TABLE `usuarios_imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=328;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`dueno`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas_detalles`
--
ALTER TABLE `mascotas_detalles`
  ADD CONSTRAINT `mascotas_detalles_ibfk_1` FOREIGN KEY (`idmascota`) REFERENCES `mascotas` (`idmascota`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas_imagenes`
--
ALTER TABLE `mascotas_imagenes`
  ADD CONSTRAINT `mascotas_imagenes_ibfk_1` FOREIGN KEY (`idmascota`) REFERENCES `mascotas` (`idmascota`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_10` FOREIGN KEY (`idmascota`) REFERENCES `mascotas` (`idmascota`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_7` FOREIGN KEY (`propietario`) REFERENCES `usuarios` (`idusuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_8` FOREIGN KEY (`cuidador`) REFERENCES `usuarios` (`idusuario`) ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_9` FOREIGN KEY (`servicio`) REFERENCES `servicios` (`idservicio`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarifas_cuidador`
--
ALTER TABLE `tarifas_cuidador`
  ADD CONSTRAINT `tarifas_cuidador_ibfk_2` FOREIGN KEY (`servicio`) REFERENCES `servicios` (`idservicio`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `tarifas_cuidador_ibfk_3` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_detalles`
--
ALTER TABLE `usuarios_detalles`
  ADD CONSTRAINT `usuarios_detalles_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_imagenes`
--
ALTER TABLE `usuarios_imagenes`
  ADD CONSTRAINT `usuarios_imagenes_ibfk_1` FOREIGN KEY (`usuario`) REFERENCES `usuarios` (`idusuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
