<?php
class Usuarios_m extends Model
{
    public function __construct()
    {
        // Llamada al constructor del padre para conectar a la BBDD
        parent::__construct();
    }

    // eliminar los datos de una mascota
    public function eliminarMascota($idmascota)
    {

        // sacar nombre de la mascota
        $cadSQL = "SELECT nombre as nombre FROM mascotas WHERE `idmascota` = $idmascota;";
        $this->consultar($cadSQL);
        $nombreMascota = $this->fila()["nombre"];
        if (!$nombreMascota) {
            return [false, "<div class=text-center>No se ha encontrado a tu mascota</div>"];
        }


        // antes de eliminar verificar que no hay ninguna reserva activa o verinera con esa mascota
        $cadSQL = "SELECT count(*) as cantidad FROM reservas WHERE `idmascota` = $idmascota and (`estado` LIKE 'A' OR `estado` LIKE 'V');";
        $this->consultar($cadSQL);
        // si hay más de 0 reservas devolver error
        if ($this->fila()["cantidad"] > 0) {
            return [false, "La mascota con nombre <strong> $nombreMascota </strong> no puede ser eliminada ya que tiene una reserva activa o pendiente"];
        }

        $cadSQL = "DELETE FROM mascotas WHERE idmascota = $idmascota;";
        $this->consultar($cadSQL);
        $this->ejecutar();

        return [false, $this->ejecutar()];

        // devolver si el delete se ha efectuado con éxito
        if ($this->cuenta() > 0) {
            return [true, ""];
        } else {
            return [false, "La mascota con nombre <strong> $nombreMascota </strong> no existe"];
        }
    }

    // eliminar todas las fotos de una mascota
    public function eliminarFotosMascota($idusuario)
    {
        $cadSQL = "DELETE FROM mascotas_imagenes WHERE id = $idusuario;";
        $this->consultar($cadSQL);
        $this->ejecutar();

        // devolver si el delete se ha efectuado con éxito
        return $this->cuenta() > 0;
    }
    // eliminar todas las fotos de una mascota
    public function eliminarFotosUsuario($idmascota)
    {
        $cadSQL = "DELETE FROM usuarios_imagenes WHERE id = $idmascota;";

        $this->consultar($cadSQL);
        $this->ejecutar();

        // devolver si el delete se ha efectuado con éxito
        return $this->cuenta() > 0;
    }

