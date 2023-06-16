addEventListener("DOMContentLoaded", function () {

    // elemento formulario
    const formulario = document.querySelector("form")
    funcRegistro.inputUsuario = document.getElementById("usuario")    // input usuario 
    funcRegistro.inputEmail = document.getElementById("email")    // input email

    // elemtos contraseña 
    funcRegistro.inputsContrasena = document.querySelectorAll("input[type=password]")

    // eventos click para mostrar contraseña
    funcRegistro.mostrarContra()



    // intercepcion del submit 
    formulario.addEventListener("submit", async function (e) {
        e.preventDefault()
        e.stopPropagation()


        // asignar clase de validación si algún campo no es correcto
        if (!this.checkValidity() || !await funcRegistro.verificarContrasenna() || await funcRegistro.validarUsuario() || await funcRegistro.validarEmail()) {

            this.classList.add('was-validated')
        } else {
            // mostrar el spinner mientras se cargan los datos
            funcDefault.mostrarSpinner()

            // enviar los datos para que sean guardados
            const url = base_url + "Registro_c/guardarDatosUsuario"

            // Creación del formData 
            const formData = new FormData(this)

            if (await funcDefault.llamadaAJAXAsync(url, formData)) {
                funcDefault.redirigir("Registro_c/formMasDatos")
            }

        }
    })

    // verificar si existe el correo electrónico insertado 
    funcRegistro.inputEmail.addEventListener("blur", async function (e) {
        let textExiste = `El email insertado ya está en uso por un ${funcDefault.tipo_user}`
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo debe ser un correo"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid, textExiste, "email")
    })


    // verificar si existe el usuario insertado 
    funcRegistro.inputUsuario.addEventListener("blur", async function (e) {
        let textExiste = "El usuario insertado ya existe"
        let textVacio = "El campo no puede estar vacío"
        let textInvalid = "El campo no cumple el formato"

        funcRegistro.eventoBlurInput(this, textVacio, textInvalid, textExiste, "usuario")
    })


    // eventos para los inputs contraseña
    for (input of funcRegistro.inputsContrasena) {
        input.addEventListener("blur", async function (e) {
            let textExiste = "Las contraseñas no son iguales"
            let textVacio = "El campo no puede estar vacío (min 6 caracteres)"
            let textInvalid = "El campo no cumple el formato (min 6 caracteres)"

            await funcRegistro.eventoBlurInput(this, textVacio, textInvalid, textExiste, "contrasenna")
        })
    }
})