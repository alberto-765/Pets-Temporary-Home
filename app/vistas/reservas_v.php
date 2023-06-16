<section class="wrapperReservas flex-grow-1 d-flex justify-content-center fondoGradiente  ">

    <div class="col-12 col-md-10 d-flex flex-column row-gap-5">
        <ul class="nav nav-tabs" id="tabsReservas">
            <li class="nav-item">
                <a class="nav-link active mouseOver" id="reservasActivas" aria-current="page">Activas</a>
            </li>
            <li class="nav-item">
                <a class="nav-link mouseOver" id="reservasVenideras">Venideras</a>

            </li>
            <li class="nav-item">
                <a class="nav-link mouseOver" id="reservasFinalizadas">Finalizadas</a>
            </li>

        </ul>

        <table id="tablaReservas" class="table table-striped position-relative">
            <thead>

            </thead>
            <tbody></tbody>
        </table>
    </div>
    </div>
</section>


<script src="<?= BASE_URL; ?>app/assets/libs/datatables.min.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncUsuarios.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassBuscarCuidador.js"></script>
<script src="<?= BASE_URL; ?>app/vistas/js/ClassReservas.js"></script>