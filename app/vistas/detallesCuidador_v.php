<!-- Api mapas de google -->
<script defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCktBeyCBSCzZcUj0-ebb8kmE_E2zI7vCE"></script>
<?php
$idCuidador = explode(URI, "/");
$idCuidador = end($idCuidador);
?>
<div class="warpperDetallesCuidadores d-flex flex-column ">
    <div class="container flex-grow-1 d-flex flex-column align-items-center">
        <div class="row pt-5  mx-3 mx-md-0 justify-content-between  w-100">
            <div class="col-12 col-md-6 my-md-5 d-flex align-content-center">
                <div class="row align-items-center  w-100">
                    <div class="col-5 col-md-4 imagenCuidador d-flex align-items-center">
                        <img src="<?php echo BASE_URL . "app/assests/fotosUsuarios/imagen_no_dispoible.png" ?>" class="w-100 object-fit-contain fotoPerfilCuid rounded d-none">
                        <p class="placeholder-glow text-center">
                            <span class="placeholder col-12 placeHolderImagen"></span>
                        </p>
                    </div>
                    <div class="col-7 col-md-8">
                        <h1 class="fs-2 d-none text-break"> <span class="nombreCuidador"></span></h1>
                        <p class="placeholder-glow text-center">
                            <span class="placeholder col-12"></span>
                        </p>
                        <p class="lead fw-semibol" id="direccion"></p>
                        <p class="placeholder-glow text-center mt-5">
                            <span class="placeholder col-12"></span>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12 col-md-5 my-md-5">
                <div class="row my-5 mt-md-0 justify-content-center row-gap-3" id="perfilMascota">
                    <div class="col-12 mb-2">
                        <h2 class="fs-4 d-none">Mascotas de <span class="nombreCuidador text-break"> </span></h2>
                        <p class="placeholder-glow text-center">
                            <span class="placeholder col-12 col-md-9"></span>
                        </p>
                    </div>
                    <p class="placeholder-glow text-center">
                        <span class="placeholder col-12 col-md-9"></span>
                    </p>
                </div>
            </div>
        </div>
        <div class="row mt-2">
            <nav id="navbar-detalles" class="navbar bg-body-tertiary p-3 mb-4">

                <ul class="nav nav-pills column-gap-4 ">
                    <li class="nav-item">
                        <a class="btn btn-light fs-5" href="#scrollTarget1">Sobre mí</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light fs-5" href="#scrollTarget2">Servicios y tarifas</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light fs-5" href="#scrollTarget3">Disponibilidad</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light fs-5" href="#scrollTarget4">Ubicación</a>
                    </li>
                    <li class="nav-item">
                        <a class="btn btn-light fs-5" href="#scrollTarget5">Galería</a>
                    </li>

                </ul>
                <a href="<?php echo BASE_URL . "Propietarios_c/detallesCuidador/$idCuidador" ?>" type="button" class="navbar-brand btn m-0 mt-4 mt-lg-0 mouseOver" id="reservar" style="background-color: #E97777; color: white;"><i class="bi bi-cart2"></i> Reservar</a>
            </nav>
            <div data-bs-spy="scroll" data-bs-target="#navbar-detalles" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-5 rounded-2 " tabindex="0">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-4 imagenCuidador text-center h-100">
                        <img src="" class="w-75 object-fit-cover fotoPerfilCuid rounded">
                        <p class="placeholder-glow text-center ">
                            <span class="placeholder col-12 col-md-10 placeHolderImagen"></span>
                        </p>
                        <ul class="list-group mt-3 fw-semibold">
                            <li class="list-group-item border-0  bg-transparent d-flex align-items-center fs-5 text-break" id="edad"><i class="bi bi-balloon  fs-3 me-3 "></i>
                                <div class="placeholder-glow text-center flex-grow-1">
                                    <span class="placeholder col-12"></span>
                                </div>
                            </li>
                            <li class="list-group-item border-0  bg-transparent d-flex align-items-center fs-5 text-break" id="telefono"> <i class="bi bi-telephone  fs-3 me-3"></i>
                                <div class="placeholder-glow text-center flex-grow-1">
                                    <span class="placeholder col-12"></span>
                                </div>
                            </li>
                            <li class="list-group-item border-0  bg-transparent d-flex align-items-center fs-5 text-break text-start" id="correo"><i class="bi bi-envelope-check  fs-3 me-3 ">
                                </i>
                                <div class="placeholder-glow text-center flex-grow-1">
                                    <span class="placeholder col-12"></span>
                                </div>
                            </li>

                        </ul>
                    </div>
                    <div class="col-12 col-md-8">
                        <div class="row justify-content-center">
                            <div class="col-12 mt-5 mt-md-0">
                                <h3 class="d-none">Sobre <span class="nombreCuidador text-break fst-italic"> </span></h3>
                                <p class="placeholder-glow text-center">
                                    <span class="placeholder col-12"></span>
                                </p>
                            </div>
                            <div class="col-12">
                                <div class="muted mb-1 mt-3 fs-4 "><small>Breve descripción del cuidador</small> </div>
                                <p id="descripcion" class="d-none ms-5 mt-3"></p>
                                <p class="placeholder-glow text-center">
                                    <span class="placeholder col-12 col-md-9"></span>
                                </p>
                            </div>
                            <div class="col-12 col-md-6  mt-4">
                                <h5>Acerca de la casa</h5>
                                <ul class="list-group my-4 " id="casa">

                                </ul>
                            </div>
                            <div class="col-12 col-md-6 mt-4">
                                <h5>Puede cuidar en su casa</h5>
                                <div class="d-flex flex-wrap row-gap-3 justify-content-between column-gap-0 mt-4" id="puedeCuidar">

                                    <!-- button perro toy -->
                                    <button class="btn btn-light  position-relative  border border-dark-subtle " type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/toy.png" alt="Icono cachorro" style="width: 40px;">
                                        <p class="my-0 fw-semibold"> Toy</p>
                                        <p class="my-0 text-nowrap"> Menos 5Kg</p>

                                    </button>

                                    <!-- button perro pequeño  -->
                                    <button class="btn btn-light position-relative  border border-dark-subtle fs-6" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/pequeño.png" alt="Icono cachorro" style="width: 40px;">
                                        <p class="my-0 fw-semibold "> Pequeño</p>
                                        <p class="my-0 text-nowrap">5-10Kg</p>

                                    </button>

                                    <!-- button perro mediano -->
                                    <button class="btn btn-light   position-relative  border border-dark-subtle" type="button ">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/mediano.png" alt="Icono perro enorme" style="width: 40px;">
                                        <p class="my-0 fw-semibold"> Mediano </p>
                                        <p class="my-0 text-nowrap">10-25Kg</p>

                                    </button>

                                    <!-- button perro grande -->
                                    <button class="btn btn-light  position-relative  border border-dark-subtle " type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/grande.png" alt="Icono perro enorme" style="width: 40px;">
                                        <p class="my-0 fw-semibold"> Grande </p>
                                        <p class="my-0 text-nowrap">25-40Kg</p>

                                    </button>

                                    <!-- button perro gigante -->
                                    <button class="btn btn-light  position-relative  border border-dark-subtle" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/enorme.png" alt="Icono perro enorme" style="width: 40px;">
                                        <p class="my-0 fw-semibold"> Enorme </p>
                                        <p class="my-0 text-nowrap"> Más 40Kg</p>
                                    </button>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 " id="scrollTarget1">
                                <h5>Más sobre las mascotas</h5>
                                <ul class="list-group my-4" id="masMascotas">
                                </ul>
                            </div>

                            <div class="col-12 col-md-6 ">
                                <h5>Tipo mascotas que puede cuidar</h5>
                                <div class="d-flex flex-wrap row-gap-3 justify-content-evenly column-gap-5 mt-4" id="tiposMascotaCuidar">

                                    <!-- button perro  -->
                                    <button class="btn btn-light position-relative  border border-dark-subtle py-2 px-4" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro" style="width: 40px;">
                                        <p class="my-0"> Perro</p>

                                    </button>


                                    <!-- button gato  -->

                                    <button class="btn btn-light position-relative  border border-dark-subtle py-2 px-4" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato" style="width: 40px;">
                                        <p class="my-0"> Gato </p>
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div class="col-12 col-md-6">
                            <h5>Más detalles </h5>
                            <ul class="list-group my-4" id="masDetalles">
                            </ul>
                        </div>
                        <div class="col-12 col-md-6">

                        </div>
                    </div>
                </div>
            </div>
            <div id="scrollTarget2"></div>
            <div class="row justify-content-center align-items-center my-5 row-gap-3" id="servicios">
                <div class="col-12 mt-5">
                    <h2 class="fs-2 mb-4">Servicios y tarifas</h2>
                </div>

            </div>
            <div id="scrollTarget3"></div>
            <div class="row justify-content-center align-items-center my-5 row-gap-3">
                <div class="col-12 mt-5 mt-md-0">
                    <h3>Disponibilidad</h3>
                </div>
                <div class="col-12 col-md-10 calendario"></div>
                <div class="col-10 col-md-4 d-flex justify-content-center align-items-center">
                    <!-- <div class="">
                            <p class="bfw-bold  mb-1">No disponible</p>
                            <div class="tipoDia  mx-auto bg-info-subtle">

                            </div>
                        </div> -->
                    <div>
                        <p class="bfw-bold mb-1">Reservado</p>
                        <div class="tipoDia  mx-auto bg-danger-subtle " id="scrollTarget4">
                        </div>
                    </div>
                </div>
            </div>

            <div class="row justify-content-center align-items-center my-5 row-gap-3">
                <div class="col-12 mt-5 mt-md-0">
                    <h3>Ubicación</h3>
                </div>
                <div id="mapa" class="border border-2  rounded col-10" style="height: 600px;"></div>

            </div>
            <div class="row justify-content-center align-items-center my-5 row-gap-3" id="galeria">
                <div class="col-12 mt-5">
                    <h2 class="fs-2">Galería</h2>
                </div>
                <!-- Carousel con las imagenes  -->
                <div class="col-12 col-md-9">
                    <div id="carouselGaleriaDetalles" class="carousel slide carousel-dark ">
                    </div>
                </div>
            </div>
            <span id="scrollTarget5"></span>
        </div>
    </div>
</div>
<!-- para calendario  -->
<script src="<?= BASE_URL; ?>app/assets/libs/index.global.min.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassCuidador.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncUsuarios.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassDetallesCuid.js"></script>