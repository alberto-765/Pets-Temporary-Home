<!DOCTYPE html>
<html lang="es" data-bs-theme="light">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- css bootstrap -->
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/assets/libs/bootstrap/css/bootstrap.min.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/assets/libs/bootstrap/icons/font/bootstrap-icons.css" />

    <!-- css propio -->
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/animaciones.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/default.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/footer.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/cabecera.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/propietarios.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/inicio.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/buscar.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/detalles.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/subirImagenes.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/mascotas.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/reservas.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/reservar.css" />


    <!-- datatables  -->
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/assets/libs/datatables.min.css" />

    <!-- jquery -->
    <script src="<?= BASE_URL; ?>app/assets/libs/jquery-3.6.3.min.js"></script>

    <!-- bootstrap js -->
    <script src="<?= BASE_URL; ?>app/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- js con funciones compatibles para todos las páginas -->
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassDefault.js"></script>



    <title>Pet's Temporary Home</title>
</head>

<body class="d-flex flex-column ">
    <script>
        const base_url = '<?= BASE_URL; ?>'
        const root = '<?= ROOT; ?>'

        // el usuario se guarda en session pero por seguridad se vuelve a establecer manualmente
        addEventListener("DOMContentLoaded", function() {
            funcDefault.setUsuarioLogin("<?= $_SESSION["usuario"] ?>")
        })
    </script>


    <header class=" sticky-top shadow py-2 " id="header" data-tipo="propietario">
        <nav class="navbar navbar-expand-lg
          container justify-content-around justify-content-sm-between">
            <a class="navbar-brand text-capitalize fs-3 mouseOver" href="<?= BASE_URL ?>Usuarios_c/inicioUsuario/" aria-current="page">
                <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 60px">
                Pet's Temporary Home</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu" aria-controls="menu" aria-expanded="false" aria-label="Menu de Navegacion">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse justify-content-end align-items-center mt-2 mx-4 mx-sm-0" id="menu">
                <ul class="navbar-nav gap-3">
                    <li class="nav-item mouseOver">
                        <a class="btn shadow " href="<?= BASE_URL ?>Inicio_c/buscarCuidador">
                            <img src="<?= BASE_URL ?>app/assets/iconos/lupa.gif " class="me-3" alt="Icono Mascotas" style="height: 25px;">Buscar Cuidador</a>
                    </li>
                    <li class="nav-item  mouseOver">
                        <a class="btn  btn-outline-dark shadow " href="<?= BASE_URL ?>Usuarios_c/mascotas" style="background-color: transparent !important;">
                            <img src="<?= BASE_URL ?>app/assets/iconos/mascotas.svg " class="me-3" alt="Icono Mascotas" style="height: 25px;">Mis mascotas</a>
                    </li>
                    <li class="nav-item mouseOver">
                        <a class="btn btn-outline-dark shadow" href="<?= BASE_URL ?>Propietarios_c/reservas" style="background-color: transparent !important;">
                            <img src="<?= BASE_URL ?>app/assets/iconos/reservas.svg " class="me-3" alt="Icono Reservas" style="height: 25px;">Mis reservas</a>
                    </li>

                    <li class="nav-item mouseOver">
                        <button class="btn border-dark" type="button" data-bs-toggle="offcanvas" data-bs-target="#perfilCanvas" aria-controls="perfilCanvas">
                            <img src="<?= BASE_URL ?>app/assets/iconos/user.svg" alt="Icono Usuario" style="height: 25px;">
                        </button>
                    </li>
                </ul>
            </div>

        </nav>
    </header>