<?php
class Registro_c extends Controller
{
    // Modelo del registro 
    private $registro_m;
    public function __construct()
    {

        // cargar modelo resgistro_m y guardarlo en variable privada
        $this->registro_m = $this->loadModel("Registro_m");
    }

    public function index()
    {
        $contenido = "elegirRegistro_v";
        $this->loadView("plantillas/cabecerasinnav");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }

    public function formCrearUsuario($parametros)
    {
        $_SESSION["tipoUser"] = $parametros[0];
        $contenido = "crearUsuario_v";

        $this->loadView("plantillas/cabecerasinnav");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }

    // llamada a BBDD y validar si existe el usuario 
    public function verificarUser()
    {
        // usuario insertado
        $usuario = strtolower($_POST["usuario"]);
        echo json_encode($this->registro_m->validarUsuario($usuario));
    }

    // llamada base de datos y verificar si un usuario ya tiene ese correo 
    public function verificarEmail()
    {
        $email = strtolower($_POST["email"]);

        // validar si existe el email
        if ($_SESSION["tipoUser"] == "propietario") {
            echo json_encode($this->registro_m->validarEmailPropietario($email));
        } else {
            echo json_encode($this->registro_m->validarEmailCuidador($email));
        }
    }
    public function verificarDni()
    {
        $dni = strtoupper($_POST["dni"]);

        if ($_SESSION["tipoUser"] == "propietario") {
            echo json_encode($this->registro_m->validarDniPropietario($dni));
        } else {
            echo json_encode($this->registro_m->validarDniCuidador($dni));
        }
    }



    // Guardar en session los datos de la ventana crearUsuario
    public function guardarDatosUsuario()
    {
        // añadir a la sesion para poder coger después los datos
        $_SESSION["email"] = strtolower($_POST["email"]);
        $_SESSION["usuario"] = strtolower($_POST["usuario"]);
        $_SESSION["contrasena"] = password_hash($_POST["contrasenna"], PASSWORD_DEFAULT);

        // validar que se han creado correctamente todas las variables
        if ($_SESSION["email"] && $_SESSION["usuario"] &&  $_SESSION["contrasena"]) {
            echo json_encode(true);
        } else {
            echo json_encode(false);
        }
    }

    // crear un nuevo usuario 
    public function crearUsuario()
    {
        try {
            $respuesta["mensajeError"] = "";

            // tipo de usuario 
            if (isset($_SESSION["tipoUser"])) {
                $datos["tipoUser"] = $_SESSION["tipoUser"];
            } else {
                throw new Exception('Su usuario no ha sido creado correctamente, <strong>deberá volver a hacer el registro<strong>');
            }

            // email del usuario 
            $datos["email"] = strtolower($_SESSION["email"]);

            // username del nuevo usuario
            $datos["usuario"] = strtolower($_SESSION["usuario"]);

            // contraseña que el usuario ha insertado 
            $datos["contrasena"] = $_SESSION["contrasena"];

            // Nombre y apellidos del usuario 
            $datos["apenom"] = ucwords(strtolower($_POST["apenom"]));

            // Dni del usuario 
            $datos["dni"] = strtoupper($_POST["dni"]);

            // direccion del usuario 
            $datos["direccion"] = ucwords(strtolower($_POST["direccion"]));

            // Fecha de nacimiento del usuario 
            $datos["fechanac"] = date("Y-m-d", strtotime($_POST["fechanac"]));

            // Código postal 
            $datos["codpostal"] = $_POST["codpostal"];

            // Poblacion del usuario
            $datos["poblacion"] = ucwords(strtolower($_POST["poblacion"]));

            // telefono del usuario
            $datos["telefono"] = $_POST["telefono"];

            // true -> usuario creadp correctamente
            if ($this->registro_m->crearUsuario($datos)) {

                // añadir a la sesion apenom
                $_SESSION["apenom"] = ucwords(strtolower($_POST["apenom"]));

                $repuesta["usuario"] = $_SESSION["usuario"];
                // devolver usuario para que sea añadido a session storage en js
                echo json_encode($repuesta);
            } else {
                throw new Exception('Su usuario no ha sido creado correctamente, <strong>deberá volver a hacer el registro<strong>');
            }
        } catch (Exception $e) {
            $respuesta["mensajeError"] = $e->getMessage();
            echo json_encode($respuesta);
        }
    }

    // formulario con más datos obligatorios
    public function formMasDatos()
    {
        if (isset($_SESSION["usuario"])) {
            $contenido = "datosRegistro_v";

            $this->loadView("plantillas/cabecerasinnav");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        } else {
            $this->index();
        }
    }

    // mostrar úlitma ventana de registro si es cuidador sino subir fotos
    public function terminarRegistro()
    {
        if (isset($_SESSION["tipoUser"])) {
            if ($_SESSION["tipoUser"] == "cuidador") {

                $contenido = "terminarRegistro_v";

                $this->loadView("plantillas/cabecerasinnav");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            } else {
                $this->subirImagenes();
            }
        } else {
            $this->reconducirALogin();
        }
    }

    // añadir detalles a cuidador nuevo
    public function anadirDetalles()
    {
        $tarifasOk = true;
        $detallesOk = true;
        // insertar tarifas del cuidador a tabla tarifas_cuidador
        for ($indice = 1; $indice < 4; $indice++) {

            // si existe el serivicio guardarlo en variables y eliminarlos del array que llega por $_POST
            if (isset($_POST["servicio$indice"])) {
                $servicio = $_POST["servicio$indice"];
                $precio = $_POST["precio$indice"];
                unset($_POST["servicio$indice"]);
                unset($_POST["precio$indice"]);

                // si tiene precio de transporte guardarlo y eliminarlo de la misma forma
                if (isset($_POST["trans$indice"])) {
                    $plustransporte = $_POST["trans$indice"];
                    unset($_POST["trans$indice"]);
                } else
                    $plustransporte = 0;

                // añadir a BBDD la tarifa
                $tarifasOk = $this->registro_m->anadirTarifa($_SESSION["usuario"], $servicio, $precio, $plustransporte);
            }
        }

        $detallesOk = $this->registro_m->anadirDetalles($_POST);
        if ($detallesOk == true && $tarifasOk == true)
            echo json_encode(true);
        else
            echo json_encode(false);
    }


    // Vista para subir las imagenes 
    public function subirImagenes()
    {
        if (isset($_SESSION["tipoUser"])) {
            $contenido = "subirImagenesUsu_v";

            $this->loadView("plantillas/cabecerasinnav");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        } else {
            $this->reconducirALogin();
        }
    }

    // reconducir al inico de la we
    public function reconducirALogin()
    {
        header("Location: " . BASE_URL . "Inicio_c/login");
    }
}
