<section class="wrapperDetalles flex-grow-1 d-flex fondoGradiente ">
    <div class="container-lg my-5">
        <div class="row  justify-content-around px-3 px-sm-0 row-gap-5" id="contenedorDetalles">

        </div>
        <div class="row  justify-content-center  mt-5 px-3 px-sm-0 row-gap-5 d-none" id="contenedorMasDetalles">
            <div class="col-12">
                <h2 class="display-6 px-0">Instrucciones para los cuidadores </h2>
            </div>

            <div class="col-12 col-sm-9 fw-semibold d-flex justify-content-around flex-wrap">
                <label class="form-label w-100 mb-3">¿Nivel de actividad?

                </label>

                <!-- button muy activo  -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="actividad" value="M" id="btn-actividad1" autocomplete="off">
                    <label class="btn btn-outline-dark py-0">
                        <i class="bi bi-battery-charging fs-2"></i>
                        <p class="fw-semibold m-0"> Muy activo</p>
                    </label>

                </div>

                <!-- button normal -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="actividad" value="N" id="btn-actividad2" autocomplete="off">
                    <label class="btn btn-outline-dark  py-0">
                        <i class="bi bi-battery-half fs-2"></i>
                        <p class="fw-semibold m-0"> Normal</p>
                    </label>
                </div>

                <!-- button tranquilo -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="actividad" value="T" id="btn-actividad3" autocomplete="off">
                    <label class="btn btn-outline-dark  py-0">
                        <i class="bi bi-battery-full fs-2"></i>
                        <p class="fw-semibold m-0"> Tranquilo</p>
                    </label>
                </div>
            </div>


            <div class="col-12 col-sm-9 fw-semibold d-flex justify-content-around flex-wrap">
                <label class="form-label w-100 mb-3">¿Cada cuanto tiempo tiene que hacer sus necesidades?

                </label>

                <!-- button   -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="necesidades" value="2" id="btn-necesidades1" autocomplete="off">
                    <label class="btn btn-outline-dark">

                        <p class="fw-semibold m-0">2 HORAS</p>
                    </label>

                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="necesidades" value="4" id="btn-necesidades2" autocomplete="off">
                    <label class="btn btn-outline-dark ">
                        <p class="fw-semibold m-0">4 HORAS</p>
                    </label>
                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="necesidades" value="6" id="btn-necesidades3" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <p class="fw-semibold m-0">6 HORAS</p>
                    </label>
                </div>
            </div>


            <!-- fila nivel de racioness -->
            <div class="col-12 col-sm-4 fw-semibold">
                <label class="form-label w-100 mb-3">¿Cuantas raciones diarias toma?

                </label>

                <div class="input-group  w-50 mx-auto">
                    <div class="input-group-text">
                        <i class="bi bi-database fs-5"></i>
                    </div>
                    <input class="form-control text-center" type="number" name="raciones" id="raciones" min="1" max="20">

                </div>
                <div class="invalid-feedback">
                    Mínimo 1 ración
                </div>
            </div>
            <!-- div para hacer salto de linea -->
            <div class="col-12 col-sm-5"></div>



            <!-- fila nivel de paseo -->
            <div class="col-12 col-sm-9 fw-semibold d-flex justify-content-around flex-wrap">
                <label class="form-label w-100 mb-3">¿Cuál es su horario de paseo?

                </label>

                <!-- button -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="paseo" value="M" id="btn-paseo1" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <i class="bi bi-cloud-sun fs-2"></i>
                        <p class="fw-semibold m-0">Mañana</p>
                    </label>

                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="paseo" value="T" id="btn-paseo2" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <i class="bi bi-brightness-high fs-2"></i>
                        <p class="fw-semibold m-0">Tarde</p>
                    </label>
                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check" name="paseo" value="N" id="btn-paseo3" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <i class="bi bi-moon-stars fs-2"></i>
                        <p class="fw-semibold m-0">Noche</p>
                    </label>
                </div>
            </div>


            <!-- fila nivel de paseo -->
            <div class="col-9 fw-semibold d-flex justify-content-around flex-wrap">
                <label class="form-label w-100 mb-3">¿Necesita mediación?

                </label>

                <!-- button   -->
                <div class="text-center">
                    <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="O" id="btn-medtipo1" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <i class="bi bi-capsule fs-2"></i>
                        <p class="fw-semibold m-0">Oral</p>
                    </label>

                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="T" id="btn-medtipo2" autocomplete="off">
                    <label class="btn btn-outline-dark ">
                        <i class="bi bi-droplet fs-2"></i>
                        <p class="fw-semibold m-0">Topica</p>
                    </label>
                </div>

                <!-- button  -->
                <div class="text-center">
                    <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="I" id="btn-medtipo3" autocomplete="off">
                    <label class="btn btn-outline-dark">
                        <i class="bi bi-heart-pulse fs-2"></i>
                        <p class="fw-semibold m-0">Inyectable</p>
                    </label>
                </div>
            </div>

            <!-- fila nombre mediacion -->
            <div class="col-11 col-sm-4 fw-semibold mt-3 ">
                <label class="form-label">Nombre de la medicación
                    <code>*</code>
                </label>
                <div class="input-group ">
                    <div class="input-group-text">
                        <i class="bi bi-h-square fs-4"></i>
                    </div>
                    <input class="form-control" type="text" name="mednom" id="mednom" minlength="1" maxlength="25" readonly>
                </div>

            </div>
        </div>
        <div class="row  justify-content-center mt-5 px-sm-0 row-gap-5 position-relative" id="contenedorGaleria">

        </div>

    </div>


    <!-- Modal -->
    <div class="modal fade modal-xl" id="verGaleria" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog" style=" animation: fadeDown 1s ease-out forwards;">
        <div class=" modal-dialog modal-dialog-centered modal-fullscreen-lg-down">
            <div class="modal-content bg-transparent border-0" style="height: auto;">

                <div class="modal-body body-verMas">

                    <!-- Carousel con las imagenes  -->
                    <div id="carouselGaleria" class="carousel slide">

                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncMascotas.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassDetallesMascota.js"></script>