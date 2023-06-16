class ClassRegistro {

    // PROPIEDADES 
    formulario // formulario de la ventana
    filas = [] // sections de la vista "terminarRegistro"
    formElements // inputs del formulario
    inputUsuario
    inputEmail
    inputsContrasena
    inputDni
    // constructor
    constructor() {
        this.formulario = $("form")
        this.formElements = document.querySelector("form").elements

        // llamar al evento focus cuando se declara la clase
        this.eventoFocusInputs()
    }


    // validar si el input es válido o inválido, si requiere se hace llamada AJAX
    async eventoBlurInput(input, textVacio, textInvalid, textExiste = null, nameInput = null) {
        if (input.checkValidity()) {
            switch (nameInput) {
                case "usuario":
                    if (await this.validarUsuario())
                        await this.mostrarInvalidText(input, textExiste)
                    else input.classList.add("is-valid")
                    break;
                case "email":
                    if (await this.validarEmail())
                        await this.mostrarInvalidText(input, textExiste)
                    else input.classList.add("is-valid")
                    break;
                case "contrasenna":
                    let confcontrasenna = document.getElementById("confcontrasenna")
                    let contrasenna = document.getElementById("contrasenna")
                    if (contrasenna.checkValidity() && confcontrasenna.checkValidity()) {
                        if (await this.verificarContrasenna() == false) {
                            await this.mostrarInvalidText(confcontrasenna, textExiste)
                        } else {
                            contrasenna.classList.add("is-valid")
                            confcontrasenna.classList.remove("is-invalid")
                            confcontrasenna.classList.add("is-valid")
                        }
                    }
                    break;
                case "dni":
                    if (await this.validarDni())
                        await this.mostrarInvalidText(input, textExiste)
                    else input.classList.add("is-valid")
                    break;
                default:
                    input.classList.add("is-valid")
                    break;
            }


        } else if (!input.checkValidity()) {
            // true-> vacío  false->no válido  
            let inputVacio = this.checkearInputVacio(input)

            if (inputVacio) {
                // está vacío
                await this.mostrarInvalidText(input, textVacio)
                //  no cumple con el formato
            } else {
                await this.mostrarInvalidText(input, textInvalid)
            }
        }
    }

    // quitarle las clases "is-valid" e "is-invalid" a los inputs al hacer foco sobre ellos
    eventoFocusInputs() {
        let form = this.formulario

        // Evento para todos los inputs, quitarle validacion al hacer focus 
        for (let elementoForm of this.formElements) {
            if (elementoForm.type != "submit") {
                elementoForm.addEventListener("focus", function (e) {
                    form.removeClass("was-validated")
                    this.classList.remove("is-valid")
                    this.classList.remove("is-invalid")
                })
            }
        }
    }

    // asignar el texto al div invalid-feedback
    async mostrarInvalidText(input, texto) {
        input.parentElement.lastElementChild.innerHTML = texto
        input.classList.add("is-invalid")
    }


    // checkear que los inputs están vacios
    checkearInputVacio(input) {
        // Si está vacío devuelve 0 
        return input.value.length == 0
    }


    // FUNCIONES PRIMER PASO DEL REGISTRO 

    // validar que no existe el usuario 
    async validarUsuario() {
        // url llamda fetch 
        const url = base_url + "Registro_c/verificarUser";

        // Creación del formData 
        const formData = new FormData()

        // Añadir input usuario 
        formData.append("usuario", this.inputUsuario.value)
        return await funcDefault.llamadaFetch(url, formData)
    }

    // validar que no existe el email
    async validarEmail() {
        // url llamda fetch 
        const url = base_url + "Registro_c/verificarEmail";

        // Creación del formData 
        const formData = new FormData()

        // Añadir input email 
        formData.append("email", this.inputEmail.value)

        return await funcDefault.llamadaFetch(url, formData)
    }

    // evento mostrar contrasenna al hacer click en el icono
    mostrarContra() {
        // evento para ver la contrasenna 
        let iconosList = document.querySelectorAll("input[type=password] ~ div")

        for (let icono of iconosList) {
            $(icono).on("click", function () {
                // input password
                let inputPassword = this.previousElementSibling

                // cambiar type 
                if (inputPassword.type == "password")
                    inputPassword.type = "text"
                else inputPassword.type = "password"
            })


        }
    }

    // verificar con la confirmación de contrasenna es igual que la contrasenna
    async verificarContrasenna() {
        // contrasenna
        let contrasenna = document.getElementById("contrasenna")

        // copia de contrasenna
        let confcontrasenna = document.getElementById("confcontrasenna")

        if (contrasenna.value == confcontrasenna.value) {
            return true
        } else {
            return false
        }
    }

    // validaro que ningún usuario del mismo tipo tiene el mismo dni
    async validarDni() {
        // contrasenna  // url llamda fetch 
        const url = base_url + "Registro_c/verificarDni";

        // Creación del formData 
        const formData = new FormData()

        // Añadir input dni 
        formData.append("dni", this.inputDni.value)

        return await funcDefault.llamadaFetch(url, formData)
    }

    // *FIN FUNCIONES PRIMER PASO DEL REGISTRO*


    // FUNCIONES PASO ELEGIR SERVICIOS DEL REGISTRO CUIDADORES

    // le llega el data-fila del contenedor, recorre sus input checkbox y los valida, si no hay ninguno seleccionado muestra mensaje de error
    validarCheckboxs(dataFila) {

        // checkbox del contenedor con ese id 
        let inputsCheck = document.querySelectorAll(`#${dataFila} input[type=checkbox]`)

        // bucle para evento change de los inputs chechbox
        let contChecked = 0
        for (let checkbox of inputsCheck) {
            if (checkbox.checked) {
                contChecked++
                break
            }
        }

        //0-> ninguno checkeado 1-> 1 o más cheackeados
        if (contChecked == 0) {
            document.querySelector(`#${dataFila} input[type=hidden]`).classList.remove("is-valid")
            document.querySelector(`#${dataFila} input[type=hidden]`).classList.add("is-invalid")
            let contenedorScroll = document.getElementById(dataFila)
            let posicionY = contenedorScroll.getBoundingClientRect().top;

            scrollBy(0, posicionY - 250)
            return false
        } else {
            return true
        }
    }

    // recorrer los hijos que son section, coger el data-fila y guardarlo en el array de filas
    setFilas() {
        let filas = this.filas

        $.each($("form section"), function () {
            filas.push(this.id)
        })
    }


    // devuelve true si no se puede continuar con el submit porque alguna fila requerida no está seleccionada
    validarFilasCheck() {
        for (let dataFila of this.filas) {
            let hayInputChecked = this.validarCheckboxs(dataFila)
            if (!hayInputChecked) {
                return true
            }
        }
    }

    // crear los eventos change de las filas
    crearEventoChange(id) {
        // checkbox del contenedor con ese id 
        let inputsCheck = document.querySelectorAll(`#${id} input[type=checkbox]`)

        // bucle para evento change de los inputs chechbox
        for (let checkboxChange of inputsCheck) {

            checkboxChange.addEventListener("change", function (e) {

                // activar o desactivar los inputs precio de la fila de servicios
                if (id == "servicios") {
                    if (e.target.checked)
                        this.activarPrecios(e.target)
                    else this.desactivarPrecios(e.target)
                }

                let contChecked = 0

                // bucle para validar si alun input está chekeado
                for (let checkbox of inputsCheck) {
                    if (checkbox.checked) {
                        contChecked++
                        break
                    }
                }

                //si nungún input está checkeado se muestra mensaje de error
                if (contChecked == 0) {
                    document.querySelector(`#${id} input[type=hidden]`).classList.remove("is-valid")
                    document.querySelector(`#${id} input[type=hidden]`).classList.add("is-invalid")

                } else {
                    document.querySelector(`#${id} input[type=hidden]`).classList.remove("is-invalid")
                    document.querySelector(`#${id} input[type=hidden]`).classList.add("is-valid")
                }
            }.bind(this)
            )
        }
    }

    // crear eventos change de los inputs de todas las filas
    crearEventoFilas() {
        // crear array de las filas
        this.setFilas()

        for (let idFila of this.filas) {
            this.crearEventoChange(idFila)
        }
    }

    // activar los inputs de precio cuando se hace selecciona un servicio
    activarPrecios(checkbox) {

        // seleccionar id del contenedor de los precios
        let contenedorPrecios = checkbox.parentElement.nextElementSibling.id

        // seleccionar los inputs del contendor
        let inputsPrecios = document.querySelectorAll(`#${contenedorPrecios} input`)

        // recorrer objeto y quitarles el disabled
        for (let input of inputsPrecios) {
            input.disabled = false
        }

    }

    // descactivar los inputs de precio cuando se hace selecciona un servicio
    desactivarPrecios(checkbox) {
        // seleccionar id del contenedor de los precios
        let contenedorPrecios = checkbox.parentElement.nextElementSibling.id

        // seleccionar los inputs del contendor
        let inputsPrecios = document.querySelectorAll(`#${contenedorPrecios} input`)

        // recorrer objeto y quitarles el disabled
        for (let input of inputsPrecios) {
            // eliminar clases "invalid", "valid" y desactivar
            input.classList.remove("is-invalid")
            input.classList.remove("is-valid")
            input.disabled = true
        }
    }

    // validar que los inputs de precio cumple la validaciones
    validarPrecios(inputsPrecios) {

        for (let input of inputsPrecios) {
            input.addEventListener("blur", function (e) {
                if (!this.checkValidity()) {
                    this.classList.add("is-invalid")
                } else this.classList.add("is-valid")
            })
        }
    }

    // *FIN FUNCIONES TERCER PASO DEL REGISTRO CUIDADORES*
}

// INICIALIZAR LA CLASE 
var funcRegistro
addEventListener("DOMContentLoaded", function () {
    funcRegistro = new ClassRegistro()
})
