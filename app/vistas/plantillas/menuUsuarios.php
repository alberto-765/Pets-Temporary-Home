<?php if (isset($_SESSION["usuario"])) {
    if ($_SESSION["tipoUser"] == "cuidador") { ?>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="perfilCanvas" aria-labelledby="perfilCanvasLabel">
            <div class="offcanvas-header py-4 flex-wrap text-white" style="  background: rgb(33,148,188);">
                <h5 class="offcanvas-title" id="perfilCanvasLabel">¡ Hola <?= $_SESSION["apenom"] ?> !</h5>

                <div class="align-self-start" data-bs-theme="dark">
                    <button type="button" class="btn-close " data-bs-theme="dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="w-100 fs-6"><?= ucfirst($_SESSION["tipoUser"]) ?></div>
            </div>
            <div class="offcanvas-body" style=" background: #93bfcf81;">
                <ul class="list-group row-gap-2">
                    <!-- <li class="list-group-item bg-transparent border-0">
                        <a href="<?= BASE_URL ?>Inicio_c/perfil" class="text-decoration-none link-dark">
                            <img src="<?= BASE_URL ?>app/assets/iconos/editarPerfil.svg " class="me-3" alt="Icono Usuario" style="height: 25px;">Perfil
                        </a>
                    </li> -->
                    <li class="list-group-item bg-transparent  border-0 mouseOver"> <a href="<?= BASE_URL ?>Cuidadores_c/reservas" class="text-decoration-none link-dark">
                            <img src="<?= BASE_URL ?>app/assets/iconos/reservas.svg " class="me-3" alt="Icono Reservas" style="height: 25px;">Reservas
                        </a></li>
                    <!-- <li class="list-group-item bg-transparent  border-0"> <a href="<?= BASE_URL ?>Cuidadores_c/servicios" class="text-decoration-none link-dark">
                            <img src="<?= BASE_URL ?>app/assets/iconos/money.svg " class="me-3" alt="Icono Servicios" style="height: 25px;">Servicios
                        </a>
                    </li> -->

                    <li class="list-group-item bg-transparent  border-0 mouseOver">
                        <a href="<?= BASE_URL ?>Usuarios_c/mascotas" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/mascotas.svg " class="me-3" alt="Icono Mascotas" style="height: 25px;">Mascotas
                        </a>
                    </li>
                    <!-- <li class="list-group-item bg-transparent  border-0">
                        <a href="<?= BASE_URL ?>Cuidadores_c/galeria" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/galeria.svg " class="me-3" alt="Icono Galeria" style="height: 25px;">Galeria
                        </a>
                    </li> -->
                    <li class="list-group-item bg-transparent  border-0 mouseOver"> <a href="<?= BASE_URL ?>Usuarios_c/cerrarSesion" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/logout.svg " class="me-3" alt="Icono Cerrar sesion" style="height: 25px;">Cerrar Sesión
                        </a></li>
                </ul>
            </div>
        </div>
    <?php } else if ($_SESSION["tipoUser"] == "propietario") { ?>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="perfilCanvas" aria-labelledby="perfilCanvasLabel">
            <div class="offcanvas-header py-4 flex-wrap text-white" style="  background: rgb(33,148,188);">
                <h5 class="offcanvas-title" id="perfilCanvasLabel">¡ Hola <?= $_SESSION["apenom"] ?> !</h5>

                <div class="align-self-start" data-bs-theme="dark">
                    <button type="button" class="btn-close " data-bs-theme="dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="w-100 fs-6"><?= ucfirst($_SESSION["tipoUser"]) ?></div>
            </div>
            <div class="offcanvas-body" style=" background: #93bfcf81;">
                <ul class="list-group row-gap-2">
                    <!-- <li class="list-group-item bg-transparent border-0">
                        <a href="<?= BASE_URL ?>Inicio_c/perfil" class="text-decoration-none link-dark">
                            <img src="<?= BASE_URL ?>app/assets/iconos/editarPerfil.svg " class="me-3" alt="Icono Usuario" style="height: 25px;">Perfil
                        </a>
                    </li> -->
                    <li class="list-group-item bg-transparent  border-0"> <a href="<?= BASE_URL ?>Propietarios_c/reservas" class="text-decoration-none link-dark mouseOver">
                            <img src="<?= BASE_URL ?>app/assets/iconos/reservas.svg " class="me-3" alt="Icono Reservas" style="height: 25px;">Reservas
                        </a></li>

                    <li class="list-group-item bg-transparent  border-0 mouseOver">
                        <a href="<?= BASE_URL ?>Usuarios_c/mascotas" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/mascotas.svg " class="me-3" alt="Icono Mascotas" style="height: 25px;">Mascotas
                        </a>
                    </li>
                    <!-- <li class="list-group-item bg-transparent  border-0">
                        <a href="<?= BASE_URL ?>Propietarios_c/galeria" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/galeria.svg " class="me-3" alt="Icono Galeria" style="height: 25px;">Galeria
                        </a>
                    </li> -->
                    <li class="list-group-item bg-transparent  border-0 mouseOver"> <a href="<?= BASE_URL ?>Usuarios_c/cerrarSesion" class="text-decoration-none link-dark"><img src="<?= BASE_URL ?>app/assets/iconos/logout.svg " class="me-3" alt="Icono Cerrar sesion" style="height: 25px;">Cerrar Sesión
                        </a></li>
                </ul>
            </div>
        </div>

<?php }
} ?>