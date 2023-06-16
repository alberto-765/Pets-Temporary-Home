class Reservar {
    contenedorMascotas // contenedor donde se incluirán las mascotas
    contenedorServicios // contenedor donde se incluirán los servicios
    idCuidador // id del usuario obtenidi de la url
    cuidador // clase del cuidador obtenida por session
    formularioReservar
    spinnerFechas // spinner del apartado de fechas
    diasDisponibles // contenedor dias
    annadirDia // elemento para annadir un nuevo dia
    spinnerFactura // spinner del apartado de facturas
    tablaFacturas // tabla con la factura
    checkTrasnsporte // check recogida de mascota
    idmascotaSeleccionada // mascota seleccionada para la reserva

    // botones de los servicio
    btnServicios = document.querySelectorAll(".servicio")

    // inputs de fecha de entrega
    inputsDesde
    inputsHasta

    // flujo reserva donde se guardan dias de los servicios, factura de cada servicio
    flujoReserva

    serviciosActuales // servicios actuales obtenidos de BBDD
    constructor() {
        funcDefault.mostrarSpinner()
        funcDefault.cambiarEstiloFooter()

        // asignacion elementos del DOM
        this.contenedorMascotas = document.getElementById("contenedorMascotas");
        this.contenedorServicios = document.getElementById("servicios")
        this.formularioReservar = document.querySelector("form")
        this.spinnerFactura = document.querySelector("#spinnerFactura")
        this.diasDisponibles = document.querySelector("#diasDisponibles")
        this.annadirDia = document.querySelector("#annadirDia")
        this.spinnerFechas = document.querySelector("#spinnerFechas")
        this.tablaFacturas = document.querySelector("#tablaFacturas")
        this.checkTrasnsporte = document.querySelector("#checkTrasnsporte")

        this.idCuidador = location.href.split("/").slice(-1)[0]

        this.obtenerCuidador()

        // crear flujo default si no existe en session
        this.crearFlujoReservaDefault()

        this.rellenarTodaInformacion()
        funcDefault.ocultarSpinner()
    }

    // rellenar toda la información de la página
    rellenarTodaInformacion() {
        this.obtenerServiciosActuales()
        this.insertar_Nom()
        this.anadirServicios()
        this.recorrerMascotas()
        this.eventoBtnServicio()
        this.eventoAnnadirNuevoRowDia()
        this.eventoSubmit()
        this.eventoCheckTrasnsporte()
        this.eventoSeleccionarMascota()
    }

    // obtener cuidador de session
    obtenerCuidador() {
        let usuarios = JSON.parse(sessionStorage.getItem("flujoCuidadores"))

        // si flujoCuidaodres no existe o no está cuidador volver a url prev
        if (!usuarios || !usuarios[this.idCuidador]) {
            funcDefault.redirigir("prevurl")
        } else {
            this.cuidador = new Cuidador(usuarios[this.idCuidador])
        }
    }

    // EVENTO SUBMIT
    eventoSubmit() {

        this.formularioReservar.addEventListener("submit", function (e) {
            e.preventDefault()
            e.stopPropagation()

            // asignar clase de validación si algún campo no es correcto
            if (!e.target.checkValidity()) {
                e.target.classList.add('was-validated')
            } else {

                funcDefault.mostrarSpinner()
                // realizar la reserva de todos los dias
                const url = base_url + "Propietarios_c/realizarReservas"

                // Creación del formData 
                const formData = new FormData(e.target)
                formData.append("flujoReserva", JSON.stringify(this.flujoReserva))
                formData.append("propietario", funcUsuarios.usuario.idusuario)
                formData.append("cuidador", JSON.stringify(this.cuidador))

                // se elimina todo el flujo de dias del servicio que se ha reservado y se redirige a reservas
                this.flujoReserva.diasServicios[this.flujoReserva.servicio] = {
                    dia0: {
                        fechaEntrega: "",
                        fechaRecogida: "",
                        transporte: false,
                        precioTotal: 0,
                        diaValido: false
                    },
                }
                this.setFlujoReserva(this.flujoReserva)

                // si todas las reservas se han hecho correctamente
                if (funcDefault.llamadaAJAXAsync(url, formData) == true) {
                    funcDefault.redirigir("Propietarios_c/reservas")
                } else {
                    funcDefault.ocultarSpinner()
                    funcDefault.mostrarPopUpError("<div>Ha surgido un error al reservar, inténtelo de nuevo </div>")
                }
            }
        }.bind(this))
    }


    // insertar el nombre
    insertar_Nom() {
        // insertar nombre
        $(".nombreCuidador").text(this.cuidador.apenom)
    }

    // recorrer las mascotas e incluirlas en el contenedor
    recorrerMascotas(reescribir = false) {
        let cadena = "";

        // si hay mascotas
        if (funcUsuarios.usuario.mascotas.length > 0) {
            for (let mascota of funcUsuarios.usuario.mascotas) {
                cadena += `<div class="form-check fs-6 my-2 mouseOver"><input class="form-check-input inputMascota mouseOver" type="radio" name="idmascota" value="${mascota.idmascota}" id="${mascota.nombre}_${mascota.dueno}"  required><label class="form-check-label labelInputMascota mouseOver" for="${mascota.nombre}_${mascota.dueno}">${mascota.nombre}</label><div class="invalid-feedback">Debes seleccionar una mascota</div></div>`
            }
            // crear mascota propietario
            cadena += `<a class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10 mb-5 lead link-info text-decoration-none fw-normal mouseOver" id="enlaceAnnadirMascota"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añadir otra mascota</span></a>`;
            this.introducirMascota(cadena, reescribir);
        } else {
            let cadena = `
              <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-11 fs-5 text-muted"><i class="bi bi-emoji-smile"></i> ¡UPS! ¡Parece que no tienes mascotas! <i class="bi bi-emoji-smile-upside-down"></i></div>`;
            cadena += ` <a class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-11 mt-4 lead link-info text-decoration-none fw-normal mouseOver" id="enlaceAnnadirMascota"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añade a tu primera mascota </span></a>`;

            this.introducirMascota(cadena, reescribir);
        }


        // evento para cuando se haga click abrir ventana 
        document.querySelector("#enlaceAnnadirMascota").addEventListener("click", function (e) {
            const nuevaVentana = open(`${base_url}Propietarios_c/crearMascota`, 'NuevaVentana', `width=${screen.width}, height=${screen.height}, Resizable=no, `)
            // enviar mensaje a la nueva ventana
            setTimeout(function () {
                nuevaVentana.postMessage('Mensaje desde la ventana principal', nuevaVentana.location.href);
            }, 1000)

            // evento para cuanddo se vuelva a la ventana, si la nueva ventana esta cerrada se actualizan las mascotas
            $(window).one("focus", miFuncion.bind(this))
            function miFuncion(e) {
                if (nuevaVentana && nuevaVentana.closed) {
                    funcUsuarios.usuario.obtenerYGuardarMascotasSession()
                    this.recorrerMascotas(true)
                }
            }
        }.bind(this))
    }

    // introduce la cadena formada al contenedor mascotas
    introducirMascota(cadena, reescribir) {
        if (reescribir) {
            this.contenedorMascotas.innerHTML = cadena;
        } else {
            this.contenedorMascotas.innerHTML += cadena;
        }
    }

    // añadir los radios de los servicios disponibles 
    anadirServicios() {
        let cadenaTarifas = ""

        // recorrer servicios
        for (let servicio in this.cuidador.servicios) {
            switch (servicio) {

                // añadir si hay alojamiento
                case "Alojamiento":
                    cadenaTarifas += ` <div class="col-4 col-md-3"  title="Botón servicio alojamiento">        <input type="radio" class="btn-check servicio" name="servicio" value="1" id="btn-alojamiento" autocomplete="off" data-precio="${this.cuidador.servicios[servicio].precio}" data-plustransporte="${this.cuidador.servicios[servicio].plustransporte}" required>
                <label class="btn btn-outline-secondary w-100 text-center " for="btn-alojamiento" style="--bs-btn-color: dark">
                    <img class="object-fit-contain" src="${base_url}app/assets/iconos/housenight.png" alt="Icono alojamiento"  style="width: 80px; height: 80px;">
                    <p class="fw-semibold"> Alojamiento</p>
                </label><div class="invalid-feedback">
                Debes seleccionar un servicio
                </div></div>`
                    break

                // añadir si hay guardería
                case "Guardería":
                    cadenaTarifas += ` <div class="col-4 col-md-3"  title="Botón servicio guardería">        <input type="radio" class="btn-check servicio" name="servicio" value="2" id="btn-guarderia" autocomplete="off" data-precio="${this.cuidador.servicios[servicio].precio}" data-plustransporte="${this.cuidador.servicios[servicio].plustransporte}" required>
                <label class="btn btn-outline-secondary w-100 text-center " for="btn-guarderia" style="--bs-btn-color: dark">
                <img class="object-fit-contain" src="${base_url}app/assets/iconos/houseday.png" alt="Guarderia de dia"  style="width: 80px; height: 80px;">                    <p class="fw-semibold"> Guardería</p>
                </label><div class="invalid-feedback">
                Debes seleccionar un servicio
                </div></div>`

                    break

                // añadir si hay paseo
                case "Paseo":
                    cadenaTarifas += ` <div class="col-4 col-md-3"  title="Botón servicio paseo">        <input type="radio" class="btn-check servicio" name="servicio" value="3" id="btn-paseo" autocomplete="off" data-precio="${this.cuidador.servicios[servicio].precio}" data-plustransporte="${this.cuidador.servicios[servicio].plustransporte}" required>
                <label class="btn btn-outline-secondary w-100 text-center " for="btn-paseo" style="--bs-btn-color: dark">
                <img class="object-fit-contain" src="${base_url}app/assets/iconos/paseo.png" alt="Paseo por tu barrio "  style="width: 80px; height: 80px;">                 
                <p class="fw-semibold"> Paseo</p>
                </label><div class="invalid-feedback">
                Debes seleccionar un servicio
                </div></div>`
                    break
            }
        }

        // añadir cadena al contenedor de servicios
        this.contenedorServicios.innerHTML += cadenaTarifas

        // annadir servicios a la clase
        this.btnServicios = document.querySelectorAll(".servicio")
    }


    // cuando cambia la fecha del inputDesde se validará el servicio seleccionado 
    validarFechasInputDesde(inputDesde) {
        // si  hay servicio seleccionado 
        const btnSeleccionado = Array.from(this.btnServicios).find(btn => btn.checked == true)
        const rowDia = inputDesde.closest('.rowDia')
        let inputHasta = rowDia.querySelector(".inputHasta")
        if (btnSeleccionado && btnSeleccionado != null) {

            // 1.9 Si se modifica el inputDesde hay que reajustar el inputHasta dependiendo del servicio, basandose en la nueva fecha
            if (inputDesde.value != "") {
                let validacionDesdePasada = true
                let validacionHastaPasada = true

                // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
                if (btnSeleccionado.id == "btn-alojamiento") {
                    inputHasta.readonly = false
                    inputHasta.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                    inputHasta.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputHasta.min.replace("T", " ")} y estar entre las 07:00 y 23:59`

                    validacionDesdePasada = funcUsuarios.validarFechaAlojamiento(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaAlojamiento(inputHasta)
                    }
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (btnSeleccionado.id == "btn-guarderia") {
                    inputHasta.readonly = false

                    // 1.9 Al cambiar de servicio al inputHasta se le pone la fecha máxima que se puede seleccionar, el usuario decidirá si quiere menos
                    inputHasta.value = funcUsuarios.generarFechaMaxGuarderiaInputHasta(inputDesde.value)
                    inputHasta.max = inputHasta.value

                    // 1.9 La fecha minima hasta será 1 hora mas que fecha desde
                    inputHasta.min = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHasta.min.replace("T", " ")} y ${inputHasta.max.replace("T", " ")}`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
                    }
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (btnSeleccionado.id == "btn-paseo") {
                    // 1.9 La fecha minima y maxima hasta será la misma, 1 hora mas que fecha desde
                    inputHasta.readonly = true

                    inputHasta.value = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHasta.max = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHasta.min = inputHasta.max

                    inputHasta.nextElementSibling.innerText = `El paseo dura siempre una hora, la fecha debe ser ${inputHasta.min.replace("T", " ")}`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
                    }
                }

                if (validacionDesdePasada) {
                    inputHasta.disabled = false
                    inputDesde.classList.remove("is-invalid")
                } else {
                    inputHasta.disabled = true
                    inputHasta.value = ""
                    inputDesde.classList.add("is-invalid")
                    inputHasta.classList.remove("is-invalid")

                    // si inputDesde no es valido el dia pasa a ser invlaido
                    this.resetearRowDiaPorDefecto(rowDia)
                    return
                }

                if (validacionHastaPasada) {
                    inputHasta.classList.remove("is-invalid")

                    // en guarderia y paseo al inputHasta se le pone un valor, por lo que es necesario guardar el nuevoDia en el flujo
                    if (btnSeleccionado.id != "btn-alojamiento") {
                        this.validarFechasInputHasta(inputHasta)
                    }
                } else {
                    inputHasta.classList.add("is-invalid")

                    // 1.10 resetear valores del rowDia
                    this.resetearRowDiaPorDefecto(rowDia)
                }

            } else {

                // si el inputDesde no contiene valor se resetea el inputHasta
                inputHasta.value = ""
                inputHasta.disabled = true
                inputHasta.readonly = false
                inputHasta.classList.remove("is-invalid")

                // 1.10 resetear valores del rowDia
                this.resetearRowDiaPorDefecto(rowDia)
            }

        } else {

            // si se intenta seleccionar una fechaDesde pero no se tiene seleccionado un servicio
            inputDesde.classList.add("is-invalid")
            inputDesde.nextElementSibling.innerText = `Debes seleccionar un servicio antes de añadir una fecha de entrega`
            // se reinicia la fecha hasta
            inputHasta.value = ""
            inputHasta.disabled = true
            inputHasta.readonly = false
            inputHasta.classList.remove("is-invalid")

            // 1.10 resetear valores del rowDia
            this.resetearRowDiaPorDefecto(rowDia)
        }
    }

    // cuando cambia el servicio seleccionado se valida el valor del servicio y del inputDesde más cercano
    async validarServiciosInputDesde(btn) {
        let indice = 0

        // recorrer todos los inputsDesde y aplicar a misma configuracion para todos
        for (let inputDesde of this.inputsDesde) {
            const rowDia = inputDesde.closest('.rowDia')
            let inputHasta = rowDia.querySelector(".inputHasta")
            if (btn.checked) {
                if (indice == 0) {
                    this.ocultarSpinnerFechas()
                    this.ocultarSpinnerFactura()
                    // al cambiar el inputDesde hay que modificar flujoReserva
                    this.cambiarConfiguracionFlujoReserva(btn.value)
                }

                // 1.9 Siempre que se cambie de servicio hay que reajustar el inputHasta
                // 1.9 Alojamiento tiene que estar entre las 7:00 am y 23:59
                if (btn.id == "btn-alojamiento") {
                    this.ocultarAnnadirDia()

                    inputDesde.min = funcUsuarios.generarFechaMinAlojamiento()
                    inputDesde.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputDesde.min.replace("T", " ")} y estar entre las 07:00-23:59`
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (btn.id == "btn-guarderia") {
                    this.mostrarAnnadirDia()

                    // 1.9 La hora minima para el inputDesde son las 07:00
                    inputDesde.min = funcUsuarios.generarFechaMinGuarderiaYPaseoInputDesde()
                    inputDesde.nextElementSibling.innerText = `Máximo 10 horas, la fecha elegida debe de estar entre las ${inputDesde.min.replace("T", " ")} y las  18:30`
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (btn.id == "btn-paseo") {
                    this.mostrarAnnadirDia()

                    // 1.9 La hora minima para el inputDesde son las 18:30, y sino se pasa a las 7:00 am del siguiente dia
                    inputDesde.min = funcUsuarios.generarFechaMinGuarderiaYPaseoInputDesde()
                    inputDesde.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputDesde.min.replace("T", " ")} y las 18:30`
                }


                // si se tiene seleccionada fechaDesde, hay que ponerle a fechaHasta los minimos y maximos correspondientes con el servicio
                if (inputDesde.value != "") {
                    if (funcUsuarios.validarFechaMayorYMenor(inputDesde.value, inputDesde.min, inputDesde.max)) {

                        if (inputDesde.matches(".is-invalid")) {
                            inputDesde.classList.remove("is-invalid")
                        }

                        // 1.9 Debido a que ha cambiado el inputDesde se debe quitar mensaje de error de inputHasta si lo tiene
                        if (inputHasta.matches(".is-invalid")) {
                            inputHasta.classList.remove("is-invalid")
                        }

                        // Para alojamiento no hay una fechaMaxima, solo hay que validar que este entre las 7:00 am y 23:59
                        if (btn.id == "btn-alojamiento") {
                            inputDesde.disabled = false

                            inputHasta.readonly = false
                            inputHasta.disabled = false
                            inputHasta.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                            inputHasta.max = ""
                            inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHasta.min.replace("T", " ")}  y estar entre las 07:00-23:59`
                        }

                        // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                        if (btn.id == "btn-guarderia") {
                            inputDesde.disabled = false

                            inputHasta.readonly = false
                            inputHasta.disabled = false
                            // 1.9 Al cambiar de servicio al inputHasta se le pone la fecha máxima que se puede seleccionar, el usuario decidirá si quiere menos
                            inputHasta.value = funcUsuarios.generarFechaMaxGuarderiaInputHasta(inputDesde.value)
                            inputHasta.max = inputHasta.value

                            // 1.9 La fecha minima hasta será 1 hora mas que fecha desde
                            inputHasta.min = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                            inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHasta.min.replace("T", " ")} y ${inputHasta.max.replace("T", " ")} `
                        }

                        // 1.9 Para paseo el horario es de 7:00 am a 19:30, y el servicio dura siempre el mismo tiempo
                        if (btn.id == "btn-paseo") {
                            inputDesde.disabled = false

                            inputHasta.readonly = true
                            inputHasta.disabled = false
                            // 1.9 La fecha minima y maxima  será la misma, 1 hora mas que fecha desde
                            inputHasta.value = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                            inputHasta.max = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                            inputHasta.min = inputHasta.max
                            inputHasta.nextElementSibling.innerText = `El paseo dura siempre una hora, la fecha debe ser ${inputHasta.min.replace("T", " ")} `
                        }

                        this.validarFechasInputHasta(inputHasta)
                    } else {

                        // 1.9 si inputdesde se modifica pero sale fuera de los rangos de min y max, mostrar alerta y resetear inputHasta
                        inputDesde.classList.add("is-invalid")
                        inputHasta.value = ""
                        inputHasta.classList.remove("is-invalid")

                        // 1.10 resetear valores del rowDia
                        this.resetearRowDiaPorDefecto(rowDia)
                    }
                } else {

                    // 1.9 Cuando se selecciona un servicio y no se tiene fechaDesde se resetea la inputHasta
                    inputHasta.value = ""
                    inputDesde.classList.remove("is-invalid")
                }

                indice++
            } else {


                if (!Array.from(this.btnServicios).some(btn => btn.checked == true)) {
                    // si no hay servicio seleccionado y se tiene seleccionada una fechaDesde 
                    if (inputDesde.value != "") {
                        inputDesde.nextElementSibling.innerText = `Debes seleccionar un servicio antes de elegir una fecha de inicio`
                        inputDesde.classList.add("is-invalid")
                    } else {
                        // 1.9 cuando se borra el inputDesde y no se tiene seleccionado un servicio es necesario quitar el mensaje de invalid en caso de que se esté mostrando
                        if (inputDesde.matches(".is-invalid")) {
                            inputDesde.classList.remove("is-invalid")
                        }
                        inputDesde.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${funcUsuarios.generarFechaMinAlojamiento().replace("T", " ")} y estar entre las 07:00-23:59`
                    }

                    inputDesde.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)

                    // se reinicia la fecha hasta
                    inputHasta.value = ""
                    inputHasta.disabled = true
                    inputHasta.readonly = false
                    inputHasta.classList.remove("is-invalid")
                    inputHasta.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                    inputHasta.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${funcUsuarios.generarFechaMinAlojamiento().replace("T", " ")} y estar entre las 07:00-23:59`

                    if (indice == 0) {
                        this.mostrarSpinnerFechas()
                        this.mostrarSpinnerFactura()
                        this.ocultarAnnadirDia()

                        // si no hay servicio hay que resetear flujoReserva
                        this.cambiarConfiguracionFlujoReserva()
                    }
                }
            }

        }

    }

    // cuando cambia la fecha del inputHasta se validará si cumple su maximo o minimo
    validarFechasInputHasta(inputHasta) {
        const rowDia = inputHasta.closest(".rowDia")
        if (!inputHasta.disabled && inputHasta.value != "") {
            let inputHastaValido = false
            const btnSeleccionado = Array.from(this.btnServicios).find(btn => btn.checked == true)
            const inputDesde = rowDia.querySelector(".inputDesde")

            // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
            if (btnSeleccionado.id == "btn-alojamiento") {
                if (funcUsuarios.validarFechaAlojamiento(inputHasta)) {
                    inputHastaValido = true
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btnSeleccionado.id == "btn-guarderia") {
                if (funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHastaValido = true
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btnSeleccionado.id == "btn-paseo") {
                if (funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHastaValido = true
                }
            }

            if (inputHastaValido) {

                // devolverá true si encuentra algun dia inválido
                if (this.validarDiasInputsHasta(inputHasta)) {
                    this.pintarDiaInvalido(rowDia)
                    // impedir que se pueda annadir un nuevo dia
                    rowDia.closest("#diasDisponibles").nextElementSibling.classList.add("noClickEvent")
                    inputHasta.disabled = true
                } else {
                    inputHasta.classList.remove("is-invalid")
                    this.obtenerYPintarDisponibilidadCuidMasc(rowDia, inputDesde.value, inputHasta.value)
                }
            } else {
                inputHasta.classList.add("is-invalid")
                this.resetearRowDiaPorDefecto(rowDia)
            }
        } else {
            this.resetearRowDiaPorDefecto(rowDia)
        }

    }

    // eventos para los botones de servicios 
    eventoBtnServicio() {

        for (let btn of this.btnServicios) {
            // detectar cuando se seleccionar un servicio y modificar el precio
            btn.addEventListener("change", async function (e) {
                // hacer que se pueda deseleccionar el tipo de servicio
                this.deseleccionarTipoServicio(e.target)

                // solo cuando el servicio este seleccionado se obtendran los dias y se formaran los inputsDesde y hasta
                if (e.target.checked) {
                    this.obtenerDiasServicioYAnnadir(this.serviciosActuales[btn.value])
                }

                this.actualizarValidacionesInputs(e.target)

            }.bind(this))
        }
    }

    // colocar min y max a los nuevos inputs creados
    actualizarValidacionesInputs(btn) {
        // inputs de fecha de entrega
        this.inputsDesde = document.querySelectorAll(".inputDesde")
        this.inputsHasta = document.querySelectorAll(".inputHasta")

        this.eventoInputFechas()
        this.validarServiciosInputDesde(btn)

        // al cambiar de servicio hay que actualizar la factura
        this.actualizarFactura()

        // evento para eliminar los dias 
        this.eventoBorrarDiaReserva()
    }

    // eventos para los inputs desde, para tratar las dos casuisticas para el input hasta
    eventoInputFechas() {
        for (let inputDesde of this.inputsDesde) {
            inputDesde.addEventListener("change", function (e) {
                this.validarFechasInputDesde(e.target)
            }.bind(this))
        }

        for (let inputHasta of this.inputsHasta) {
            inputHasta.addEventListener("change", function (e) {
                this.validarFechasInputHasta(e.target)
            }.bind(this))
        }
    }

    // hacer que se pueda deseleccionar el tipo de servicio elegido
    deseleccionarTipoServicio(btn) {

        // si está seleccionado convertir a checkbox para que luego pueda ser deseleccionado
        if (btn.checked) {
            btn.type = "checkbox"
            btn.required = true

            // 1.8 servicios seleccionados distintos al seleccionado actualmente
            const btnNoSeleccionado = Array.from(this.btnServicios).filter(elemento => (elemento != btn))
            if (btnNoSeleccionado.length > 0) {
                $(btnNoSeleccionado).prop("checked", false)
                $(btnNoSeleccionado).attr("type", "radio")
                $(btnNoSeleccionado).prop("required", false)

                // quitar el active al boton padre
                $(btnNoSeleccionado).parent("button").removeClass("active")
            }
        } else {
            btn.type = "radio"
            $(this.btnServicios).prop("required", true)
        }
    }


    setFlujoReserva(nuevoFlujoReserva) {
        this.flujoReserva = nuevoFlujoReserva
        sessionStorage.setItem("flujoReserva", JSON.stringify(nuevoFlujoReserva))
    }
    getFlujoReserva() {
        this.flujoReserva = JSON.parse(sessionStorage.getItem("flujoReserva"))
    }

    // 1.9 Por defecto el flujoReserva 
    crearFlujoReservaDefault() {
        this.getFlujoReserva()

        // si no existe el flujo o es flujo de la reserva de otro cuidador
        if (!this.flujoReserva || this.flujoReserva.idCuidador != this.cuidador.idusuario) {
            let diasServicios = {}
            for (let servicio in this.cuidador.servicios) {
                diasServicios[servicio] = {
                    dia0: {
                        fechaEntrega: "",
                        fechaRecogida: "",
                        transporte: false,
                        precioTotal: 0,
                        diaValido: false
                    },
                }
            }
            const nuevoFlujoReserva = {
                idCuidador: this.cuidador.idusuario,
                servicio: null,
                precioServicio: 0,
                plustransporte: 0,
                transporte: false,
                diasServicios: diasServicios,
                precioTotalReserva: 0
            }

            this.setFlujoReserva(nuevoFlujoReserva)
        }

        // es necesario resetear precios del flujoReserva
        const nuevoFlujoReserva = this.flujoReserva
        nuevoFlujoReserva.servicio = null
        nuevoFlujoReserva.precioServicio = 0
        nuevoFlujoReserva.plustransporte = 0
        nuevoFlujoReserva.precioTotalReserva = 0
        this.setFlujoReserva(nuevoFlujoReserva)
    }

    // 1.9 obtener del flujoReserva los dias almacenados del servicio seleccionado y annadirlos
    obtenerDiasServicioYAnnadir(servicio) {
        let indice = 0
        // se guarda el dia anterior
        let diaAnterior = undefined
        for (let dia in this.flujoReserva["diasServicios"][servicio]) {
            // si el dia anterior no esta como valido los inputs se pintaran como disabled
            if (diaAnterior != undefined && diaAnterior.diaValido != true) {
                this.insertarNuevoDia(this.flujoReserva["diasServicios"][servicio][dia], indice, true)
            } else {
                this.insertarNuevoDia(this.flujoReserva["diasServicios"][servicio][dia], indice)
            }
            diaAnterior = this.flujoReserva["diasServicios"][servicio][dia]
            indice++
        }

    }

    // crear html para una nueva fila de un dia
    insertarNuevoDia(dia, indice, inputDisabled = false) {
        let nuevoRow = ` <div class="col-12 text-danger-emphasis d-none mensajeReservaInvalida">El cuidador no tiene disponible esta reserva</div> <div class="row justify-content-evenly row-gap-4 align-items-center mt-2 mb-1 rounded  p-2 rowDia ${dia.diaValido ? "diaValido" : "diaDefault"} dia${indice}"  data-dia="dia${indice}" data-indicedia="${indice}">
            <div class="col-12 col-md-2 d-flex align-items-center justify-content-center fw-semibold rounded p-2 columnaDia"> Día ${indice + 1}</div>

        <div class="col-10 col-md-9 flex-grow-1">
            <div class="row row-gap-4 justify-content-center">
                <div class="col-4 col-md-2 text-end d-flex align-items-center fw-semibold justify-content-end"> Entrega: </div>
                <div class="col-8 col-md-4" title="Fecha de entrega">
                    <input type="datetime-local" class="form-control inputDesde" name="calfechinicio" min="" value="${dia.fechaEntrega}" ${(inputDisabled) ? "disabled" : ""}>
            <div class="invalid-feedback" >                  
                    </div>
                </div>

                <div class="col-4 col-md-2 d-flex align-items-center fw-semibold "> Recogida: <code>*</code></div>
                <div class="col-8 col-md-4" title="Fecha de recogida">
                    <input type="datetime-local" class="form-control inputHasta" name="calfechfin" min="" value="${dia.fechaRecogida}" disabled required>
                    <div class="invalid-feedback">
                    </div>
                </div>
            </div>
        </div>

            <div class="col-auto px-0">
                <img src="${base_url}app/assets/iconos/basura.gif" title="Eliminar el dia" alt="Eliminar el dia" class="btnBorrarDiaReserva mouseOver" />
            </div>
    </div> `
        if (indice == 0) {
            this.diasDisponibles.innerHTML = nuevoRow
        } else {
            this.diasDisponibles.innerHTML += nuevoRow
        }
    }

    // obtener servicios de la BBDD
    obtenerServiciosActuales() {
        const url = base_url + "Inicio_c/obtenerServicios";
        const formData = new FormData();
        this.serviciosActuales = funcDefault.llamadaAJAXAsync(url, formData);
    }

    // ocultar el spinner de fechas
    ocultarSpinnerFechas() {
        this.spinnerFechas.classList.add("d-none")
        this.diasDisponibles.classList.remove("d-none")
    }

    // ocultar annadir otroa dia para reservar
    ocultarAnnadirDia() {
        this.annadirDia.classList.add("d-none")
    }

    // mostrar annadir otroa dia para reservar
    mostrarAnnadirDia() {
        this.annadirDia.classList.remove("d-none")
    }

    // mostrar el spinner de fechas
    mostrarSpinnerFechas() {
        this.diasDisponibles.classList.add("d-none")
        this.spinnerFechas.classList.remove("d-none")
    }

    // ocultar el spinner de factura y ocultar factura
    async ocultarSpinnerFactura() {
        this.spinnerFactura.classList.add("d-none")
        this.tablaFacturas.classList.remove("d-none")
    }

    // mostrar el spinner de fechas
    async mostrarSpinnerFactura() {
        this.tablaFacturas.classList.add("d-none")
        this.spinnerFactura.classList.remove("d-none")
    }

    // obtener de BBDD si el cuidador tiene disponibles las fechas seleccionadas
    obtenerYPintarDisponibilidadCuidMasc(rowDia, fechinicio, fechfin) {
        const url = base_url + "Propietarios_c/validarDisponibilidadCuidador";
        const formData = new FormData();
        formData.append("cuidador", this.cuidador.idusuario)
        formData.append("fechinicio", fechinicio)
        formData.append("fechfin", fechfin)

        if (funcDefault.llamadaAJAXAsync(url, formData)) {

            if (this.validarDisponibilidadMascota(fechinicio, fechfin)) {
                // pintar estilo valido 
                this.pintarDiaValido(rowDia)
                // impedir que se pueda annadir un nuevo dia
                rowDia.closest("#diasDisponibles").nextElementSibling.classList.remove("noClickEvent")
            } else {
                // pintar estilo invalido 
                this.pintarDiaInvalido(rowDia, "M")
                // impedir que se pueda annadir un nuevo dia
                rowDia.closest("#diasDisponibles").nextElementSibling.classList.add("noClickEvent")
            }
        } else {
            // pintar estilo invalido 
            this.pintarDiaInvalido(rowDia, "C")
            // impedir que se pueda annadir un nuevo dia
            rowDia.closest("#diasDisponibles").nextElementSibling.classList.add("noClickEvent")
        }
    }

    // validar si la mascota seleccionada no tiene ya una reserva para las fechas indicadas
    // obtener de BBDD si el cuidador tiene disponibles las fechas seleccionadas
    validarDisponibilidadMascota(fechinicio, fechfin) {
        if (this.idmascotaSeleccionada) {
            const url = base_url + "Propietarios_c/validarDisponibilidadMascota";
            const formData = new FormData();
            formData.append("idmascotaSeleccionada", this.idmascotaSeleccionada)
            formData.append("fechinicio", fechinicio)
            formData.append("fechfin", fechfin)

            return funcDefault.llamadaAJAXAsync(url, formData)
        }
        return true
    }

    // poner un dia como valido y annadirlo al flujoReserva
    pintarDiaValido(rowDia) {
        rowDia.previousElementSibling.classList.add("d-none")
        rowDia.classList.add("diaValido")
        rowDia.classList.remove("diaDefault", "diaInValido")

        // annadir o modificar dia para el servicio que está seleccionado
        this.annadirDiaFlujoReserva(rowDia)

        // habilitar que se pueda annadir un nuevo dia
        rowDia.closest("#diasDisponibles").nextElementSibling.classList.remove("noClickEvent")
    }

    // poner un dia como invalido y eliminarlo del flujoReserva
    pintarDiaInvalido(rowDia, tipoNoValido = "C") {
        // si es tipo invalido porque el cuidador no dispone de las fechas
        if (tipoNoValido == "C") {
            rowDia.previousElementSibling.innerText = "El cuidador no tiene disponible esta reserva"
        } else if (tipoNoValido == "M") {
            rowDia.previousElementSibling.innerText = "La mascota seleccionada ya tiene una reserva con fechas similares"
        } else {

            // si se llega aqui es porque ya hay un rowDia con las mismas fechas que este
            rowDia.previousElementSibling.innerText = "Ya existe un día con fechas similares"

        }


        rowDia.previousElementSibling.classList.remove("d-none")
        rowDia.classList.add("diaInValido")
        rowDia.classList.remove("diaDefault", "diaValido")

        // eliminar dia del flujo
        this.eliminarDiaFlujoReserva(rowDia.dataset.dia)
    }

    // resetear rowDia  a sus border por defecto y eliminar dia de flujoReserva
    resetearRowDiaPorDefecto(rowDia) {
        rowDia.previousElementSibling.classList.add("d-none")
        rowDia.classList.add("diaDefault")
        rowDia.classList.remove("diaInValido", "diaValido")

        this.eliminarDiaFlujoReserva(rowDia.dataset.dia)
    }

    // annadir un nuevo dia valido al flujoReserva
    annadirDiaFlujoReserva(rowDia = false) {

        if (rowDia != false) {

            let nuevoFLujo = this.flujoReserva
            // crear objeto con el nuevo dia
            const diaNuevo = {
                fechaEntrega: rowDia.querySelector(".inputDesde").value,
                fechaRecogida: rowDia.querySelector(".inputHasta").value,
                precioTotal: this.calcularPrecioReserva(rowDia.querySelector(".inputDesde").value, rowDia.querySelector(".inputHasta").value),
                diaValido: true,

                // proxima version se podra elegir transporte indendiente en cada dia
                transporte: false
            }

            // validar antes de annadir al precioTotalReserva que no se ha annadido anteriormente o el dia no existe
            if (!this.flujoReserva.diasServicios[this.flujoReserva.servicio][rowDia.dataset.dia] || this.flujoReserva.diasServicios[this.flujoReserva.servicio][rowDia.dataset.dia].precioTotal == 0 && diaNuevo.precioTotal > 0) {
                nuevoFLujo.precioTotalReserva = nuevoFLujo.precioTotalReserva + diaNuevo.precioTotal
            }
            const claveNueva = `${rowDia.dataset.dia}`
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveNueva] = diaNuevo
            this.setFlujoReserva(nuevoFLujo)

            // al cambiar de servicio hay que actualizar la factura
            this.actualizarFactura()
        }
    }

    // eliminar un dia del flujoReserva porque es invalido
    eliminarDiaFlujoReserva(claveDia) {
        let nuevoFLujo = this.flujoReserva
        // si el dia se encuentra en el flujo quitar precio del total de la reserva
        const diaEliminar = nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia]
        if (diaEliminar && diaEliminar.precioTotal > 0) {
            nuevoFLujo.precioTotalReserva = nuevoFLujo.precioTotalReserva - diaEliminar.precioTotal
        }

        // si es el dia0 habrá que resetearlo, no se puede eliminar
        if (claveDia == "dia0") {
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia].fechaEntrega = ""
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia].fechaRecogida = ""
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia].transporte = false
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia].precioTotal = 0
            nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia].diaValido = false

            // cuando se resetea el dia0 hay que restar el plus transporte
            this.sumarORestarPlusTransporte(true)
        } else {
            delete nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveDia]
        }
        this.setFlujoReserva(nuevoFLujo)
        // al cambiar de servicio hay que actualizar la factura
        this.actualizarFactura()
    }


    // calcular el precio total de una reserva
    calcularPrecioReserva(fechaEntrega, fechaRecogida) {
        const dateEntrega = new Date(fechaEntrega).getTime()
        const dateRecogida = new Date(fechaRecogida).getTime()
        let precioTotal = 0
        // el servicio se obtiene del flujoReserva
        switch (this.flujoReserva.servicio) {
            case "Alojamiento":
                // milisgeundos -> minutos -> horas -> dias
                const diasTotales = Math.round((dateRecogida - dateEntrega) / (1000 * 60 * 60 * 24))
                precioTotal = (parseInt(this.flujoReserva.precioServicio) * diasTotales)
                break;
            case "Guardería":
            case "Paseo":
                precioTotal = parseInt(this.flujoReserva.precioServicio)
                break;
        }

        return precioTotal

    }

    // cambiar configutacion de flujoReserva para el nuevo servicio seleccionado 
    cambiarConfiguracionFlujoReserva(servicio = null) {
        if (!servicio || servicio == null) {
            this.flujoReserva.plustransporte = 0
            this.flujoReserva.precioServicio = 0
            this.flujoReserva.precioTotalReserva = 0
            this.flujoReserva.servicio = null

            // si no hay servicio se descheckea plusTransporte
            this.checkTrasnsporte.checked = false
        } else {
            servicio = this.serviciosActuales[servicio]

            this.flujoReserva.plustransporte = this.cuidador.servicios[servicio].plustransporte
            this.flujoReserva.precioServicio = this.cuidador.servicios[servicio].precio
            this.flujoReserva.servicio = servicio

            this.flujoReserva.precioTotalReserva = 0
            // recorrer los dias que hay en el flujo para ese servicio y hacer suma    
            for (let dia in this.flujoReserva.diasServicios[servicio]) {
                this.flujoReserva.precioTotalReserva = this.flujoReserva.precioTotalReserva + this.flujoReserva.diasServicios[servicio][dia].precioTotal
            }

            // si en el flujo hay plusTransporte se checkea sino se deschekea
            if (this.flujoReserva.transporte == true) {
                this.checkTrasnsporte.checked = true

                // es necesario ponerlo a false porque la siguiente funcion sumara precio si está a false
                this.flujoReserva.transporte = false
                // sumar el plus de transporte
                this.sumarORestarPlusTransporte()
            } else {
                this.checkTrasnsporte.checked = false
            }
        }

        this.setFlujoReserva(this.flujoReserva)
    }

    // evento para el checkbox de recogida en casa
    eventoCheckTrasnsporte() {
        this.checkTrasnsporte.addEventListener("change", function (e) {
            // si hay servicio seleccionado
            if (Array.from(this.btnServicios).some(btn => btn.checked == true)) {
                if (this.checkTrasnsporte.checked) {

                    // solo hay transporte para alojamiento y guarderia
                    if (this.flujoReserva.servicio == "paseo") {
                        this.checkTrasnsporte.checked = false
                    } else {
                        this.sumarORestarPlusTransporte()
                    }
                } else {
                    // restar el plus de transporte
                    if (this.flujoReserva.servicio != "paseo") {
                        this.sumarORestarPlusTransporte(true)
                    }
                }
            } else {
                this.checkTrasnsporte.checked = false
            }
        }.bind(this))
    }

    // sumar al precio total de la reserva el plis transporte o restarlo
    sumarORestarPlusTransporte(restar = false) {

        // no se podrá restar el plusTransporte si no esta seleccionado previamente
        if (restar) {
            if (this.flujoReserva.transporte == true && this.flujoReserva.precioTotalReserva > 0) {
                this.flujoReserva.transporte = false
                this.flujoReserva.precioTotalReserva = this.flujoReserva.precioTotalReserva - this.flujoReserva.plustransporte
                this.actualizarFactura()
            } else {
                this.flujoReserva.transporte = false
            }
        } else {
            if (this.flujoReserva.transporte == false) {
                this.flujoReserva.transporte = true
                this.flujoReserva.precioTotalReserva = this.flujoReserva.precioTotalReserva + this.flujoReserva.plustransporte
                this.actualizarFactura()
            } else {
                this.flujoReserva.transporte = true
            }
        }
        this.setFlujoReserva(this.flujoReserva)
    }

    // actualizar tabla de factura
    actualizarFactura() {

        // precio total
        if (this.flujoReserva.precioTotalReserva == 0) {

            this.tablaFacturas.querySelector("#tdPrecioTotal").innerText = "-"
        } else {
            this.tablaFacturas.querySelector("#tdPrecioTotal").innerText = this.flujoReserva.precioTotalReserva + "€"
        }

        // annadir nuevos dias
        const dias = this.flujoReserva.diasServicios[this.flujoReserva.servicio]
        let nuevoTBody = ""
        for (let dia in dias) {
            if (dias[dia].precioTotal > 0) {
                let diasTotales = 1
                // si es alojamiento se calculan los dias totales
                if (this.flujoReserva.servicio == "Alojamiento") {
                    // milisgeundos -> minutos -> horas -> dias
                    const dateEntrega = new Date(dias[dia].fechaEntrega).getTime()
                    const dateRecogida = new Date(dias[dia].fechaRecogida).getTime()
                    diasTotales = Math.round((dateRecogida - dateEntrega) / (1000 * 60 * 60 * 24))
                }

                nuevoTBody += `<tr><td>${diasTotales}</td><td>${this.flujoReserva.precioServicio}€</td>`
                if (this.flujoReserva.transporte) {
                    nuevoTBody += `<td> ${this.flujoReserva.plustransporte}€</td> `
                    nuevoTBody += `<td> ${dias[dia].precioTotal + this.flujoReserva.plustransporte}€</td></tr> `
                } else {
                    nuevoTBody += `<td>-</td>`
                    nuevoTBody += `<td>${dias[dia].precioTotal}€</td></tr>`
                }
            }

        }
        this.tablaFacturas.querySelector("tbody").innerHTML = nuevoTBody

    }

    // evento para eliminar un dia de la reserva
    eventoBorrarDiaReserva() {
        for (let btn of document.querySelectorAll(".btnBorrarDiaReserva")) {
            btn.addEventListener("click", function (e) {
                const rowDia = e.target.closest(".rowDia")

                // si es el dia0 no se puede eliminar, solo se limpiará los valores
                if (rowDia.dataset.dia == "dia0") {
                    rowDia.querySelector(".inputDesde").value = ""
                    rowDia.querySelector(".inputHasta").value = ""
                    rowDia.querySelector(".inputHasta").disabled = true
                    this.resetearRowDiaPorDefecto(rowDia)
                } else {
                    this.eliminarDiaFlujoReserva(rowDia.dataset.dia)
                    this.obtenerDiasServicioYAnnadir(this.flujoReserva.servicio)
                    this.actualizarValidacionesInputs(this.flujoReserva.servicio)
                }
            }.bind(this))
        }
    }

    // evento click en annadir nuevo dia
    eventoAnnadirNuevoRowDia() {

        this.annadirDia.addEventListener("click", function (e) {

            const ultimoRowDia = this.diasDisponibles.querySelector(".rowDia:last-of-type")
            if (ultimoRowDia.matches(".diaValido")) {
                let nuevoFLujo = this.flujoReserva
                const claveNuevoDia = `dia${parseInt(ultimoRowDia.dataset.indicedia) + 1}`
                nuevoFLujo.diasServicios[nuevoFLujo.servicio][claveNuevoDia] =
                {
                    fechaEntrega: "",
                    fechaRecogida: "",
                    transporte: false,
                    precioTotal: 0,
                    diaValido: false
                }

                this.setFlujoReserva(nuevoFLujo)
                this.obtenerDiasServicioYAnnadir(this.flujoReserva.servicio)

                const btnSeleccionado = Array.from(this.btnServicios).find(btn => btn.checked == true)
                this.actualizarValidacionesInputs(btnSeleccionado)
            }
        }.bind(this))
    }


    // validar si el resto de inputsHasta no tienen el mismo dia que el que se valida
    validarDiasInputsHasta(inputHasta) {
        const dateInputHasta = new Date(inputHasta.value)

        if (inputHasta) {
            // filtrar y obtener los inputHasta diferentes al que se valida y que sean de indice mayor, para comparar por ejemplo dia2 vs dia1, pero no dia1 vs dia2
            const inputsHastaDiferentes = Array.from(this.inputsHasta).filter(input => {

                return (input != inputHasta && input.disabled == false)
            }
            )

            // devolver false si algun input tiene el mismo dia que el nuevo input que se valida
            if (inputsHastaDiferentes.length > 0) {

                // se devolvera false si ha encontrado fechas iguales y no se pasa la validación
                return inputsHastaDiferentes.some(input => {

                    let dateInput = new Date(input.value).getTime()

                    // se calcula la cantidad de dias que hay de diferencia
                    // si no es mayor a 0 es porque es el mismo dia por lo que hay que devolver false
                    return (Math.round((dateInputHasta.getTime() - dateInput) / (1000 * 60 * 60 * 24)) >= 1 || Math.round((dateInputHasta.getTime() - dateInput) / (1000 * 60 * 60 * 24)) <= -1) == false

                })
            }
            return false
        }
    }

    // al seleccionar una mascota hay que validar las fechas de los dias
    eventoSeleccionarMascota() {

        // evento change para el contenedor de mascotas, y detectar si cambia alguna mascota
        this.contenedorMascotas.addEventListener("click", function (e) {
            if (e.target.matches(".labelInputMascota") || e.target.matches(".inputMascota")) {
                let recorrerInputsHasta = false
                if (e.target.matches(".labelInputMascota") && e.target.previousElementSibling.value != this.idmascotaSeleccionada) {
                    this.idmascotaSeleccionada = e.target.previousElementSibling.value
                    recorrerInputsHasta = true
                } else if (e.target.matches(".inputMascota") && e.target.value != this.idmascotaSeleccionada) {
                    this.idmascotaSeleccionada = e.target.value
                    recorrerInputsHasta = true
                }

                if (this.inputsHasta && this.inputsHasta.length > 0 && recorrerInputsHasta == true) {
                    // recorrer los inputsHasta y validar fechas
                    for (let inputHasta of Array.from(this.inputsHasta)) {
                        this.validarFechasInputHasta(inputHasta)
                    }
                }
            }
        }.bind(this))
    }
}

// INICIALIZAR LA CLASE 
var reservar
addEventListener("DOMContentLoaded", function () {
    reservar = new Reservar()
})
