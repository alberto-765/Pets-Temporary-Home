<main class="wrapperMascotas flex-grow-1 d-flex  flex-column ">
    <!-- Modal borrar mascotas-->
    <div class="modal fade text-black " tabindex="-1" aria-labelledby="borrarModalLabel" aria-hidden="false" data-bs-backdrop="static" data-bs-keyboard="false" style="transition: all .7s; " id="borrarModal">
        <div class="modal-dialog modal-dialog-centered modal-xl modal-fullscreen-lg-down" style="animation: aparecer 1s ease-out forwards;">
            <div class="modal-content">
                <div class="modal-header bg-body-tertiary">
                    <h1 class="modal-title fs-5 " id="borrarModalLabel">Eliminar mascotas</h1>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-5 ">
                    <div class="col-11 mx-auto contenedorTablaBorrar text-center">
                        <table class="table table-striped text-center w-100">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Tipo</th>
                                    <th>Raza</th>
                                    <th>Tamaño</th>
                                    <th>Sexo</th>
                                    <th>Borrar</th>
                                </tr>
                            </thead>
                            <tbody id="mascotasBorrar">
                            </tbody>
                        </table>
                    </div>

                </div>
                <div class="modal-footer  ">

                    <button type="button" class="btn btn-secondary fs-5" data-bs-dismiss="modal">Salir</button>
                    <button type="button" class="btn btn-outline-danger fs-5" data-bs-target="#confirmarModal" data-bs-toggle="modal" id="btn-eliminar">Eliminar</button>

                </div>
            </div>
        </div>

    </div>

    <!-- Modal de confirmacion de eliminacion  -->
    <div class="modal fade  text-black " id="confirmarModal" aria-hidden="true" aria-labelledby="confirmarLabel" tabindex="-1" data-bs-keyboard="false" data-bs-backdrop="static">
        <div class="modal-dialog modal-dialog-centered modal-lg modal-fullscreen-md-down">
            <div class="modal-content">
                <div class="modal-header bg-body-tertiary">
                    <h1 class="modal-title fs-5 " id="borrarModalLabel">Confirmar eliminación</h1>
                    <button type="button" class="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="col-11 mx-auto">
                        <p class="lead">¿Deseas eliminar a estas mascotas?</p>
                        <div class="contenedorTablaConfirmar text-center">
                            <table class="table table-striped text-center w-100">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nombre</th>
                                        <th>Tipo</th>
                                        <th>Raza</th>
                                        <th>Tamaño</th>
                                        <th>Sexo</th>

                                    </tr>
                                </thead>
                                <tbody id="mascotasConfirmar">
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button class=" btn btn-secondary fs-5" data-bs-target="#borrarModal" data-bs-toggle="modal">No</button>
                    <button class="btn btn-outline-danger fs-5" data-bs-dismiss="modal" id="btn-confirmar">Si</button>
                </div>
            </div>
        </div>
    </div>

    <div class="container my-5 flex-grow-1 d-flex justify-content-center">
        <div class="row justify-content-center align-content-start w-100 row-gap-3">
            <div class="col-12 col-lg-11 col-xl-10 col-xxl-12  text-info-emphasis mt-sm-5 mb-3 d-flex justify-content-between " id="headerMascotas">
                <span class="border-bottom border-1  display-6 pb-1" style="border-color: #087990 !important;"> Mis mascotas</span>


                <!-- Boton modal  -->
                <button type="button" class="btn btn-danger fs-5 p-2" data-bs-toggle="modal" data-bs-target="#borrarModal" style="height: fit-content;"><i class="bi bi-trash3 me-2"></i>Borrar
                </button>
            </div>

            <div class="row justify-content-center align-content-start w-100 row-gap-3" id="contenedorMascotas"></div>
        </div>
    </div>

    <script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncMascotas.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/mascotas.js"></script>