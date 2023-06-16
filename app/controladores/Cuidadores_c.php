<?php
if (isset($_SESSION["tipoUser"]) && $_SESSION["tipoUser"] == "cuidador") {
    class Cuidadores_c extends Controller
    {
        private $cuidadores_m;
        public function __construct()
        {

            // cargar modelo cuidadores_m y guardarlo en variable privada
            $this->cuidadores_m = $this->loadModel("Cuidadores_m");
        }

        public function index()
        {
            $contenido = "inicioCuid_v";
            $this->loadView("plantillas/cabeceracuid");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
        }


        // crear mascota para cuidador 
        public function crearMascota()
        {
            $contenido = "crearMascotaCuid_v";
            $this->loadView("plantillas/cabeceracuid");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        // editar una mascota como cuidador
        public function editarMascota($parametros)
        {
            $_SESSION["idmascota"] = $parametros[0];
            $contenido = "editarMascotaCuid_v";
            $this->loadView("plantillas/cabeceracuid");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        //cargar vista reservas
        public function reservas()
        {
            $contenido = "reservas_v";
            $this->loadView("plantillas/cabeceracuid");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        // ver los detalles de la mascota
        public function detallesMascotas($idmascota)
        {
            $_SESSION["idmascota"] = $idmascota[0];
            $contenido = "detallesMascotaCuid_v";
            $this->loadView("plantillas/cabeceracuid");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }
    }
} else {


    class Cuidadores_c extends Controller
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
