<?php
// Asignar zona horaria de madrid 
date_default_timezone_set("Europe/Madrid");

// la fecha minima tiene que ser desde las 7:00 am hasta las 24:00
$fechaMinima = date('Y-m-d H:i');

// 1.9 si la fehca minima del momento es menor a las 7:00 am se le asignará esta misma
if ($fechaMinima < date('Y-m-d 07:00')) {
    $fechaMinima = date('Y-m-d') . "T07:00";
} else if (date('H') == '00') {
    // para que no de error si la hora es 00 hay que cambiarlo por 23
    $fechaMinima = date('Y-m-d') . "T" . date('23:i');
} else {
    $fechaMinima = date('Y-m-d') . "T" . date('H:i');
}


?>

<div class="warpperDetallesCuidadores d-flex flex-grow-1 fondoGradiente  ">
    <div class="container py-5  flex-grow-1">
        <form class="row justify-content-center needs-validation h-100 align-items-top row-gap-4" novalidate>

            <div class="col-12 fs-1"><mark class="rounded-3 p-2 lh-lg"> Reservar con <span class="nombreCuidador fst-italic"></span></mark></div>
            <div class="col-12 col-md-9 fs-4 my-4">
                <mark class="rounded-3 p-2 lh-lg"> Servicio</mark>

            </div>
            <div class="col-12 col-md-9">
                <div class="row justify-content-around" id="servicios">

                </div>
            </div>
            <div class="row justify-content-between column-gap-5 row-gap-5 my-5">
                <div class="col-12  col-md-7 px-0 d-flex flex-column">
                    <div class="row position-relative justify-content-center flex-grow-1">
                        <div class="col-7 mb-3">
                            <p class="fs-4" id="fechasTitulo"><mark class="rounded-3 p-2 lh-lg">Fechas <code>*</code></mark></p>
                        </div>


                        <div class="row d-none justify-content-center" id="diasDisponibles"> </div>

                        <a class="col-12 col-md-7 mt-4 link-info text-decoration-none fw-normal fs-6 d-none mouseOver" id="annadirDia" title="Añadir reserva nueva para servicio seleccionado ">
                            <i class="bi bi-plus-circle me-2"></i>
                            Añadir otro día para reservar
                        </a>
                    </div>


                    <!-- Spinner de carga especial para las fechas -->
                    <div class="d-flex align-items-center justify-content-center spinnerReserva" id="spinnerFechas">
                        <div class=" rounded text-black active p-2 " type=" button">
                            <p class="spinner-border" role="status" aria-hidden="true" style="--bs-spinner-animation-speed: 1s;--bs-spinner-width: 4rem; --bs-spinner-height: 4rem; margin: 0; --bs-spinner-border-width: 0.15em;  ">
                            </p>
                            <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 50px" class="position-absolute top-50 start-50 translate-middle">
                        </div>
                    </div>
                </div>

                <div class="col-12  col-md-4 d-flex flex-column justify-content-center px-0">
                    <div class="row h-100 justify-content-between table-responsive px-4">


                        <p class="fs-4 text-center"><mark class="rounded-3 p-2 lh-lg">Factura</mark></p>
                        <table class="table table-borderless table-striped table-hover text-center d-none" id="tablaFacturas">
                            <thead>
                                <tr>
                                    <th>Días</th>
                                    <th>Precio Servicio</th>
                                    <th>Plus Transporte</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>

                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colspan="4">
                                </tr>
                                <tr class="precioTotalFactura ">
                                    <td colspan="3" class="border-0 text-end"> <small class="me-3"> Precio Total </small></td>
                                    <td class="tdPrecio" id="tdPrecioTotal"> -</td>
                                </tr>
                            </tfoot>
                        </table>
                        <!-- Spinner de carga especial para la factura -->
                        <div class="d-flex align-items-center justify-content-center spinnerReserva" id="spinnerFactura">
                            <div class=" rounded text-black active p-2 " type=" button">
                                <p class="spinner-border" role="status" aria-hidden="true" style="--bs-spinner-animation-speed: 1s;--bs-spinner-width: 4rem; --bs-spinner-height: 4rem; margin: 0; --bs-spinner-border-width: 0.15em;  ">
                                </p>
                                <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 50px" class="position-absolute top-50 start-50 translate-middle">
                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <div class="col-11 col-md-8">
                <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" name="transporte" id="checkTrasnsporte" value="1">
                    <label class="form-check-label" for="transporte">¿Desea que su mascota sea recogida en su casa? </label>
                </div>
            </div>

            <div class="col-12 col-md-9 fs-4 mt-4">
                <mark class="rounded-3 p-2 lh-lg">Tus mascotas <code>*</code></mark>
            </div>
            <div class="col-11 col-md-8 fs-4 my-4" id="contenedorMascotas">

            </div>
            <div class="col-12 col-md-9 fs-4 my-4">
                <mark class="rounded-3 p-2 lh-lg">Mensaje</mark>
            </div>
            <div class="col-md-8 col-12">
                <div class="form-floating  p-0">
                    <textarea class="form-control" name="mensaje" id="floatingTextarea" maxlength="700"></textarea>
                    <label for="floatingTextarea" class="fw-semibold">Detalla todo lo que creas necesario que el cuidador necesita saber sobre la reserva</label>

                </div>
            </div>
            <div class="col-12 col-md-8 error text-danger fs-6 mt-5 d-none"></div>
            <div class="text-center">
                <button class="btn btn-success fs-5 mt-5" type="submit">Hacer Reserva</button>
            </div>
        </form>
    </div>
</div>


<script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassCuidador.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncUsuarios.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassReservar.js"></script>