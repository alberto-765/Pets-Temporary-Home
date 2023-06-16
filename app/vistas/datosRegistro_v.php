<?php
// Asignar zona horaria de madrid 
date_default_timezone_set("Europe/Madrid");

// fecha actual
$fechaActual = date('Y-m-d');


// calcular tiempo necesario para la fecha actual menos 18 años
$fechaNacMin = date("Y-m-d", strtotime("-18 year", strtotime($fechaActual)));


?>

<main id="wrapperRegistro" class="flex-grow-1 d-flex flex-column">
    <div class="container py-5 flex-grow-1 d-flex align-items-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-5 mx-auto">

            <form class="row justify-content-between rounded p-4 row-gap-3 needs-validation" action="" novalidate>



                <!-- título  -->
                <div class="text-capitalize">
                    <h2>Datos adicionales obligatorios</h2>
                </div>

                <!-- fila nombre y apellidos  -->
                <div class="fw-semibold">
                    <label for="apenom " class="form-label">Nombre y Apellidos
                        <code>*</code>
                    </label>

                    <div class="input-group">
                        <input type="text" class="form-control" name="apenom" id="apenom" minlength="1" maxlength="60" placeholder="Nombre Apellido1 Apellido2" pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{1,60}" required>

                        <div class="input-group-text">
                            <i class="bi bi-chat-square-heart-fill fs-4"></i>
                        </div>

                        <div class="invalid-feedback">El campo no puede estar vacío</div>
                    </div>
                </div>

                <!-- fila DNI  -->
                <div class="fw-semibold input-group">
                    <label for="dni" class="form-label"> DNI <code>*</code></label>

                    <div class="input-group">
                        <input type="text" class="form-control" name="dni" id="dni" minlength="1" maxlength="9" pattern=[0-9]{8}[A-Z]{1} required>

                        <div class="input-group-text">
                            <i class="bi bi-person-vcard-fill fs-4"></i>
                        </div>


                        <div class="invalid-feedback">El campo no puede estar vacío</div>
                    </div>
                    <div class="form-text fw-normal">Puedes usar tu mismo DNI para cuenta de propietario y cuidador</div>
                </div>

                <!-- Fila numero de telefono -->
                <div class="fw-semibold input-group">
                    <label class=" form-label" for="telefono">Número de telefono<code>*</code></label>

                    <div class="input-group">

                        <input type="text" class="form-control" name="telefono" id="telefono" minlength="9" maxlength="9" pattern="[0-9]{9}" required>

                        <div class="input-group-text">
                            <i class="bi bi-telephone-fill fs-4"></i>
                        </div>
                        <div class="invalid-feedback">
                            El campo no puede estar vacío
                        </div>
                    </div>
                </div>

                <!-- Fila población  -->
                <div class="fw-semibold input-group">
                    <label class="form-label" for="poblacion">Población <code>*</code></label>

                    <div class="input-group">
                        <input type="text" class="form-control" name="poblacion" id="poblacion" minlength="1" maxlength="25" required pattern="[a-zA-ZÀ-ÿ\u00f1\u00d1 ]{1,25}">

                        <div class="input-group-text">
                            <i class="bi bi-building-fill fs-4"></i>
                        </div>

                        <div class="invalid-feedback">El campo no puede estar vacío</div>
                    </div>
                </div>

                <!-- Fila código postal  -->
                <div class="fw-semibold input-group">
                    <label class="form-label" for="codpostal">Código Postal<code>*</code></label>

                    <div class="input-group">
                        <input type="text" class="form-control" name="codpostal" id="codpostal" minlength="5" maxlength="5" pattern="[0-9]{5}" required>

                        <div class="input-group-text">
                            <i class="bi bi-geo-fill fs-4"></i>
                        </div>

                        <div class="invalid-feedback">El campo no puede estar vacío</div>
                    </div>
                </div>

                <!-- Fila dirección  -->
                <div class="fw-semibold input-group">
                    <label class="form-label" for="direccion">Dirección<code>*</code></label>

                    <div class="input-group">
                        <input type="text" class="form-control" name="direccion" id="direccion" maxlength="60" placeholder="C/ Libertad, 17" required>

                        <div class="input-group-text">
                            <i class="bi bi-signpost-fill fs-4"></i>
                        </div>

                        <div class="invalid-feedback">El campo no puede estar vacío
                        </div>
                    </div>
                </div>

                <!-- Fila fecha de nacimiento -->
                <div class="fw-semibold input-group">
                    <label class=" form-label" for="fechanac">Fecha de nacimiento<code>*</code></label>

                    <div class="input-group">

                        <input type="date" class="form-control" name="fechanac" id="fechanac" max="<?= $fechaNacMin ?>" style="min-height: 48px;" required>

                        <div class="invalid-feedback">
                            El campo no puede estar vacío
                        </div>
                    </div>

                    <div class="form-text fw-normal">Es obligatorio ser mayor de edad</div>
                </div>
                <div class="error text-danger fs-6 d-none">Error inesperado al intentar crear el usuario, inténtelo de
                    nuevo</div>
                <div class="text-center ">
                    <button class="btn btn-success fs-5" type="submit">Continuar</button>
                </div>


            </form>
        </div>
    </div>


    <script src="<?= BASE_URL; ?>app/vistas/js/datosRegistro.js"></script>