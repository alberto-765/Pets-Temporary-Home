<!-- Boton para volver al top  -->
<div class="fs-1 fixed-bottom ms-auto me-4 my-3 text-end mouseOver" id="goTop"><i class="bi bi-arrow-up-circle opacity-75"></i></i></div>

<footer class="row justify-content-center text-capitalize text-center text-white bg-transparent w-100 shadow mx-auto py-2 ">
    <div class=" col-12 pb-1 pt-2 ">Alberto Mimbrero Gutiérrez</div>
    <div class=" col-3 col-md-1 border-bottom"></div>
    <div class=" col-12 pb-2 pt-1">Pet's Temporary Home 2023</div>
</footer>
</main>

<div id="spinner" class="position-absolute top-0 left-0 w-100 h-100 d-none ">
    <div class="bg-light rounded position-absolute top-50 start-50 translate-middle  text-black active p-2 " type="button">
        <p class="spinner-border" role="status" aria-hidden="true" style="--bs-spinner-animation-speed: 1s;--bs-spinner-width: 5rem; --bs-spinner-height: 5rem; margin: 0; --bs-spinner-border-width: 0.15em;  ">
        </p>
        <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 60px" class="position-absolute top-50 start-50 translate-middle">
    </div>
</div>

<!-- Button PopUp error al borrar o editar mascota -->
<button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#alerta" id="errorModal">
</button>

<!-- PopUp error-->
<div class="modal fade text-black" id="alerta" tabindex="-1" aria-labelledby="alertaLabel" data-bs-backdrop="static" data-bs-keyboard="true" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered modal-fullscreen-sm-down">
        <div class="modal-content animacionMeneo">
            <div class="modal-header border border-dark-subtle position-relative py-2">
                <h1 class="modal-title fs-5 d-flex align-items-center font-monospace" id="alertaLabel"><i class="bi bi-exclamation-triangle-fill fs-1 text-warning me-3"></i>!Algo ha salido mal!</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body  border-0 lead bg-body-tertiary d-flex flex-column row-gap-2 fs-5 justify-content-center align-content-center">

            </div>
            <div class="modal-footer py-1  border-0">

            </div>
        </div>
    </div>
</div>
</body>

</html>