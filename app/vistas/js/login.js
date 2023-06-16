// poner usuario y contraseña si se encuentran en las cookies
addEventListener("DOMContentLoaded", function () {
    usarRecordar()

    // ver contraseña
    const seePass = document.getElementById("seePassword")

    // evento para mostrar u ocultar la contraseña
    seePass.addEventListener("mousedown", function () {

        let inputPassword = $("#contraseña")

        // cambiar type 
        if (inputPassword.attr("type") == "password")
            inputPassword.attr("type", "text")
        else inputPassword.attr("type", "password")

    })

    // Validar usuario y contraseña 
    document.getElementById("formlogin").addEventListener("submit", async function (e) {
        e.preventDefault()
        e.stopPropagation()

        if (this.checkValidity()) {

            // llamada al controlador
            const url = base_url + "Inicio_c/hacerlogin";

            // recoger datos del formulario
            const formData = new FormData(this)

            // llamada AJAX
            let respAJAX = await funcDefault.llamadaFetch(url, formData)

            // si devuelve true login correcto
            if (respAJAX) {

                // si se seleccionar recordar o no
                validarRecordar()

                // guardar el id del usuario en session
                funcDefault.setUsuarioLogin(document.getElementById("usuario").value)

                // para reconducir a la pagina anterior si no es la de login o de registro_c
                funcDefault.redirigir("prevurl")
            } else {

                // mostrar mensaje de error
                let error = "El usuario y contraseña no conciden"
                mostrarError(error)
            }
        } else {
            let error = "Uno de los campos está vacío o no cumple el formato"
            mostrarError(error)
        }
    })




    // función propia de la vista para mostrar error personalizado 
    function mostrarError(error) {
        let divError = document.querySelector(".error")
        divError.style.transition = "all 1s"
        divError.innerHTML = error
        divError.classList.remove("d-none")

    }

    // eliminar de las cookies usuario y contraseña
    function eliminarRecordar() {
        eraseCookie("usuario")
        eraseCookie("contrasena")
    }

    // insertar usuario y contraseña a las cookies
    function recordar(usuario, contraseña) {
        setCookie("usuario", usuario, 30)
        setCookie("contrasena", contraseña, 30)
    }

    // insertar el usuario y la contraseña si se encuentran en las cookies
    function usarRecordar() {
        let usuario = getCookie("usuario")

        if (usuario != null) {
            // asignar valores a los inputs
            document.getElementById("usuario").value = usuario

            document.getElementById("contraseña").value = getCookie("contrasena")

            // poner recodar como seleccionado 
            document.getElementById("recordar").checked = true
        }
    }

    // validar que el checkbox de recordar esta seleccionado 
    function validarRecordar() {
        let inputRecordar = document.getElementById("recordar").checked

        if (inputRecordar == true) {
            let usuario = document.getElementById("usuario").value
            let contrasena = document.getElementById("contraseña").value
            recordar(usuario, contrasena)
        } else eliminarRecordar()
    }
})


