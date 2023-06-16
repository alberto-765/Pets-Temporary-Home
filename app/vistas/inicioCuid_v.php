<main class="wrapperInicio flex-grow-1 d-flex flex-column ">
    <div class="fondoNegro flex-grow-1  d-flex flex-column justify-content-between ">
        <div class="container align-self-center my-5  flex-column ">
            <div class="row bienvenida justify-content-center text-center text-white row-gap-5">
                <h1 class="display-4 mt-5">Bienvenido <?= $_SESSION["apenom"]; ?></h1>



                <div id="carouselInicio" class="carousel slide col-9 col-md-9 col-lg-8 col-xl-7 " data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="4" aria-label="Slide 5"></button>
                        <button type="button" data-bs-target="#carouselInicio" data-bs-slide-to="5" aria-label="Slide 6"></button>
                    </div>
                    <div class="carousel-inner rounded shadow-lg">
                        <div class="carousel-item active">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio0.jpg" class="carouselInicioCuid" alt="Imagen 0 carousel">
                        </div>
                        <div class="carousel-item">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio1.jpg" class="carouselInicioCuid" alt="Imagen 1 carousel">
                        </div>
                        <div class="carousel-item">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio2.jpg" class="carouselInicioCuid" alt="Imagen 2 carousel">
                        </div>
                        <div class="carousel-item">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio3.jpg" class="carouselInicioCuid" alt="Imagen 3 carousel">
                        </div>
                        <div class="carousel-item">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio4.jpg" class="carouselInicioCuid" alt="Imagen 4 carousel">
                        </div>
                        <div class="carousel-item">
                            <img src="<?= BASE_URL ?>app/assets/img/carouselInicio5.jpg" class="carouselInicioCuid" alt="Imagen 5 carousel">
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselInicio" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselInicio" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>

        </div>
        <footer class="row justify-content-center text-capitalize text-center text-white bg-transparent  w-100  shadow-lg  mx-auto mb-3 ">
            <div class=" col-12 pb-1 pt-2 ">Alberto Mimbrero Gutiérrez</div>
            <div class=" col-3 col-md-1 border-bottom"></div>
            <div class=" col-12 pb-2 pt-1">Pet's Temporary Home 2023</div>
        </footer>
    </div>


    </body>

    </html>
    <script>

    </script>