<?php

class Inicio_m extends Model
{
    public function __construct()
    {
        // Llamada al constructor del padre para conectar a la BBDD
        parent::__construct();
    }


    // obtener la contraseña cifrada del usuario 
    public function obtenerContra($usuario)
    {
        $cadSQL = "SELECT `contrasena` FROM `usuarios` WHERE `idusuario` = :usuario;";
        $this->consultar($cadSQL);
        $this->enlazar(":usuario", $usuario);

        // devolver la contraseña 
        return $this->fila()['contrasena'];
    }

    // obtener el rol del usuario 
    public function obtenerRol($usuario)
    {
        $cadSQL = "SELECT `role` FROM `usuarios` WHERE `idusuario` = :usuario;";
        $this->consultar($cadSQL);
        $this->enlazar(":usuario", $usuario);

        // devolver la contraseña 
        return $this->fila()['role'];
    }

    // sacar apenom del usuario
    public function obtenerApenom($usuario)
    {
        $cadSQL = "SELECT `apenom` FROM `usuarios` WHERE `idusuario` = :usuario;";
        $this->consultar($cadSQL);
        $this->enlazar(":usuario", $usuario);

        // devolver la contraseña 
        return $this->fila()['apenom'];
    }

    // sacar las mascotas del usuario 
    public function obtenerMascotasSinDetalles($usuario)
    {
        $cadSQL = "SELECT * FROM `mascotas` WHERE `dueno` = :usuario;";
        $this->consultar($cadSQL);
        $this->enlazar(":usuario", $usuario);

        // devolver la contraseña 
        return $this->resultado();
    }

    // sacar todas las mascotas de un usuario con los detalles
    public function obtenerMascotasConDetalles($usuario)
    {
        $cadSQL = "SELECT * FROM `mascotas` masc INNER JOIN `mascotas_detalles` det ON masc.idmascota = det.idmascota WHERE `dueno` = '$usuario';";
        $this->consultar($cadSQL);
        return $this->resultado();
    }

    // obtener datos de la tabla usuarios 
    public function obtenerUsuarioSinDetalles($usuario)
    {

        $cadSQL = "SELECT `idusuario`, `apenom`, `poblacion`, `codpostal`, `direccion`, `email`, `telefono`, `fechanac`, `role` FROM `usuarios` WHERE idusuario = :idusuario";
        $this->consultar($cadSQL);

        //enlazar id usuario
        $this->enlazar(":idusuario", $usuario);

        // devolver el usuario
        return $this->resultado();
    }

    // obtener toda la informacion de un cuidador
    public function obtenerUsuarioConDetalles($usuario)
    {
        $cadSQL = "SELECT `idusuario`, `apenom`, `poblacion`, `codpostal`, `direccion`, `email`, `telefono`, `fechanac`, `role`, det.* FROM `usuarios` usu inner join `usuarios_detalles` det on usu.idusuario = det.usuario  WHERE usu.idusuario = :idusuario";

        $this->consultar($cadSQL);

        //enlazar id usuario
        $this->enlazar(":idusuario", $usuario);

        // devolver el usuario
        return $this->resultado();
    }



