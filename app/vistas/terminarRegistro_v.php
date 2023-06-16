<?php

?>

<main id="wrapperRegistro" class="flex-grow-1 d-flex flex-column align-items-center">

    <div class="container ">
        <div class="col-12 col-sm-12 col-lg-9 col-xxl-7 mx-auto  my-5">

            <form class="row justify-content-center rounded p-sm-5 row-gap-4  needs-validation py-5" action="" novalidate>
                <!-- título  -->
                <div class="row text-capitalize px-0">
                    <p class="h2">Los Propietarios Necesitan Saber:</p>
                </div>

                <!-- fila sevicios que quiere ofrecer  -->
                <section class="row align-items-center row-gap-3 justify-content-center px-0 elegir" id="servicios" data-fila="servicios">
                    <p class="h5">Servicios que ofreces: <code>*</code>
                        <input type="hidden" class="form-control">
                        <span class="invalid-feedback my-2">Debes elegir al menos una opción</span>
                    </p>



                    <div class="col-5 text-end">
                        <input type="checkbox" class="btn-check" name="servicio1" value="1" id="btn-alojamiento" autocomplete="off">
                        <label class="btn btn-outline-secondary w-75 mouseOver" for="btn-alojamiento" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/housenight.png" alt="Icono alojamiento">
                            <p class="fw-semibold"> Alojamiento</p>
                        </label>
                    </div>
                    <div class="col-7" id="preciosAlojamiento">
                        <div class="row justify-content-center row-gap-sm-3  align-items-center precios">
                            <div class="col-8 col-sm-8 col-lg-8 text-center text-nowrap">
                                <label for="precioAloja" class="col-6 col-form-label mouseOver">Precio:</label>
                            </div>
                            <div class="col-8 col-sm-4 col-lg-4 px-0">
                                <input type="number" class="form-control text-center" id="precioAloja" name="precio1" min="1" max="100" required disabled>
                                <div class="invalid-feedback">Precio entre 1-100€</div>
                            </div>
                            <div class="col-8 col-sm-8 col-lg-8 text-center ">
                                <label for="transAloja" class="col-6 col-form-label mouseOver">Transporte:</label>
                            </div>
                            <div class="col-8 col-sm-4 col-lg-4 px-0">
                                <input type="number" class="form-control text-center" id="transAloja" name="trans1" min="1" max="50" disabled>
                                <div class="invalid-feedback">Precio entre 1-50€</div>
                            </div>

                        </div>
                    </div>


                    <div class="col-5 text-end">
                        <input type="checkbox" class="btn-check" name="servicio2" value="2" id="btn-guarderia" autocomplete="off">
                        <label class="btn btn-outline-secondary w-75 mouseOver" for="btn-guarderia" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/houseday.png" alt="Icono guardería">
                            <p class="fw-semibold"> Guardería</p>
                        </label>

                    </div>
                    <div class="col-7" id="preciosGuarderia">
                        <div class="row justify-content-center row-gap-sm-3  align-items-center precios">
                            <div class="col-8 col-sm-8 col-lg-8 text-center text-nowrap">
                                <label for="precioGuard" class="col-6 col-form-label mouseOver">Precio:</label>
                            </div>
                            <div class="col-8 col-sm-4 col-lg-4 px-0">
                                <input type="number" class="form-control text-center" id="precioGuard" name="precio2" min="1" max="100" required disabled>
                                <div class="invalid-feedback">Precio entre 1-100€</div>
                            </div>



                            <div class="col-8 col-sm-8 col-lg-8 text-center ">
                                <label for="transGuard" class="col-6 col-form-label mouseOver">Transporte:</label>
                            </div>
                            <div class="col-8 col-sm-4 col-lg-4 px-0">
                                <input type="number" class="form-control text-center" id="transGuard" name="trans2" min="1" max="50" disabled>
                                <div class="invalid-feedback">Precio entre 1-50€</div>
                            </div>

                        </div>
                    </div>

                    <div class="col-5 text-end">
                        <input type="checkbox" class="btn-check" name="servicio3" value="3" id="btn-paseo" autocomplete="off">
                        <label class="btn btn-outline-secondary w-75 mouseOver" for="btn-paseo" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/paseo.png" alt="Icono paseo">
                            <p class="fw-semibold"> Paseo</p>
                        </label>
                    </div>
                    <div class="col-7" id="preciosPaseo">
                        <div class="row justify-content-center row-gap-3 align-items-center precios">
                            <div class="col-8 col-sm-8 col-lg-8 text-center text-nowrap">
                                <label for="precioPas" class="col-6 col-form-label mouseOver">Precio:</label>
                            </div>
                            <div class="col-8 col-sm-4 col-lg-4 px-0">
                                <input type="number" class="form-control text-center" id="precioPas" name="precio3" min="1" max="100" required disabled>
                                <div class="invalid-feedback">Precio entre 1-100€</div>
                            </div>

                        </div>

                    </div>


                </section>

                <!-- tipo de mascotas que quiere cuidar  -->
                <section class="row align-items-center row-gap-3 justify-content-center px-0 elegir" id="tipoMascota" data-fila="tipoMascota">
                    <p class="h5">Tipo mascotas que deseas cuidar: <code>*</code>
                        <input type="hidden" class="form-control">
                        <span class="invalid-feedback my-2">Debes elegir al menos una opción</span>
                    </p>


                    <!-- button perro  -->
                    <div class="col-6 text-center">
                        <input type="checkbox" class="btn-check" name="cuidperro" value="1" id="btn-perro" autocomplete="off">
                        <label class="btn btn-outline-secondary w-50 mouseOver" for="btn-perro" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/perro.png" alt="Icono perro">
                            <p class="fw-semibold m-0"> Perro</p>
                        </label>
                    </div>


                    <!-- button gato  -->
                    <div class="col-6 text-center">
                        <input type="checkbox" class="btn-check" name="cuidgato" value="1" id="btn-gato" autocomplete="off">
                        <label class="btn btn-outline-secondary w-50 mouseOver" for="btn-gato" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/gato.png" alt="Icono gato">
                            <p class="fw-semibold m-0"> Gato </p>
                        </label>

                    </div>

                </section>



                <!-- Columna edad  -->
                <section class="row align-items-center row-gap-3 justify-content-center px-0 elegir" id="edad" data-fila="edad">
                    <p class=" h5">Edad: <code>*</code>
                        <input type="hidden" class="form-control">
                        <span class="invalid-feedback">Debes elegir al menos una opción</span>
                    </p>

                    <div class="col-6 text-center ">

                        <!-- button cachorro  -->
                        <input type="checkbox" class="btn-check" name="cachorro" value="1" id="btn-cachorro" autocomplete="off">
                        <label class="btn btn-outline-secondary w-50 mouseOver" for="btn-cachorro" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/cachorro.jpg" alt="Icono cachorro">
                            <p class="my-0"> Cachorro</p>
                        </label>


                    </div>

                    <!-- button adulto  -->
                    <div class="col-6  text-center">
                        <input type="checkbox" class="btn-check" name="adulto" value="1" id="btn-adulto" autocomplete="off">
                        <label class="btn btn-outline-secondary w-50 mouseOver" for="btn-adulto" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/perroadulto.jpg" alt="Icono perro adulto">
                            <p class="my-0"> Adulto </p>
                        </label>
                    </div>

                </section>

                <!-- Columna tamaño -->
                <section class="row  flex-column flex-sm-row flex-wrap row-gap-3 column-gap-3 justify-content-around px-0 elegir" id="tamano" data-fila="tamano">
                    <p class=" h5">Tamaño: <code>*</code>
                        <input type="hidden" class="form-control">
                        <span class="invalid-feedback my-2">Debes elegir al menos una opción</span>
                    </p>


                    <!-- button perro toy -->
                    <div class="col-auto d-grid">
                        <input type="checkbox" class="btn-check" name="perrotoy" value="1" id="btn-toy" autocomplete="off">
                        <label class="btn btn-outline-secondary mouseOver" for="btn-toy" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/toy.png" alt="Icono toy">
                            <p class="my-0 fw-semibold"> Toy</p>
                            <p class="my-0 text-nowrap"> Menos 5Kg</p>
                        </label>
                    </div>

                    <!-- button perro pequeño  -->
                    <div class="col-auto d-grid">
                        <input type="checkbox" class="btn-check" name="perropequeno" value="1" id="btn-pequeno" autocomplete="off">
                        <label class="btn btn-outline-secondary mouseOver" for="btn-pequeno" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/pequeño.png" alt="Icono pequeño">
                            <p class="my-0 fw-semibold"> Pequeño</p>
                            <p class="my-0 text-nowrap">10-25Kg</p>
                        </label>
                    </div>

                    <!-- button perro mediano -->
                    <div class="col-auto d-grid">
                        <input type="checkbox" class="btn-check" name="perromediano" value="1" id="btn-mediano" autocomplete="off">
                        <label class="btn btn-outline-secondary mouseOver" for="btn-mediano" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/mediano.png" alt="Icono perro mediano">
                            <p class="my-0 fw-semibold"> Mediano </p>
                            <p class="my-0 text-nowrap">10-25Kg</p>
                        </label>
                    </div>

                    <!-- button perro grande -->
                    <div class="col-auto d-grid">
                        <input type="checkbox" class="btn-check" name="perrogrande" value="1" id="btn-grande" autocomplete="off">
                        <label class="btn btn-outline-secondary mouseOver" for="btn-grande" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/grande.png" alt="Icono perro grande">
                            <p class="my-0 fw-semibold"> Grande </p>
                            <p class="my-0 text-nowrap">25-40Kg</p>
                        </label>
                    </div>

                    <!-- button perro enorme -->
                    <div class="col-auto d-grid">
                        <input type="checkbox" class="btn-check" name="perroenorme" value="1" id="btn-enorme" autocomplete="off">
                        <label class="btn btn-outline-secondary mouseOver" for="btn-enorme" style="--bs-btn-color: dark">
                            <img class="" src="<?= BASE_URL ?>app/assets/iconos/enorme.png" alt="Icono perro enorme">
                            <p class="my-0 fw-semibold"> Enorme </p>
                            <p class="my-0 text-nowrap"> Más 40Kg</p>
                        </label>
                    </div>



                </section>

                <!--  descripción personalizada del cuidador -->
                <div class="row align-items-center row-gap-3 justify-content-center px-0 elegir" id="descripcion">
                    <p class=" h5">Sobre ti: <code>*</code>
                        <input type="hidden" class="form-control">

                    </p>

                    <div class="form-floating  p-0">
                        <textarea class="form-control" name="descripcion" id="floatingTextarea" style="height: 200px" maxlength="700" required></textarea>
                        <label for="floatingTextarea" class="mouseOver">Describete y destaca porque debería obtener tus servicios</label>
                        <div class="invalid-feedback">¡Para los propietarios es muy importante que te describas-!</div>
                    </div>

                </div>
                <!-- Acordeon condiciones de la vivienda -->
                <div class="row align-items-center row-gap-4 justify-content-center px-0 elegir mt-4">

                    <div class="accordion " id="acordeonVivienda">
                        <div class="accordion-item border border-0">
                            <div class="accordion-header" id="tituloUno">
                                <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoUno" aria-expanded="false" aria-controls="colapsadoUno">
                                    <h5>Condiciones de la vivienda</h5>
                                </button>

                            </div>
                            <div id="colapsadoUno" class="accordion-collapse collapse" aria-labelledby="tituloUno" data-bs-parent="#acordeonVivienda">
                                <div class="accordion-body">
                                    <!-- Checkboxs  -->

                                    <!-- Tiene jardin o terraza  -->

                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="jardin" value="1" id="viviendaCheck1">
                                        <label class="form-check-label mouseOver" for="viviendaCheck1">
                                            Tiene jardín o terraza
                                        </label>
                                    </div>

                                    <!-- Es casa de no fumadores  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="fumadores" value="1" id="viviendaCheck2">
                                        <label class="form-check-label mouseOver" for="viviendaCheck2">
                                            Casa de no fumadores
                                        </label>
                                    </div>

                                    <!-- La mascota puede subirse a la cama  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="cama" value="1" id="viviendaCheck3">
                                        <label class="form-check-label mouseOver" for="viviendaCheck3">
                                            Pueden subir a la cama
                                        </label>
                                    </div>

                                    <!-- Pueden subir a los muebles  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" name="muebles" value="1" id="viviendaCheck4">
                                        <label class="form-check-label mouseOver" for="viviendaCheck4">
                                            Pueden subir a los muebles
                                        </label>
                                    </div>

                                    <!-- Inputs radios del tamaño de la casa  -->
                                    <!-- Pequeña  -->
                                    <div class="form-check form-check-inline mt-3">
                                        <input class="form-check-input" type="radio" name="tamanocasa" id="tamaño1" value="P">
                                        <label class="form-check-label mouseOver" for="tamaño1">Pequeña (24-45m2)</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="tamanocasa" id="tamaño2" value="M">
                                        <label class="form-check-label" for="tamaño2">Mediana (50-75m2)</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="tamanocasa" id="tamaño3" value="G">
                                        <label class="form-check-label mouseOver" for="tamaño3">Grande (> 80m2)</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Acordeon de niños en casa -->
                <div class="row align-items-center row-gap-4 justify-content-center px-0 elegir">
                    <div class="accordion" id="acordeonNiños">
                        <div class="accordion-item border border-0">
                            <div class="accordion-header" id="tituloDos">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoDos" aria-expanded="false" aria-controls="colapsadoDos">
                                    <h5>Niños en Casa</h5>
                                </button>

                            </div>
                            <div id="colapsadoDos" class="accordion-collapse collapse" aria-labelledby="tituloDos" data-bs-parent="#acordeonNiños">
                                <div class="accordion-body">
                                    <!-- Checkboxs  -->

                                    <!-- No hay niños  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="ninosCheck1" name="noninos">
                                        <label class="form-check-label mouseOver" for="ninosCheck1">
                                            No hay niños
                                        </label>
                                    </div>

                                    <!-- Niños menos de 12 años -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="ninosCheck2" name="ninosmenos">
                                        <label class="form-check-label mouseOver" for="ninosCheck2">
                                            Hay niños menores de 12 años
                                        </label>
                                    </div>

                                    <!-- Niños más de 12 años  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="ninosCheck3" name="ninosmas">
                                        <label class="form-check-label mouseOver" for="ninosCheck3">
                                            Hay niños mayores de 12 años
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Acordeon de otras mascotas en casa -->
                <div class="row align-items-center row-gap-4 justify-content-center px-0 elegir">
                    <div class="accordion" id="acordeonMascotas">
                        <div class="accordion-item border border-0">
                            <div class="accordion-header" id="tituloTres">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoTres" aria-expanded="false" aria-controls="colapsadoTres">
                                    <h5>Otras mascotas en casa</h5>
                                </button>

                            </div>
                            <div id="colapsadoTres" class="accordion-collapse collapse" aria-labelledby="tituloTres" data-bs-parent="#acordeonMascotas">
                                <div class="accordion-body">
                                    <!-- Checkboxs  -->

                                    <!--       Hay perros -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="mascotasCheck2" name="hayperros">
                                        <label class="form-check-label mouseOver" for="mascotasCheck2">
                                            Hay perros
                                        </label>
                                    </div>

                                    <!--     Hay gatos -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="mascotasCheck3" name="haygatos">
                                        <label class="form-check-label mouseOver" for="mascotasCheck3">
                                            Hay gatos
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Acordeon de esterilizacion-->
                <div class="row align-items-center row-gap-4 justify-content-center px-0 elegir">
                    <div class="accordion" id="acordeonEsterilizacion">
                        <div class="accordion-item border border-0">
                            <div class="accordion-header" id="tituloCuatro">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCuatro" aria-expanded="false" aria-controls="colapsadoCuatro">
                                    <h5>Esterilizacion</h5>
                                </button>

                            </div>
                            <div id="colapsadoCuatro" class="accordion-collapse collapse" aria-labelledby="tituloCuatro" data-bs-parent="#acordeonEsterilizacion">
                                <div class="accordion-body">
                                    <!-- Checkboxs  -->

                                    <!-- Perros no castrados  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="esterilizacionCheck1" name="perroscastr">
                                        <label class="form-check-label mouseOver" for="esterilizacionCheck1">
                                            Acepta perros no castrados
                                        </label>
                                    </div>

                                    <!-- Perras no esterilizadas  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="esterilizacionCheck2" name="perrasester">
                                        <label class="form-check-label mouseOver" for="esterilizacionCheck2">
                                            Acepta perras no esterilizadas
                                        </label>
                                    </div>

                                    <!-- Gatos no castrados  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="esterilizacionCheck3" name="gatoscastr">
                                        <label class="form-check-label mouseOver" for="esterilizacionCheck3">
                                            Acepta gatos no castrados
                                        </label>
                                    </div>

                                    <!-- Gatas no esterilizadas  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="esterilizacionCheck4" name="gatasester">
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
                <div class="row align-items-center row-gap-4 justify-content-center px-0 elegir">
                    <div class="accordion" id="acordeonHabilidades">
                        <div class="accordion-item border border-0">
                            <div class="accordion-header" id="tituloCinco">
                                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colapsadoCinco" aria-expanded="false" aria-controls="colapsadoCinco">
                                    <h5>Habilidades del cuidador</h5>
                                </button>

                            </div>
                            <div id="colapsadoCinco" class="accordion-collapse collapse" aria-labelledby="tituloCinco" data-bs-parent="#acordeonHabilidades">
                                <div class="accordion-body">
                                    <!-- Checkboxs  -->

                                    <!-- Tiene coche  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="habilidadesCheck1" name="coche">
                                        <label class="form-check-label mouseOver" for="habilidadesCheck1">
                                            Tiene coche para trasladar a las mascotas
                                        </label>
                                    </div>

                                    <!-- Mediacion oral  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="habilidadesCheck2" name="medoral">
                                        <label class="form-check-label mouseOver" for="habilidadesCheck2">
                                            Puede administrar medicacion oral
                                        </label>
                                    </div>

                                    <!-- Medicación inyectada  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="habilidadesCheck3" name="medinyec">
                                        <label class="form-check-label mouseOver" for="habilidadesCheck3">
                                            Puede administrar mediación inyectada
                                        </label>
                                    </div>



                                    <!-- Ofrecer ejercicio  -->
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="1" id="habilidadesCheck5" name="ejercicio">
                                        <label class="form-check-label mouseOver" for="habilidadesCheck5">
                                            Puede ofrecer ejercicio diario
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="error text-danger-emphasis fs-6 fw-bold d-none">Error inesperado al intentar crear el
                    usuario, inténtelo de
                    nuevo</div>
                <div class="text-center ">
                    <button class="btn btn-success fs-5" type="submit">Continuar</button>
                </div>
            </form>
        </div>
    </div>
    <script>
        // el usuario se guarda en session pero por seguridad se vuelve a establecer manualmente
        <?php if (isset($_SESSION["usuario"])) { ?>
            addEventListener("DOMContentLoaded", function() {
                funcDefault.setUsuarioLogin("<?= $_SESSION["usuario"] ?>")
            })
        <?php } ?>
    </script>
    <script src="<?= BASE_URL; ?>app/vistas/js/terminarRegistro.js"></script>