addEventListener("DOMContentLoaded", function () {

    // elemento formulario
    const formulario = document.querySelector("form")

    funcRegistro.inputDni = document.getElementById("dni")    // input email

    // intercepcion del submit 
    formulario.addEventListener("submit", async function (e) {
        e.preventDefault()
        e.stopPropagation()

        // asignar clase de validación si algún campo no es correcto
        if (!this.checkValidity()) {
            this.classList.add('was-validated')
        } else {
            // añadir spinner y mostrarlo
            funcDefault.mostrarSpinner()

            // crear usuario con todos los datos del formulario 
            const url = base_url + "Registro_c/crearUsuario";

            // Creación del formData 
            const formData = new FormData(this)

            // si el usuario se crea correctamente redirigir y guardar usuario en session
            let repuesta = await funcDefault.llamadaFetch(url, formData)
            if (!repuesta.mensajeError) {

                funcDefault.setUsuarioLogin(repuesta.usuario)

                if (funcDefault.tipo_user == "cuidador") {
                    location.href = base_url + "Registro_c/terminarRegistro"
                } else {
                    location.href = base_url + "Registro_c/subirImagenes"
                }
            } else {
                // quitar el spinner
                funcDefault.ocultarSpinner()

                // Mostrar error que llega por llamada a backend
                funcDefault.mostrarPopUpError(`<div>${repuesta.mensajeError}</div>`)
                setTimeout(function () {
                    funcDefault.redirigir("Registro_c")
                }, 4000)

            }
        }
    })

    //evento para el input apenom
    document.getElementById("apenom").addEventListener("blur", async function (e) {
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)
    })


    //evento para el input apenom
    document.getElementById("telefono").addEventListener("blur", async function (e) {
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato de número de teléfono"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)
    })

    //evento para el input DNI
    document.getElementById("dni").addEventListener("blur", async function (e) {
        let textExiste = `El DNI insertado ya está en uso por un ${funcDefault.tipo_user}`
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato de DNI"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid, textExiste, "dni")
    })

    //evento para el input población
    document.getElementById("poblacion").addEventListener("blur", async function (e) {
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)

    })

    //evento para el input codpostal
    document.getElementById("codpostal").addEventListener("blur", async function (e) {

        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato de código postal"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)
    })

    //evento para el input dirección
    document.getElementById("direccion").addEventListener("blur", function (e) {

        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)
    })

    //evento para el input fechanac
    document.getElementById("fechanac").addEventListener("blur", function (e) {

        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "Es obligatorio ser mayor de edad"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid)
    })

})