    // actualizar el estado de las reservas de un usuario
    public function actualizarReservas($idusuario)
    {
        try {
            $fechaActual = date('Y-m-d') . 'T' . date('H:i');

            // actualizar estado activa si fecha inicio menor o igual a la actual y fechfin mayor a actual
            $cadSQL = "UPDATE `reservas` SET `estado` = 'A' WHERE fechinicio <= :fechaactual AND fechfin >= :fechaactual AND (`propietario` = :usuario or `cuidador` = :usuario); ";

            $this->consultar($cadSQL);

            $this->enlazar(":usuario", $idusuario);
            $this->enlazar(":fechaactual", $fechaActual);
            // actualizar activas
            $this->ejecutar();


            // actualizar estado finalizada si fecha fin menor a la actual
            $cadSQL = "UPDATE `reservas` SET `estado` = 'F' WHERE  fechfin < :fechaactual AND (`propietario` = :usuario or `cuidador` = :usuario);";

            $this->consultar($cadSQL);
            $this->enlazar(":usuario", $idusuario);
            $this->enlazar(":fechaactual", $fechaActual);
            // actualizar activas
            $this->ejecutar();

            // no ha habido errores
            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    // añadir foto de perfil usuario
    function anadirFotoUsu($ruta, $idpropietario, $posicion)
    {

        // Crear cadena sql 
        $cadSQL = "INSERT INTO `usuarios_imagenes` (`usuario`, `camino`, `posicion`, `id`) VALUES ( :idpropietario ,  :ruta , :posicion , NULL);";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idpropietario", $idpropietario);
        $this->enlazar(":ruta", $ruta);
        $this->enlazar(":posicion", $posicion);

        // devolver si el insert se ha efectuado con éxito
        $this->ejecutar();

        return $this->cuenta() > 0;
    }

    // añadir foto de mascota
    function anadirFotoMasc($ruta, $idmascota, $posicion)
    {
        // Crear cadena sql 
        $cadSQL = "INSERT INTO `mascotas_imagenes` (`idmascota`, `camino`, `posicion`, `id`) VALUES ( :idmascota,  :ruta , :posicion, NULL);";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idmascota", $idmascota);
        $this->enlazar(":ruta", $ruta);
        $this->enlazar(":posicion", intval($posicion));


        // devolver si el insert se ha efectuado con éxito
        $this->ejecutar();
        return $this->cuenta() > 0;
    }

    // crear una mascota nueva
    function crearMascota($datos)
    {
        try {

            // Crear cadena sql 
            $cadSQL = "INSERT INTO `mascotas` (`idmascota`,`microchip`, `nombre`, `tipo`, `raza`, `tamano`, `sexo`, `anos`, `meses`, `esterilizacion`, `socninos`, `socperros`, `socgatos`, `dueno`) VALUES (NULL, :microchip, :nombre, :tipo, :raza, :tamano, :sexo, :anos, :meses, :esterilizacion, :socninos, :socperros, :socgatos, :usuario);";
            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos
            $this->enlazar(":microchip", $datos["microchip"]);
            $this->enlazar(":nombre", ucwords(strtolower($datos["nombre"])));
            $this->enlazar(":tipo", strtoupper($datos["tipo"]));
            $this->enlazar(":raza", ucwords(strtolower($datos["raza"])));
            if (isset($datos["tamano"]))
                $this->enlazar(":tamano", strtoupper($datos["tamano"]));
            else
                $this->enlazar(":tamano", "T");

            $this->enlazar(":sexo", strtoupper($datos["sexo"]));
            $this->enlazar(":anos", $datos["anos"]);
            $this->enlazar(":meses", $datos["meses"]);
            $this->enlazar(":esterilizacion", $datos["esterilizacion"]);
            $this->enlazar(":socninos", $datos["socninos"]);
            $this->enlazar(":socperros", $datos["socperros"]);
            $this->enlazar(":socgatos", $datos["socgatos"]);
            $this->enlazar(":usuario", $_SESSION["usuario"]);

            // devolver id de la nueva mascota insertada
            $this->ejecutar();
            if ($this->cuenta() > 0)
                return [true, $this->ultimoId()];
            else
                return [false, "<div class=text-center>Tu mascota no ha podido ser creada con éxito, intentalo de nuevo</div>"];
        } catch (Exception $e) {
            return [false, "<div class=text-center>Ha sucedido un error inesperado al crear tu mascota, inténtalo de nuevo</div>"];
        }
    }

    function crearDetallesMascota($datos)
    {
        try {
            // Crear cadena sql 
            $cadSQL = "INSERT INTO `mascotas_detalles` (`idmascota`, `actividad`, `necesidades`, `paseo`, `raciones`, `medtipo`, `mednom`, `masdetalles`) VALUES (:idmascota, :actividad, :necesidades, :paseo, :raciones, :medtipo, :mednom, :masdetalles);";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos
            $this->enlazar(":idmascota", $datos["idmascota"]);
            if (isset($datos["actividad"])) {
                $this->enlazar(":actividad", ucfirst($datos["actividad"]));
            } else {
                $this->enlazar(":actividad", "N");
            }

            if (isset($datos["necesidades"])) {
                $this->enlazar(":necesidades", $datos["necesidades"]);
            } else {
                $this->enlazar(":necesidades", 2);
            }

            if (isset($datos["paseo"])) {
                $this->enlazar(":paseo", ucfirst($datos["paseo"]));
            } else {
                $this->enlazar(":paseo", "T");
            }

            if (isset($datos["raciones"]) && $datos["raciones"] != "") {
                $this->enlazar(":raciones", $datos["raciones"]);
            } else {
                $this->enlazar(":raciones", "3");
            }

            if (isset($datos["medtipo"])) {
                $this->enlazar(":medtipo", ucfirst($datos["medtipo"]));
            } else {
                $this->enlazar(":medtipo", null);
            }

            if (isset($datos["mednom"])) {
                $this->enlazar(":mednom", ucwords($datos["mednom"]));
            } else {
                $this->enlazar(":mednom", null);
            }

            if (isset($datos["masdetalles"]) && $datos["masdetalles"] != "") {
                $this->enlazar(":masdetalles", $datos["masdetalles"]);
            } else {
                $this->enlazar(":masdetalles", null);
            }

            // devolver si el insert se ha efectuado con éxito
            $this->ejecutar();
            if ($this->cuenta() > 0) {
                return true;
            } else {
                throw new Exception();
            }
        } catch (Exception $e) {
            return [false, "<div class=text-center>Ha sucedido un error inesperado al crear los detalles de tu mascota, inténtalo de nuevo</div>"];
        }
    }

    // hacer update a mascotas
    function editarMascota($datos)
    {
        try {

            // Crear cadena sql 
            $cadSQL = "UPDATE `mascotas` SET `microchip` = :microchip, `nombre` = :nombre, `tipo` = :tipo, `raza` = :raza, `tamano` = :tamano, `sexo` = :sexo, `anos` = :anos, `meses` = :meses, `esterilizacion` = :esterilizacion, `socninos` = :socninos, `socperros` = :socperros, `socgatos` = :socgatos WHERE idmascota = :idmascota;";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos

            $this->enlazar(":microchip", $datos["microchip"]);
            $this->enlazar(":nombre", ucwords(strtolower($datos["nombre"])));
            $this->enlazar(":tipo", strtoupper($datos["tipo"]));
            $this->enlazar(":raza", ucwords(strtolower($datos["raza"])));
            if (isset($datos["tamano"])) {
                $this->enlazar(":tamano", strtoupper($datos["tamano"]));
            } else {
                $this->enlazar(":tamano", "T");
            }

            $this->enlazar(":sexo", strtoupper($datos["sexo"]));
            $this->enlazar(":anos", $datos["anos"]);
            $this->enlazar(":meses", $datos["meses"]);
            $this->enlazar(":esterilizacion", $datos["esterilizacion"]);
            $this->enlazar(":socninos", $datos["socninos"]);
            $this->enlazar(":socperros", $datos["socperros"]);
            $this->enlazar(":socgatos", $datos["socgatos"]);

            $this->enlazar(":idmascota", $datos["idmascota"]);


            // devolver si el update se ha efectuado con éxito
            $this->ejecutar();
            return [true, ""];
        } catch (Exception $e) {
            return [false, "<div class=text-center>Ha sucedido un error inesperado al intentar editar los datos de tu mascota, inténtalo de nuevo</div>"];
        }
    }


    // hacer un update a mascotas_detalles
    function editarDetallesMascota($datos)
    {
        try {
            // Crear cadena sql 
            $cadSQL = "UPDATE `mascotas_detalles` SET `actividad` = :actividad, `necesidades` = :necesidades, `paseo` = :paseo, `raciones` = :raciones, `medtipo` = :medtipo, `mednom` = :mednom, `masdetalles` = :masdetalles WHERE idmascota = :idmascota;";


            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos

            $this->enlazar(":idmascota", $datos["idmascota"]);
            if (isset($datos["actividad"]))
                $this->enlazar(":actividad", ucfirst($datos["actividad"]));
            else
                $this->enlazar(":actividad", "N");

            if (isset($datos["necesidades"]))
                $this->enlazar(":necesidades", $datos["necesidades"]);
            else
                $this->enlazar(":necesidades", 2);


            if (isset($datos["paseo"]))
                $this->enlazar(":paseo", ucfirst($datos["paseo"]));
            else
                $this->enlazar(":paseo", "T");


            if (isset($datos["raciones"]))
                $this->enlazar(":raciones", $datos["raciones"]);
            else
                $this->enlazar(":raciones", "3");


            if (isset($datos["medtipo"]))
                $this->enlazar(":medtipo", ucfirst($datos["medtipo"]));
            else
                $this->enlazar(":medtipo", null);


            if (isset($datos["mednom"]))
                $this->enlazar(":mednom", ucwords($datos["mednom"]));
            else
                $this->enlazar(":mednom", null);

            if (isset($datos["masdetalles"]))
                $this->enlazar(":masdetalles", $datos["masdetalles"]);
            else
                $this->enlazar(":masdetalles", null);


            // devolver si el update se ha efectuado con éxito
            $this->ejecutar();
            return [true, ""];
        } catch (Exception $e) {
            return [false, "<div class=text-center>Ha sucedido un error inesperado al intentar editar los datos de tu mascota, inténtalo de nuevo</div>"];
        }
    }

    // eliminar una imagen de mascotas
    function eliminarFotoMascota($idmascota, $ruta, $posicion)
    {
        $cadSQL = "DELETE FROM mascotas_imagenes WHERE `camino` = :ruta and `idmascota` = :idmascota and `posicion` = :posicion;";

        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idmascota", $idmascota);
        $this->enlazar(":ruta", $ruta);
        $this->enlazar(":posicion", $posicion);

        $this->ejecutar();

        // devolver si el delete se ha efectuado con éxito
        return $this->cuenta() > 0;
    }

    // eliminar una imagen de usuarios
    function eliminarFotoUsuario($usuario, $ruta, $posicion)
    {
        $cadSQL = "DELETE FROM mascotas_usuarios WHERE `camino` = :ruta and `usuario` = :usuario and `posicion` = :posicion;";

        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":usuario", $usuario);
        $this->enlazar(":ruta", $ruta);
        $this->enlazar(":posicion", intval($posicion));

        $this->ejecutar();

        // devolver si el delete se ha efectuado con éxito
        return $this->cuenta() > 0;
    }

    // extraer las reservas activas de un usuario
    public function extraerReservasActivas($idusuario)
    {
        $cadSQL = "SELECT  ROW_NUMBER() OVER (ORDER BY fechinicio) AS numero_fila,  `servicio`, `cuidador`, `idmascota`,`fechinicio`, `fechfin`, `transporte`, `importe`, `direccion`, `poblacion`, `codpostal`, `estado` FROM reservas WHERE estado = :estado and  (propietario = :propietario or cuidador = :cuidador) order by fechinicio;";

        $this->consultar($cadSQL);

        // enlazar idsuario
        $this->enlazar(":propietario", $idusuario);
        $this->enlazar(":cuidador", $idusuario);
        $this->enlazar(":estado", 'A');

        return $this->resultado();
    }

    // extraer las pasadas  de un usuario
    public function extraerReservasFinalizadas($idusuario)
    {
        $cadSQL = "SELECT ROW_NUMBER() OVER (ORDER BY fechinicio) AS numero_fila,  `servicio`, `cuidador`, `idmascota`,`fechinicio`, `fechfin`, `transporte`, `importe`, `direccion`, `poblacion`, `codpostal`,  `estado` FROM reservas WHERE estado = :estado and (propietario = :propietario or cuidador = :cuidador)  order by fechinicio;";

        $this->consultar($cadSQL);

        // enlazar idsuario
        $this->enlazar(":propietario", $idusuario);
        $this->enlazar(":cuidador", $idusuario);
        $this->enlazar(":estado", 'F');

        return $this->resultado();
    }

    // extraer las venideras de un usuario
    public function extraerReservasVenideras($idusuario)
    {
        $cadSQL = "SELECT ROW_NUMBER() OVER (ORDER BY fechinicio) AS numero_fila,  `servicio`, `cuidador`, `idmascota`,`fechinicio`, `fechfin`, `transporte`, `importe`, `direccion`, `poblacion`, `codpostal`,  `estado` FROM reservas WHERE estado = :estado and (propietario = :propietario or cuidador = :cuidador)   order by fechinicio;";

        $this->consultar($cadSQL);

        // enlazar idsuario
        $this->enlazar(":propietario", $idusuario);
        $this->enlazar(":cuidador", $idusuario);
        $this->enlazar(":estado", 'V');

        return $this->resultado();
    }
}
