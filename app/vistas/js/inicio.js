
var radiosBuscar = document.querySelectorAll("#inicioBuscar input[type=radio]")
var inputDesde = document.querySelector(".inputDesde")
var inputHasta = document.querySelector(".inputHasta")
var btnServicios = document.querySelectorAll(".servicio")
addEventListener("DOMContentLoaded", async function () {
    funcDefault.cambiarEstiloFooter()

    // obtener todas las poblaciones y añadirlas al datalist
    obtenerPoblaciones()

    // evento para los inputs date
    await eventosFechas()

    await reiniciarFiltros()


    // para los botones de mascota, poner como activo o no el boton padre que es lo que ve el usuario
    await activarODesactivarBtnMascota()

    async function activarODesactivarBtnMascota() {
        const btnMascotas = document.querySelectorAll(".btnMascota")
        for (let btn of btnMascotas) {

            // al hacer change deseleccionar 
            btn.addEventListener("change", function () {
                if (this.checked) {
                    this.parentElement.classList.add("active")
                } else {
                    this.parentElement.classList.remove("active")
                }


                // si el otro boton está activado desactivarlo
                Array.from(btnMascotas).filter(btn => btn != this && btn.checked).checked = false
            })
        }
    }


    // obtener poblaciones de la BBDD
    async function obtenerPoblaciones() {

        const url = base_url + "Inicio_c/obtenerPoblaciones"
        const formData = new FormData()
        await formarYañadirDatalist(await funcDefault.llamadaFetch(url, formData))
    }

    // datalist de poblaciones disponibles
    async function formarYañadirDatalist(poblaciones) {

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


    // intevenir envio de formulario 
    this.document.querySelector("#inicioBuscar").addEventListener("submit", function (e) {
        e.preventDefault()
        e.stopPropagation()

        if (this.checkValidity()) {

            let parametros = ``

            // Recorrer elementos del formulario que no sean submit y formar cadena de parametros
            for (let elementoForm of this.elements) {
                if (elementoForm.nodeName == "INPUT") {
                    // Quitar los espacios en blanco 
                    let valor = elementoForm.value.split(" ").join("_")


                    // inptuts chechbox seleccionados
                    if (elementoForm.value == "") {

                        parametros += `/0`
                    } else if ((elementoForm.type == "radio" || elementoForm.type == "checkbox") && !elementoForm.checked) {
                        parametros += `/0`
                    } else {

                        parametros += `/${valor}`

                    }
                }


            }
            funcDefault.redirigir("Inicio_c/buscarCuidador" + parametros)

        } else {
            this.classList.add("was-validated")
        }
    })


    // cuando cambia la fecha del inputDesde se validará el servicio seleccionado 
    async function validarFechasInputDesde() {
        // si  hay servicio seleccionado 
        const btnSeleccionado = Array.from(btnServicios).find(btn => btn.checked == true)
        if (btnSeleccionado && btnSeleccionado != null) {

            // 1.9 Si se modifica el inputDesde hay que reajustar el inputHasta dependiendo del servicio, basandose en la nueva fecha
            if (inputDesde.value != "") {
                let validacionDesdePasada = true
                let validacionHastaPasada = true

                inputHasta.classList.remove("is-invalid")
                inputDesde.classList.remove("is-invalid")


                // 1.9 Debido a que ha cambiado el inputDesde se debe quitar mensaje de error de inputHasta si lo tiene
                if (inputHasta.matches(".is-invalid")) {
                    inputHasta.classList.remove("is-invalid")
                }

                // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
                if (btnSeleccionado.id == "btn-alojamiento") {
                    inputHasta.readonly = false
                    inputHasta.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                    inputHasta.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputHasta.min.replace("T", " ")} y estar entre las 07:00 y 23:59`

                    validacionDesdePasada = funcUsuarios.validarFechaGuarPaseoInputDesde(inputDesde)
                    if (inputHasta.value != "") {
                        validacionHastaPasada = funcUsuarios.validarFechaGuarPaseoInputHasta(inputHasta)
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
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.disabled = true
                    inputHasta.value = ""
                    inputDesde.classList.add("is-invalid")
                    inputHasta.classList.remove("is-invalid")
                    return
                }

                if (validacionHastaPasada) {
                    inputHasta.classList.remove("is-invalid")

                    // en guarderia y paseo al inputHasta se le pone un valor, por lo que es necesario guardar el nuevoDia en el flujo
                    if (btnSeleccionado.id != "btn-alojamiento") {
                        await validarFechasInputHasta(inputHasta)
                    }
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            } else {

                // si el inputDesde no contiene valor se resetea el inputHasta
                inputHasta.value = ""
                inputHasta.disabled = true
                inputHasta.readonly = false
                inputHasta.classList.remove("is-invalid")
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
        }
    }

    // cuando cambia el servicio seleccionado se valida el valor del servicio y del inputDesde más cercano
    async function validarServiciosInputDesde(btn) {

        // si el btn esta seleccionado
        if (btn.checked) {
            // 1.9 Siempre que se cambie de servicio hay que reajustar el inputHasta

            // 1.9 Alojamiento tiene que estar entre las 7:00 am y 23:59
            if (btn.id == "btn-alojamiento") {
                inputDesde.min = funcUsuarios.generarFechaMinAlojamiento()
                inputDesde.nextElementSibling.innerText = `La fecha elegida debe ser mayor a las ${inputDesde.min.replace("T", " ")} y estar entre las 07:00-23:59`
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btn.id == "btn-guarderia") {

                // 1.9 La hora minima para el inputDesde son las 07:00
                inputDesde.min = funcUsuarios.generarFechaMinGuarderiaYPaseoInputDesde()
                inputDesde.nextElementSibling.innerText = `Máximo 10 horas, la fecha elegida debe de estar entre las ${inputDesde.min.replace("T", " ")} y las  18:30`
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btn.id == "btn-paseo") {

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
                        inputHasta.readonly = false
                        inputHasta.disabled = false
                        inputHasta.min = funcUsuarios.generarMinAlojamientoInputHasta(inputDesde.value)
                        inputHasta.max = ""
                        inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHasta.min.replace("T", " ")}  y estar entre las 07:00-23:59`
                    }

                    // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
                    if (btn.id == "btn-guarderia") {
                        inputHasta.readonly = false
                        inputHasta.disabled = false
                        // 1.9 Al cambiar de servicio al inputHasta se le pone la fecha máxima que se puede seleccionar, el usuario decidirá si quiere menos
                        inputHasta.max = funcUsuarios.generarFechaMaxGuarderiaInputHasta(inputDesde.value)
                        inputHasta.value = inputDesde.max

                        // 1.9 La fecha minima hasta será 1 hora mas que fecha desde
                        inputHasta.min = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                        inputHasta.nextElementSibling.innerText = `La fecha elegida debe de estar entre las ${inputHasta.min.replace("T", " ")} y ${inputHasta.max.replace("T", " ")} `
                    }

                    // 1.9 Para paseo el horario es de 7:00 am a 19:30, y el servicio dura siempre el mismo tiempo
                    if (btn.id == "btn-paseo") {
                        inputHasta.readonly = true
                        inputHasta.disabled = false
                        // 1.9 La fecha minima y maxima  será la misma, 1 hora mas que fecha desde
                        inputHasta.value = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                        inputHasta.max = funcUsuarios.generarFechaMinYMaxGuardYPaseoInputHasta(inputDesde.value)
                        inputHasta.min = inputHasta.max
                        inputHasta.nextElementSibling.innerText = `El paseo dura siempre una hora, la fecha debe ser ${inputHasta.min.replace("T", " ")} `
                    }

                    await validarFechasInputHasta()
                } else {

                    // 1.9 si inputdesde se modifica pero sale fuera de los rangos de min y max, mostrar alerta y resetear inputHasta
                    inputDesde.classList.add("is-invalid")
                    inputHasta.value = ""
                    inputHasta.classList.remove("is-invalid")
                }
            } else {

                // 1.9 Cuando se selecciona un servicio y no se tiene fechaDesde se resetea la inputHasta
                inputHasta.value = ""
                inputDesde.classList.remove("is-invalid")
            }

        } else {


            // si no hay servicio seleccionado y se tiene seleccionada una fechaDesde 
            if (!Array.from(btnServicios).some(btn => btn.checked == true)) {
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
            }
        }
    }

    // cuando cambia la fecha del inputHasta se validará si cumple su maximo o minimo
    async function validarFechasInputHasta() {
        if (!inputHasta.disabled) {
            const btnSeleccionado = Array.from(btnServicios).find(btn => btn.checked == true)

            // 1.9 Para alojamiento la fecha minima del inputHasta tiene que ser de 1 dia mas
            if (btnSeleccionado.id == "btn-alojamiento") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaAlojamiento(inputHasta)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btnSeleccionado.id == "btn-guarderia") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }

            // 1.9 Para guardería el horario es de 7:00 am a 19:30 con un máximo de 10 horas
            if (btnSeleccionado.id == "btn-paseo") {
                if (inputHasta.value == "" || funcUsuarios.validarFechaMayorYMenor(inputHasta.value, inputHasta.min, inputHasta.max)) {
                    inputHasta.classList.remove("is-invalid")
                } else {
                    inputHasta.classList.add("is-invalid")
                }
            }
        }
    }

    // eventos para los botones de servicios y para los inputs desde, para tratar las dos casuisticas para el input hasta
    async function eventosFechas() {

        for (let btn of btnServicios) {
            // detectar cuando se seleccionar un servicio y modificar el precio
            btn.addEventListener("change", async function (e) {

                // ejecutar la función para las fechas
                await validarServiciosInputDesde(this)

                // hacer que se pueda deseleccionar el tipo de servicio
                await deseleccionarTipoServicio(this)

                // 1.8 asignar la clase active o quitarsela al boton padre del input que ha sido modificado
                await activarBtnPadreServicio(this)
            })
        }

        inputDesde.addEventListener("change", async function (e) {
            await validarFechasInputDesde()
        })

        // 1.9 para los inputHasta al cambiar se valida que cumpla la fecha máxima y minima
        inputHasta.addEventListener("change", async function (e) {
            await validarFechasInputHasta()
        })
    }


    // hacer que se pueda deseleccionar el tipo de servicio elegido
    async function deseleccionarTipoServicio(btn) {

        // si está seleccionado convertir a checkbox para que luego pueda ser deseleccionado
        if (btn.checked) {
            btn.type = "checkbox"

            // 1.8 servicios seleccionados distintos al seleccionado actualmente
            const btnServiciosActivados = Array.from(btnServicios).filter(elemento => (elemento != btn && elemento.checked))
            if (btnServiciosActivados.length > 0) {
                $(btnServiciosActivados).prop("checked", false)
                $(btnServiciosActivados).attr("type", "radio")

                // quitar el active al boton padre
                $(btnServiciosActivados).parent("button").removeClass("active")
            }
        } else {
            btn.type = "radio"
        }
    }

    // 1.8 asignar la clase active o quitarsela al boton padre del input que ha sido modificado
    async function activarBtnPadreServicio(inputTarget) {

        if (inputTarget.parentNode.classList.contains("active")) {
            // desasignar active al button seleccionado
            inputTarget.parentNode.classList.remove("active")
        } else {
            // asignar active al button seleccionado
            inputTarget.parentNode.classList.add("active")
        }
    }

    // cuando se regresa a inicio se reinicia atributo vieneDeInicio de los filtros, asi si se podra volver a filtrar desde el inicio
    async function reiniciarFiltros() {
        const filtrosSession = JSON.parse(sessionStorage.getItem("filtros"))
        filtrosSession.vieneDeInicio = true
        sessionStorage.setItem("filtros", JSON.stringify(filtrosSession))
    }
})






