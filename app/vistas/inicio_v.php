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

<main class="wrapperInicio d-flex flex-column fondoGradiente  ">
    <!-- contenedor del apartado de buscar  -->
    <section class="wrapper-apartado1">
        <div class="container-sm my-5 rounded" id="buscar">
            <div class="row my-5 mx-md-5 px-xl-5  display-5 ">
                <div class="col-12 d-flex align-items-end gap-lg-4 gap-md-3 gap-0">
                    <span class="text-md-nowrap tituloMaquina">No a las residencias
                    </span>
                    <img id="perroInicio" class="" src="<?= BASE_URL ?>app/assets/img/perroInicio.png" alt="Imagen de perro">
                </div>


                <div class="col-12"><span class="tituloMaquina2">Encuentra a tu cuidador ideal</span></div>
            </div>

            <!-- Formulario para buscar cuidador  -->
            <form action="" id="inicioBuscar" class="sinFondo needs-validation" novalidate>
                <!-- seleccion tipo mascota  -->
                <div class="row w-75 mx-auto border border-dark-subtle p-3 rounded mb-4 seleccion" data-posicion=1>
                    <div class="col-12">
                        <span class="h6">Mascota:</span>
                    </div>
                    <div class="col-12 col-md-8 mx-auto d-flex justify-content-around  mt-2">

                        <!-- button perro  -->
                        <button class="btn btn-light px-3 px-lg-4 position-relative " type="button" title="Botón mascota perro">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro">
                            <p class="my-0"> Perro</p>
                            <input type="checkbox" name="cuidperro" value="1" class="btnMascota mouseOver">
                        </button>

                        <!-- button gato  -->
                        <button class="btn btn-light px-3 px-lg-4 position-relative " type="button"><img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato" title="Botón mascota gato">
                            <p class="my-0"> Gato </p>
                            <input type="checkbox" name="cuidgato" value="1" class="btnMascota mouseOver">

                        </button>

                    </div>
                </div>

                <!-- seleccion servicio -->
                <div class="row  w-75 mx-auto border border-dark-subtle p-3 rounded mb-4 seleccion">
                    <div class="col-12"> <span class="h6">Servicios:</span> </div>
                    <div class="col-12 col-lg-8 mx-auto d-flex justify-content-around mt-2">

                        <!-- button alojamiento  -->

                        <button class="btn btn-light px-sm-2 px-lg-4 position-relative " type="button" title="Botón servicio alojamiento">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/housenight.png" alt="Alojamiento en casa de cuidador">
                            <p class="my-0"> Alojamiento</p>
                            <input type="radio" name="servicio" class="servicio mouseOver" value="1" id="btn-alojamiento" />
                        </button>

                        <!-- button guardería  -->
                        <button class="btn btn-light px-sm-2 px-lg-4 position-relative" type="button" title="Botón servicio guardería">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/houseday.png" alt="Guarderia de dia">
                            <p class="my-0"> Guardería </p>
                            <input type="radio" name="servicio" class="servicio mouseOver" value="2" id="btn-guarderia" />
                        </button>

                        <!-- button paseo -->
                        <button class="btn btn-light px-sm-2 px-lg-5 position-relative" type="button" title="Botón servicio paseo">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/paseo.png" alt="Paseo por tu barrio ">
                            <p class="my-0"> Paseo </p>
                            <input type="radio" name="servicio" class="servicio mouseOver" value="3" id="btn-paseo" />
                        </button>

                    </div>
                </div>


                <!-- seleccion ubicacion y fecha -->
                <div class="row w-75 mx-auto fondoGradiente form__seccionUbi justify-content-between seleccion sinFondo">

                    <!-- Columnas con la ubicacion  -->
                    <div class="col col-12 col-lg-5 border border-dark-subtle p-3  rounded mb-4 mb-lg-0">
                        <label for="inputUbi" class="form-label mb-3 h6" style="padding: 0px 12px;">Código postal o Localidad:</label>

                        <input type="text" class="form-control py-3 fs-6 mouseOver" name="donde" list="datalistOptions" id="inputUbi" placeholder="Código postal o Localidad">

                        <datalist id="datalistOptions" class="datalist">

                        </datalist>

                    </div>

                    <!-- Columna con las fechas  -->
                    <div class="col col-12 col-lg-6 border border-dark-subtle p-3  rounded" id="fechas">
                        <div class="row justify-content-between align-items-center  h-100">
                            <div class="col-6 col-lg-5">
                                <span class="h6" style="padding: 0px 12px;">¿Entrega?:</span>
                            </div>
                            <div class="col-6 col-lg-5">
                                <span class="h6" style="padding: 0px 12px;">¿Recogida?: <code>*</code></span>
                            </div>
                            <div class="col-6 col-lg-5">
                                <input type="datetime-local" class="form-control inputDesde mouseOver" name="calfechinicio" min="<?= $fechaMinima ?>">
                                <div class="invalid-feedback">
                                    La fecha elegida debe ser mayor a las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59
                                </div>
                            </div>
                            <div class="col-6 col-lg-5">
                                <input type="datetime-local" class="form-control inputHasta mouseOver" name="calfechfin" min="<?= $fechaMinima ?>" disabled required>
                                <div class="invalid-feedback">
                                    La fecha elegida debe ser mayor a las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class=" row w-75 mx-auto form__seccionEnv fondoGradiente justify-content-center my-4 seleccion sinFondo">
                    <div class="col-6 d-grid ">
                        <button type="submit" class="btn btn-outline-info enviar shadow "> Buscar </button>
                    </div>
                </div>

            </form>
        </div>
    </section>

    <!-- contenedor del apartado en que consiste cada servicio  -->
    <section class="wrapper-apartado2 py-5">

        <!-- Fondo de imagen  -->
        <div id="fondoWrapper2">

        </div>
        <!-- Contenedor servicios  -->
        <div class="container-sm px-4 px-lg-5 " id="servicio">
            <!-- Row titulo  -->
            <div class="row ">
                <div class="col-12 titulo2 my-5 display-6">
                    <span class="text-md-nowrap pb-2 lh-lg tituloMaquina3">¿En qué consiste cada servicio?</span>
                </div>
            </div>

            <!-- Row alojamiento  -->
            <div class="row  container-servicios">
                <div class="col-8 col-lg-4">
                    <h4 class="mb-0">Alojamiento</h4>
                    <p class="fw-3 text-muted font-monospace">Noche en casa del cuidador</p>
                </div>
                <div class="col-auto text-start  align-middle">
                    <img class="" src="<?= BASE_URL ?>app/assets/iconos/housenight.png" alt="Alojamiento en casa de cuidador">
                </div>

                <div class="col-12">
                    <p>Tus mascotas pasan la noche en la casa del cuidador como uno más de la familia. El horario de entrega y recogida es de 7:00 a 24:00, hora peninsular.</p>
                    <p>¿Te vas a ir unos días de vacaciones y no tienes con quien dejar a tu mascota?</p>
                    <p>No recurras a residencias de mascotas con espacios reducidos donde no se lo pasará tan bien.</p>
                    <a href="<?= BASE_URL ?>Inicio_c/buscarCuidador/0/0/1" class="text-decoration-none ms-4">Buscar Ahora</a>
                </div>
            </div>

            <!-- Row guardería  -->
            <div class="row container-servicios mt-4">

                <div class="col-8 col-lg-4">
                    <h4 class="mb-0">Guardería</h4>
                    <p class="fw-3 text-muted font-monospace">Día en casa del cuidador</p>
                </div>
                <div class="col-auto text-start  align-middle">
                    <img class="" src="<?= BASE_URL ?>app/assets/iconos/houseday.png" alt="Guarderia de dia">
                </div>
                <div class="col-12">
                    <p>Tus mascotas pasan el horario de mañana en casa del cuidador, desde las 7:00 am hasta las 19:30 pm, hora peninsular, con un mínimo de 1 hora y un máximo de 10 horas.</p>
                    <p>¿Pasas mucho tiempo fuera de casa durante el horario de mañana y no quieres dejar a tu mascota sola?</p>
                    <a href="<?= BASE_URL ?>Inicio_c/buscarCuidador/0/0/0/2" class=" text-decoration-none ms-4">Buscar Ahora</a>
                </div>
            </div>

            <!-- Row paseo  -->
            <div class="row container-servicios mt-4">
                <div class="col-8 col-lg-4">
                    <h4 class="mb-0">Paseo</h4>
                    <p class="fw-3 text-muted font-monospace ">Por tu barrio</p>
                </div>
                <div class="col-auto text-start  align-middle">
                    <img class="" src="<?= BASE_URL ?>app/assets/iconos/paseo.png" alt="Paseo por tu barrio ">
                </div>
                <div class="col-12">
                    <p>Tus mascotas son paseadas tanto tiempo y tan lejos como sea necesario, reciben la atención y el cariño de un paseador experimentado.</p>
                    <p>El servicio dura 1 hora, alrededor de tu barrio, con un horario desde las 7:00 am hasta las 19:30 pm . </p>
                    <p>¿No puedes pasear a tu perro tanto durante unos días o no tienes tiempo durante el horario de mañana y quieres que tu mascota reciba la atención que se merece?</p>
                    <a href="<?= BASE_URL ?>Inicio_c/buscarCuidador/0/0/0/0/3" class=" text-decoration-none ms-4">Buscar Ahora</a>
                </div>
            </div>


        </div>
    </section>

    <!-- contenedor del apartado como funciona la plataforma  -->
    <section class="wrapper-apartado3 py-5 sinFondo">
        <div class="container-sm px-4 px-lg-0">

            <!-- Row titulo  -->
            <div class="row ">
                <div class="col-12 titulo mb-5 display-6">
                    <span class="text-md-nowrap pb-2 lh-lg tituloMaquina4">¿Como funciona la plataforma?</span>
                </div>
            </div>

            <!-- Row lista horizontal  -->
            <div class="row border border-dark rounded text-center  lista-horizontal">

                <!-- Columna buca cuidador  -->
                <div class="col-3 p-3 d-flex flex-column ">
                    <p class="fw-semibold">Busca un cuidador</p>
                    <div class="flex-grow-1 d-flex align-items-center">
                        <img src="<?= BASE_URL ?>app/assets/img/buscacuidador.jpg" alt="Busca cuidador">
                    </div>
                </div>

                <!-- Columna reservar  -->
                <div class="col-3 border-start border-dark p-3 d-flex flex-column">
                    <p class=" fw-semibold">Reserva</p>
                    <div class="flex-grow-1 d-flex align-items-center">
                        <img src="<?= BASE_URL ?>app/assets/img/reserva.png" alt="Reservar servicio de un cuidador">
                    </div>
                </div>

                <!-- Columna pagar  -->
                <div class="col-3 border-start border-dark p-3 d-flex flex-column">
                    <p class=" fw-semibold ">Paga</p>
                    <div class="flex-grow-1 d-flex align-items-center">
                        <img src="<?= BASE_URL ?>app/assets/img/paypal.png" alt="Pago por paypal">
                    </div>
                </div>

                <!-- Columna descansar  -->
                <div class="col-3 border-start border-dark p-3 d-flex flex-column">
                    <p class=" fw-semibold">Descansa</p>
                    <div class="flex-grow-1 d-flex align-items-center">
                        <img src="<?= BASE_URL ?>app/assets/img/vacaciones.png" alt="Disfruta de tus vacaciones">
                    </div>
                </div>
            </div>

        </div>
    </section>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncUsuarios.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/inicio.js"></script>