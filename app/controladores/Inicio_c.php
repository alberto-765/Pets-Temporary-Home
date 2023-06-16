<?php

class Inicio_c extends Controller
{
    // Modelo del registro 
    private $inicio_m;
    private $registro_m;
    public function __construct()
    {
        // cargar modelo inicio_m y guardarlo en variable privada
        $this->inicio_m = $this->loadModel("Inicio_m");


        // cargar modelo resgistro_m y guardarlo en variable privada
        $this->registro_m = $this->loadModel("Registro_m");
    }
    // cargar el inicio
    public function index()
    {
        if (isset($_SESSION["usuario"])) {

            header("Location: " . BASE_URL . "Usuarios_c");
        } else {
            $contenido = "inicio_v";
            $this->loadView("plantillas/cabeceradefault");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }
    }


    // cargar la vista de buscar cuidador
    public function buscarCuidador($parametros = null)
    {
        // filtros a realizar
        $filtros = [];

        // si cuida perros
        if (isset($parametros[0]) && ($parametros[0] == 0 || $parametros[0] == 1))
            $filtros["cuidperro"] = $parametros[0];
        else
            $filtros["cuidperro"] = 0;

        // si cuida gatos
        if (isset($parametros[1]) && ($parametros[1] == 0 || $parametros[1] == 1))
            $filtros["cuidgato"] = $parametros[1];
        else
            $filtros["cuidgato"] = 0;

        // alojamiento
        if (isset($parametros[2]) && $parametros[2] != 0) {
            $filtros["servicio"] = $parametros[2];
        }

        // guarderia
        if (isset($parametros[3]) && $parametros[3] != 0) {
            $filtros["servicio"] = $parametros[3];
        }

        // paseo
        if (isset($parametros[4]) && $parametros[4] != 0)
            $filtros["servicio"] = $parametros[4];


        // si servicio sigue siendo undefine asigarle 0 (aleatorio)
        if (!isset($filtros["servicio"])) {
            $filtros["servicio"] = 0;
        }


        // donde
        if (isset($parametros[5]))
            $filtros["donde"] = $parametros[5];
        else
            $filtros["donde"] = 0;

        // fecha de inicio
        if (isset($parametros[6]))
            $filtros["calfechinicio"] = $parametros[6];
        else
            $filtros["calfechinicio"] = 0;

        // fecha de finalizacion
        if (isset($parametros[7]))
            $filtros["calfechfin"] = $parametros[7];
        else
            $filtros["calfechfin"] = 0;

        // subir a sesion los filtros para cargar cuidadores por llamada AJAX
        unset($_SESSION["filtros"]);
        $_SESSION["filtros"] = $filtros;


        $contenido = "buscarCuidador_v";
        if (isset($_SESSION["usuario"])) {
            if ($_SESSION["tipoUser"] == "propietario") {
                $this->loadView("plantillas/cabeceraprop");
            } else {
                header("Location:" .  BASE_URL . "Usuarios_c/");
            }
        } else {
            $this->loadView("plantillas/cabeceradefault");
        }
        $this->loadView("plantillas/menuUsuarios");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }


    // obtener cuidadores con los filtros establecidos 
    public function obtenerCuidadores()
    {

        echo json_encode($this->inicio_m->obtenerCuidadores($_POST));
    }

    // obtener la cantidad de cuidadores que cumplen los filtros establecidos
    public function obtenerCantidadCuidadores()
    {

        echo json_encode($this->inicio_m->obtenerCantidadCuidadores($_POST));
    }
    // obtener datos del usuario
    public function obtenerUsuario()
    {
        echo json_encode($this->inicio_m->obtenerUsuarioSinDetalles($_POST["idusuario"]));
    }

    // obtener toda la informacion de un cuidador
    public function obtenerUsuarioDetalles()
    {
        echo json_encode($this->inicio_m->obtenerUsuarioConDetalles($_POST["idusuario"]));
    }



    // obtener todas las poblaciones 
    public function obtenerPoblaciones()
    {
        echo json_encode($this->inicio_m->obtenerPoblaciones());
    }


    // cargar la vista de login
    public function login()
    {
        $contenido = "login_v";
        $this->loadView("plantillas/cabeceradefault");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }

    // Validar que el usuario y contraseña son correctos
    public function hacerLogin()
    {
        $usuario = $_POST["usuario"];
        $contraseña = $_POST["contrasena"];

        // llamada a funcion de registro_m que devuelve la cantidad de usuarios encontrados en BBDD
        $cantUsu = $this->registro_m->validarUsuario($usuario);


        // si se ha encontrado usuario seguir sino devoler false (error)
        if ($cantUsu == 1) {

            $contraCifrada = $this->inicio_m->obtenerContra($usuario);

            // validar si la contraseña es correcta
            if (password_verify($contraseña, $contraCifrada)) {

                // Añadir a la sesion el rol 
                $tipoUser = $this->inicio_m->obtenerRol($usuario);
                ($tipoUser == "C") ? $_SESSION["tipoUser"] = "cuidador" : $_SESSION["tipoUser"] = "propietario";

                // Añadir a la sesion el username
                $_SESSION["usuario"] = $usuario;

                // Añadir a la sesion nombre y apellidos
                $_SESSION["apenom"] = ucfirst($this->inicio_m->obtenerApenom($usuario));


                echo json_encode(true);
            } else
                echo json_encode(false);
        } else
            echo json_encode(false);
    }


