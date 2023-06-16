<?php
// Asignar zona horaria de madrid 
date_default_timezone_set("Europe/Madrid");

// la fecha minima tiene que ser desde las 7:00 am hasta las 24:00
$fechaMinima = date('Y-m-d H:i');

// 1.9 si la fehca minima del momento es menor a las 7:00 am se le asignará esta misma
if ($fechaMinima < date('Y-m-d 07:00')) {
    $fechaMinima = date('Y-m-d') . "T07:00";
} else if (date('H') == '00') {
    // para que no de error si la hora es 00 hay que cambiarlo por 23
    $fechaMinima = date('Y-m-d') . "T" . date('23:i');
} else {
    $fechaMinima = date('Y-m-d') . "T" . date('H:i');
}


// fecha maxima actual, que será hasta las 23:59, el día da igual
$fechaMaxima = '9999-12-31T23:59';
?>
<main id="wrapperBuscarCuidador" class="fondoGradiente flex-grow-1 d-flex align-items-center flex-column no-scroll">
    <div class="container-fluid d-flex flex-column flex-grow-1">
        <div class="row flex-grow-1 ">

            <!-- columna izquierda filtros  -->
            <div class="col-12 col-md-4 px-0 px-lg-4 shadow sectionFiltros d-flex flex-column justify-content-center d-md-block">

                <div class="row mx-2 row-gap-3 justify-content-center bg-transparent">
                    <!-- Contador de cuidadores  -->
                    <div id="contador_cuidadores_mostrados" class="col-12 text-end text-reset fst-italic">

                    </div>

                    <!-- Título filtros  -->
                    <div class="col-12 text-center my-2 d-none d-md-block">
                        <p class="h3"> Filtros </p>
                    </div>


                    <!-- Modal de filtros  -->
                    <button type="button" class="btn btn-dark d-block d-md-none col-6 mx-auto my-2" data-bs-toggle="modal" data-bs-target="#modalFiltros">
                        <i class="bi bi-sliders pe-2"></i>
                        Filtros
                    </button>

                    <form class="formularioFiltros  row-gap-3 filtrar px-2 px-sm-5 px-md-0 needs-validation justify-content-center d-none d-md-flex flex-column" id="formFiltrarNoModal" novalidate>

                        <div class="col-12 ">
                            <p class="h5">Ordenar por: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">

                                <select class="form-select select-orden" name="ordenar" id="ordenar">
                                    <option selected value="1">Aleatorio</option>
                                    <option value="2">Precio de menor a mayor</option>
                                    <option value="3">Precio de mayor a menor</option>
                                </select>

                            </div>
                        </div>

                        <!-- Columna servicios  -->
                        <div class="col-12 ">
                            <p class="h5">Servicio: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">

                                <select class="form-select selectServicios" name="servicio">
                                    <option selected value="0">Aleatorio</option>
                                    <option value="1">Alojamiento</option>
                                    <option value="2">Guardería</option>
                                    <option value="3">Paseo</option>
                                </select>

                            </div>
                        </div>

                        <!-- Columna ubicación  -->
                        <div class="col-12 ">
                            <p class="h5">Cuidadores en: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">
                                <input type="text" class="form-control fs-6 py-2 inputDonde" placeholder="Código postal o Localidad" name="donde" list="datalistOptions">
                                <datalist id="datalistOptions" class="datalist">

                                </datalist>
                            </div>
                        </div>

                        <!-- Columna fechas  -->
                        <div class="col-12 ">
                            <p class="h5">Fechas: </p>
                            <div class="row mx-2 align-items-center  row-gap-2 row-gap-sm-3 row-gap-md-1 row-gap-lg-3 justify-content-center text-center">


                                <!-- label desde  -->
                                <div class="col-12 col-sm-5 col-md-12 col-lg-5"> <label for="inputDesde" class="form-label">Desde: </label>
                                </div>

                                <!-- input fecha desde  -->
                                <div class="col-12 col-sm-7 col-md-12 col-lg-8 col-xl-6 col-xxl-7 ">
                                    <input type="datetime-local" class="form-control fs-6 inputDesde" name="calfechinicio" min="<?= $fechaMinima ?>" id="inputDesde">
                                    <div class="invalid-feedback">
                                        La fecha elegida debe de estar entre las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59
                                    </div>
                                </div>



                                <!-- label hasta  -->
                                <div class="col-12 col-sm-5 col-md-12 col-lg-5">
                                    <label for="inputHasta" class="form-label">Hasta: <code>*</code></label>
                                </div>

                                <!-- input fecha hasta  -->
                                <div class="col-12 col-sm-7 col-md-12 col-lg-8 col-xl-6 col-xxl-7">
                                    <input type="datetime-local" class="form-control fs-6 inputHasta" id="inputHasta" name="calfechfin" min="<?= $fechaMinima ?>" required disabled>
                                    <div class="invalid-feedback">
                                        La fecha elegida debe de estar entre las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59
                                    </div>
                                </div>

                            </div>
                        </div>


                        <!-- Columna tipo de mascota  -->
                        <div class="col-12 ">
                            <p class="h5">Tipo de mascota: </p>
                            <div class="row text-center row-gap-2 mt-3 contenedorBotones">
                                <div class="col-6">
                                    <!-- button perro  -->
                                    <button class="btn btn-light px-3 px-lg-4 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro">
                                        <p class="my-0"> Perro</p>
                                        <input type="checkbox" name="cuidperro" value="1" class="btn-perro mouseOver">
                                    </button>
                                </div>

                                <!-- button gato  -->
                                <div class="col-6">
                                    <button class="btn btn-light px-3 px-lg-4 position-relative  border  inputBtn" type="button"><img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato">
                                        <p class="my-0"> Gato </p>
                                        <input type="checkbox" name="cuidgato" value="1" class="btn-gato mouseOver">

                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- columna precio  -->
                        <div class="col-12">
                            <p class="h5">Precio Máximo(€): </p>
                            <div class="row text-center mt-3 justify-content-center">
                                <div class="col-6 col-sm-3 col-md-6 col-lg-4 col-xl-3 col-xxl-4  ">
                                    <input type="number" class="form-control text-center inputPrecio" name="precio" min="0" max="100">
                                    <div class="invalid-feedback">Precio entre 1-100€</div>
                                </div>
                            </div>
                        </div>

                        <!-- Columna edad  -->
                        <div class="col-12">
                            <p class="h5">Edad: </p>
                            <div class="row text-center row-gap-2 mt-3 contenedorBotones">
                                <div class="col-6 ">
                                    <!-- button cachorro  -->
                                    <button class="btn btn-light  px-3 px-lg-3 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/cachorro.jpg" alt="Icono cachorro">
                                        <p class="my-0"> Cachorro</p>
                                        <input type="checkbox" class="inputCachorro mouseOver" name="cachorro" value="1">
                                    </button>
                                </div>

                                <!-- button adulto  -->
                                <div class="col-6">
                                    <button class="btn btn-light  px-4 px-lg-4 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/perroadulto.jpg" alt="Icono perro adulto">
                                        <p class="my-0"> Adulto </p>
                                        <input type="checkbox" class="inputAdulto mouseOver" name="adulto" value="1">
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Columna tamaño -->
                        <div class="col-12 ">
                            <p class=" h5">Tamaño: </p>
                            <div class="row flex-wrap text-center row-gap-4 column-gap-lg-4 mt-3 justify-content-center contenedorBotones">

                                <!-- button perro toy -->
                                <div class="col-auto col-lg-4 col-xxl-3 d-grid">
                                    <button class="btn btn-light  position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/toy.png" alt="Icono cachorro">
                                        <p class="my-0 fw-semibold"> Toy</p>
                                        <p class="my-0 text-nowrap"> Menos 5Kg</p>
                                        <input type="checkbox" class="inputToy mouseOver" name="perrotoy" value="1">
                                    </button>
                                </div>


                                <!-- button perro pequeño  -->
                                <div class="col-auto col-lg-4  col-xxl-3 d-grid">
                                    <button class="btn btn-light position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/pequeño.png" alt="Icono cachorro">
                                        <p class="my-0 fw-semibold"> Pequeño</p>
                                        <p class="my-0 text-nowrap">5-10Kg</p>
                                        <input type="checkbox" class="inputPequeno mouseOver" name="perropequeno" value="1">
                                    </button>
                                </div>

                                <!-- button perro mediano -->
                                <div class="col-auto col-lg-4 col-xxl-3 d-grid">
                                    <button class="btn btn-light position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/mediano.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Mediano </p>
                                        <p class="my-0 text-nowrap">10-25Kg</p>
                                        <input type="checkbox" class="inputMediano mouseOver" name="perromediano" value="1">
                                    </button>
                                </div>

                                <!-- button perro grande -->
                                <div class="col-auto col-lg-4  col-xxl-3 d-grid">
                                    <button class="btn btn-light position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/grande.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Grande </p>
                                        <p class="my-0 text-nowrap">25-40Kg</p>
                                        <input type="checkbox" class="inputGrande mouseOver" name="perrogrande" value="1">

                                    </button>
                                </div>

                                <!-- button perro gigante -->
                                <div class="col-auto col-md-4  col-xxl-3 d-grid">
                                    <button class="btn btn-light position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/enorme.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Enorme </p>
                                        <p class="my-0 text-nowrap"> Más 40Kg</p>
                                        <input type="checkbox" class="inputEnorme mouseOver" name="perroenorme" value="1">

                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Acordeon condiciones de la vivienda -->
                        <div class="col-12 mt-3 ">
                            <div class="accordion" id="acordeonVivienda2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloUno2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoUno2" aria-expanded="false" aria-controls="colapsadoUno2">
                                            <h5>Condiciones de la vivienda</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoUno2" class="accordion-collapse collapse" aria-labelledby="tituloUno" data-bs-parent="#acordeonVivienda">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- Tiene jardin o terraza  -->

                                            <div class="form-check my-1">
                                                <input class="form-check-input checkJardin mouseOver" type="checkbox" name="jardin" value="1" id="vivienda2Check1">
                                                <label class="form-check-label mouseOver" for="vivienda2Check1">
                                                    Tiene jardín o terraza
                                                </label>
                                            </div>

                                            <!-- Es casa de no fumadores  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkFumadores mouseOver" type="checkbox" name="fumadores" value="1" id="vivienda2Check2">
                                                <label class="form-check-label mouseOver" for="vivienda2Check2">
                                                    Casa de no fumadores
                                                </label>
                                            </div>

                                            <!-- La mascota puede subirse a la cama  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkCama mouseOver" type="checkbox" name="cama" value="1" id="vivienda2Check3">
                                                <label class="form-check-label mouseOver" for="vivienda2Check3">
                                                    Pueden subir a la cama
                                                </label>
                                            </div>

                                            <!-- Pueden subir a los muebles  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkMuebles mouseOver" type="checkbox" name="muebles" value="1" id="vivienda2Check4">
                                                <label class="form-check-label mouseOver" for="vivienda2Check4">
                                                    Pueden subir a los muebles
                                                </label>
                                            </div>

                                            <!-- Inputs radios del tamaño de la casa  -->
                                            <!-- Pequeña  -->
                                            <div class="form-check form-check-inline mt-3">
                                                <input class="form-check-input radioPequena mouseOver" type="radio" name="tamanocasa" id="tamaño12" value="P">
                                                <label class="form-check-label mouseOver" for="tamaño12">Pequeña (24-45m2)</label>
                                            </div>
                                            <div class="form-check form-check-inline my-1 mouseOver">
                                                <input class="form-check-input radioMediana" type="radio" name="tamanocasa" id="tamaño22" value="M">
                                                <label class="form-check-label mouseOver" for="tamaño22">Mediana (50-75m2)</label>
                                            </div>
                                            <div class="form-check form-check-inline my-1 mouseOver">
                                                <input class="form-check-input radioGrande" type="radio" name="tamanocasa" id="tamaño32" value="G">
                                                <label class="form-check-label mouseOver" for="tamaño32">Grande (> 80m2)</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <!-- Acordeon de niños en casa -->
                        <div class="col-12 ">
                            <div class="accordion acordeonNinos" id="acordeonNiños2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloDos2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoDos2" aria-expanded="false" aria-controls="colapsadoDos2">
                                            <h5>Niños en Casa</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoDos2" class="accordion-collapse collapse" aria-labelledby="tituloDos" data-bs-parent="#acordeonNiños">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- No hay niños  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input noNinosCheck mouseOver" type="checkbox" value="1" id="niños2Check1" name="noninos">
                                                <label class="form-check-label mouseOver" for="niños2Check1">
                                                    No hay niños
                                                </label>
                                            </div>

                                            <!-- Niños menos de 12 años -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input ninosMenosCheck mouseOver" type="checkbox" value="1" id="niños2Check2" name="ninosmenos">
                                                <label class="form-check-label mouseOver" for="niños2Check2">
                                                    Hay niños menores de 12 años
                                                </label>
                                            </div>

                                            <!-- Niños más de 12 años  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input ninosMasCheck mouseOver" type="checkbox" value="1" id="niños2Check3" name="ninosmas">
                                                <label class="form-check-label mouseOver" for="niños2Check3">
                                                    Hay niños mayores de 12 años
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon de otras mascotas en casa -->
                        <div class="col-12">
                            <div class="accordion" id="acordeonMascotas2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloTres2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoTres2" aria-expanded="false" aria-controls="colapsadoTres2">
                                            <h5>Otras mascotas en casa</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoTres2" class="accordion-collapse collapse" aria-labelledby="tituloTres2" data-bs-parent="#acordeonMascotas2">
                                        <div class="accordion-body">



                                            <!-- Hay perros -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkHayPerros mouseOver" type="checkbox" value="1" id="mascotas2Check2" name="hayperros">
                                                <label class="form-check-label mouseOver" for="mascotas2Check2">
                                                    Hay perros
                                                </label>
                                            </div>

                                            <!-- Hay gatos  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkHayGatos mouseOver" type="checkbox" value="1" id="mascotas2Check3" name="haygatos">
                                                <label class="form-check-label mouseOver" for="mascotas2Check3">
                                                    Hay gatos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon de esterilizacion-->
                        <div class="col-12 ">
                            <div class="accordion" id="acordeonEsterilizacion2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloCuatro2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCuatro2" aria-expanded="false" aria-controls="colapsadoCuatro2">
                                            <h5>Esterilizacion</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoCuatro2" class="accordion-collapse collapse" aria-labelledby="tituloCuatro2" data-bs-parent="#acordeonEsterilizacion">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <div class="form-check my-1">
                                                <input class="form-check-input checkPerroCastr mouseOver" type="checkbox" value="1" id="esterilizacionCheck1" name="perroscastr">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck1">
                                                    Acepta perros no castrados
                                                </label>
                                            </div>

                                            <!-- Perras no esterilizadas  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkPerraEster mouseOver" type="checkbox" value="1" id="esterilizacionCheck2" name="perrasester">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck2">
                                                    Acepta perras no esterilizadas
                                                </label>
                                            </div>

                                            <!-- Gatos no castrados  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkGatoCastr mouseOver" type="checkbox" value="1" id="esterilizacionCheck3" name="gatoscastr">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck3">
                                                    Acepta gatos no castrados
                                                </label>
                                            </div>

                                            <!-- Gatas no esterilizadas  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkGataEster mouseOver" type="checkbox" value="1" id="esterilizacionCheck4" name="gatasester">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck4">
                                                    Acepta gatas no esterilizadas
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon habilidades del cuidador -->
                        <div class="col-12 ">
                            <div class="accordion" id="acordeon2Habilidades">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloCinco2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCinco2" aria-expanded="false" aria-controls="colapsadoCinco2">
                                            <h5>Habilidades del cuidador</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoCinco2" class="accordion-collapse collapse" aria-labelledby="tituloCinco2" data-bs-parent="#acordeon2Habilidades">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- Tiene coche  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkCoche mouseOver" type="checkbox" value="1" id="habilidadesCheck1" name="coche">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck1">
                                                    Tiene coche para trasladar a las mascotas
                                                </label>
                                            </div>

                                            <!-- Mediacion oral  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkMedOral mouseOver" type="checkbox" value="1" id="habilidadesCheck2" name="medoral">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck2">
                                                    Puede administrar medicación oral
                                                </label>
                                            </div>

                                            <!-- Medicación inyectada  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkMedInyec mouseOver" type="checkbox" value="1" id="habilidadesCheck3" name="medinyec">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck3">
                                                    Puede administrar mediación inyectada
                                                </label>
                                            </div>



                                            <!-- Ofrecer ejercicio  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkEjercicio mouseOver" type="checkbox" value="1" id="habilidadesCheck5" name="ejercicio">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck5">
                                                    Puede ofrecer ejercicio diario
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        <div class="row align-content-between justify-content-around my-4 my-sm-3 row-gap-3  fs-6 fw-semibold">
                            <button type="submit" class="btn btn-warning shadow  col-7 col-sm-5 order-sm-1"> Filtrar</button>
                            <button type="button" class="btn btn-light shadow col-7 col-sm-5 order-sm-0 btnLimpiar">Limpiar</button>
                        </div>

                    </form>
                </div>
            </div>


            <!-- columna derecha cuidadores  -->
            <div class="col-12 col-md-8 px-0 d-flex flex-column position-relative justify-content-center ">
                <div id="spinnerCuidadores" class="position-absolute top-0 left-0 w-100 d-flex align-items-center justify-content-center">
                    <div class=" rounded text-black active p-2 " type=" button">
                        <p class="spinner-border" role="status" aria-hidden="true" style="--bs-spinner-animation-speed: 1s;--bs-spinner-width: 5rem; --bs-spinner-height: 5rem; margin: 0; --bs-spinner-border-width: 0.15em;  ">
                        </p>
                        <img src="<?= BASE_URL . PATH_ASSETS ?>iconos/logo.gif" alt="Logo" style="width: 60px" class="position-absolute top-50 start-50 translate-middle">
                    </div>
                </div>

                <div id="cuidadores-contenedor" class="row row-gap-3 w-100 mx-auto flex-grow-1 align-items-center align-content-start">

                </div>

                <nav class="col-12 my-5" aria-label="Paginacion">
                    <ul class="pagination justify-content-center" id="paginacion">
                        <li class="page-item paginacionAnt noclickPaginacion">
                            <a class="page-link">Anterior</a>
                        </li>
                        <li class="page-item paginacion1 paginacionSelec"><a class="page-link">1</a></li>
                        <li class="page-item paginacion2"><a class="page-link">2</a></li>
                        <li class="page-item paginacion3"><a class="page-link">3</a></li>
                        <li class="page-item paginacionSig">
                            <a class="page-link">Siguiente</a>
                        </li>
                    </ul>
                </nav>

            </div>


        </div>

    </div>
    <!-- Modal -->
    <div class="modal fade p-0" id="modalFiltros" tabindex="-1" aria-labelledby="modalFiltrosLabel" data-bs-backdrop="static" data-bs-keyboard="true" aria-modal="true" role="dialog">
        <div class="modal-dialog modal-dialog-scrollable modal-fullscreen">
            <div class="modal-content">
                <div class="modal-header bg-info">
                    <h1 class="modal-title fs-5" id="modalFiltrosLabel">Filtros</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body bg-light pt-5 sectionFiltros">
                    <form class="formularioFiltros px-2 px-sm-5 px-md-0 row row-gap-3 filtrar justify-content-center " id="formFiltrarModal" novalidate>

                        <div class="col-12 ">
                            <p class="h5">Ordenar por: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">

                                <select class="form-select select-orden" name="ordenar" id="ordenar">
                                    <option selected value="1">Aleatorio</option>
                                    <option value="2">Precio de menor a mayor</option>
                                    <option value="3">Precio de mayor a menor</option>
                                </select>

                            </div>
                        </div>


                        <!-- Columna servicios  -->
                        <div class="col-12 ">
                            <p class="h5">Servicio: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">

                                <select class="form-select selectServicios" name="servicio">
                                    <option selected value="0">Aleatorio</option>
                                    <option value="1">Alojamiento</option>
                                    <option value="2">Guardería</option>
                                    <option value="3">Paseo</option>
                                </select>

                            </div>
                        </div>

                        <!-- Columna ubicación  -->
                        <div class="col-12 ">
                            <p class="h5">Cuidadores en: </p>

                            <div class="col-12 col-sm-5 col-md-12 col-lg-10 col-xl-8 col-xxl-6 text-center mx-auto mt-3">
                                <input type="text" class="form-control fs-6 py-2 inputDonde" placeholder="Código postal o Localidad" name="donde" list="datalistOptions">
                                <datalist id="datalistOptions" class="datalist">

                                </datalist>
                            </div>
                        </div>

                        <!-- Columna fechas  -->
                        <div class="col-12 ">
                            <p class="h5">Fechas: </p>
                            <div class="row mx-2 align-items-center row-gap-2 row-gap-sm-3 row-gap-md-1 row-gap-lg-3 justify-content-center text-center">


                                <!-- label desde  -->
                                <div class="col-12 col-sm-5 col-md-12 col-lg-5"> <label for="inputDesde2" class="form-label">Desde: </label>
                                </div>

                                <!-- input fecha desde  -->
                                <div class="col-12 col-sm-7 col-md-12 col-lg-8 col-xl-6 col-xxl-7 ">
                                    <input type="date" class="form-control fs-6 inputDesde" min="<?= $fechaMinima ?>" name="calfechinicio" id="inputDesde2">
                                    <div class="invalid-feedback">
                                        La fecha elegida debe de estar entre las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59
                                    </div>
                                </div>



                                <!-- label hasta  -->
                                <div class="col-12 col-sm-5 col-md-12 col-lg-5">
                                    <label for="inputHasta2" class="form-label">Hasta: <code>*</code></label>
                                </div>

                                <!-- input fecha hasta  -->
                                <div class="col-12 col-sm-7 col-md-12 col-lg-8 col-xl-6 col-xxl-7">
                                    <input type="date" class="form-control fs-6 inputHasta" min="<?= $fechaMinima ?>" name="calfechfin" id="inputHasta2" required disabled>
                                    <div class="invalid-feedback">
                                        D La fecha elegida debe de estar entre las <?php echo str_replace("T", " ", $fechaMinima); ?> y estar entre las 07:00 y 23:59
                                    </div>
                                </div>

                            </div>
                        </div>


                        <!-- Columna tipo de mascota  -->
                        <div class="col-12 ">
                            <p class="h5">Tipo de mascota: </p>
                            <div class="row text-center row-gap-2 mt-3 contenedorBotones">
                                <div class="col-6">
                                    <!-- button perro  -->

                                    <button class="btn btn-light px-3 px-lg-4 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro">
                                        <p class="my-0"> Perro</p>
                                        <input type="checkbox" name="cuidperro" value="1" class="btn-perro mouseOver">
                                    </button>
                                </div>

                                <!-- button gato  -->
                                <div class="col-6">
                                    <button class="btn btn-light px-3 px-lg-4 position-relative  border  inputBtn" type="button"><img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato">
                                        <p class="my-0"> Gato </p>
                                        <input type="checkbox" name="cuidgato" value="1" class="btn-gato mouseOver">

                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- columna precio  -->
                        <div class="col-12">
                            <p class="h5">Precio Máximo(€): </p>
                            <div class="row text-center mt-3 justify-content-center">
                                <div class="col-6 col-sm-3 col-md-6 col-lg-4 col-xl-3 col-xxl-4  ">
                                    <input type="number" class="form-control text-center inputPrecio" name="precio" min="1" max="100">
                                    <div class="invalid-feedback">Precio entre 1-100€</div>
                                </div>
                            </div>
                        </div>

                        <!-- Columna edad  -->
                        <div class="col-12">
                            <p class="h5">Edad: </p>
                            <div class="row text-center row-gap-2 mt-3 contenedorBotones">
                                <div class="col-6 ">

                                    <!-- button cachorro  -->
                                    <button class="btn btn-light  px-3 px-lg-3 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/cachorro.jpg" alt="Icono cachorro">
                                        <p class="my-0"> Cachorro</p>
                                        <input type="checkbox" class="inputCachorro mouseOver" name="cachorro" value="1">
                                    </button>
                                </div>

                                <!-- button adulto  -->

                                <div class="col-6">
                                    <button class="btn btn-light  px-4 px-lg-4 position-relative  border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/perroadulto.jpg" alt="Icono perro adulto">
                                        <p class="my-0"> Adulto </p>
                                        <input type="checkbox" class="inputAdulto mouseOver" name="adulto" value="1">
                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Columna tamaño -->
                        <div class="col-12">
                            <p class=" h5">Tamaño: </p>
                            <div class="d-flex  flex-column flex-wrap text-center row-gap-4 mt-3 contenedorBotones">

                                <!-- button perro toy -->
                                <div class="col-auto d-grid">
                                    <button class="btn btn-light  position-relative border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/toy.png" alt="Icono cachorro">
                                        <p class="my-0 fw-semibold"> Toy</p>
                                        <p class="my-0 text-nowrap"> Menos 5Kg</p>
                                        <input type="checkbox" class="inputToy mouseOver" name="perrotoy" value="1">
                                    </button>
                                </div>


                                <!-- button perro pequeño  -->
                                <div class="col-auto d-grid">
                                    <button class="btn btn-light position-relative border inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/pequeño.png" alt="Icono cachorro">
                                        <p class="my-0 fw-semibold"> Pequeño</p>
                                        <p class="my-0 text-nowrap">5-10Kg</p>
                                        <input type="checkbox" class="inputPequeno mouseOver" name="perropequeno" value="1">
                                    </button>
                                </div>

                                <!-- button perro mediano -->
                                <div class="col-auto d-grid">
                                    <button class="btn btn-light   position-relative border inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/mediano.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Mediano </p>
                                        <p class="my-0 text-nowrap">10-25Kg</p>
                                        <input type="checkbox" class="inputMediano mouseOver" name="perromediano" value="1">
                                    </button>
                                </div>

                                <!-- button perro grande -->
                                <div class="col-auto d-grid">
                                    <button class="btn btn-light  position-relative border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/grande.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Grande </p>
                                        <p class="my-0 text-nowrap">25-40Kg</p>
                                        <input type="checkbox" class="inputGrande mouseOver" name="perrogrande" value="1">

                                    </button>
                                </div>

                                <!-- button perro gigante -->
                                <div class="col-auto d-grid">
                                    <button class="btn btn-light  position-relative border  inputBtn" type="button">
                                        <img class="" src="<?= BASE_URL ?>app/assets/iconos/enorme.png" alt="Icono perro enorme">
                                        <p class="my-0 fw-semibold"> Enorme </p>
                                        <p class="my-0 text-nowrap"> Más 40Kg</p>
                                        <input type="checkbox" class="inputEnorme mouseOver" name="perroenorme" value="1">

                                    </button>
                                </div>
                            </div>
                        </div>

                        <!-- Acordeon condiciones de la vivienda -->
                        <div class="col-12 mt-3">
                            <div class="accordion" id="acordeonVivienda2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloUno2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoUno2" aria-expanded="false" aria-controls="colapsadoUno2">
                                            <h5>Condiciones de la vivienda</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoUno2" class="accordion-collapse collapse" aria-labelledby="tituloUno" data-bs-parent="#acordeonVivienda">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- Tiene jardin o terraza  -->

                                            <div class="form-check my-1">
                                                <input class="form-check-input checkJardin mouseOver" type="checkbox" name="jardin" value="1" id="vivienda1Check1">
                                                <label class="form-check-label mouseOver" for="vivienda1Check1">
                                                    Tiene jardín o terraza
                                                </label>
                                            </div>

                                            <!-- Es casa de no fumadores  -->
                                            <div class="form-check">
                                                <input class="form-check-input checkFumadores mouseOver" type="checkbox" name="fumadores" value="1" id="vivienda1Check2">
                                                <label class="form-check-label mouseOver" for="vivienda1Check2">
                                                    Casa de no fumadores
                                                </label>
                                            </div>

                                            <!-- La mascota puede subirse a la cama  -->
                                            <div class="form-check">
                                                <input class="form-check-input checkCama mouseOver" type="checkbox" name="cama" value="1" id="vivienda2Check3">
                                                <label class="form-check-label mouseOver" for="vivienda2Check3">
                                                    Pueden subir a la cama
                                                </label>
                                            </div>

                                            <!-- Pueden subir a los muebles  -->
                                            <div class="form-check">
                                                <input class="form-check-input checkMuebles mouseOver" type="checkbox" name="muebles" value="1" id="vivienda1Check4">
                                                <label class="form-check-label mouseOver" for="vivienda1Check4">
                                                    Pueden subir a los muebles
                                                </label>
                                            </div>

                                            <!-- Inputs radios del tamaño de la casa  -->
                                            <!-- Pequeña  -->
                                            <div class="form-check form-check-inline mt-3">
                                                <input class="form-check-input radioPequena mouseOver" type="radio" name="tamanocasa" id="tamaño11" value="P">
                                                <label class="form-check-label mouseOver" for="tamaño12">Pequeña (24-45m2)</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input radioMediana mouseOver" type="radio" name="tamanocasa" id="tamaño21" value="M">
                                                <label class="form-check-label mouseOver" for="tamaño21">Mediana (50-75m2)</label>
                                            </div>
                                            <div class="form-check form-check-inline">
                                                <input class="form-check-input radioGrande mouseOver" type="radio" name="tamanocasa" id="tamaño31" value="G">
                                                <label class="form-check-label mouseOver" for="tamaño31">Grande (> 80m2)</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <!-- Acordeon de niños en casa -->
                        <div class="col-12">
                            <div class="accordion acordeonNinos" id="acordeonNiños2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloDos2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoDos2" aria-expanded="false" aria-controls="colapsadoDos2">
                                            <h5>Niños en Casa</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoDos2" class="accordion-collapse collapse" aria-labelledby="tituloDos" data-bs-parent="#acordeonNiños">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- No hay niños  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input noNinosCheck mouseOver" type="checkbox" value="1" id="niños1Check1" name="ninos">
                                                <label class="form-check-label mouseOver " for="niños1Check1">
                                                    No hay niños
                                                </label>
                                            </div>

                                            <!-- Niños menos de 12 años -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input ninosMenosCheck mouseOver" type="checkbox" value="1" id="niños1Check2" name="ninosmenos">
                                                <label class="form-check-label mouseOver" for="niños1Check2">
                                                    Hay niños menores de 12 años
                                                </label>
                                            </div>

                                            <!-- Niños más de 12 años  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input ninosMasCheck mouseOver" type="checkbox" value="1" id="niños1Check3" name="ninosmas">
                                                <label class="form-check-label mouseOver" for="niños1Check3">
                                                    Hay niños mayores de 12 años
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon de otras mascotas en casa -->
                        <div class="col-12">
                            <div class="accordion" id="acordeonMascotas2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloTres2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoTres2" aria-expanded="false" aria-controls="colapsadoTres2">
                                            <h5>Otras mascotas en casa</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoTres2" class="accordion-collapse collapse" aria-labelledby="tituloTres2" data-bs-parent="#acordeonMascotas2">
                                        <div class="accordion-body">

                                            <!-- Hay perros -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkHayPerros mouseOver" type="checkbox" value="1" id="mascotas1Check2" name="hayperros">
                                                <label class="form-check-label mouseOver" for="mascotas1Check2">
                                                    Hay perros
                                                </label>
                                            </div>

                                            <!-- Hay gatos -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkHayGatos mouseOver" type="checkbox" value="1" id="mascotas1Check3" name="haygatos">
                                                <label class="form-check-label mouseOver" for="mascotas1Check3">
                                                    Hay gatos
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon de esterilizacion-->
                        <div class="col-12">
                            <div class="accordion" id="acordeonEsterilizacion2">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloCuatro2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCuatro2" aria-expanded="false" aria-controls="colapsadoCuatro2">
                                            <h5>Esterilizacion</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoCuatro2" class="accordion-collapse collapse" aria-labelledby="tituloCuatro2" data-bs-parent="#acordeonEsterilizacion">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <div class="form-check my-1">
                                                <input class="form-check-input checkPerroCastr mouseOver" type="checkbox" value="1" id="esterilizacionCheck11" name="perroscastr">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck11">
                                                    Acepta perros no castrados
                                                </label>
                                            </div>

                                            <!-- Perras no esterilizadas  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkPerraEster mouseOver" type="checkbox" value="1" id="esterilizacionCheck21" name="perrasester">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck21">
                                                    Acepta perras no esterilizadas
                                                </label>
                                            </div>

                                            <!-- Gatos no castrados  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkGatoCastr mouseOver" type="checkbox" value="1" id="esterilizacionCheck31" name="gatoscastr">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck31">
                                                    Acepta gatos no castrados
                                                </label>
                                            </div>

                                            <!-- Gatas no esterilizadas  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkGataEster mouseOver" type="checkbox" value="1" id="esterilizacionCheck41" name="gatasester">
                                                <label class="form-check-label mouseOver" for="esterilizacionCheck41">
                                                    Acepta gatas no esterilizadas
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Acordeon habilidades del cuidador -->
                        <div class="col-12">
                            <div class="accordion" id="acordeon2Habilidades">
                                <div class="accordion-item">
                                    <div class="accordion-header" id="tituloCinco2">
                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCinco2" aria-expanded="false" aria-controls="colapsadoCinco2">
                                            <h5>Habilidades del cuidador</h5>
                                        </button>

                                    </div>
                                    <div id="colapsadoCinco2" class="accordion-collapse collapse" aria-labelledby="tituloCinco2" data-bs-parent="#acordeon2Habilidades">
                                        <div class="accordion-body">
                                            <!-- Checkboxs  -->

                                            <!-- Tiene coche  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkCoche mouseOver" type="checkbox" value="1" id="habilidadesCheck11" name="coche">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck11">
                                                    Tiene coche para trasladar a las mascotas
                                                </label>
                                            </div>

                                            <!-- Mediacion oral  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkMedOral mouseOver" type="checkbox" value="1" id="habilidadesCheck21" name="medoral">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck21">
                                                    Puede administrar medicación oral
                                                </label>
                                            </div>

                                            <!-- Medicación inyectada  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkMedInyec mouseOver" type="checkbox" value="1" id="habilidadesCheck31" name="medinyec">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck31">
                                                    Puede administrar mediación inyectada
                                                </label>
                                            </div>


                                            <!-- Ofrecer ejercicio  -->
                                            <div class="form-check my-1">
                                                <input class="form-check-input checkEjercicio mouseOver" type="checkbox" value="1" id="habilidadesCheck41" name="ejercicio">
                                                <label class="form-check-label mouseOver" for="habilidadesCheck41">
                                                    Puede ofrecer ejercicio diario
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </form>
                </div>
                <div class="modal-footer bg-body-secondary border-0 ">
                    <button type="button" class="btn btn-secondary fw-semibold px-4 btnLimpiar" data-bs-dismiss="modal">Limpiar</button>
                    <button type="submit" class="btn btn-info fw-semibold px-4 btnFiltrar" form="formFiltrarModal" data-bs-dismiss="modal">Filtrar</button>
                </div>
            </div>
        </div>
    </div>




    <script src="<?= BASE_URL; ?>app/vistas/js/ClassUsuario.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassCuidador.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassMascota.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassFuncUsuarios.js"></script>
    <script src="<?= BASE_URL; ?>app/vistas/js/ClassBuscarCuidador.js"></script>
    <script>
        addEventListener("DOMContentLoaded", function() {
            let parametros = {}
            <?php
            if (isset($_SESSION["filtros"])) {
                foreach ($_SESSION["filtros"] as $clave => $valor) {
            ?>
                    if (<?= $valor; ?> != 0)
                        parametros[decodeURI('<?= $clave; ?>')] = decodeURI('<?= $valor; ?>')

            <?php }
            }  ?>
            var buscarCuidador = new BuscarCuidador(parametros);
            // guardar parametros en variable js


        })
    </script>