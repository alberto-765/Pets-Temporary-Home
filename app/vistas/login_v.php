<?php

?>
<main class="wrapperLogin d-flex flex-grow-1 flex-column">
    <div class="container flex-grow-1  mb-3">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-md-8 col-lg-5 col-xxl-5 login text-center text-white">
                <div class="row justify-content-center row-gap-4 px-4 px-sm-0 py-5">
                    <div class="icono-login">
                        <img src="<?= BASE_URL ?>/app/assets/img/login.png " alt="Icono login">
                    </div>

                    <form action="#" class="col-12 col-sm-10 col-md-9 col-lg-9 col-xxl-9 row-gap-4 d-flex flex-column justify-content-center fs-3 needs-validation" method=post id=formlogin formenctype=multipart/form-data autocomplete="off" novalidate>

                        <div class="inputContenedor d-flex border-bottom border-white align-items-center pb-3 ">
                            <div class="col-2">
                                <i class="bi bi-person"></i>
                            </div>
                            <div class="col-10">
                                <input type="text" class="bg-transparent w-100 text-white border-0 mouseOver" name="usuario" id="usuario" minlength=1 maxlength=60 required placeholder="Usuario" />
                            </div>

                        </div>

                        <div class="inputContenedor d-flex border-bottom border-white align-items-center pb-3 ">
                            <div class="col-2">
                                <i class="bi bi-lock-fill"></i>
                            </div>
                            <div class="col-8">
                                <input type="password" placeholder="Contraseña" id="contraseña" name="contrasena" minlength=6 maxlength=20 class="bg-transparent border-0 w-100 text-white mouseOver" required autocomplete="new-password" />
                            </div>
                            <div class="col-2 mouseOver" id="seePassword">
                                <i class="bi bi-eye-fill"></i>
                            </div>
                        </div>

                        <div class="form-check d-flex gap-3 justify-content-center fs-5 align-items-center">
                            <input class="form-check-input mouseOver" type="checkbox" id="recordar">
                            <label class="form-check-label" for="recordar">
                                Recuérdame
                            </label>
                        </div>
                        <div class="error text-danger fs-6 d-none">
                        </div>
                        <div class="d-grid mx-auto col-10 col-sm-10 col-md-8 col-lg-10 col-xxl-8 submit">
                            <button class="btn text-white fw-semibold fs-4 rounded-pill py-2" type="submit"> Login</button>
                        </div>

                        <div class="row fs-6">
                            <div class="col-12">¿Aún no tiene una cuenta? <a class="text-decoration-none" href="<?= BASE_URL ?>Registro_c">
                                    Registrarse </a></div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <script src="<?= BASE_URL; ?>app/assets/libs/cookies.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/login.js"></script>