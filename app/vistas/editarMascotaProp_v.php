<?php  ?>
<!-- PopUp para subir o borrar una imagen -->
<div class="modal modal-lg  text-black animacionAparecer" id="modalSubirImagen" tabindex="-1" aria-labelledby="alertaLabel" data-bs-backdrop="static" data-bs-keyboard="true" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down p-3 ">
        <div class="modal-content">
            <div class="modal-header position-relative p-3">
                <h1 class="modal-title fs-5 d-flex align-items-center font-monospace column-gap-4 titulo">

                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center  border-0 lead  fs-5">

            </div>
            <div class="modal-footer p-2 border-1">


            </div>

        </div>
    </div>
</div>

<!-- Modal para confirmar -->
<div class="modal modal-lg  text-black animacionAparecer" id="modalConfirmar" tabindex="-1" aria-labelledby="alertaLabel" data-bs-backdrop="static" data-bs-keyboard="true" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down p-3 ">
        <div class="modal-content">
            <div class="modal-header position-relative p-3">
                <h1 class="modal-title fs-5 d-flex align-items-center font-monospace titulo ">

                </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-center  border-0 lead fs-5">

            </div>
            <div class="modal-footer p-2  border-1 ">
                <button type="button" class="btn btn-secondary fs-6" data-bs-dismiss="modal">NO</button>
                <button type="button" class="btn btn-outline-danger fs-6 me-5" data-bs-target="#modalSubirImagen" data-bs-toggle="modal" id="btnSi">SI</button>
            </div>
        </div>
    </div>