    // obtener las mascotas del usuario 
    public function obtenerMascotasSinDetalles()
    {
        // devolver las mascotas del usuario
        echo json_encode($this->inicio_m->obtenerMascotasSinDetalles($_POST["usuario"]));
    }

    // obtener las mascotas del usuario con los detalles
    public function obtenerMascotasConDetalles()
    {
        echo json_encode($this->inicio_m->obtenerMascotasConDetalles($_POST["usuario"]));
    }


    // extraer la imagen de perfil de usuario o mascota
    public function extraerImagenPerfil()
    {
        $id = $_POST["id"];
        $tipo = $_POST["tipo"];

        // si es usuario 
        if ($tipo == "usuario") {
            $rutaImagen = $this->inicio_m->extraerPerfilCuidador($id);

            if ($rutaImagen) {
                echo json_encode(BASE_URL . PATH_ASSETS . "fotosUsuarios/" . $rutaImagen);
            } else {
                echo json_encode(BASE_URL . PATH_ASSETS . "fotosUsuarios/imagen_no_disponible.png");
            }
        } else {
            $rutaImagen = $this->inicio_m->extraerPerfilMascota($id);
            if ($rutaImagen) {
                echo json_encode(BASE_URL . PATH_ASSETS . "fotosMascotas/" . $rutaImagen);
            } else {
                echo json_encode(BASE_URL . PATH_ASSETS . "fotosMascotas/imagen_no_disponible.png");
            }
        }
    }

    // extraer imagenes de la galeria 
    public function extraerGaleria()
    {
        $id = $_POST["id"];
        $tipo = $_POST["tipo"];

        // galeria con las imágenes
        $galeria = [];

        // si es usuario 
        if ($tipo == "usuario") {
            $rutasGaleria = $this->inicio_m->extraerGaleriaCuidador($id);

            // recorrer rutas y guardar las rutas completas en array
            foreach ($rutasGaleria as $imagen) {

                $galeria[] = [$imagen["posicion"], BASE_URL . PATH_ASSETS . "fotosUsuarios/" . $imagen["camino"]];
            }

            // si el array está vacío devolver foto no econtrada
            if (count($galeria) > 0)
                echo json_encode($galeria);
            else
                echo json_encode("");


            // si es mascota
        } else {
            $rutasGaleria = $this->inicio_m->extraerGaleriaMascota($id);

            // recorrer rutas y guardar las rutas completas en array
            foreach ($rutasGaleria as $imagen) {

                $galeria[] = [$imagen["posicion"], BASE_URL . PATH_ASSETS . "fotosMascotas/" . $imagen["camino"]];
            }

            if (count($galeria) > 0)
                echo json_encode($galeria);
            else
                echo json_encode("");
        }
    }

    // mostrar detalles cuidador 
    public function detallesCuidador()
    {

        $contenido = "detallesCuidador_v";
        if (isset($_SESSION["usuario"])) {
            if ($_SESSION["tipoUser"] == "propietario") {
                $this->loadView("plantillas/cabeceraprop");
            } else {
                header("Location:" .  BASE_URL . "Usuarios_c/");
            }
        } else {
            $this->loadView("plantillas/cabeceradefault");
        }

        $this->loadView("plantillas/menuUsuarios");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }
    // ver los detalles de la mascota
    public function detallesMascotas($idmascota)
    {
        $_SESSION["idmascota"] = $idmascota[0];
        $contenido = "detallesMascotaProp_v";
        if (isset($_SESSION["usuario"])) {
            if ($_SESSION["tipoUser"] == "propietario") {
                $this->loadView("plantillas/cabeceraprop");
            } else {
                header("Location:" .  BASE_URL . "Cuidadores_c/");
            }
        } else {
            $this->loadView("plantillas/cabeceradefault");
        }
        $this->loadView("plantillas/menuUsuarios");
        $this->loadView($contenido);
        $this->loadView("plantillas/piedefault");
    }

    // obtener todo lo necesario para mostrar los cuidadores
    public function obtenerCuidadorConTodo()
    {
        echo json_encode($this->inicio_m->obtenerCuidadorConTodo($_POST["idusuario"]));
    }


    // seleccionar las fechas de calendario de cuidador
    public function selectCalendario()
    {
        $idusuario = $_POST["idusuario"];
        echo json_encode($this->inicio_m->selectCalendario($idusuario));
    }

    // obtener los precios de todos los servicios de un cuidador
    public function obtenerPrecios()
    {
        echo json_encode($this->inicio_m->obtenerPrecios($_POST));
    }

    // obtener servicios actuales
    public function obtenerServicios()
    {
        // se devuleve un array con objetos, y queremos que sea un objeto para no tener que recorrerlo en el front
        $copiaServicios = $this->inicio_m->obtenerServicios();

        foreach ($copiaServicios as $servicioYPrecio) {
            $servicios[$servicioYPrecio['idservicio']] = $servicioYPrecio['nombre'];
        }
        echo json_encode($servicios);
    }
}
