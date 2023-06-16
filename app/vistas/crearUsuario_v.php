<?php
unset($_SESSION["email"]);
unset($_SESSION["usuario"]);
unset($_SESSION["contraseña"]);


?>
<main id="wrapperRegistro" class="flex-grow-1 d-flex flex-column">
    <div class="container py-5 flex-grow-1 d-flex align-items-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xxl-5 mx-auto">

            <form class="row justify-content-between rounded p-4 row-gap-3 needs-validation" action="" novalidate>
                <div class="text-capitalize">
                    <h2>Registrarse Como <?= $_SESSION["tipoUser"] ?></h2>
                </div>
                <div class="fw-semibold">
                    <label for="email " class="form-label">Correo Electrónico <code>*</code></label>
                    <div class="input-group">
                        <input type="email" class="form-control" name="email" id="email" aria-describedby="emailHelp" maxlength="255" minlength="1" autocomplete="email" required placeholder="nombre@dominio">
                        <div class="input-group-text">
                            <i class="bi bi-envelope-fill fs-4"></i>
                        </div>
                        <div class="invalid-feedback">
                            El campo debe ser un correo y no puede estar vacío
                        </div>
                    </div>
                    <div class="form-text fw-normal">Puedes usar tu mismo correo para cuenta de propietario y cuidador</div>
                </div>
                <div class="fw-semibold input-group">
                    <label for="usuario" class="form-label">Usuario <code>*</code></label>
                    <div class="input-group">
                        <input type="text" class="form-control" name="usuario" id="usuario" maxlength="20" minlength="1" autocomplete="username" required placeholder="username" pattern="[a-zA-Z0-9À-ÿ\u00f1\u00d1_.]+">
                        <div class="input-group-text">
                            <i class="bi bi-person-fill fs-4"></i>
                        </div>
                        <div class="invalid-feedback">
                            El campo no puede estar vacío
                        </div>
                    </div>
                </div>
                <div class="fw-semibold input-group">
                    <label class="form-label" for="contraseña">Contraseña <code>*</code></label>
                    <div class="input-group">
                        <input type="password" class="form-control" name="contrasenna" id="contrasenna" minlength="6" maxlength="60" autocomplete="new-password" required>
                        <div class="input-group-text"><i class="bi bi-eye fs-4 contraseña mouseOver"></i></div>
                        <div class="invalid-feedback">
                            Contraseña muy corta (min 6 caracteres) o vacía
                        </div>
                    </div>
                </div>
                <div class="fw-semibold input-group">
                    <label class="form-label" for="confContraseña">Confirma la contraseña <code>*</code></label>
                    <div class="input-group">
                        <input type="password" class="form-control" name="confContrasenna" id="confcontrasenna" minlength="6" maxlength="60" autocomplete="new-password" required>
                        <div class="input-group-text">
                            <i class="bi bi-eye fs-4 contraseña"></i>
                        </div>
                        <div class="invalid-feedback">
                            Contraseña muy corta (min 6 caracteres) o vacía
                        </div>
                    </div>
                </div>
                <div class="text-center ">
                    <button class="btn btn-success fs-5" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    </div>
    <script src="<?= BASE_URL; ?>app/vistas/js/crearUsuario.js"></script>