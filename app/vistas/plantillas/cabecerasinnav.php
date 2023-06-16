<!DOCTYPE html>
<html lang="es" data-bs-theme="light">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- css bootstrap -->
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/assets/libs/bootstrap/icons/font/bootstrap-icons.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/assets/libs/bootstrap/css/bootstrap.min.css" />

    <!-- css propio -->
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/animaciones.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/default.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/footer.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/cabecera.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/registro.css" />
    <link rel="stylesheet" href="<?= BASE_URL; ?>app/vistas/css/subirImagenes.css" />


    <!-- jquery -->
    <script src="<?= BASE_URL; ?>app/assets/libs/jquery-3.6.3.min.js"></script>

    <!-- bootstrap js -->
    <script src="<?= BASE_URL; ?>app/assets/libs/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- js con funciones compatibles para todos las páginas -->
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassDefault.js"></script>

    <!-- js con funciones de registro -->
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassRegistro.js"></script>

    <title>Pet's Temporary Home</title>
</head>

<body class="d-flex flex-column">

    <script>
        const base_url = '<?= BASE_URL; ?>'
        const root = '<?= ROOT; ?>'
    </script>


    <header class=" sticky-top shadow py-4" id="header" data-tipo="<?php if (isset($_SESSION["tipoUser"])) echo $_SESSION["tipoUser"] ?>">
        <div class="container ">

            <a class="text-decoration-none link-dark text-capitalize fs-3 " id="navbrand" href="<?= BASE_URL . "Inicio_c/index" ?>" aria-current="page">
                <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 60px">
                Pet's Temporary Home
            </a>

        </div>

    </header>