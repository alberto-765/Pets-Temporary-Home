var formularioSubir = $("form") // obtencion del formulario
var imagenes  // array con instancias de imagenes
var fotoPerfil = document.querySelector("#fotoPerfil")
var galeria = document.querySelector("#galeria")
var imagenesConError

// casos posibles para funcion recorrer imágenes
var casosRecorrerImagenes = ["formarcarga", "iniciarcarga", "subirimg", "reemplazar", "comprobar"]
Object.freeze(casosRecorrerImagenes)
addEventListener("DOMContentLoaded", function () {
    // reestablecer contador
    Imagen.reestablecerContador()


    // subir imágenes
    formularioSubir.on("submit", async function (e) {
        e.preventDefault()
        e.stopPropagation()
        this.classList.remove("was-validated")

        // galeria tiene menos de 10 imagenes y 1 foto de perfil
        if (this.checkValidity()) {
            await crearImagenes()
            if (validarPerfilYGaleria()) {
                crearVentanaCargaYSubirImg()
                comprobarSubidaYRedirigir()
            }
        }
    })

    // evento para la galería si el usuario es cuidador
    if (funcDefault.tipo_user == "cuidador") {
        galeria.addEventListener("change", function (e) {
            if (this.files.length < 11) {
                this.classList.add("is-valid")
            } else {
                this.classList.add("is-invalid")
            }
        })
    }
    // evento para la foto de perfil
    fotoPerfil.addEventListener("change", function (e) {
        if (this.files.length == 0) {
            this.classList.add("is-invalid")
        } else {
            this.classList.add("is-valid")
        }
    })

    // recorrer inputs y crear las imagenes 
    async function crearImagenes() {
        imagenes = []
        imagenes.push(new Imagen(fotoPerfil.files[0], fotoPerfil, null, "fotoperfil"))
        if (funcDefault.tipo_user == "cuidador") {
            for (let imagen of galeria.files) {
                imagenes.push(new Imagen(imagen, galeria))
            }
        }
    }

    // para validar que todo son imagenes y que la galeria tiene menos de 11 img
    function validarPerfilYGaleria() {
        // validar fotoPeril
        let imgPerfil = imagenes.filter(elemento => elemento.tipo == "fotoperfil")[0]

        if (!imgPerfil.validarTipoImagen()) {
            return false
        }

        if (funcDefault.tipo_user == "cuidador") {
            // obtener imagenes de tipo galeria
            let imgGaleria = imagenes.filter(elemento => elemento.tipo == "fotogaleria")

            // si tiene más de 0 images validar si tiene menos de 11
            if (imgGaleria.length > 0) {
                if (imgGaleria.length < 11) {
                    for (let img of imgGaleria) {
                        if (!img.validarTipoImagen()) {
                            return false
                        }
                    }
                    // si llega aqui es porque todas son imagenes
                    return true
                } else {
                    galeria.classList.add("is-invalid")
                    return false
                }
            }
        }

        // si llega es porque no hay fotos en galeria y la de perfil está OK
        return true
    }

    // añadir html al formulario de carga de imagenes
    function crearVentanaCargaYSubirImg() {
        // crear html, añadirlo al DOM e inicializar animación de carga
        let ventanaCarga = `<div class="col-12 ">
        <h3>¡Subida de imágenes!</h3>
        </div>` + recorrerImagenes(casosRecorrerImagenes[0])

        // insertar todo el html de la carga en el formulario
        formularioSubir.html(ventanaCarga)
        recorrerImagenes(casosRecorrerImagenes[1]) // inicializar cargas
        recorrerImagenes(casosRecorrerImagenes[2])// subir imagenes
    }

    // recorrer las imagenes y dependiendo del caso hace algo diferente
    function recorrerImagenes(caso) {
        let respuesta = ""
        switch (caso) {
            case "subirimg":
                imagenes.forEach(function (imagen) {
                    imagen.subirImagenYMostrarEstado()
                })
                break;
            case "formarcarga":
                imagenes.forEach(function (imagen) {
                    respuesta += imagen.formarCargaImagen()
                })
                break;
            case "iniciarcarga":
                imagenes.forEach(function (imagen) {
                    imagen.crearIntervaloBarra()
                })
                break;
            case "reemplazar":
                imagenesConError.forEach(function (imagen) {
                    imagen.reemplazarImagen()
                })
            case "comprobar":
                imagenesConError = imagenes.filter(function (elemento) {
                    return elemento.estadoSubida !== true
                })
                break;
        }
        if (respuesta) return respuesta
    }


    // comprobar si ha habido fallo en la subida de alguna imagen o redirigir
    function comprobarSubidaYRedirigir() {
        setTimeout(function () {
            if (formularioSubir.hasClass("errorSubida")) {
                let mensajePopUp = `<div>Ha habido <cite class="fw-semibold">problemas</cite> al subir algunas imágenes.</div>
                <div>Si es porque algunas imágenes <span class="fw-semibold">ya están subidas</span> y quieres <span class="fw-semibold">reemplazarlas</span>, haz <span  class="fw-semibold">click</span> en el botón.
                </div>
                <div class="text-center mt-3 d-flex flex-row justify-content-center align-items-center column-gap-3">
                <button class="btn btn-warning btn-small" id="btnReemplazar">Reemplazar</button>
                <div class="position-relative d-none" id="cargaReemplazar">
                <p class="spinner-border" role="status" aria-hidden="true" style="--bs-spinner-animation-speed: 1s;--bs-spinner-width: 2.2rem; --bs-spinner-height: 2.2rem; margin: 0; --bs-spinner-border-width: 2px;"></p>
                           
                <img src="${base_url}app/assets/iconos/logo.gif" alt="Logo" style="width: 20px" class="position-absolute top-50 start-50 translate-middle">
            </div>
            <div class="subirCheck text-success-emphasis  d-none rebotar"><i class="bi bi-check-lg fs-1"></i></div>
            </div>`

                funcDefault.mostrarPopUpError(mensajePopUp)
                // asignar evento click a btn Reemplazar
                document.querySelector("#btnReemplazar").addEventListener("click", reemplazarImagenes)
            } else {
                funcDefault.redirigir()
            }
        }, 3000)
    }

    // reemplazar imágenes que hayan dado error
    function reemplazarImagenes() {
        // desactivar el boton y mostrar carga
        this.disabled = true

        // mostrar carga
        let cargaReemplazar = document.querySelector("#cargaReemplazar")
        cargaReemplazar.classList.remove("d-none")
        cargaReemplazar.classList.add("d-inline-block")
        recorrerImagenes(casosRecorrerImagenes[4])// comprobar imagenes con error
        recorrerImagenes(casosRecorrerImagenes[3])// reemplazar imagenes con error

        // mostrar check
        setTimeout(function () {
            cargaReemplazar.classList.remove("d-inline-block")
            cargaReemplazar.classList.add("d-none")
            cargaReemplazar.nextElementSibling.classList.remove("d-none")
            setTimeout(function () {
                funcDefault.redirigir()
            }, 1000)
        }, 2000)
    }

})