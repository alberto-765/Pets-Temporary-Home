<?php
class Registro_m extends Model
{
    public function __construct()
    {
        // Llamada al constructor del padre para conectar a la BBDD
        parent::__construct();
    }

    // obtener usernames 
    public function validarUsuario($usuario)
    {
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios` WHERE `idusuario` = :usuario;";
        $this->consultar($cadSQL);
        $this->enlazar(":usuario", $usuario);
        return $this->fila()["cuenta"] > 0;
    }

    // obtener correos de los cuidadores 
    public function validarEmailCuidador($email)
    {
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios` WHERE `role` = 'C' AND `email` = :email;";
        $this->consultar($cadSQL);
        $this->enlazar(":email", $email);
        return $this->fila()["cuenta"] > 0;
    }

    // Obtener correos de usuarios propietarios 
    public function validarEmailPropietario($email)
    {
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios` WHERE `role` = 'P' AND `email` = :email;";
        $this->consultar($cadSQL);
        $this->enlazar(":email", $email);

        return $this->fila()["cuenta"] > 0;
    }

    // Crear un usuario
    public function crearUsuario($datos)
    {

        $tipoUser = $datos["tipoUser"];
        $usuario = $datos["usuario"];
        $email = $datos["email"];
        $contrasena = $datos["contrasena"];
        $apenom = $datos["apenom"];
        $dni = $datos["dni"];
        $fechanac = $datos["fechanac"];
        $direccion = $datos["direccion"];
        $codpostal = $datos["codpostal"];
        $poblacion = $datos["poblacion"];
        $telefono = $datos["telefono"];

        // Crear cadena sql 
        $cadSQL = "INSERT INTO `usuarios` (`idusuario`, `contrasena`, `role` , `apenom`, `direccion`, `poblacion`, `dni`, `codpostal`, `email`, `fechanac`, `telefono`) VALUES (:usuario, :contrasena, :role, :apenom, :direccion, :poblacion, :dni, :codpostal, :email, :fechanac, :telefono);";


        // preprarar consulta 
        $this->consultar($cadSQL);

        // enlazar variables 
        $this->enlazar(":usuario", $usuario);
        $this->enlazar(":contrasena", $contrasena);
        $this->enlazar(":apenom", $apenom);
        $this->enlazar(":direccion", $direccion);
        $this->enlazar(":codpostal", $codpostal);
        $this->enlazar(":dni", $dni);
        $this->enlazar(":fechanac", $fechanac);
        $this->enlazar(":email", $email);
        $this->enlazar(":poblacion", $poblacion);
        $this->enlazar(":telefono", $telefono);

        if ($tipoUser == "propietario") {
            $this->enlazar(":role", "P");
            $this->ejecutar();
            return $this->cuenta() == 1;
        } else {
            $this->enlazar(':role', "C");
            $this->ejecutar();
            return $this->cuenta() == 1;
        }
    }

    // añadir una nueva tarifa a la base de datos
    public function anadirTarifa($usuario, $servicio, $precio, $plustransporte)
    {
        // comprobar que hay ya tarifas del usuario
        $cadSQL = "SELECT count(*) as Cantidad FROM tarifas_cuidador WHERE `usuario` LIKE \"$usuario\" ;";

        // preprarar consulta 
        $this->consultar($cadSQL);
        // si ya hay detalles eliminarlos para volverlos a añadir
        if ($this->fila()["Cantidad"] > 0) {
            $cadSQL = "DELETE FROM `tarifas_cuidador` WHERE `usuario` LIKE \"$usuario\"";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // hacer delete
            $this->ejecutar();
        }

        // Crear cadena sql 
        $cadSQL = "INSERT INTO `tarifas_cuidador` (`usuario`, `servicio`,`precio`, `plustransporte` , `id`) VALUES (\"$usuario\", $servicio, $precio, " . (isset($plustransporte) && $plustransporte != null ? $plustransporte : 0) . ", NULL);";

        // preprarar consulta 
        $this->consultar($cadSQL);
        $this->ejecutar();

        return $this->cuenta() > 0;
    }

    public function anadirDetalles($datos)
    {
        // comprobar que hay ya detalles del usuario
        $cadSQL = "SELECT count(*) as Cantidad FROM usuarios_detalles WHERE usuario LIKE \"" . $_SESSION['usuario'] . "\";";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // si ya hay detalles eliminarlos para volverlos a añadir
        if ($this->fila()["Cantidad"] > 0) {
            // hacer delete
            $cadSQL = "DELETE FROM `usuarios_detalles` WHERE `usuario` LIKE \"" . $_SESSION['usuario'] . "\"";

            // preprarar consulta 
            $this->consultar($cadSQL);

            // devolver filas afectadas
            $this->ejecutar();
        }

        // hacer insert
        // Crear cadena sql 
        $cadSQL = "INSERT INTO `usuarios_detalles` (`usuario`";

        foreach ($datos as $clave => $valor) {
            $cadSQL .= ", `$clave`";
        }
        $cadSQL .= ") VALUES ( \"" . $_SESSION['usuario'] . "\"";

        foreach ($datos as $clave => $valor) {
            if ($clave == "tamanocasa" || $clave == "descripcion")
                $cadSQL .= ", \"$valor\"";
            else
                $cadSQL .= ", $valor";
        }
        $cadSQL .= ");";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // devolver si se ha realizado el insert correctamente
        $this->ejecutar();
        return $this->cuenta() > 0;
    }



    // validar que no hay ninguna imagen con la misma ruta para el mismo usuario
    function validarExistenciaFoto($ruta, $usuario)
    {
        // Crear cadena sql 
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios_imagenes` WHERE `camino` = :ruta AND usuario = :usuario;";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // enlazar ruta y usario
        $this->enlazar(":ruta", $ruta);
        $this->enlazar(":usuario", $usuario);

        // devolver cantidad fotos encontradas
        return $this->fila()["cuenta"] > 0;
    }

    // añadir foto de perfil usuario
    function anadirFotoUsu($ruta, $principal = 0)
    {
        // Crear cadena sql 
        $cadSQL = "INSERT INTO `usuarios_imagenes` (`usuario`, `camino`, `principal`, `id`) VALUES ( \"" . $_SESSION['usuario'] . "\", \"$ruta\", $principal, NULL);";

        // preprarar consulta 
        $this->consultar($cadSQL);

        // devolver si el insert se ha efectuado con éxito
        $this->ejecutar();
        return $this->cuenta() > 0;
    }

    // validar si hay algun cuidador con mismo "DNI"
    function validarDniCuidador($dni)
    {
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios` WHERE `role` = 'C' AND `dni` = :dni;";

        $this->consultar($cadSQL);
        $this->enlazar(":dni", $dni);
        return $this->fila()["cuenta"] > 0;
    }

    // validar si hay algun propietario con mismo "DNI"
    public function validarDniPropietario($dni)
    {
        $cadSQL = "SELECT count(*) as cuenta FROM `usuarios` WHERE `role` = 'P' AND `dni` = :dni;";
        $this->consultar($cadSQL);
        $this->enlazar(":dni", $dni);
        return $this->fila()["cuenta"] > 0;
    }
}
