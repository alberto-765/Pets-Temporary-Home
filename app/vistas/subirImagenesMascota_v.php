<main id="wrapperSubirImagenesMasc" class="flex-grow-1 d-flex flex-column">
    <div class="container flex-grow-1 d-flex align-items-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-5 mx-auto my-5">
            <form class="row rounded p-4 row-gap-4 text-center needs-validation" action="#" id="formSubir" novalidate>

                <div class="col-12 ">
                    <h3>¡Sube las imágenes para tu mascota!</h3>
                </div>

                <!-- fila foto de perfil  -->
                <div class="mb-md-3 text-start">
                    <label for="fotoPerfil" class="form-label  fw-semibold">Sube tu imagen de perfil
                        <code>*</code></label>
                    <input class="form-control" type="file" name="fotoPerfil" id="fotoPerfil" accept="image/*">
                    <div class="invalid-feedback position-relative">Deber subir una foto de perfil, con alguno de estos formatos <i class="bi bi-exclamation-circle formatosImagenes fs-5 position-relative mouseOver">
                            <div class="d-none ms-3 position-absolute ">
                                <i class="bi bi-caret-left-fill  text-black fs-6 z-0"></i>
                                <ul class="list-unstyled z-1 bg-dark text-secondary p-3 rounded fs-6 position-absolute start-50" style="top: -50%;">
                                    <li>jpeg</li>
                                    <li>jpg</li>
                                    <li>gif</li>
                                    <li>svg</li>
                                    <li>svg</li>
                                </ul>
                            </div>
                        </i>
                    </div>
                </div>

                <!-- Si es propietario se le muestra este contenedor -->
                <?php if (isset($_SESSION["tipoUser"]) && $_SESSION["tipoUser"] == "propietario") { ?>
                    <!-- sube fotos para tu galeria  -->
                    <div class="mb-md-3 text-start">
                        <label for="galeria" class="form-label  fw-semibold">Sube imagenes para tu galería </label>
                        <input class="form-control " type="file" name="galeria" id="galeria" multiple accept="image/*">
                        <div class="form-text">Puedes subir hasta 10 fotografías para tu galería, con uno de estos formatos</div>
                        <div class="invalid-feedback">Máximo 10 fotografías, con alguno de estos formatos <i class="bi bi-exclamation-circle formatosImagenes fs-5 position-relative mouseOver">
                                <div class="d-none ms-3 position-absolute ">
                                    <i class="bi bi-caret-left-fill  text-black fs-6 z-0"></i>
                                    <ul class="list-unstyled z-1 bg-dark text-secondary p-3 rounded fs-6 position-absolute start-50" style="top: -50%;">
                                        <li>jpeg</li>
                                        <li>jpg</li>
                                        <li>gif</li>
                                        <li>svg</li>
                                        <li>svg</li>
                                    </ul>

                                </div>
                            </i>
                        </div>
                    </div>

                <?php } ?>

                <div class="text-center ">
                    <button class="btn btn-success btn-small" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    </div>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncMascotas.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassImagen.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassSubirImagenesMasc.js"></script>