<?php
// Limpiar las variables de sesion
session_unset() ?>

<main id="wrapperRegistro" class="flex-grow-1 d-flex flex-column">
    <div class="container flex-grow-1 d-flex align-items-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-5 mx-auto">
            <form class="row justify-content-between rounded p-4 row-gap-4 text-center needs-validation" action="#" novalidate>

                <div class="col-12 ">
                    <h3>¿Cómo te quieres registrar?</h3>

                </div>
                <div class="col-12 col-sm-5">
                    <input type="radio" class="btn-check" name="tipoUser" value="propietario" id="btn-propietario" autocomplete="off" required>
                    <label class="btn btn-outline-warning px-md-5 px-sm-4" for="btn-propietario" style="--bs-btn-color: dark">
                        <i class="bi bi-emoji-smile"></i>
                        <p class="fw-semibold"> Propietario</p>
                    </label>
                    <div class="invalid-feedback fs-6 fw-semibold">
                        Debes seleccionar una opción
                    </div>
                </div>
                <div class="col-12 col-sm-2">
                    <div class="bg-warning h-100 mx-auto" id="separador"></div>

                </div>
                <div class="col-12 col-sm-5">
                    <input type="radio" class="btn-check" name="tipoUser" value="cuidador" id="btn-cuidador" autocomplete="off">
                    <label class="btn btn-outline-warning px-md-5 px-sm-4" for="btn-cuidador" style="--bs-btn-color: dark">
                        <i class="bi bi-person"></i>
                        <p class="fw-semibold">Cuidador</p>
                    </label>
                </div>
                <div class="col-12">
                    <button class="btn btn-warning" type="submit">Continuar</button>
                </div>
            </form>

        </div>
    </div>


    <script>
        // elemento formulario
        const formulario = document.querySelector("form")

        // intercepcion del submit 
        formulario.addEventListener("submit", function(e) {
            e.preventDefault()
            e.stopPropagation()

            // asignar clase de validación si algún campo no es correcto
            if (!this.checkValidity()) {
                this.classList.add('was-validated')
            } else {
                // mostrar el spinner 
                funcDefault.mostrarSpinner()

                // Claves/valor del formulario
                const formData = new FormData(formulario)

                // Creacion cadena con parametros
                let parametros = ""
                for (let [name, value] of formData) {
                    parametros += `/${value}`
                }

                // redirección a funcion del controlador
                const url = base_url + "Registro_c/formCrearUsuario" + parametros
                location.href = url
            }
        })
    </script>