</div>
<section class="wrapperMascotas flex-grow-1 d-flex  ">
    <div class="container my-5">
        <div class="row  justify-content-center bg-light rounded px-5" id="contenedorMascotas">
            <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-12 display-5 text-info-emphasis mt-sm-5 mb-3 ">
                <span class="border-bottom border-1  pb-1" style="border-color: #087990 !important;"> Rellena los datos sobre tu mascota</span>
            </div>


            <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-11 text-info-emphasis">
                <div class="row justify-content-around p-sm-5 row-gap-3 py-5 text-dark">

                    <div class="row display-5  px-0 align-items-center">
                        <h2 class="display-6 px-0 col-10">Foto Perfil</h2>
                        <button type="button" class="botonEditar btn col-auto p-0"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de perfil"> </button>
                    </div>


                    <!-- fila foto de perfil  -->
                    <div class="row  justify-content-center contenedorDisabled elementoEditable position-relative" id="contenedorPerfil">
                        <div>
                            <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Imagen de perfil de tu mascota" class="rounded noSubida mouseOver">
                            <div class="botones btnPerfil">
                                <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class=" iconoEditar mouseOver" alt="Botón para editar imagen de perfil"> </button>
                            </div>
                        </div>

                    </div>

                    <div class="row display-5  px-0 align-items-center">
                        <h2 class="display-6 px-0 col-10">Galeria</h2>
                        <button type="button" class="botonEditar btn col-auto p-0"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de perfil"> </button>
                    </div>

                    <!-- sube fotos para tu galeria  -->
                    <div class="row fw-semibold mx-auto elementoEditable contenedorDisabled" id="contenedorGaleria">
                        <div class="subContenedorGaleria">
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="0">
                                    <button type="button" class="btnReemplazar btn h-100 p-2">
                                        <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver " alt="Botón para editar imagen de galeria "> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2">
                                        <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="1">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="2">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="3">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="4">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>


                        </div>
                        <div class="subContenedorGaleria">
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="5">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="6">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="7">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="8">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>
                            <div class="contenedorImagenGaleria position-relative">
                                <img src="<?php echo BASE_URL . PATH_ASSETS; ?>img/subirImagen.png" alt="Subir imagen para tu mascota" class="rounded noSubida mouseOver">
                                <div class="botones" data-id="9">
                                    <button type="button" class="btnReemplazar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de galeria"> </button>
                                    <button type="button" class="btnBorrar btn h-100 p-2"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/borrar.png" class="iconoEditar mouseOver" alt="Botón para borrar imagen de galeria"> </button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <form class="row justify-content-around p-sm-5 row-gap-3  needs-validation py-5 text-dark" id="formInfoMascota" novalidate>
                    <div class="row display-5  px-0 align-items-center">
                        <h2 class="display-6 px-0 col-10">Datos sociales de tu mascota </h2>
                        <button type="button" class="botonEditar btn col-auto p-0"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de perfil"> </button>
                    </div>
                    <div class="row position-relative justify-content-center gap-3 elementoEditable contenedorDisabled" id="contenedorDatosSociales">
                        <!-- tipo de mascota  -->
                        <div class="col-12 fw-semibold d-flex flex-wrap justify-content-evenly mx-auto  position-relative" id="tipoMascota">
                            <div class="w-100 mb-2">Tipo Mascota: <code>*</code> </div>

                            <!-- button perro  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="tipo" value="G" id="btn-perro" autocomplete="off" required>
                                <label class="btn btn-outline-secondary " for="btn-perro" style="--bs-btn-color: dark">
                                    <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro" style="height: 50px; width: 50px;">
                                    <p class="fw-semibold m-0"> Perro</p>
                                </label>
                                <div class="invalid-feedback  position-absolute text-start start-0 mx-4">Debes elegir al menos una opción</div>
                            </div>


                            <!-- button gato  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="tipo" value="P" id="btn-gato" autocomplete="off">
                                <label class="btn btn-outline-secondary" for="btn-gato" style="--bs-btn-color: dark">
                                    <img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato" style="height: 50px; width: 50px;">
                                    <p class="fw-semibold m-0"> Gato </p>
                                </label>

                            </div>
                        </div>

                        <!-- div para hacer salto de linea -->
                        <div class=""></div>

                        <!-- fila nombre  -->
                        <div class="col-12 col-sm-5 fw-semibold ">
                            <label for="nombre " class="form-label">Nombre
                                <code>*</code>
                            </label>
                            <div class="input-group ">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/nombre.svg" alt="Icono nombre" style="height: 25px;">
                                </div>
                                <input class="form-control" type="text" name="nombre" id="nombre" minlength="1" maxlength="25" required>

                                <div class="invalid-feedback">
                                    El campo no puede estar vacío
                                </div>
                            </div>
                        </div>

                        <!-- fila tamaño  -->
                        <div class="col-12 col-sm-5 fw-semibold">
                            <label for="fotoPerfil " class="form-label">Tamaño
                                <code>*</code>
                            </label>
                            <div class="input-group ">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/tamaño.svg" alt="Icono Tamaño" style="height: 25px;">
                                </div>
                                <select class="form-select" name="tamano" id="select-tamaño" required disabled>
                                    <option selected value="T">Toy (Menos 5kg)</option>
                                    <option value="P">Pequeño (5-10kg)</option>
                                    <option value="M">Mediano (10-25kg)</option>
                                    <option value="G">Grande(25-40kg)</option>
                                    <option value="E">Enorme (Más 40kg)</option>
                                </select>

                                <div class="invalid-feedback">Debes elegir una opción</div>
                            </div>

                        </div>


                        <!-- fila tamaño  -->
                        <div class="col-12 col-sm-5 fw-semibold">
                            <label for="sexo" class="form-label">Sexo
                                <code>*</code>
                            </label>
                            <div class="input-group ">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/sexos.svg" alt="Icono Sexos" style="height: 25px;">
                                </div>
                                <select class="form-select" name="sexo" id="sexo" required> </select>
                            </div>

                            <div class="invalid-feedback">Debes elegir una opción</div>
                        </div>

                        <!-- fila raza -->
                        <div class="col-12 col-sm-5 fw-semibold">
                            <label for="raza " class="form-label">Raza
                                <code>*</code>
                            </label>
                            <div class="input-group ">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/r.svg" alt="Icono R" style="height: 25px;">
                                </div>
                                <input class="form-control" type="text" name="raza" id="raza" minlength="1" maxlength="60" required>

                            </div>
                            <div class="invalid-feedback">
                                El campo no puede estar vacío
                            </div>

                        </div>

                        <!-- fila años -->
                        <div class="col-12 col-sm-5 fw-semibold">
                            <label for="anos " class="form-label">Edad (años)
                                <code>*</code>
                            </label>
                            <div class="input-group  w-50 mx-auto">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/calendario.svg" alt="Icono Calendario" style="height: 25px;">
                                </div>
                                <input class="form-control text-center text-center" type="number" name="anos" id="anos" min="1" max="30" required>

                            </div>
                            <div class="invalid-feedback">
                                El campo no puede estar vacío
                            </div>
                        </div>

                        <!-- fila meses -->
                        <div class="col-12 col-sm-5 fw-semibold">
                            <label for="meses " class="form-label">Edad (meses)

                            </label>
                            <div class="input-group  w-50 mx-auto">
                                <div class="input-group-text">
                                    <img src="<?= BASE_URL ?>/app/assets/iconos/calendario_semana.svg" alt="Icono Calendario Semana" style="height: 25px;">
                                </div>
                                <input class="form-control text-center" type="number" name="meses" id="meses" value="0" min="0" value="0" max="11">

                            </div>
                            <div class="invalid-feedback">
                                El campo no puede estar vacío
                            </div>
                        </div>

                        <!-- fila microchip -->
                        <div class="col-12 col-sm-5 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Tiene microchip?

                            </label>
                            <!-- button si  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="microchip" value="1" id="btn-microchip1" autocomplete="off">
                                <label class="btn btn-outline-success py-0" for="btn-microchip1">
                                    <i class="bi bi-hand-thumbs-up fs-2 "></i>
                                    <p class="fw-semibold m-0"> Si </p>
                                </label>
                            </div>

                            <!-- button no -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="microchip" value="0" id="btn-microchip2" autocomplete="off" checked>
                                <label class="btn btn-outline-danger py-0" for="btn-microchip2">
                                    <i class="bi bi-hand-thumbs-down fs-2"></i>
                                    <p class="fw-semibold m-0"> No</p>
                                </label>
                            </div>
                        </div>



                        <!-- fila esterilización -->
                        <div class="col-12 col-sm-5 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Está castrado/esterlizada?</label>
                            <!-- button si  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="esterilizacion" value="1" id="btn-esterilizacion1" autocomplete="off">
                                <label class="btn btn-outline-success py-0" for="btn-esterilizacion1">
                                    <i class="bi bi-hand-thumbs-up fs-2 "></i>
                                    <p class="fw-semibold m-0"> Si </p>
                                </label>
                            </div>
                            <!-- button no -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="esterilizacion" value="0" id="btn-esterilizacion2" autocomplete="off" checked>
                                <label class="btn btn-outline-danger py-0" for="btn-esterilizacion2">
                                    <i class="bi bi-hand-thumbs-down fs-2"></i>
                                    <p class="fw-semibold m-0"> No</p>
                                </label>
                            </div>
                        </div>

                        <!-- fila sociable con gatos -->
                        <div class="col-12 col-sm-5 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Es sociable con gatos?

                            </label>
                            <!-- button si  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socgatos" value="1" id="btn-socgatos1" autocomplete="off">
                                <label class="btn btn-outline-success py-0" for="btn-socgatos1">
                                    <i class="bi bi-hand-thumbs-up fs-2 "></i>
                                    <p class="fw-semibold m-0"> Si </p>
                                </label>

                            </div>
                            <!-- button no -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socgatos" value="0" id="btn-socgatos2" autocomplete="off" checked>
                                <label class="btn btn-outline-danger py-0" for="btn-socgatos2">
                                    <i class="bi bi-hand-thumbs-down fs-2"></i>
                                    <p class="fw-semibold m-0"> No</p>
                                </label>
                            </div>
                        </div>



                        <!-- fila sociable perros-->
                        <div class="col-12 col-sm-5 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Es sociable con perros?

                            </label>
                            <!-- button si  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socperros" value="1" id="btn-socperros1" autocomplete="off">
                                <label class="btn btn-outline-success py-0" for="btn-socperros1">
                                    <i class="bi bi-hand-thumbs-up fs-2 "></i>
                                    <p class="fw-semibold m-0"> Si </p>
                                </label>

                            </div>
                            <!-- button no -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socperros" value="0" id="btn-socperros2" autocomplete="off" checked>
                                <label class="btn btn-outline-danger py-0" for="btn-socperros2">
                                    <i class="bi bi-hand-thumbs-down fs-2"></i>
                                    <p class="fw-semibold m-0"> No</p>
                                </label>
                            </div>
                        </div>



                        <!-- fila sociable niños -->
                        <div class="col-12 col-sm-5 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Es sociable con niños?

                            </label>
                            <!-- button si  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socninos" value="1" id="btn-socninos1" autocomplete="off">
                                <label class="btn btn-outline-success py-0" for="btn-socninos1">
                                    <i class="bi bi-hand-thumbs-up fs-2 "></i>
                                    <p class="fw-semibold m-0"> Si </p>
                                </label>

                            </div>
                            <!-- button no -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="socninos" value="0" id="btn-socninos2" autocomplete="off" checked>
                                <label class="btn btn-outline-danger py-0" for="btn-socninos2">
                                    <i class="bi bi-hand-thumbs-down fs-2"></i>
                                    <p class="fw-semibold m-0"> No</p>
                                </label>
                            </div>
                        </div>
                        <div class="col-sm-5"></div>
                    </div>

                    <div class="row display-5  px-0 align-items-center">
                        <h2 class="display-6 px-0 col-10">Instrucciones para los cuidadores </h2>
                        <button type="button" class="botonEditar btn col-auto p-0"> <img src="<?php echo BASE_URL . PATH_ASSETS; ?>iconos/editar.png" class="iconoEditar mouseOver" alt="Botón para editar imagen de perfil"> </button>
                    </div>

                    <div class="row position-relative justify-content-center gap-3 elementoEditable contenedorDisabled" id="contenedorInstrucciones">
                        <!-- fila nivel de actividad  -->
                        <div class="col-12 col-sm-11 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Nivel de actividad?

                            </label>

                            <!-- button muy activo  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="actividad" value="M" id="btn-actividad1" autocomplete="off">
                                <label class="btn btn-outline-dark py-0" for="btn-actividad1">
                                    <i class="bi bi-battery-charging fs-2"></i>
                                    <p class="fw-semibold m-0"> Muy activo</p>
                                </label>

                            </div>

                            <!-- button normal -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="actividad" value="N" id="btn-actividad2" autocomplete="off">
                                <label class="btn btn-outline-dark  py-0" for="btn-actividad2">
                                    <i class="bi bi-battery-half fs-2"></i>
                                    <p class="fw-semibold m-0"> Normal</p>
                                </label>
                            </div>

                            <!-- button tranquilo -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="actividad" value="T" id="btn-actividad3" autocomplete="off">
                                <label class="btn btn-outline-dark  py-0" for="btn-actividad3">
                                    <i class="bi bi-battery-full fs-2"></i>
                                    <p class="fw-semibold m-0"> Tranquilo</p>
                                </label>
                            </div>
                        </div>

                        <!-- fila nivel de necesidadies -->
                        <div class="col-12 col-sm-11 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Cada cuanto tiempo tiene que hacer sus necesidades?

                            </label>

                            <!-- button   -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="necesidades" value="2" id="btn-necesidades1" autocomplete="off">
                                <label class="btn btn-outline-dark" for="btn-necesidades1">

                                    <p class="fw-semibold m-0">2 HORAS</p>
                                </label>

                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="necesidades" value="4" id="btn-necesidades2" autocomplete="off">
                                <label class="btn btn-outline-dark " for="btn-necesidades2">
                                    <p class="fw-semibold m-0">4 HORAS</p>
                                </label>
                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check" name="necesidades" value="6" id="btn-necesidades3" autocomplete="off">
                                <label class="btn btn-outline-dark  " for="btn-necesidades3">
                                    <p class="fw-semibold m-0">6 HORAS</p>
                                </label>
                            </div>
                        </div>


                        <!-- fila nivel de racioness -->
                        <div class="col-12 col-sm-11">

                            <div class="col-12 col-sm-5 fw-semibold">
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
                        </div>



                        <!-- fila nivel de paseo -->
                        <div class="col-12 col-sm-11 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Cuál es su horario de paseo?

                            </label>

                            <!-- button   -->
                            <div class="text-center">
                                <input type="checkbox" class="btn-check" name="paseo" value="M" id="btn-paseo1" autocomplete="off">
                                <label class="btn btn-outline-dark" for="btn-paseo1">
                                    <i class="bi bi-cloud-sun fs-2"></i>
                                    <p class="fw-semibold m-0">Mañana</p>
                                </label>

                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="checkbox" class="btn-check" name="paseo" value="T" id="btn-paseo2" autocomplete="off">
                                <label class="btn btn-outline-dark " for="btn-paseo2">
                                    <i class="bi bi-brightness-high fs-2"></i>
                                    <p class="fw-semibold m-0">Tarde</p>
                                </label>
                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="checkbox" class="btn-check" name="paseo" value="N" id="btn-paseo3" autocomplete="off">
                                <label class="btn btn-outline-dark  " for="btn-paseo3">
                                    <i class="bi bi-moon-stars fs-2"></i>
                                    <p class="fw-semibold m-0">Noche</p>
                                </label>
                            </div>
                        </div>


                        <!-- fila nivel de paseo -->
                        <div class="col-11 fw-semibold d-flex justify-content-around flex-wrap">
                            <label class="form-label w-100 mb-3">¿Necesita mediación?

                            </label>

                            <!-- button   -->
                            <div class="text-center">
                                <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="O" id="btn-medtipo1" autocomplete="off">
                                <label class="btn btn-outline-dark" for="btn-medtipo1">
                                    <i class="bi bi-capsule fs-2"></i>
                                    <p class="fw-semibold m-0">Oral</p>
                                </label>

                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="T" id="btn-medtipo2" autocomplete="off">
                                <label class="btn btn-outline-dark " for="btn-medtipo2">
                                    <i class="bi bi-droplet fs-2"></i>
                                    <p class="fw-semibold m-0">Topica</p>
                                </label>
                            </div>

                            <!-- button  -->
                            <div class="text-center">
                                <input type="radio" class="btn-check btnTipoMedicacion" name="medtipo" value="I" id="btn-medtipo3" autocomplete="off">
                                <label class="btn btn-outline-dark  " for="btn-medtipo3">
                                    <i class="bi bi-heart-pulse fs-2"></i>
                                    <p class="fw-semibold m-0">Inyectable</p>
                                </label>
                            </div>
                        </div>

                        <!-- fila nombre mediacion  -->
                        <div class="col-11 col-sm-5 fw-semibold mt-3 ">
                            <label for="nombre " class="form-label">Nombre de la medicación
                                <code>*</code>
                            </label>
                            <div class="input-group ">
                                <div class="input-group-text">
                                    <i class="bi bi-h-square fs-4"></i>
                                </div>
                                <input class="form-control" type="text" name="mednom" id="mednom" minlength="1" maxlength="25" disabled required>
                                <div class="invalid-feedback">
                                    Debes especificar el nombre de la medicación
                                </div>
                            </div>

                        </div>
                        <div class="col-12 col-sm-11 fw-semibold mt-5 ">
                            <div class="form-floating  p-0">
                                <textarea class="form-control" placeholder="Leave a comment here" name="masdetalles" id="masdetalles" style="height: 200px" maxlength="700"></textarea>
                                <label for="masdetalles">Más detalles para los cuidadores sobre tu mascota</label>
                                <div class="invalid-feedback">¡Es muy importante que te vendas a los usuarios!</div>
                            </div>
                        </div>
                    </div>

                    <!-- Submit  -->
                    <div class="col-12 col-sm-11 error text-danger-emphasis fs-6 fw-semibold d-none">Error inesperado al intentar crear el usuario, inténtelo de nuevo</div>
                    <div class="text-center mt-5">
                        <button class="btn btn-success btn-lg" type="submit">Editar Mascota </button>
                    </div>
                </form>

            </div>


        </div>
    </div>
</section>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassImagen.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncMascotas.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassEditarMascota.js"></script>