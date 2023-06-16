class SubirImagenes {
    formularioSubir = document.querySelector("form") // obtencion del formulario
    imagenes  // array con las clases de las imagenes
    fotoPerfil = document.querySelector("#fotoPerfil")
    galeria = document.querySelector("#galeria")
    imagenesConError
    idmascota // id de la mascota encriptada obtenida de la uri

    // casos posibles para funcion recorrer imágenes
    casosRecorrerImagenes

    constructor() {
        this.casosRecorrerImagenes = ["formarcarga", "iniciarcarga", "subirimg", "reemplazar", "comprobar"]
        Object.freeze(this.casosRecorrerImagenes)

        // obtener id mascota
        this.idmascota = Number(location.href.split("/").slice(-1)[0])

        // reestablecer contador
        Imagen.reestablecerContador(0)

        this.eventosInputsImagenes()
        this.eventoFormulario()
    }

    // evento submit formulario
    eventoFormulario() {
        // subir imágenes
        this.formularioSubir.addEventListener("submit", async function (e) {
            e.preventDefault()
            e.stopPropagation()
            this.formularioSubir.classList.remove("was-validated")

            // galeria tiene menos de 10 imagenes y 1 foto de perfil
            if (this.formularioSubir.checkValidity()) {
                await this.crearImagenes()
                if (this.validarPerfilYGaleria()) {
                    await this.crearVentanaCargaYSubirImg()
                    this.comprobarSubidaYRedirigir()
                }
            }
        }.bind(this))
    }

    // eventos change de inputs file
    eventosInputsImagenes() {
        // evento para la galería si el usuario es cuidador
        if (funcDefault.tipo_user == "propietario") {
            this.galeria.addEventListener("change", function (e) {
                if (this.files.length < 11) {
                    this.classList.add("is-valid")
                } else {
                    this.classList.add("is-invalid")
                }
            })
        }

        // evento para la foto de perfil
        this.fotoPerfil.addEventListener("change", function (e) {
            if (this.files.length == 0) {
                this.classList.add("is-invalid")
            } else {
                this.classList.add("is-valid")
            }
        })
    }

    // recorrer inputs y crear las imagenes 
    async crearImagenes() {
        this.imagenes = []
        this.imagenes.push(new Imagen(this.fotoPerfil.files[0], this.fotoPerfil, this.idmascota, "fotoperfil"))
        if (funcDefault.tipo_user == "propietario") {
            for (let imagen of this.galeria.files) {
                this.imagenes.push(new Imagen(imagen, this.galeria, this.idmascota))
            }
        }
    }

    // para validar que todo son imagenes y que la galeria tiene menos de 11 img
    validarPerfilYGaleria() {
        // validar fotoPeril
        let imgPerfil = this.imagenes.filter(elemento => elemento.tipo == "fotoperfil")[0]

        if (!imgPerfil.validarTipoImagen()) {
            return false
        }

        if (funcDefault.tipo_user == "propietario") {
            // obtener imagenes de tipo galeria
            let imgGaleria = this.imagenes.filter(elemento => elemento.tipo == "fotogaleria")

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
                    this.galeria.classList.add("is-invalid")
                    return false
                }
            }
        }

        // si llega es porque no hay fotos en galeria y la de perfil está OK
        return true
    }

    // añadir html al formulario de carga de imagenes
    async crearVentanaCargaYSubirImg() {
        // crear html, añadirlo al DOM e inicializar animación de carga
        let ventanaCarga = `<div class="col-12 ">
        <h3>¡Subida de imágenes!</h3>
        </div>` + this.recorrerImagenes(this.casosRecorrerImagenes[0])

        // insertar todo el html de la carga en el formulario
        this.formularioSubir.innerHTML = ventanaCarga
        this.recorrerImagenes(this.casosRecorrerImagenes[1]) // inicializar cargas
        this.recorrerImagenes(this.casosRecorrerImagenes[2])// subir imagenes
    }

    // recorrer las imagenes y dependiendo del caso hace algo diferente
    recorrerImagenes(caso) {
        let respuesta = ""
        switch (caso) {
            case "subirimg":
                this.imagenes.forEach(function (imagen) {
                    imagen.subirImagenYMostrarEstado()
                })
                break;
            case "formarcarga":
                this.imagenes.forEach(function (imagen) {
                    respuesta += imagen.formarCargaImagen()
                })
                break;
            case "iniciarcarga":
                this.imagenes.forEach(function (imagen) {
                    imagen.crearIntervaloBarra()
                })
                break;
            case "reemplazar":
                this.imagenesConError.forEach(function (imagen) {
                    imagen.reemplazarImagen()
                })
            case "comprobar":
                this.imagenesConError = this.imagenes.filter(function (elemento) {
                    return elemento.estadoSubida !== true
                })
                break;
        }
        if (respuesta) return respuesta
    }


    // comprobar si ha habido fallo en la subida de alguna imagen o redirigir
    comprobarSubidaYRedirigir() {
        setTimeout(function () {
            if (this.formularioSubir.classList.contains("errorSubida")) {
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
                document.querySelector("#btnReemplazar").addEventListener("click", function (e) {
                    // desactivar el boton y mostrar carga
                    e.target.disabled = true

                    // mostrar carga
                    let cargaReemplazar = document.querySelector("#cargaReemplazar")
                    cargaReemplazar.classList.remove("d-none")
                    cargaReemplazar.classList.add("d-inline-block")
                    this.recorrerImagenes(this.casosRecorrerImagenes[4])// comprobar imagenes con error
                    this.recorrerImagenes(this.casosRecorrerImagenes[3])// reemplazar imagenes con error

                    // mostrar check
                    setTimeout(function () {
                        cargaReemplazar.classList.remove("d-inline-block")
                        cargaReemplazar.classList.add("d-none")
                        cargaReemplazar.nextElementSibling.classList.remove("d-none")
                        funcMascotas.resetearMascotasUsuario()
                        setTimeout(function () {
                            if (JSON.parse(sessionStorage.getItem("mensajeVetanaEmergente")) == true) {
                                window.close()
                            } else {
                                funcDefault.redirigir("Usuarios_c/mascotas")
                            }
                        }, 1000)
                    }, 2000)
                }.bind(this))
            } else {
                funcMascotas.resetearMascotasUsuario()
                if (JSON.parse(sessionStorage.getItem("mensajeVetanaEmergente")) == true) {
                    window.close()
                } else {
                    funcDefault.redirigir("Usuarios_c/mascotas")
                }
            }
        }.bind(this), 3000)
    }


}

// INICIALIZAR LA CLASE 
var subirImagenes
addEventListener("DOMContentLoaded", function () {
    subirImagenes = new SubirImagenes()
})
