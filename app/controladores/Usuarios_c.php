<?php

use function PHPSTORM_META\type;

if (isset($_SESSION["usuario"])) {
    class Usuarios_c extends Controller
    {
        private $usuarios_m;
        public function __construct()
        {
            // cargar modelo propietarios_m y guardarlo en variable privada
            $this->usuarios_m = $this->loadModel("Usuarios_m");
        }

        // perfil usuario
        public function index()
        {
            if ($_SESSION["tipoUser"] == "cuidador") {
                $contenido = "inicioCuid_v";
                $this->loadView("plantillas/cabeceracuid");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
            } else {
                $contenido = "inicio_v";
                $this->loadView("plantillas/cabeceraprop");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            }
        }

        // pestaña de inicio del usuario dependiendo de si es cuidador o propietario
        public function inicioUsuario()
        {
            if ($_SESSION["tipoUser"] == "cuidador") {
                $contenido = "inicioCuid_v";
                $this->loadView("plantillas/cabeceracuid");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
            } else {
                $contenido = "inicio_v";
                $this->loadView("plantillas/cabeceraprop");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            }
        }

        // eliminar los datos de una mascota
        public function eliminarMascota()
        {
            // eliminar la mascota de la BBDD
            $respuesta = $this->usuarios_m->eliminarMascota($_POST["idmascota"]);

            echo json_encode($respuesta);
            //si se ha eliminado la mascota, borrar tambien la carpeta con sus imagenes 
            if ($respuesta[0] == true) {
                $respuesta = $this->eliminarCarpetaYFotos($_POST["idmascota"], 1);
            }
        }

        // funcion para crear mascota y detalles
        public function crearMascota()
        {
            // crear mascota
            $respuesta = $this->usuarios_m->crearMascota($_POST);

            // añadir al array el id de la mascota creada
            if ($respuesta[0] == true) {
                $_POST["idmascota"] = $respuesta[1];

                // se vacia el array y se añade el idmascota
                $respuesta = [];
                $respuesta["idmascota"] =  $_POST["idmascota"];

                // si es propietario crear detalles
                if ($_SESSION["tipoUser"] == "propietario") {
                    $respuesta["detalles"] = $this->usuarios_m->crearDetallesMascota($_POST);
                }
            }
            echo json_encode($respuesta);
        }

        // validar que existe la imagen no disponible  mascotas
        public function validarExistenciaImgNoDisp()
        {
            $rutaMascotas = ROOT . PATH_ASSETS . "fotosMascotas/imagen_no_disponible.png";
            $rutaUsuarios = ROOT . PATH_ASSETS . "fotosUsuarios/imagen_no_disponible.png";

            // si no existe la imagen copiarla
            if (!file_exists($rutaMascotas)) {
                // copiar imagen no disponible 
                $rutaImagenOrigen = ROOT . PATH_ASSETS . "img/imagen_no_disponible.png";
                copy($rutaImagenOrigen, $rutaMascotas);
            }

            if (!file_exists($rutaUsuarios)) {
                // copiar imagen no disponible 
                $rutaImagenOrigen = ROOT . PATH_ASSETS . "img/imagen_no_disponible.png";
                copy($rutaImagenOrigen, $rutaUsuarios);
            }
        }

        // crear carpeta, subir imagen a BBDD y a la carpeta
        public function uploaderImagen()
        {
            // si la imagen se ha subido correctamente a BBDD y a la carpeta
            $todoOK = true;

            // ruta de la imagen
            $ruta = $_POST["ruta"];

            // propieatrio de la imagen
            $idpropietario = $_POST["idpropietario"];

            // posicion de la imagen
            $posicion = $_POST["posicion"];

            // si es foto de perfil 
            if (isset($_FILES["fotoperfil"])) {

                // guardar la imagen
                $fotoPerfil = $_FILES["fotoperfil"];

                // comprobar que existe la imagen no dispoible
                $this->validarExistenciaImgNoDisp();
                $tipo = explode("/", $fotoPerfil["type"]);
                if ($tipo[0] == "image") {
                    // comprobar que existe la carpeta y crearla
                    $this->crearCarpetaImg($ruta);
                    $todoOK =  $this->moverYAñadirImg($fotoPerfil,  $ruta, $idpropietario, $posicion);
                } else {
                    exit(json_encode("No cumple el formato"));
                }
            } else if (isset($_FILES["fotogaleria"])) {

                // si existe galeria 
                $imgGaleria = $_FILES["fotogaleria"];

                // comprobar que ha llegado una imagen 
                if ($imgGaleria["name"] != "") {
                    $tipo = explode("/", $imgGaleria["type"]);
                    if ($tipo[0] == "image") {

                        $todoOK = $this->moverYAñadirImg($imgGaleria, $ruta, $idpropietario, $posicion);
                    } else {
                        exit(json_encode("No cumple el formato"));
                    }
                }
            }
            echo json_encode($todoOK);
        }

        // mover imagen a carpeta y añadir a BBDD 
        public function moverYAñadirImg($imagen, $ruta, $idpropietario, $posicion)
        {
            $todoOK = true;
            $tempName = $imagen["tmp_name"];
            $todoOK = $this->moverFoto($tempName, $ruta);

            $carpetaUsuarios = "fotosusuarios/";
            $carpetaMascotas = "fotosmascotas/";

            // comprobar si la ruta contiene "fotosusuarios"
            if (strpos(strtolower($ruta), $carpetaUsuarios) != false) {
                // excluir de la ruta la carpeta "fotosUsuarios"
                $aparicion = strpos(strtolower($ruta), $carpetaUsuarios);
                $ruta = substr($ruta, $aparicion + strlen($carpetaUsuarios));

                $todoOK = $this->usuarios_m->anadirFotoUsu($ruta, $idpropietario, $posicion);
            } else {
                // excluir de la ruta la carpeta "fotoMascotas"
                $aparicion = strpos(strtolower($ruta), $carpetaMascotas);
                $ruta = substr($ruta, $aparicion + strlen($carpetaMascotas));
                $todoOK = $this->usuarios_m->anadirFotoMasc($ruta, $idpropietario, $posicion);
            }
            return $todoOK;
        }

        // crear carpeta de imagenes para mascotas y usuarios
        public function crearCarpetaImg($ruta)
        {
            // excluir de la ruta el nombre de la imagen
            $posicionBarra = strrpos($ruta, "/");
            $ruta = substr($ruta, 0, $posicionBarra);

            // comprobar que existe la carpeta de imagenes de la mascota y sino crearla
            if (!file_exists($ruta)) {
                // crear carpeta
                mkdir($ruta);
            }
        }

        // mover foto a la repectiva ruta
        public function moverFoto($tempName, $ruta)
        {
            // mover la imagen a la carpeta del usuario creada
            move_uploaded_file($tempName, $ruta);
            return file_exists($ruta);
        }

        // extraer la extension del file que se le pase
        public function extraerExtension($full_path)
        {
            return strtolower(pathinfo($full_path, PATHINFO_EXTENSION));
        }


        // eliminar todas las fotos de BBDD 
        public function eliminarFotosBBDD($id, $tipoBorrado = 0)
        {
            // borrado default ->  usuarios
            if ($tipoBorrado == 0)
                return $this->usuarios_m->eliminarFotosUsuario($id);
            // borrado 1 -> mascotas
            else
                return $this->usuarios_m->eliminarFotosMascota($id);
        }

        // eliminar la carpeta del servidor con las fotos de la mascota
        public function eliminarCarpetaYFotos($id, $tipoBorrado)
        {
            // borrado para mascotas
            if ($tipoBorrado == 1) {
                $ruta = "fotosMascotas/$id";
            } else {
                // borrado para usuarios
                $ruta = "fotosUsuarios/$id";
            }

            $path = ROOT . PATH_ASSETS . $ruta;

            if (is_dir($path)) {
                // abrir la carpeta
                $dir = opendir($path);

                // recorrer la carpeta y eliminar todos los archivos
                while (($imagen = readdir($dir)) != false) {

                    // borrar las imagenes y luego el directorio
                    if ($imagen != '.' && $imagen != '..') {
                        if (unlink($path . '/' . $imagen)) {
                            $todoOk = true;
                        } else {
                            $todoOk = false;
                            break;
                        }
                    }
                }

                // elimar carpeta si todos los archivos han sido eliminados
                if ($todoOk) {
                    rmdir($path);
                    closedir($dir);
                    return [true, ""];
                } else
                    return [false, "Ha surgido un problema al <strong>eliminar</strong> las imágenes de una de las mascotas, <strong>inténtelo de nuevo</strong>"];
            }
        }


        // eliminar solamente las fotos de la mascota pero dejando la carpeta
        public function eliminarFotos($id, $tipoBorrado)
        {
            // borrado para mascotas
            if ($tipoBorrado == 1) {
                $ruta = "fotosMascotas/$id/";
            } else {
                // borrado para usuarios
                $ruta = "fotosUsuarios/$id/";
            }
            $path = ROOT . PATH_ASSETS . $ruta;
            if (is_dir($path)) {

                // abrir la carpeta
                $dir = opendir($path);

                // recorrer la carpeta y eliminar todos los archivos
                while (($imagen = readdir($dir)) != false) {

                    // si las imagenes no son los directorios raiz
                    if ($imagen != '.' && $imagen != '..') {

                        // borrar las imagenes 
                        if (unlink($path . '/' . $imagen)) {
                            closedir($dir);
                            return true;
                        }
                    }
                }
            }
        }

        // funcion para editar mascota y detalles
        public function editarMascota()
        {
            // si es propietario crea la mascota y los detalles
            if ($_SESSION["tipoUser"] == "propietario") {
                // editar los datos de la mascota
                $respuesta = $this->usuarios_m->editarMascota($_POST);

                //si se ha editado la mascota editar sus detalles
                if ($respuesta[0] == true) {
                    $respuesta = $this->usuarios_m->editarDetallesMascota($_POST);
                }

                echo json_encode($respuesta);
            } else {
                // editar los datos de la mascota
                $respuesta = $this->usuarios_m->editarMascota($_POST);

                echo json_encode($respuesta);
            }
        }

        // eliminar una imagen de BBDD de usuarios o mascotas que tenga el mismo camino que 
        public function eliminarFotoBBDD()
        {
            $idpropietario = $_POST["idpropietario"];
            $ruta = $_POST["ruta"];
            $posicion = $_POST["posicion"];

            // comprobar si la ruta contiene "fotosusuarios"
            if (strpos(strtolower($ruta), "fotosusuarios/") != false) {
                // excluir de la ruta hasta "fotosUsuarios/"
                $aparicion = strpos(strtolower($ruta), "fotosusuarios/");
                $ruta = substr($ruta, $aparicion + strlen("fotosusuarios/"));

                echo json_encode($this->usuarios_m->eliminarFotoUsuario($idpropietario, $ruta, $posicion));
            } else {
                // excluir de la ruta hasta "fotosMascotas/"
                $aparicion = strpos(strtolower($ruta), "fotosmascotas/");
                $ruta = substr($ruta, $aparicion + strlen("fotosmascotas/"));

                echo json_encode($this->usuarios_m->eliminarFotoMascota($idpropietario, $ruta, $posicion));
            }
        }

        // eliminar el file de una imagen 
        public function eliminarFileImagen()
        {
            try {

                $ruta = $_POST["ruta"];
                // quitarle la base_url a la ruta y ponerle ruta root

                $ruta = str_replace(BASE_URL, ROOT,  $ruta);
                echo json_encode(unlink($ruta));
            } catch (Exception $e) {
                echo json_encode(false);
            }
        }

        // cargar vista subir imagenes mascota
        public function subirImagenesMascota()
        {
            $contenido = "subirImagenesMascota_v";
            if ($_SESSION["tipoUser"] == "cuidador") {
                $this->loadView("plantillas/cabeceracuid");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            } else {
                $this->loadView("plantillas/cabeceraprop");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            }
        }

        // vista mostrar mascotas propietarios
        public function mascotas()
        {
            $contenido = "mascotas_v";
            if ($_SESSION["tipoUser"] == "cuidador") {
                $this->loadView("plantillas/cabeceracuid");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            } else {
                $this->loadView("plantillas/cabeceraprop");
                $this->loadView("plantillas/menuUsuarios");
                $this->loadView($contenido);
                $this->loadView("plantillas/piedefault");
            }
        }

        // funcion para cerrar la sesión 
        public function cerrarSesion()
        {
            session_unset();
            session_destroy();

            $this->loadView("plantillas/cabeceradefault");

            // cargar js para eliminar usuario de sesión
            $this->loadView("cerrarSesion");
        }

        // actualizar el estado de las reservas 
        public function actualizarReservas()
        {
            echo json_encode($this->usuarios_m->actualizarReservas($_POST['idusuario']));
        }

        // extraer las reservas activas de un usuario
        public function extraerReservasActivas()
        {
            echo json_encode($this->usuarios_m->extraerReservasActivas($_POST["idusuario"]));
        }

        // extraer las venideras  de un usuario
        public function extraerReservasVenideras()
        {
            echo json_encode($this->usuarios_m->extraerReservasVenideras($_POST["idusuario"]));
        }

        // extraer las finalizadas de un usuario
        public function extraerReservasFinalizadas()
        {
            echo json_encode($this->usuarios_m->extraerReservasFinalizadas($_POST["idusuario"]));
        }
    }
} else {


    class Usuarios_c extends Controller
    {

        public function __construct()
        {
        }

        public function index()
        {

            $this->loadView("permisoDenegado");
        }
    }
}
