class CrearMascota {
    formulario
    constructor() {
        funcDefault.cambiarEstiloFooter()
        this.formulario = document.querySelector("form");

        funcMascotas.eventoInputTamano();
        funcMascotas.activarMedicacion()

        // si es abierto por medio de window.open se le manda un mensaje
        sessionStorage.setItem("mensajeVetanaEmergente", JSON.stringify(false))
        this.recibirMensageVentanaEmergente()
        this.eventoSubmitFormulario()
    }



    // evento submit formulario
    async eventoSubmitFormulario() {
        this.formulario.addEventListener("submit", async function (e) {
            e.preventDefault();
            e.stopPropagation();
            // asignar clase de validación si algún campo no es correcto
            if (this.formulario.checkValidity()) {
                // subir imagenes del usuario
                const url = base_url + "Usuarios_c/crearMascota";

                // Creación del formData
                const formData = new FormData(this.formulario);

                let respAJAX = await funcDefault.llamadaFetch(url, formData);

                // coger los valores del objeto 
                let valoresResp = Object.values(respAJAX)

                // se usa index of antes que .some() para guardar la posicion y reutilizarla
                let posisionFalse = valoresResp.indexOf(false)

                // la respuesta es un array y hay que comprobar que no contiene false
                if (posisionFalse === -1) {
                    funcDefault.mostrarSpinner()
                    setTimeout(function () {
                        funcDefault.redirigir(`Usuarios_c/subirImagenesMascota/${respAJAX.idmascota}`)
                    }, 2000);

                } else {
                    scrollTo(top)
                    setTimeout(function () {
                        location.reload()
                    }, 3000);
                    funcDefault.mostrarPopUpError(valoresResp[posisionFalse + 1])
                }
            } else {
                this.formulario.classList.add("was-validated");
                window.scrollTo(top);
            }
        }.bind(this));

    }

    // evento para recibir mensaje por si es abierto por medio de una ventana emergente
    recibirMensageVentanaEmergente() {
        addEventListener("message", function (e) {

            if (e.source == this.window.opener) {
                sessionStorage.setItem("mensajeVetanaEmergente", JSON.stringify(true))

                // evento para hacer que no se pueda salir a otras paginas excepto a la de subirImagenes
                window.addEventListener("click", function (e) {
                    if (e.target.href && e.target.href != "") {
                        e.preventDefault()
                        e.stopPropagation()
                    }

                })
            }
        })
    }

}

// INICIALIZAR LA CLASE 
var crearMascota
addEventListener("DOMContentLoaded", function () {
    crearMascota = new CrearMascota();
})