addEventListener("DOMContentLoaded", function () {

    // elemento formulario
    const formulario = document.querySelector("form")

    // textarea descripcion 
    const descripcion = document.querySelector("#descripcion textarea")

    // chechbox de que hay niños en casa
    const checksNinos = document.querySelectorAll("#colapsadoDos input:not(#ninosCheck1)")
    // check no hay niños en casa
    const checkNoNinos = document.querySelector("#colapsadoDos #ninosCheck1")
    addEventListener("load", function (e) {

        // VALIDACIÓN DE LOS CHECKBOX DE LAS FILAS OBLIGATORIAS
        funcRegistro.crearEventoFilas()

        // evento blur para los inputs precio 
        funcRegistro.validarPrecios(document.querySelectorAll(".precios input"))

        // array dinamico de las filas del formulario
        funcRegistro.setFilas()
    })


    // intercepcion del submit 
    formulario.addEventListener("submit", async function (e) {
        e.preventDefault()
        e.stopPropagation()

        // asignar clase de validación si algún campo no es correcto
        if (!this.checkValidity() || funcRegistro.validarFilasCheck()) {
            this.classList.add('was-validated')
            window.scroll(top)
        } else {
            // mostrar el spinner mientras se cargan los datos
            funcDefault.mostrarSpinner()

            // crear usuario con todos los datos del formulario 
            let url = base_url + "Registro_c/anadirDetalles";

            // Creación del formData 
            const formData = new FormData(this)



            // detalles creados correctamente
            if (await funcDefault.llamadaFetch(url, formData) == true) {

                // redirección a funcion del controlador
                url = base_url + "Registro_c/subirImagenes"
                location.href = url
            } else {

                // Contenedor con el mensaje de error 
                const divError = document.querySelector(".error")

                // quitar el spinner
                funcDefault.ocultarSpinner()

                // Mostrar contenedor con transición
                divError.style.transition = "all 1s"
                divError.classList.remove("d-none")

            }
        }
    })

    // evento para textarea de descripcion
    descripcion.addEventListener("blur", function (e) {
        if (!this.checkValidity())
            this.classList.add("is-invalid")
    })


    // casuística si se selecciona que no hay niños no se pueden seleccionar los otros checkboks de niños
    checkNoNinos.addEventListener("change", function () {
        if (this.checked == true) {
            for (let input of checksNinos) {
                input.checked = false
            }
        }
    })

    // si se selecciona que hay niños debe desactivar el checkbox de que no hay
    for (let input of checksNinos) {
        input.addEventListener("change", function () {
            if (this.checked == true && checkNoNinos.checked == true) {
                checkNoNinos.checked = false
            }
        })
    }

})