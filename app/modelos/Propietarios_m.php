<?php
class Propietarios_m extends Model
{
    public function __construct()
    {
        // Llamada al constructor del padre para conectar a la BBDD
        parent::__construct();
    }

    // crear reserva con los datos obtenidos 
    public function crearReserva($datos, $dia)
    {

        // si se ha seleccionado recogida en casa 
        if ($datos["flujoReserva"]->transporte == true) {
            $direccion = $datos["cuidador"]->direccion;
            $poblacion = $datos["cuidador"]->poblacion;
            $codpostal = $datos["cuidador"]->codpostal;
        } else {
            $direccion = NULL;
            $poblacion = NULL;
            $codpostal = NULL;
        }


        $cadSQL = "INSERT INTO `reservas` (`idreserva`, `fechinicio`, `fechfin`, `propietario`, `cuidador`, `importe`, `servicio`, `estado`, `transporte`, `mensaje`, `idmascota`, `direccion`, `poblacion`, `codpostal`) VALUES (:idreserva, :fechinicio,:fechfin,:propietario,:cuidador,:importe,:servicio,:estado,:transporte, :mensaje, :idmascota, :direccion, :poblacion, :codpostal);";


        // preprarar consulta 
        $this->consultar($cadSQL);

        // ENLAZAR PARAMETROS
        // generar id único con uniqid, debe hacerse así para los disparadores de BBDD
        $this->enlazar(":idreserva", uniqid());
        $this->enlazar(":importe", $dia->precioTotal);

        $this->enlazar(":idmascota", $datos["idmascota"]);
        $this->enlazar(":servicio", $datos["servicio"]);
        $this->enlazar(":fechinicio", $dia->fechaEntrega);
        $this->enlazar(":fechfin", $dia->fechaRecogida);
        $this->enlazar(":propietario", $datos["propietario"]);
        $this->enlazar(":mensaje", $datos["mensaje"]);
        $this->enlazar(":transporte", $datos["flujoReserva"]->transporte);
        $this->enlazar(":estado", "V");
        $this->enlazar(":cuidador", $datos["cuidador"]->idusuario);
        $this->enlazar(":direccion", $direccion);
        $this->enlazar(":poblacion", $poblacion);
        $this->enlazar(":codpostal", $codpostal);


        $this->ejecutar();

        // devolver si se ha creado la reserva
        return $this->cuenta() > 0;
    }


    // validar que el cuidador tiene disponibles las fechas seleccionadas
    public function validarDisponibilidadCuidador($datos)
    {

        // borrar tabla temporal
        $cadSQL = "DROP TABLE IF EXISTS TemporalCalendar;";
        // hacer consulta
        $this->consultar($cadSQL);

        // ejecutar
        $this->ejecutar();


        // crear tabla con las fechas que pueden ser validas, del cuidador que cumplen un primer filtro
        $cadSQL = "CREATE TEMPORARY TABLE TemporalCalendar AS SELECT * FROM (SELECT * FROM calendario) T1 WHERE NOT ('$datos[fechfin]' <= calfechinicio OR '$datos[fechinicio]' >= calfechfin) AND usuario = '$datos[cuidador]';";
        // hacer consulta
        $this->consultar($cadSQL);


        // ejecutar
        $this->ejecutar();

        // volver a hacer un filtro más preciso de las fechas del calendario del cuidador para validar que el rango de fechas es valido
        $cadSQL = "SELECT count(*) as cantidad FROM TemporalCalendar WHERE ('$datos[fechfin]' <= calfechfin and '$datos[fechinicio]' <= calfechinicio) OR ('$datos[fechfin]' >= calfechfin and '$datos[fechinicio]' >= calfechinicio) OR ('$datos[fechfin]' >= calfechfin and '$datos[fechinicio]' <= calfechinicio)  OR ('$datos[fechfin]' <= calfechfin and '$datos[fechinicio]' >= calfechinicio);";

        // hacer consulta
        $this->consultar($cadSQL);
        // si se ha encontrado alguna fecha, se imposibilita la reserva
        $cantidad = $this->fila()["cantidad"];
        if (isset($cantidad) && $cantidad > 0)

            return false;
        else return true;
    }

    // validar que la mascota seleccionada no tiene ya una reserva en las fechas seleccinadas
    public function validarDisponibilidadMascota($datos)
    {

        // borrar tabla temporal
        $cadSQL = "DROP TABLE IF EXISTS TemporalCalendar;";
        // hacer consulta
        $this->consultar($cadSQL);

        // ejecutar
        $this->ejecutar();


        // crear tabla con las fechas que pueden ser validas, del cuidador que cumplen un primer filtro
        $cadSQL = "CREATE TEMPORARY TABLE TemporalCalendar AS SELECT * FROM (SELECT * FROM reservas) T1 WHERE NOT ('$datos[fechfin]' <= fechinicio OR '$datos[fechinicio]' >= fechfin) AND 	idmascota = '$datos[idmascotaSeleccionada]';";
        // hacer consulta
        $this->consultar($cadSQL);


        // ejecutar
        $this->ejecutar();

        // volver a hacer un filtro más preciso de las fechas del calendario del cuidador para validar que el rango de fechas es valido
        $cadSQL = "SELECT count(*) as cantidad FROM TemporalCalendar WHERE ('$datos[fechfin]' <= fechfin and '$datos[fechinicio]' <= fechinicio) OR ('$datos[fechfin]' >= fechfin and '$datos[fechinicio]' >= fechinicio) OR ('$datos[fechfin]' >= fechfin and '$datos[fechinicio]' <= fechinicio)  OR ('$datos[fechfin]' <= fechfin and '$datos[fechinicio]' >= fechinicio);";

        // hacer consulta
        $this->consultar($cadSQL);
        // si se ha encontrado alguna fecha, se imposibilita la reserva
        $cantidad = $this->fila()["cantidad"];
        if (isset($cantidad) && $cantidad > 0) {
            return false;
        } else return true;
    }
}
