<?php
if (isset($_SESSION["tipoUser"]) && $_SESSION["tipoUser"] == "propietario") {
    class Propietarios_c extends Controller
    {
        private $propietarios_m;

        public function __construct()
        {
            // cargar modelo propietarios_m y guardarlo en variable privada
            $this->propietarios_m = $this->loadModel("Propietarios_m");
        }

        // inicio propietarios
        public function index()
        {
            $contenido = "inicio_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        // vista crear mascota para propietarios
        public function crearMascota()
        {
            $contenido = "crearMascotaProp_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        //cargar vista reservas
        public function reservas()
        {
            $contenido = "reservas_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        // editar una mascota como  propietario
        public function editarMascota($idmascota)
        {
            $_SESSION["idmascota"] = $idmascota[0];
            $contenido = "editarMascotaProp_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }


        // cargar vista de reservar
        public function cargarReservar()
        {
            $contenido = "reservar_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }

        // validar disponibilidad del cuidador en las fechas de la reserva
        public function validarDisponibilidadCuidador()
        {
            echo json_encode($this->propietarios_m->validarDisponibilidadCuidador($_POST));
        }

        // validar si la mascota no tiene ya una reserva en las fechas indicadas
        public function validarDisponibilidadMascota()
        {
            echo json_encode($this->propietarios_m->validarDisponibilidadMascota($_POST));
        }

        // recorrer dias del flujoReserva y crear dicha reserva
        public function realizarReservas()
        {
            $reservasCreadas = [];
            $_POST["flujoReserva"] = json_decode($_POST["flujoReserva"]);
            $_POST["cuidador"] = json_decode($_POST["cuidador"]);
            $servicioSeleccionado = $_POST["flujoReserva"]->servicio;

            foreach ($_POST["flujoReserva"]->diasServicios->$servicioSeleccionado as $dia) {
                if ($dia->diaValido == true) {
                    array_push($reservasCreadas, $this->propietarios_m->crearReserva($_POST, $dia));
                }
            }

            // si alguna reserva no se ha creado correctamente devolver false
            if (in_array(false, $reservasCreadas)) {
                echo json_encode(false);
            } else {
                echo json_encode(true);
            }
        }

        // mostrar detalles cuidador 
        public function detallesCuidador()
        {
            $contenido = "detallesCuidador_v";
            $this->loadView("plantillas/cabeceraprop");
            $this->loadView("plantillas/menuUsuarios");
            $this->loadView($contenido);
            $this->loadView("plantillas/piedefault");
        }
    }
} else {


    class Propietarios_c extends Controller
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
