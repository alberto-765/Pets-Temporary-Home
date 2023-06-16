class BuscarCuidador {
    filtros // filtros de busqueda obtenidos de url o de session
    cuidadores = [] // clases con los cuidadores obtenidos de BBDD
    contenedorCuid  // contenedor para insertar los cuidadores
    formularios   // formularios para filtrar
    servicio // servicio por el que se está filtrando, necesario para saber que precios y servicios mostrar del cuidador
    serviciosActuales // servicios actuales obtenidos de BBDD

    // paginacion
    paginacion // lista con los li de paginar
    paginacionAnt
    paginacion1
    paginacion2
    paginacion3
    paginacionSig

    inputsDesde // inputs para seleccionar fecha desde
    inputHasta  // inputs para seleccionar fecha gasta
    selectServicio
    fechaMinDefault

    contadorCuidadores // contador de los cuidadores mostrados
    stepPaginado // cantidad de cuidadores de los totales que estan siendo mostrados
    cantidadCuidadores // cantidad de cuidadores que cumplen los filtros
    constructor(parametros) {
        funcDefault.cambiarEstiloFooter()

        // obtener de session datos necesarios 
        this.obtenerFiltrosUrloSession(parametros)
        this.getValorPaginado()

        this.contenedorCuid = document.getElementById("cuidadores-contenedor")
        this.formularios = document.querySelectorAll(".filtrar")
        this.contadorCuidadores = document.querySelector("#contador_cuidadores_mostrados")

        // elementos de paginacion
        this.paginacion = document.querySelector("#paginacion")
        this.paginacionAnt = document.querySelector(".paginacionAnt")
        this.paginacion1 = document.querySelector(".paginacion1")
        this.paginacion2 = document.querySelector(".paginacion2")
        this.paginacion3 = document.querySelector(".paginacion3")
        this.paginacionSig = document.querySelector(".paginacionSig")

        // elementos para funciones de fecha
        this.inputsDesde = document.querySelectorAll(".inputDesde")
        this.inputsHasta = document.querySelectorAll(".inputHasta")
        this.inputsDonde = document.querySelectorAll(".inputDonde")
        this.selectServicios = document.querySelectorAll(".selectServicios")

        this.eventoCheckNinos()
        this.obtenerServiciosActuales()
        this.setServicio(parseInt(this.filtros.servicio))
        this.obtenerYMostrarCuidadores()
        this.obtenerPoblaciones()
        this.eventosFecha()
        this.activarEventoClickBtnFiltos()
        this.eventoFiltrar()
        this.seleccionarFiltros()
        this.ocultarSpinnerContCuid()

        // guardar filtros al salir de la pagina
        this.guardarFiltrosAlSalir()

        // paginado
        this.eventosClickPaginado()
    }

    // obtener cuidadores que cumplan los filtros y el total para la paginacion
    async obtenerYMostrarCuidadores() {
        const url = base_url + "Inicio_c/obtenerCuidadores"
        const formData = new FormData()

        // recorrer parametros e incluirlos en el formData
        for (let clave in this.filtros) {
            if (parseInt(this.filtros[clave]) != 0 && clave != "vieneDeInicio") {
                formData.append(clave, this.filtros[clave].replace("_", " "))
            }
        }

        // añadir el valor del paginado 
        formData.append("valorpaginado", this.stepPaginado)

        // si hay cuidadores crear clases y mostrar, sino mostrar mensaje 
        let cuidadoresObtenidos = funcDefault.llamadaAJAXAsync(url, formData)
        if (cuidadoresObtenidos.length > 0 && typeof cuidadoresObtenidos != "string") {
            // resetear los cuidadores
            this.cuidadores = []
            sessionStorage.setItem("flujoCuidadores", JSON.stringify({}))


            this.crearClasesCuidadores(cuidadoresObtenidos)
            await this.mostrarCuidadores()
        } else {
            this.insertarNoEncotrado()
        }

        // obtener la cantidad de cuidadores
        await this.obtenerCantidadCuidadores()

        // evento para desactivar el paginado 
        this.eventoDesactivarPaginado()

        // mostrar la cantidad de cuidadores que pintan
        this.mostrarContadorCuidadores()
    }

    // mostrar tarjetas de los cuidadores obtenidos
    async mostrarCuidadores() {

        let contadorTarjetas = 0

        for (let cuidador of this.cuidadores) {

            // 0-> primera 1-> ultima
            if (contadorTarjetas == 0) {
                await this.crearTarjeta(cuidador, 0)
            } else {
                await this.crearTarjeta(cuidador)
            }
            contadorTarjetas++
        }
    }

    // insertar mensaje de cuidadores no encotrados con esos filtros
    insertarNoEncotrado() {

        // hacer aparecer el modal 
        funcDefault.mostrarPopUpError('<div class="text-center">No disponemos de ningún cuidador que cumpla lo que deseas</div>')

        let tarjeta = `<div class="noEncontrados text-center "><p class="display-5">No se ha encontrado ningún cuidador</p></div>`

        this.insertarTarjeta(tarjeta, true)
    }

    // inster tarjeta en el cotenedor de cuidadores
    insertarTarjeta(tarjeta, primera = false) {

        // si es la primera sobreescribe
        if (primera) {
            this.contenedorCuid.innerHTML = tarjeta;
        }
        else {
            this.contenedorCuid.innerHTML += tarjeta;
        }
    }

    // crear targeta de cada cuidador  
    async crearTarjeta(cuidador, contadorTarjetas = 1) {
        let servicioSeleccionado = this.seleccionarServicio(cuidador.servicios)
        let tarjeta = ""

        if (funcDefault.tipo_user) {
            tarjeta += `<a href="${base_url}Propietarios_c/detallesCuidador/${cuidador.idusuario}" class="text-decoration-none link-dark tarjeta  mt-3 mt-md-0 col-12 aparecerTarjetas">`
        } else {
            tarjeta += `<a href="${base_url}Inicio_c/detallesCuidador/${cuidador.idusuario}" class="text-decoration-none link-dark tarjeta  mt-3 mt-md-0 aparecerTarjetas" >`
        }
        tarjeta += `<div class="row p-4 justify-content-evenly h-100 align-items-center row-gap-5"><div class="col-12 col-sm-2 h-75 h-100"><img class="w-100 h-100 object-fit-contain " src="${cuidador.imagenPerfil}" alt="Imagen de perfil del cuidador"></div><div class="col-12 col-sm-9 d-flex flex-column my-md-1 justify-content-center h-100 row-gap-4 "><div class="row w-100
         justify-content-between"><div class="col-8 col-auto"><h4>${cuidador.apenom}</h4><p class="text-muted lead fs-6">${cuidador.poblacion}, ${cuidador.codpostal}</p></div><div class="col-4 col-auto d-flex flex-column align-items-center fw-semibold fs-5 "><p class="precioCuidador my-0">${cuidador.servicios[servicioSeleccionado].precio}€`

        // dependiendo del servicio poner un horario
        switch (servicioSeleccionado) {
            case "Alojamiento":
                tarjeta += `  noche</p><p class="servicioCuidador"> Alojamiento<img class="iconoServicio" src="${base_url}app/assets/iconos/servicio_alojamiento.gif" alt="Servicio de Alojamiento"/></p>`
                break;
            case 'Guardería':
                tarjeta += `   día</p><p class="servicioCuidador"> Guardería <img class="iconoServicio" src="${base_url}app/assets/iconos/servicio_guarderia.gif" alt="Servicio de Alojamiento"/></p>`
                break;

            case 'Paseo':
                tarjeta += ` hora</p><p class="servicioCuidador"> Paseo <img class="iconoServicio" src="${base_url}app/assets/iconos/servicio_paseo.gif" alt="Servicio de Alojamiento"/></p>`
                break;
        }

        tarjeta += `</div></div><div class="flex-grow-1 d-flex align-items-top w-100 text-break detalles ">${cuidador.descripcion.substring(0, 250)}...</div></div></div></a>`

        // 0-> primera 1-> intermedia 
        if (contadorTarjetas == 0) {
            this.insertarTarjeta(tarjeta, true)
        } else {

            this.insertarTarjeta(tarjeta)
        }
    }

    // Crear clases de los cuidadores obtenidos 
    crearClasesCuidadores(cuidadores) {
        for (let cuidador of cuidadores) {
            // si existe servicio es porque se ha filtrado por precio o por servicio conreto
            if (cuidador.servicio != undefined) {
                this.cuidadores.push(new Cuidador(cuidador.idusuario, this.serviciosActuales[cuidador.servicio], true))
            } else {
                this.cuidadores.push(new Cuidador(cuidador.idusuario, null, true))
            }
        }
    }

    // obtener los servicios de BBDD y guardar el servicio actual por su nombre, hacerlo asi para que sea dinámico
    setServicio(servicio) {

        // Si servicio no existe se coge uno aleatorio
        if (servicio == 0) {
            this.servicio = null
        } else {
            this.servicio = this.serviciosActuales[servicio]
        }
    }


    // obtener servicios de la BBDD
    obtenerServiciosActuales() {
        const url = base_url + "Inicio_c/obtenerServicios";
        const formData = new FormData();
        this.serviciosActuales = funcDefault.llamadaAJAXAsync(url, formData);
    }


    // seleccionar el servicio del cuidador que se requiere en los filtros, y si es aleatorio se coge un servicio para cada cuidador
    seleccionarServicio(servicios) {

        // si servicio es null seleccionar uno aleatorio entre 1 y el numero de servicios
        if (this.servicio === null) {

            // obtener las keys
            let claves = Object.keys(servicios)

            // seleccionar una key aleatoria de los servicios disponibles del cuidador
            let claveAleatoria = claves[Math.floor(Math.random() * (claves.length))]

            return claveAleatoria
        } else {
            return this.servicio
        }
    }

    // evento para los checkbox de niños, si se selecciona que hay niños debe desactivar el checkbox de que no hay
    eventoCheckNinos() {
        let acordeones = document.querySelectorAll(".acordeonNinos")

        for (let acordeon of acordeones) {
            // coger los checkbox de ninos del acordeon
            const checksNinos = acordeon.querySelectorAll("input:not(.noNinosCheck)")

            // coger los checkbox checkNoNinos del acordeon
            const checkNoNinos = acordeon.querySelector(".noNinosCheck")

            // casuística si se selecciona que no hay niños no se pueden seleccionar los otros checkboks de niños
            checkNoNinos.addEventListener("change", function () {
                if (this.checked == true) {
                    for (let input of checksNinos) {
                        input.checked = false
                    }
                }
            })

            for (let input of checksNinos) {
                input.addEventListener("change", function () {
                    if (this.checked == true && checkNoNinos.checked == true) {
                        checkNoNinos.checked = false
                    }
                })
            }
        }
    }

    // activar los evento click de los botones radio y checkbox
    activarEventoClickBtnFiltos() {

        // los botones chechbox
        const btnCheck = document.querySelectorAll(".contenedorBotones input[type=checkbox]")
        for (let inputCheck of btnCheck) {
            // al hacer change deseleccionar 
            inputCheck.addEventListener("change", function (e) {
                this.focusBotones(e.target)
            }.bind(this))
        }

        // los botones radio
        const btnRadio = document.querySelectorAll(".contenedorBotones input[type=radio]")
        for (let inputRadio of btnRadio) {

            // al hacer change deseleccionar 
            inputRadio.addEventListener("change", function (e) {
                e.target.parentNode.classList.add("active")
                this.desactivarRadios(e.target)
            }.bind(this))
        }


    }

    // obtener poblaciones de la BBDD
    async obtenerPoblaciones() {
        const url = base_url + "Inicio_c/obtenerPoblaciones"
        const formData = new FormData()
        await this.formarYañadirDatalist(await funcDefault.llamadaFetch(url, formData))
    }

    // datalist de poblaciones disponibles
    async formarYañadirDatalist(poblaciones) {

        let options = ``
        for (let option of poblaciones) {
            options += `<option value = ${option["poblacion"]} > ${option["codpostal"]}</option > `
        }


        // datalists
        const datalists = document.getElementsByClassName("datalist")

        for (let elemento of datalists) {
            elemento.innerHTML = options
        }
    }

    // eventos para los select de servicios y para los inputs desde, para tratar las dos casuisticas para el input hasta
    eventosFecha() {

        for (let select of this.selectServicios) {
            // detectar cuando se seleccionar un servicio y modificar el precio
            select.addEventListener("change", async function (e) {

                // ejecutar la función para las fechas
                await this.validarServiciosInputDesde(e.target)
            }.bind(this))
        }

        for (let input of this.inputsDesde) {
            input.addEventListener("change", async function (e) {

                await this.validarFechasInputDesde(e.target)
            }.bind(this))


        }

        // 1.9 para los inputHasta al cambiar se valida que cumpla la fecha máxima y minima
        for (let input of this.inputsHasta) {
            input.addEventListener("change", async function (e) {
                await this.validarFechasInputHasta(e.target)
            }.bind(this))
        }
    }

    // 1.9 cuando cambia la fecha del inputHasta se validará si cumple su maximo o minimo
    async validarFechasInputDesde(inputDesde) {
        const servicioSeleccionado = this.serviciosActuales[inputDesde.closest("form").querySelector(".selectServicios").value]
        const inputHastaCercano = inputDesde.closest(".row").querySelector(".inputHasta")


        if (servicioSeleccionado) {

            // 1.9 Si se modifica el inputDesde hay que reajustar el inputHasta dependiendo del servicio, basandose en la nueva fecha
            if (inputDesde.value != "") {
                let validacionDesdePasada = true
                let validacionHastaPasada = true

                // 1.9 Debido a que ha cambiado el inputDesde se debe quitar mensaje de error de inputHasta si lo tiene
                inputHastaCercano.classList.remove("is-invalid")
                inputDesde.classList.remove("is-invalid")

                // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
                if (servicioSeleccionado == "Alojamiento") {
                    inputHastaCercano.readonly = false
                    inputHastaCercano.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                    inputHastaCercano.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputHastaCercano.min.replace("T", " ")} y estar entre las 07:00 y 23:59`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
                    }
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (servicioSeleccionado == "Guardería") {
                    inputHastaCercano.readonly = false

                    // 1.9 Al cambiar de servicio al inputHasta se le pone la fecha máxima que se puede seleccionar, el usuario decidirá si quiere menos
                    inputHastaCercano.value = funcUsuarios.generarFechaMaxGuarderiaInputHasta(inputDesde.value)
                    inputHastaCercano.max = inputHastaCercano.value

                    // 1.9 La fecha minima hasta será 1 hora mas que fecha desde
                    inputHastaCercano.min = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHastaCercano.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHastaCercano.min.replace("T", " ")} y ${inputHastaCercano.max.replace("T", " ")}`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
                    }
                }

                // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                if (servicioSeleccionado == "Paseo") {
                    // 1.9 La fecha minima y maxima hasta será la misma, 1 hora mas que fecha desde
                    inputHastaCercano.readonly = true
                    inputHastaCercano.value = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHastaCercano.max = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                    inputHastaCercano.min = inputHastaCercano.max

                    inputHastaCercano.nextElementSibling.innerText = `El paseo dura siempre una hora, la fecha debe ser ${inputHastaCercano.min.replace("T", " ")}`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
                    }
                }


                if (validacionDesdePasada) {
                    inputHastaCercano.disabled = false
                    inputDesde.classList.remove("is-invalid")
                } else {
                    inputHastaCercano.disabled = true
                    inputHastaCercano.value = ""
                    inputDesde.classList.add("is-invalid")
                    inputHasta.classList.remove("is-invalid")
                    return
                }

                if (validacionHastaPasada) {
                    inputHastaCercano.classList.remove("is-invalid")

                    // en guarderia y paseo al inputHasta se le pone un valor, por lo que es necesario guardar el nuevoDia en el flujo
                    if (servicioSeleccionado != "Alojamiento") {
                        this.validarFechasInputHasta(inputHastaCercano)
                    }
                } else {
                    inputHastaCercano.classList.add("is-invalid")

                }
            } else {

                // si el inputDesde no contiene valor se resetea el inputHasta
                inputHastaCercano.value = ""
                inputHastaCercano.disabled = true
                inputHastaCercano.readonly = false
                inputHastaCercano.classList.remove("is-invalid")
            }

        } else {

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

            // se reinicia la fecha hasta
            inputHastaCercano.value = ""
            inputHastaCercano.disabled = true
            inputHastaCercano.readonly = false
            inputHastaCercano.classList.remove("is-invalid")
        }
    }

    // cuando cambia el servicio seleccionado se valida el valor del servicio 
    async validarServiciosInputDesde(select) {
        const servicioSeleccionado = this.serviciosActuales[select.value]
        const inputDesdeCercano = select.closest("form").querySelector(".inputDesde")
        const inputHastaCercano = select.closest("form").querySelector(".inputHasta")

        // si no hay servicio seleccionado es porque tiene seleccionado aleatorio
        if (servicioSeleccionado) {
            // 1.9 Siempre que se cambie de servicio hay que reajustar el inputHasta

            // 1.9 Alojamiento tiene que estar entre las 7:00 am y 23:59
            if (servicioSeleccionado == "Alojamiento") {
                inputHasta.readonly = false
                inputDesdeCercano.min = funcUsuarios.generarFechaMinAlojamiento()
                inputDesdeCercano.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputDesdeCercano.min.replace("T", " ")} y estar entre las 07:00-23:59`
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (servicioSeleccionado == "Guardería") {
                inputHasta.readonly = false
                // 1.9 La hora minima para el inputDesde son las 07:00
                inputDesdeCercano.min = funcUsuarios.generarFechaMinGuarderiaYPaseoInputDesde()
                inputDesdeCercano.nextElementSibling.innerText = `Máximo 10 horas, la fecha elegida debe de estar entre las ${inputDesde.min.replace("T", " ")} y las  18:30`
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (servicioSeleccionado == "Paseo") {
                inputHasta.readonly = true
                // 1.9 La hora minima para el inputDesde son las 18:30, y sino se pasa a las 7:00 am del siguiente dia
                inputDesdeCercano.min = funcUsuarios.generarFechaMinGuarderiaYPaseoInputDesde()

                inputDesdeCercano.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputDesde.min.replace("T", " ")} y las 18:30`
            }


            // si se tiene seleccionada fechaDesde, hay que ponerle a fechaHasta los minimos y maximos correspondientes con el servicio
            if (inputDesdeCercano.value != "") {
                if (funcUsuarios.validarFechaMayorYMenor(inputDesdeCercano.value, inputDesdeCercano.min, inputDesdeCercano.max)) {

                    if (inputDesdeCercano.matches(".is-invalid")) {
                        inputDesdeCercano.classList.remove("is-invalid")
                    }

                    // 1.9 Debido a que ha cambiado el inputDesde se debe quitar mensaje de error de inputHasta si lo tiene
                    if (inputHastaCercano.matches(".is-invalid")) {
                        inputHastaCercano.classList.remove("is-invalid")
                    }

                    // Para alojamiento no hay una fechaMaxima, solo hay que validar que este entre las 7:00 am y 23:59
                    if (servicioSeleccionado == "Alojamiento") {
                        inputHastaCercano.readonly = false
                        inputHastaCercano.disabled = false
                        inputHastaCercano.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesdeCercano.value)
                        inputHastaCercano.max = ""

                        inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHastaCercano.min.replace("T", " ")}  y estar entre las 07:00-23:59`
                    }

                    // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                    if (servicioSeleccionado == "Guardería") {
                        inputHastaCercano.readonly = false
                        inputHastaCercano.disabled = false
                        // 1.9 Al cambiar de servicio al inputHasta se le pone la fecha máxima que se puede seleccionar, el usuario decidirá si quiere menos
                        inputHastaCercano.max = funcUsuarios.generarFechaMaxGuarderiaInputHasta(inputDesdeCercano.value)
                        inputHastaCercano.value = inputHastaCercano.max

                        // 1.9 La fecha minima hasta será 1 hora mas que fecha desde
                        inputHastaCercano.min = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesdeCercano.value)
                        inputHastaCercano.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHastaCercano.min.replace("T", " ")} y ${inputHastaCercano.max.replace("T", " ")} `
                    }

                    // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                    if (servicioSeleccionado == "Paseo") {
                        inputHastaCercano.readonly = true
                        inputHastaCercano.disabled = false
                        // 1.9 La fecha minima y maxima  será la misma, 1 hora mas que fecha desde
                        inputHastaCercano.value = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesdeCercano.value)
                        inputHastaCercano.max = inputHastaCercano.value
                        inputHastaCercano.min = inputHastaCercano.max
                        inputHastaCercano.nextElementSibling.innerText = `El paseo dura siempre una hora, la fecha debe ser ${inputHastaCercano.min.replace("T", " ")} `
                    }
                    await this.validarFechasInputHasta(inputHastaCercano)
                } else {

                    // 1.9 si inputdesde se modifica pero sale fuera de los rangos de min y max, mostrar alerta y resetear inputHasta
                    inputDesdeCercano.classList.add("is-invalid")
                    inputHastaCercano.value = ""
                    inputHastaCercano.classList.remove("is-invalid")
                }


            } else {
                // 1.9 Cuando se selecciona un servicio y no se tiene fechaDesde se resetea la inputHasta
                inputHastaCercano.value = ""
                inputDesdeCercano.classList.remove("is-invalid")
            }

        } else {
            // si no hay servicio seleccionado y se tiene seleccionada una fechaDesde 
            if (inputDesdeCercano.value != "") {
                $(this.inputsDesde).siblings(".invalid-feedback").text(`Debes seleccionar un servicio antes de elegir una fecha de inicio`)
                $(this.inputsDesde).addClass("is-invalid")

            } else {
                // 1.9 cuando se borra el inputDesde y no se tiene seleccionado un servicio es necesario quitar el mensaje de invalid en caso de que se esté mostrando
                if (inputDesdeCercano.matches(".is-invalid")) {
                    inputDesdeCercano.classList.remove("is-invalid")
                }
                $(this.inputsDesde).siblings(".invalid-feedback").text(`La fecha elegida debe ser mayor a las ${funcUsuarios.generarFechaMinAlojamiento().replace("T", " ")} y estar entre las 07:00-23:59`)
            }


            $(this.inputsDesde).attr("min", funcUsuarios.generarMinAlojamientoInputHasta())

            // se reinicia la fecha hasta
            $(this.inputsHasta).val("")
            $(this.inputsHasta).prop("disabled", true)
            $(this.inputsHasta).prop("readonly", false)
            $(this.inputsHasta).removeClass("is-invalid")
            $(this.inputsHasta).attr("min", funcUsuarios.generarMinAlojamientoInputHasta(inputDesdeCercano.value))

            $(this.inputsHasta).siblings(".invalid-feedback").text(`La fecha elegida debe ser mayor a las ${funcUsuarios.generarFechaMinAlojamiento().replace("T", " ")} y estar entre las 07:00-23:59`)
        }
    }

    // cuando cambia la fecha del inputHasta se validará si cumple su maximo o minimo
    async validarFechasInputHasta(inputHasta) {
        if (!inputHasta.disabled) {
            const servicioSeleccionado = this.serviciosActuales[inputDesde.closest("form").querySelector(".selectServicios").value]


            // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
            if (servicioSeleccionado == "Alojamiento") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaAlojamiento(inputHasta)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (servicioSeleccionado == "Guardería") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (servicioSeleccionado == "Paseo") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }
        }
    }

    // quitar o poner clase active a los botones checkbox
    focusBotones(inputTarget) {

        if (inputTarget.parentNode.classList.contains("active")) {
            // desasignar active al button seleccionado
            inputTarget.parentNode.classList.remove("active")
        } else {
            // asignar active al button seleccionado
            inputTarget.parentNode.classList.add("active")
        }
    }

    // evento para los formularios de filtrar
    eventoFiltrar() {
        for (let formulario of this.formularios) {
            formulario.addEventListener("submit", function (e) {
                e.preventDefault()
                e.stopPropagation()

                scrollTo({
                    top: 0,
                    behavior: "smooth"
                })

                if (e.target.checkValidity()) {
                    e.target.classList.remove("was-validated")
                    // guardar filtros y seleccionar filtros, obtener cuidadores, actualizar poblacion 
                    this.guardarFiltrosForm(e.target)

                    // resetear el formulario teniendo guardados ya los filtros
                    e.target.reset()

                    // resetear los inputs que son en forma de botón
                    $(".inputBtn").removeClass("active")
                    this.obtenerYMostrarCuidadores()
                    this.obtenerPoblaciones()
                    this.seleccionarFiltros()

                    // resetear paginado 
                    this.resetarValorPaginado()

                } else {
                    e.target.classList.add("was-validated")
                }
            }.bind(this))

            // para el evento filtrar del modal formato movil
            let botonesLimpiar = Array.from(document.querySelectorAll(".btnLimpiar"))
            for (let btn of botonesLimpiar) {
                if (btn.closest("form") == formulario || btn.parentElement.matches(".modal-footer")) {
                    // al hacer click en limpiar se resetea y se filtra
                    // debe hacerse así y no con el evento reset porque al filtrar también se resetea el formulario y al filtrar entra también en el evento reset
                    btn.addEventListener("click", function (e) {

                        scrollTo({
                            top: 0,
                            behavior: "smooth"
                        })
                        this.resetearFormulario(formulario)
                        this.guardarFiltrosForm(formulario)
                        this.obtenerYMostrarCuidadores()
                        this.obtenerPoblaciones()

                        // resetear paginado 
                        this.resetarValorPaginado()
                    }.bind(this, formulario))
                }
            }
        }
    }

    // seleccionar los filtros si se ha recargado o se viene del inicio
    seleccionarFiltros() {
        // orden 
        const selectOrden = document.querySelectorAll(".select-orden")
        const ordenarSeleccionado = parseInt(this.filtros.ordenar) - 1
        selectOrden[0][ordenarSeleccionado].selected = true
        selectOrden[1][ordenarSeleccionado].selected = true


        // servicios
        if (this.servicio) {

            // sacar el servicio actual con ese id
            switch (this.servicio) {
                case "Alojamiento":
                    this.selectServicios[0][1].selected = true
                    this.selectServicios[1][1].selected = true
                    break
                case "Guardería":
                    this.selectServicios[0][2].selected = true
                    this.selectServicios[1][2].selected = true
                    break
                case "Paseo":
                    this.selectServicios[0][3].selected = true
                    this.selectServicios[1][3].selected = true
                    break
            }
        }

        const btnsGato = document.querySelectorAll(".btn-gato")

        // cuidar gatos
        if (this.filtros.cuidgato && this.filtros.cuidgato != 0) {
            btnsGato[0].checked = true
            btnsGato[1].checked = true
            btnsGato[0].parentNode.classList.add("active")
            btnsGato[1].parentNode.classList.add("active")
        } else {
            btnsGato[0].parentNode.classList.remove("active")
            btnsGato[1].parentNode.classList.remove("active")
        }

        const btnsPerro = document.querySelectorAll(".btn-perro")

        // cuidar perros
        if (this.filtros.cuidperro && this.filtros.cuidperro != 0) {
            btnsPerro[0].checked = true
            btnsPerro[1].checked = true
            btnsPerro[0].parentNode.classList.add("active")
            btnsPerro[1].parentNode.classList.add("active")
        } else {
            btnsPerro[0].parentNode.classList.remove("active")
            btnsPerro[1].parentNode.classList.remove("active")
        }


        // fecha de inicio
        if (this.filtros.calfechinicio && this.filtros.calfechinicio != 0 && this.filtros.calfechinicio != "") {
            this.inputsDesde[0].value = this.filtros.calfechinicio
            this.inputsDesde[1].value = this.filtros.calfechinicio
        }

        // 1.9 Cuando ya se ha colocado la fecha de inicio se valida la misma dependiendo del serivicio seleccionado
        this.validarServiciosInputDesde(this.selectServicios[0])
        this.validarServiciosInputDesde(this.selectServicios[1])

        // 1.9 Cuando el servicio seleccionado es ninguno o alojamiento no se inserta una fecha de finalizacion, por lo que si aun no hay ninguna insertada se pone la que esté guardada en los filtros
        if (this.filtros.calfechfin && this.filtros.calfechfin != 0 && this.filtros.calfechfin != "") {
            if (!this.inputsHasta[0].value || this.inputsHasta[0].value == "") {
                this.inputsHasta[0].value = this.filtros.calfechfin
            }
            if (!this.inputsHasta[1].value || this.inputsHasta[1].value == "") {
                this.inputsHasta[1].value = this.filtros.calfechfin
            }
        }

        // cuidadores en
        if (this.filtros.donde && this.filtros.donde != 0) {
            this.inputsDonde[0].value = this.filtros.donde
            this.inputsDonde[1].value = this.filtros.donde
        }

        //precio
        if (this.filtros.precio) {
            const inputsPrecio = document.querySelectorAll(".inputPrecio")
            inputsPrecio[0].value = this.filtros.precio
            inputsPrecio[1].value = this.filtros.precio
        }

        // edad
        const inputsAdulto = document.querySelectorAll(".inputAdulto")
        if (this.filtros.adulto) {
            inputsAdulto[0].checked = true
            inputsAdulto[1].checked = true
            inputsAdulto[0].parentNode.classList.add("active")
            inputsAdulto[1].parentNode.classList.add("active")
        } else {
            inputsAdulto[0].parentNode.classList.remove("active")
            inputsAdulto[1].parentNode.classList.remove("active")
        }

        const inputsCachorro = document.querySelectorAll(".inputCachorro")
        if (this.filtros.cachorro) {
            inputsCachorro[0].checked = true
            inputsCachorro[1].checked = true
            inputsCachorro[0].parentNode.classList.add("active")
            inputsCachorro[1].parentNode.classList.add("active")
        } else {
            inputsCachorro[0].parentNode.classList.remove("active")
            inputsCachorro[1].parentNode.classList.remove("active")
        }

        // tamaño
        const inputsEnorme = document.querySelectorAll(".inputEnorme")
        if (this.filtros.perroenorme) {
            inputsEnorme[0].checked = true
            inputsEnorme[1].checked = true
            inputsEnorme[0].parentNode.classList.add("active")
            inputsEnorme[1].parentNode.classList.add("active")
        } else {
            inputsEnorme[0].parentNode.classList.remove("active")
            inputsEnorme[1].parentNode.classList.remove("active")
        }

        const inputsGrande = document.querySelectorAll(".inputGrande")
        if (this.filtros.perrogrande) {
            inputsGrande[0].checked = true
            inputsGrande[1].checked = true
            inputsGrande[0].parentNode.classList.add("active")
            inputsGrande[1].parentNode.classList.add("active")
        } else {
            inputsGrande[0].parentNode.classList.remove("active")
            inputsGrande[1].parentNode.classList.remove("active")
        }

        const inputsMediano = document.querySelectorAll(".inputMediano")
        if (this.filtros.perromediano) {
            inputsMediano[0].checked = true
            inputsMediano[1].checked = true
            inputsMediano[0].parentNode.classList.add("active")
            inputsMediano[1].parentNode.classList.add("active")
        } else {
            inputsMediano[0].parentNode.classList.remove("active")
            inputsMediano[1].parentNode.classList.remove("active")
        }

        const inputsPequeno = document.querySelectorAll(".inputPequeno")
        if (this.filtros.perropequeno) {
            inputsPequeno[0].checked = true
            inputsPequeno[1].checked = true
            inputsPequeno[0].parentNode.classList.add("active")
            inputsPequeno[1].parentNode.classList.add("active")
        } else {
            inputsPequeno[0].parentNode.classList.remove("active")
            inputsPequeno[1].parentNode.classList.remove("active")
        }

        const inputsToy = document.querySelectorAll(".inputToy")
        if (this.filtros.perrotoy) {
            inputsToy[0].checked = true
            inputsToy[1].checked = true
            inputsToy[0].parentNode.classList.add("active")
            inputsToy[1].parentNode.classList.add("active")
        } else {
            inputsToy[0].parentNode.classList.remove("active")
            inputsToy[1].parentNode.classList.remove("active")
        }


        // tiene jardin
        if (this.filtros.jardin) {
            const checksJardin = document.querySelectorAll(".checkJardin")
            checksJardin[0].checked = true
            checksJardin[1].checked = true
        }

        // es casa de no fumadores
        if (this.filtros.fumadores) {
            const checksFumadores = document.querySelectorAll(".checkFumadores")
            checksFumadores[0].checked = true
            checksFumadores[1].checked = true
        }
        // Pueden subir a la cama
        if (this.filtros.cama) {
            const checksCama = document.querySelectorAll(".checkCama")
            checksCama[0].checked = true
            checksCama[1].checked = true
        }

        // Pueden subir a los muebles
        if (this.filtros.muebles) {
            const checksMuebles = document.querySelectorAll(".checkMuebles")
            checksMuebles[0].checked = true
            checksMuebles[1].checked = true
        }
        // tamaño casa
        if (this.filtros.tamanocasa) {
            switch (this.filtros.tamanocasa) {
                case "P":
                    const radiosPequena = document.querySelectorAll(".radioPequena")
                    radiosPequena[0].checked = true
                    radiosPequena[1].checked = true
                    break;
                case "M":
                    const radiosMediana = document.querySelectorAll(".radioMediana")
                    radiosMediana[0].checked = true
                    radiosMediana[1].checked = true
                    break;
                case "G":
                    const radiosGrande = document.querySelectorAll(".radioGrande")
                    radiosGrande[0].checked = true
                    radiosGrande[1].checked = true
                    break;
            }
        }

        // no niños en casa
        if (this.filtros.noninos) {
            const noNinosChecks = document.querySelectorAll(".noNinosCheck")
            noNinosChecks[0].checked = true
            noNinosChecks[1].checked = true
        }

        // no de menos de 12 anos en casa
        if (this.filtros.ninosmenos) {
            const ninosMenosChecks = document.querySelectorAll(".ninosMenosCheck")
            ninosMenosChecks[0].checked = true
            ninosMenosChecks[1].checked = true
        }

        // no de mas de 12 anos en casa
        if (this.filtros.ninosmas) {
            const ninosMasChecks = document.querySelectorAll(".ninosMasCheck")
            ninosMasChecks[0].checked = true
            ninosMasChecks[1].checked = true
        }

        // hay perros
        if (this.filtros.hayperros) {
            const checksHayPerros = document.querySelectorAll(".checkHayPerros")
            checksHayPerros[0].checked = true
            checksHayPerros[1].checked = true
        }

        // hay gatos
        if (this.filtros.haygatos) {
            const checksHayGatos = document.querySelectorAll(".checkHayGatos")
            checksHayGatos[0].checked = true
            checksHayGatos[1].checked = true
        }

        // acepta perros no castrados
        if (this.filtros.perroscastr) {
            const checksPerroCastr = document.querySelectorAll(".checkPerroCastr")
            checksPerroCastr[0].checked = true
            checksPerroCastr[1].checked = true
        }

        // acepta perras no esterilizadas
        if (this.filtros.perrasester) {
            const checksPerraEster = document.querySelectorAll(".checkPerraEster")
            checksPerraEster[0].checked = true
            checksPerraEster[1].checked = true
        }

        // acepta gatos no castrados
        if (this.filtros.gatoscastr) {
            const checksGatoCastr = document.querySelectorAll(".checkGatoCastr")
            checksGatoCastr[0].checked = true
            checksGatoCastr[1].checked = true
        }

        // acepta gatas no esterilizadas
        if (this.filtros.gatasester) {
            const checksGataEster = document.querySelectorAll(".checkGataEster")
            checksGataEster[0].checked = true
            checksGataEster[1].checked = true
        }

        // tiene coche
        if (this.filtros.coche) {
            const checksCoche = document.querySelectorAll(".checkCoche")
            checksCoche[0].checked = true
            checksCoche[1].checked = true
        }

        if (this.filtros.medoral) {
            const checksMedOral = document.querySelectorAll(".checkMedOral")
            checksMedOral[0].checked = true
            checksMedOral[1].checked = true
        }

        if (this.filtros.medinyec) {
            const checksMedInyec = document.querySelectorAll(".checkMedInyec")
            checksMedInyec[0].checked = true
            checksMedInyec[1].checked = true
        }

        if (this.filtros.ejercicio) {
            const checksEjercicio = document.querySelectorAll(".checkEjercicio")
            checksEjercicio[0].checked = true
            checksEjercicio[1].checked = true
        }
    }

    // mostrar spinner personalizado que se encuentra en el contenedor de cuidadores
    mostrarSpinnerContCuid() {
        const spinnerContCuid = document.querySelector("#spinnerCuidadores")
        const main = document.querySelector("main")

        main.classList.add("no-scroll")
        spinnerContCuid.classList.remove("d-none")
        scrollTo(top)
    }

    // ocultar el spinner del contenedor cuidadores
    ocultarSpinnerContCuid() {
        const spinnerContCuid = document.querySelector("#spinnerCuidadores")
        const main = document.querySelector("main")

        main.classList.remove("no-scroll")
        spinnerContCuid.classList.add("d-none")

        // hacer que vuelva al top de la página porque se han actualizado los cuidadores
        setTimeout(function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        }, 400)
    }

    // guardar los filtros en session y en this.filtros
    setFiltros(filtros) {
        sessionStorage.setItem("filtros", JSON.stringify(filtros))
        this.filtros = filtros
    }

    // obtener filtros desde session
    getFiltrosSession() {
        return JSON.parse(sessionStorage.getItem("filtros"))
    }

    // obtener filtros de los parametros de url o de session
    obtenerFiltrosUrloSession(filtros) {
        const filtrosSession = this.getFiltrosSession()

        // si todos los filtros de url son 0 significa que no se viene del inicio
        if (Object.values(filtros).some(elemento => elemento != 0) && (filtrosSession.vieneDeInicio == undefined || filtrosSession.vieneDeInicio == true)) {

            // se annade atributo para identificar que se viene del inicio, cuando recarge la pagina si está a true cogerá los atributos de session y no de la url
            filtros.vieneDeInicio = false

            // combinar los filtros de inico con los de session
            filtros = Object.assign({}, filtrosSession, filtros)
            this.setFiltros(filtros)
        } else {

            // si los filtros de session no existen, colocar los default
            if (filtrosSession) {
                this.filtros = filtrosSession
            } else {
                this.setFiltrosDefaultSession()
            }

        }
    }

    // guardar filtros al filtrar desde la pagina
    guardarFiltrosForm(formulario) {
        let filtros = {}
        for (let elemento of formulario.elements) {
            if (elemento.checkValidity()) {

                if (elemento.type == "checkbox" || elemento.type == "radio") {
                    if (elemento.checked) {
                        filtros[elemento.name] = elemento.value
                    }

                } else if (elemento.nodeName == "INPUT" && elemento.value != "") {
                    filtros[elemento.name] = elemento.value
                } else if (elemento.nodeName == "SELECT") {

                    // obtener el option selecciondo
                    let option = elemento.options[elemento.selectedIndex]

                    // guadar filtro obteniendo el name del select y el valor del option
                    filtros[elemento.name] = option.value
                }
            }
        }
        this.setFiltros(filtros)
        // almacenar el servicio que se está seleccionando para filtrar
        this.setServicio(parseInt(this.filtros.servicio))
    }

    // resetear formulario manualmente ya que a veces no funciona
    resetearFormulario(formulario) {
        formulario.reset()
        // quitarle el valor al input precio precio
        $(".inputPrecio").val("")

        // resetear los inputs que son en forma de botón
        $(".inputBtn").removeClass("active")
        $(formulario.elements).prop("checked", false)

        // deshabilitar los inputs hasta
        $(".inputHasta").prop("disabled", true)

        // si hay algun elemento con la clase invalid quitarseal
        $(formulario.elements).removeClass("is-invalid")
    }


    // desactivar el paginado o no dependiendo de la cantidad de cuidadores
    eventoDesactivarPaginado() {
        // Desactivar todos y activar solo paginacion1
        $(this.paginacion).children(".page-item").addClass("noclickPaginacion").removeClass("paginacionSelec")

        if (this.stepPaginado == 0) {
            this.paginacion1.classList.add("paginacionSelec")
        } else if (this.stepPaginado == 1) {
            this.paginacion2.classList.add("paginacionSelec")
        } else if (this.stepPaginado == 2) {
            this.paginacion3.classList.add("paginacionSelec")
        }

        // si paginacion es mayor a 0 se abilita paginacionAnt
        if (this.stepPaginado > 0) {
            this.paginacionAnt.classList.remove("noclickPaginacion")
        }

        // si  quedan cuidadores por mostrar se activa paginacion siguiente
        // Cantidad cuidadores totales que se motrarían en la siguinte paginacion < totalCuidadores obtenido de BBDD    
        if (((this.stepPaginado + 1) * 6) < this.cantidadCuidadores) {
            this.paginacionSig.classList.remove("noclickPaginacion")
        }

        // si hay mas de 6 cuidadores activar paginacion2
        if (this.cantidadCuidadores > 6) {
            this.paginacion1.classList.remove("noclickPaginacion")
            this.paginacion2.classList.remove("noclickPaginacion")
        }

        // si hay mas de 12 cuidadores activar paginacion3 
        if (this.cantidadCuidadores > 12) {
            this.paginacion3.classList.remove("noclickPaginacion")
        }
    }

    // eventos click para el paginado
    eventosClickPaginado() {

        // paginacionAnt
        this.paginacionAnt.addEventListener("click", function (e) {
            if (!e.target.matches(".noclickPaginacion") || !e.target.parentElement.matches(".noclickPaginacion")) {
                this.setValorPaginado(parseInt(this.stepPaginado) - 1)
                this.paginarCuidadores()
            }
        }.bind(this))

        // paginacion1 solo estará disponible cuando sea step 1 o mas
        this.paginacion1.addEventListener("click", function (e) {
            if ((!e.target.matches(".noclickPaginacion") || !e.target.matches(".paginacionSelec") || !e.target.parentElement.matches(".noclickPaginacion") || !e.target.parentElement.matches(".paginacionSelec")) && this.stepPaginado != 0) {
                this.setValorPaginado(0)
                this.paginarCuidadores()
                this.paginacion1.classList.remove("paginacionSelec")
                e.target.classList.add("paginacionSelec")
            }
        }.bind(this))

        // click en paginacion2
        this.paginacion2.addEventListener("click", function (e) {
            if ((!e.target.matches(".noclickPaginacion") || !e.target.matches(".paginacionSelec") || !e.target.parentElement.matches(".noclickPaginacion") || !e.target.parentElement.matches(".paginacionSelec")) && this.stepPaginado != 1) {
                this.setValorPaginado(1)
                this.paginarCuidadores()
                this.paginacion1.classList.remove("paginacionSelec")
                e.target.classList.add("paginacionSelec")
            }
        }.bind(this))

        // paginacion3 (step 2*6= 12 cuidadores en reserva)
        this.paginacion3.addEventListener("click", function (e) {
            if ((!e.target.matches(".noclickPaginacion") || !e.target.matches(".paginacionSelec") || !e.target.parentElement.matches(".noclickPaginacion") || !e.target.parentElement.matches(".paginacionSelec")) && this.stepPaginado != 2) {
                this.setValorPaginado(2)
                this.paginarCuidadores()
                this.paginacion1.classList.remove("paginacionSelec")
                e.target.classList.add("paginacionSelec")
            }
        }.bind(this))

        // paginacionSig
        this.paginacionSig.addEventListener("click", function (e) {
            if (!e.target.matches(".noclickPaginacion") || !e.target.parentElement.matches(".paginacionSelec")) {
                this.setValorPaginado(parseInt(this.stepPaginado) + 1)
                this.paginarCuidadores()
            }
        }.bind(this))

    }
    // obtener cuidadores que cumplan los filtros para la paginacion
    async obtenerCantidadCuidadores() {
        const url = base_url + "Inicio_c/obtenerCantidadCuidadores"
        const formData = new FormData()

        // recorrer parametros e incluirlos en el formData
        for (let clave in this.filtros) {
            if (parseInt(this.filtros[clave]) != 0 && clave != "vieneDeInicio") {
                formData.append(clave, this.filtros[clave].replace("_", " "))
            }
        }

        this.cantidadCuidadores = funcDefault.llamadaAJAXAsync(url, formData)
    }

    // asiganar número de cuidadores respecto al total que están siendo motrados
    setValorPaginado(nuevoValor) {

        // si no trae valor resetear 
        if (nuevoValor) {
            this.stepPaginado = nuevoValor
            sessionStorage.setItem("valorPaginado", JSON.stringify(this.stepPaginado.toString()))
        } else {
            this.resetarValorPaginado()
        }
    }

    // obtener el valor del paginado
    getValorPaginado() {
        const valorSession = JSON.parse(sessionStorage.getItem("valorPaginado"))

        // si valorPaginado no se encuentra o está vacío, asignar 0
        if (!valorSession || valorSession.trim() == "") {
            this.resetarValorPaginado()
        } else {
            this.stepPaginado = parseInt(valorSession)
        }
    }

    // obtener cuidadores al hacer paginado
    paginarCuidadores() {
        scrollTo({
            top: 0,
            behavior: "smooth"
        })
        this.obtenerYMostrarCuidadores()
        this.obtenerPoblaciones()
    }

    // resetear el valor del paginado a 0
    resetarValorPaginado() {
        this.stepPaginado = 0
        sessionStorage.setItem("valorPaginado", JSON.stringify(this.stepPaginado.toString()))
    }


    // para casuistica de que se entra por primera vez y no hay filtros guardados en session
    setFiltrosDefaultSession() {
        let filtrosDefault = { servicio: "0", ordenar: "1" }
        this.setFiltros(filtrosDefault)
    }

    // guardar los filtros seleccionados al hacer irse de la pagina
    guardarFiltrosAlSalir() {
        addEventListener("beforeunload", function () {
            for (let formulario of this.formularios) {
                const estiloForm = window.getComputedStyle(formulario);
                const display = estiloForm.getPropertyValue('display');
                if (display != "none") {
                    this.guardarFiltrosForm(formulario)
                }
            }
        }.bind(this))
    }

    // mostrar el contador de los cuidadores
    async mostrarContadorCuidadores() {


        let cuidadoresMostrados = (this.stepPaginado + 1) * 6
        if (cuidadoresMostrados > this.cantidadCuidadores) {
            cuidadoresMostrados = this.cantidadCuidadores
        }
        const mensaje = `Mostrando ${cuidadoresMostrados} de ${this.cantidadCuidadores} cuidadores`
        this.contadorCuidadores.innerText = mensaje
    }
}

