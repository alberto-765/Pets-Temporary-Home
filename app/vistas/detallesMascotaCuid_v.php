<section class="wrapperDetalles flex-grow-1 d-flex  fondoGradiente">
    <div class="container-lg my-5">

        <div class="row  justify-content-around px-3 px-sm-0 h-100 row-gap-5" id="contenedorDetalles">

        </div>
    </div>


    <!-- Modal -->
    <div class="modal fade modal-xl" id="verGaleria" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" role="dialog" style=" animation: fadeDown 1s ease-out forwards;">
        <div class=" modal-dialog modal-dialog-centered modal-fullscreen-xl-down">
            <div class="modal-content">

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