    // obtener los cuidadores que cumplan los filtros
    public function obtenerCuidadores($filtros)
    {

        if (isset($filtros["calfechinicio"]) && isset($filtros["calfechfin"]) && $filtros["calfechinicio"] != "" && $filtros["calfechfin"] != "") {


            // borrar tabla temporal
            $cadSQL = "DROP TABLE IF EXISTS TemporalCalendar;";
            // hacer consulta
            $this->consultar($cadSQL);


            // ejecutar
            $this->ejecutar();


            // crear tabla con los usuarios que tienen fechas no válidas a las elegidas pasando un filtro menor
            $cadSQL = "CREATE TEMPORARY TABLE TemporalCalendar AS SELECT * FROM (SELECT * FROM calendario) T1 WHERE NOT (\"$filtros[calfechfin]\" <= calfechinicio OR \"$filtros[calfechinicio]\" >= calfechfin) OR (\"$filtros[calfechfin]\" = calfechfin AND \"$filtros[calfechinicio]\" = calfechinicio);";


            // hacer consulta
            $this->consultar($cadSQL);
            // ejecutar
            $this->ejecutar();

            // volver a filtrar para extraer  los cuidadores que no cumplen el rango de inicio a fin 
            $cadSQL = "SELECT usuario FROM TemporalCalendar WHERE (\"$filtros[calfechfin]\" <= calfechfin and \"$filtros[calfechinicio]\" <= calfechinicio) OR (\"$filtros[calfechfin]\" >= calfechfin and \"$filtros[calfechinicio]\" >= calfechinicio) OR (\"$filtros[calfechfin]\" >= calfechfin and \"$filtros[calfechinicio]\" <= calfechinicio)  OR (\"$filtros[calfechfin]\" <= calfechfin and \"$filtros[calfechinicio]\" >= calfechinicio) GROUP BY usuario;";

            // hacer consulta
            $this->consultar($cadSQL);

            $usuariosNoValidos = $this->resultado();

            // si se filtra por precios se obtiene el servicio y el precio
            // es necesario hacerlo asi porque cuando servicio no se extraiga, en js se cogerá un servicio aleatorio
            if (isset($filtros["precio"]) || isset($filtros["servicio"])) {
                $cadSQL = "SELECT `idusuario`, `servicio` FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            } else {
                $cadSQL = "SELECT `idusuario`  FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            }

            // si hay más de un usuario hacer la cadena usuarios no validos
            if ($this->cuenta() > 0) {
                foreach ($usuariosNoValidos[0] as $columna => $usuarioNoValido) {

                    $cadSQL .= "AND (idusuario != \"$usuarioNoValido\") ";
                }
            }

            // insetar el resto de filtros
            foreach ($filtros as $columna => $valor) {

                // comprobar que no está vacio el valor y que no es ni "calfechinicio" ni "calfechfin" ni "ordenar"
                if (!empty($valor) && $columna != "calfechinicio" && $columna != "calfechfin" && $columna != "ordenar" && $columna != "valorpaginado") {
                    if ($columna == "donde") {
                        $cadSQL .= "AND (poblacion = \"$valor\" OR codpostal = \"$valor\") ";
                    } else if ($columna == "precio") {
                        $cadSQL .= "AND (precio <= $valor) ";
                    } else if ($columna == "tamanocasa") {
                        $cadSQL .= "AND $columna = \"$valor\"";
                    } else {
                        $cadSQL .= "AND $columna = $valor ";
                    }
                }
            }
        } else {
            // si se filtra por precios se obtiene el servicio y el precio
            // es necesario hacerlo asi porque cuando servicio no se extraiga, en js se cogerá un servicio aleatorio
            if (isset($filtros["precio"]) || isset($filtros["servicio"])) {
                $cadSQL = "SELECT `idusuario`, `servicio` FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            } else {
                $cadSQL = "SELECT `idusuario`  FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            }


            foreach ($filtros as $columna => $valor) {

                // comprobar que no está vacio y que no es "ordenar"
                if (!empty($valor) && $columna != "calfechinicio"  && $columna != "calfechfin" && $columna != "ordenar" && $columna != "valorpaginado") {
                    if ($columna == "donde") {
                        $cadSQL .= "AND (poblacion = \"$valor\" OR codpostal = \"$valor\") ";
                    } else if ($columna == "precio") {
                        $cadSQL .= "AND (precio <= $valor) ";
                    } else if ($columna == "tamanocasa") {
                        $cadSQL .= "AND $columna = \"$valor\" ";
                    } else {
                        $cadSQL .= "AND $columna = $valor ";
                    }
                }
            }
        }
        $cadSQL .= " GROUP BY idusuario ";

        // ordenar aleatorioa, precio asc o precio desc
        if (isset($filtros["ordenar"])) {
            if ($filtros["ordenar"] == 1) {
                $cadSQL .= " ORDER BY RAND()";
            } else if ($filtros["ordenar"] == 2) {
                $cadSQL .= " ORDER BY `precio` ASC";

                // si esta orden 2 (ordenar precio asc)
            } else if ($filtros["ordenar"] == 3) {
                $cadSQL .= " ORDER BY `precio` DESC";
            }
        }

        // obtener 6 cuidadores obviando la cantidad que se le diga
        $saltoCuidadores = intval($filtros["valorpaginado"]) * 6;
        $cadSQL .= " LIMIT 6 OFFSET $saltoCuidadores ;";


        $this->consultar($cadSQL);



        return $this->resultado();
    }


    // obtener todas las poblaciones de BBDD
    public function obtenerPoblaciones()
    {
        $cadSQL = "SELECT `poblacion`, `codpostal` FROM `poblaciones`";

        // preprarar consulta 
        $this->consultar($cadSQL);

        return $this->resultado();
    }


    // seleccionar el calendario de un cuidador
    public function selectCalendario($idusuario)
    {
        $cadSQL = "SELECT `role`,`calfechinicio`, `calfechfin`,`idreserva`  FROM `calendario` WHERE usuario = :usuario;";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // enlazar campos
        $this->enlazar(":usuario", $idusuario);
        return $this->resultado();
    }

    // obtener precios de los servicios de un cuidador
    public function obtenerPrecios($parametros)
    {
        // si servicio existe se obtiene solo los precios de ese servicio
        if (isset($parametros["servicio"]) && trim($parametros["servicio"]) != "") {
            $cadSQL = "SELECT `precio`,`nombre` as nombreServicio, `plustransporte`FROM `tarifas_cuidador` tar inner join `servicios` ser on ser.idservicio = tar.servicio WHERE usuario = :usuario and nombre = :servicio ORDER BY servicio ASC;";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos
            $this->enlazar(":usuario", $parametros["idusuario"]);
            $this->enlazar(":servicio", $parametros["servicio"]);
        } else {

            $cadSQL = "SELECT `precio`,`nombre` as nombreServicio, `plustransporte`FROM `tarifas_cuidador` tar inner join `servicios` ser on ser.idservicio = tar.servicio WHERE usuario = :usuario ORDER BY servicio ASC;";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // enlazar campos
            $this->enlazar(":usuario", $parametros["idusuario"]);
        }
        return $this->resultado();
    }

    // extrear imagenes galeria de un cuidador
    public function extraerGaleriaCuidador($idcuidador)
    {
        $cadSQL = "SELECT `posicion`, `camino` FROM `usuarios_imagenes` WHERE `usuario` = :idcuidador and `posicion` <> :posicion ;";
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idcuidador", $idcuidador);
        $this->enlazar(":posicion", 0);

        return $this->resultado();
    }

    // extrear imagenes galeria de un cuidador
    public function extraerGaleriaMascota($idmascota)
    {
        $cadSQL = "SELECT  `posicion`, `camino` FROM `mascotas_imagenes` WHERE `idmascota` = :idmascota and `posicion` <> :posicion order by posicion asc;";
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idmascota", $idmascota);
        $this->enlazar(":posicion", 0);

        return $this->resultado();
    }

    // extrear imagen perfil de un cuidador
    public function extraerPerfilCuidador($idcuidador)
    {
        $cadSQL = "SELECT `camino` FROM `usuarios_imagenes` WHERE `usuario` = :idcuidador and `posicion` = :posicion order by posicion asc;";
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idcuidador", $idcuidador);
        $this->enlazar(":posicion", 0);

        if (isset($this->fila()['camino']))
            return $this->fila()['camino'];
        else return false;
    }

    // extrear imagen perfil de un cuidador
    public function extraerPerfilMascota($idmascota)
    {
        // es necesario convertir el id a numero
        $idmascota = intval($idmascota);

        $cadSQL = "SELECT `camino` FROM `mascotas_imagenes` WHERE `idmascota` = :idmascota and `posicion` = :posicion ;";
        $this->consultar($cadSQL);

        // enlazar
        $this->enlazar(":idmascota", $idmascota);
        $this->enlazar(":posicion", 0);

        if (isset($this->fila()['camino']))
            return $this->fila()['camino'];
        else return false;
    }

    // obtener los servicios actuales con nombre e id
    public function obtenerServicios()
    {
        $cadSQL = "SELECT * FROM `servicios` order by idservicio asc";
        $this->consultar($cadSQL);
        return $this->resultado();
    }

    // obtener cantidad de cuidadores que cumplen los filtros
    // esta funcion es igual que la de obtenerCuidadores pero solo devuelve la cantidad
    // se ha hecho así por no hacer más compleja de lo que ya es la función obtenerCuidadores
    // obtener los cuidadores que cumplan los filtros
    public function obtenerCantidadCuidadores($filtros)
    {

        if (isset($filtros["calfechinicio"]) && isset($filtros["calfechfin"]) && $filtros["calfechinicio"] != "" && $filtros["calfechfin"] != "") {


            // borrar tabla temporal
            $cadSQL = "DROP TABLE IF EXISTS TemporalCalendar;";
            // hacer consulta
            $this->consultar($cadSQL);


            // ejecutar
            $this->ejecutar();


            // crear tabla con los usuarios que tienen fechas no válidas a las elegidas pasando un filtro menor
            $cadSQL = "CREATE TEMPORARY TABLE TemporalCalendar AS SELECT * FROM (SELECT * FROM calendario) T1 WHERE NOT (\"$filtros[calfechfin]\" <= calfechinicio OR \"$filtros[calfechinicio]\" >= calfechfin) OR (\"$filtros[calfechfin]\" = calfechfin AND \"$filtros[calfechinicio]\" = calfechinicio);";


            // hacer consulta
            $this->consultar($cadSQL);
            // ejecutar
            $this->ejecutar();

            // volver a filtrar para extraer  los cuidadores que no cumplen el rango de inicio a fin 
            $cadSQL = "SELECT usuario FROM TemporalCalendar WHERE (\"$filtros[calfechfin]\" <= calfechfin and \"$filtros[calfechinicio]\" <= calfechinicio) OR (\"$filtros[calfechfin]\" >= calfechfin and \"$filtros[calfechinicio]\" >= calfechinicio) OR (\"$filtros[calfechfin]\" >= calfechfin and \"$filtros[calfechinicio]\" <= calfechinicio)  OR (\"$filtros[calfechfin]\" <= calfechfin and \"$filtros[calfechinicio]\" >= calfechinicio) GROUP BY usuario;";

            // hacer consulta
            $this->consultar($cadSQL);

            $usuariosNoValidos = $this->resultado();

            // si se filtra por precios se obtiene el servicio y el precio
            // es necesario hacerlo asi porque cuando servicio no se extraiga, en js se cogerá un servicio aleatorio
            if (isset($filtros["precio"]) || isset($filtros["servicio"])) {
                $cadSQL = "SELECT count(DISTINCT idusuario) FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            } else {
                $cadSQL = "SELECT  count(DISTINCT idusuario)  FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            }

            // si hay más de un usuario hacer la cadena usuarios no validos
            if ($this->cuenta() > 0) {
                foreach ($usuariosNoValidos[0] as $columna => $usuarioNoValido) {

                    $cadSQL .= "AND (idusuario != \"$usuarioNoValido\") ";
                }
            }

            // insetar el resto de filtros
            foreach ($filtros as $columna => $valor) {

                // comprobar que no está vacio el valor y que no es ni "calfechinicio" ni "calfechfin" ni "ordenar"
                if (!empty($valor) && $columna != "calfechinicio" && $columna != "calfechfin" && $columna != "ordenar" && $columna != "valorpaginado") {
                    if ($columna == "donde") {
                        $cadSQL .= "AND (poblacion = \"$valor\" OR codpostal = \"$valor\") ";
                    } else if ($columna == "precio") {
                        $cadSQL .= "AND (precio <= $valor) ";
                    } else if ($columna == "tamanocasa") {
                        $cadSQL .= "AND $columna = \"$valor\"";
                    } else {
                        $cadSQL .= "AND $columna = $valor ";
                    }
                }
            }
        } else {
            // si se filtra por precios se obtiene el servicio y el precio
            // es necesario hacerlo asi porque cuando servicio no se extraiga, en js se cogerá un servicio aleatorio
            if (isset($filtros["precio"]) || isset($filtros["servicio"])) {
                $cadSQL = "SELECT count(DISTINCT idusuario) as Cantidad  FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            } else {
                $cadSQL = "SELECT count(DISTINCT idusuario) as Cantidad, idusuario  FROM `usuarios` usu INNER JOIN `usuarios_detalles` detalles ON usu.idusuario = detalles.usuario INNER JOIN `tarifas_cuidador` tarifa ON detalles.usuario = tarifa.usuario WHERE usu.role = \"C\" ";
            }


            foreach ($filtros as $columna => $valor) {

                // comprobar que no está vacio y que no es "ordenar"
                if (!empty($valor) && $columna != "calfechinicio"  && $columna != "calfechfin" && $columna != "ordenar" && $columna != "valorpaginado") {
                    if ($columna == "donde") {
                        $cadSQL .= "AND (poblacion = \"$valor\" OR codpostal = \"$valor\") ";
                    } else if ($columna == "precio") {
                        $cadSQL .= "AND (precio <= $valor) ";
                    } else if ($columna == "tamanocasa") {
                        $cadSQL .= "AND $columna = \"$valor\" ";
                    } else {
                        $cadSQL .= "AND $columna = $valor ";
                    }
                }
            }
        }

        $this->consultar($cadSQL);

        return $this->fila()["Cantidad"];
    }
}
