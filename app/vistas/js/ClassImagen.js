class Imagen {
    static contador = 0 // contador que pertenece a la clase
    static formularioSubir
    inputPadre
    posicion
    file // file de la imagen
    nombre
    porcentajeBarra
    contenedorBarra
    barra
    intervaloBarra
    tipo // "perfil" o "galeria"
    ruta // ruta que se le pasa por AJAX
    estadoSubida // estado de la subida a BBDD
    tipoPropietario // "u" -> usuario   "m"-> mascota
    idPropietario // id del propietario de la foto, "idmascota" o "idusuario"

    // le llega un file y le asigna valores a las propiedades
    constructor(file, inputPadre, idPropietario, tipo) {
        Imagen.formularioSubir = $("#formSubir")[0] // obtencion del formulario
        this.inputPadre = inputPadre // input file que contiene la imagen
        this.posicion = Imagen.contador++ // se le asigna el valor y luego es incremetado
        this.file = file
        this.nombre = file.name.toLowerCase()

        // asignar si es "fotoperfil" o "fotogaleria"
        this.setTipo(tipo)
        this.porcentajeBarra = 6.6

        // si tienen propietario es porque es mascota
        this.setIdPropietarioYTipo(idPropietario)
        this.setRuta()
    }


    // subir imagen por AJAX
    async subirImagen() {
        const url = base_url + "Usuarios_c/uploaderImagen";

        // añadir la imagen y la posicion
        let data = new FormData()

        // tipos "fotoperfil" o "fotogaleria"
        data.append(this.tipo, this.file)
        data.append("ruta", this.ruta)
        data.append("idpropietario", this.idPropietario)
        data.append("posicion", this.posicion)

        // hacer llamada AJAX y guardar estado de la subida
        this.setEstadoSubida(funcDefault.llamadaAJAXAsync(url, data))
    }

    // mostrar su se ha subido correctamente la imagen o no
    mostrarEstadoSubida() {
        // poner barra al 100%
        this.aumentarPorcentajeBarraACien()

        // si está true mostrar el check, sino mostrar alerta y añadir clase al form
        if (this.estadoSubida == true) {
            setTimeout(function () {
                // quitar barra de carga
                this.contenedorBarra.classList.add("d-none")

                // añadir clase rebotar y quitar d-none
                $(`.imagen-${this.posicion} .subirCheck`).removeClass("d-none")
            }.bind(this), 2000)
        } else {
            setTimeout(function () {
                // quitar barra de carga
                this.contenedorBarra.classList.add("d-none")

                // añadir mensaje que devuelve la BBDD
                $(`.imagen-${this.posicion} .alertaError`).text(this.estadoSubida)
                $(`.imagen-${this.posicion} .subirAlert`).removeClass("d-none")
            }.bind(this), 2000)

            // si el formulario no contiene la clase "errorSubida" se le añade
            if (!Imagen.formularioSubir.classList.contains("errorSubida")) {
                Imagen.formularioSubir.classList.add("errorSubida")
            }
        }
    }

    // formar html con nombre de la imagen y los 3 estados de la carga
    formarCargaImagen() {
        let contenedorImagen =
            ` <!-- Carga imagen-${this.posicion} -->
    <div class="col-12">
    <div class="row imagen-${this.posicion} align-items-center" data-imagen="imagen-${this.posicion}">
        <div class="col-7 col-md-6 fw-semibold text-truncate">
            ${this.nombre}
        </div>
        <div class="col-5 col-md-6">
            <div class="subirProgres progress px-0 " role="progressbar"
                aria-label="Barra de carga de la subida de la imaggen" aria-valuenow="0" aria-valuemin="0"
                aria-valuemax="100">
                <div class="progress-bar progress-bar-striped progress-bar-animated fw-semibold bg-success">0%</div>
            </div>
            <div class="subirCheck text-success-emphasis  d-none mx-auto rebotar"><i class="bi bi-check-lg fs-1"></i></div>
            <div class="subirAlert text-danger-emphasis d-none mx-auto rebotar"><i class="bi bi-exclamation-triangle-fill fs-1"></i>
            <small class="alertaError font-monospace text-danger d-block"></small>
            </div>
        </div>
    </div>
    </div>`
        return contenedorImagen
    }

    // crea el intervalo para aumentar el porcentaje de la barra de la imagen
    crearIntervaloBarra() {
        this.setContenedorBarra($(`.imagen-${this.posicion} .subirProgres`))
        this.setBarra($(`.imagen-${this.posicion} .subirProgres > :first-child`))
        let intervaloBarra = setInterval(function () {
            // colocar valor al contenedor
            this.contenedorBarra.setAttribute("aria-valuenow", `${this.porcentajeBarra}`)

            // mostrar porcentaje redondeado por pantalla
            this.barra.textContent = `${Math.round(this.porcentajeBarra)}%`

            // aumentar barra progreso
            this.barra.style.width = `${this.porcentajeBarra}%`

            // aumentar el porcentaje
            this.setPorcentajeBarra(this.porcentajeBarra + 9.9)

            if (this.porcentajeBarra >= 99)
                this.setPorcentajeBarra(99)
            else if (this.porcentajeBarra == 99)
                this.borrarIntervaloBarra()
        }.bind(this), 2000)

        this.setIntervaloBarra(intervaloBarra)
    }

    // aumentar el tamaño de la barra de carga
    aumentarPorcentajeBarraACien() {
        // quitar el intervalo 
        this.borrarIntervaloBarra()
        setTimeout(async function () {
            // colocar valor al contenedor
            this.contenedorBarra.setAttribute("aria-valuenow", '100')

            // mostrar porcentaje redondeado por pantalla
            this.barra.textContent = '100%'

            // aumentar barra progreso
            this.barra.style.width = '100%'
        }.bind(this), 100)

    }

    // subir imagen y mostrar estado de la subida
    subirImagenYMostrarEstado() {
        this.subirImagen()
        this.mostrarEstadoSubida()
    }

    // reemplazar una imagen por otra en BBDD, este método no enseña la carga, si se quiere habría que recurrir también a mostrarEstadoSubida aparte
    reemplazarImagen() {
        if (this.eliminarImagenBBDD()) {
            this.subirImagen()
        }
    }


    // elimminar imagen de BBDD
    eliminarImagenBBDD() {
        const url = base_url + "Usuarios_c/eliminarFotoBBDD";

        // datos necesarios de la foto para eliminarla 
        let data = new FormData()
        data.append("ruta", this.ruta)
        data.append("idpropietario", this.idPropietario)
        data.append("posicion", this.posicion)

        return funcDefault.llamadaAJAXAsync(url, data)
    }

    // eliminar file de una imagen
    eliminarFileImagen() {
        const url = base_url + "Usuarios_c/eliminarFileImagen";

        // datos necesarios de la foto para eliminarla 
        let data = new FormData()
        data.append("ruta", this.ruta)

        return funcDefault.llamadaAJAXAsync(url, data)
    }

    setPorcentajeBarra(valor) {
        this.porcentajeBarra = valor
    }

    async setEstadoSubida(estadoSubida) {
        this.estadoSubida = estadoSubida
    }

    setContenedorBarra(valor) {
        this.contenedorBarra = valor[0]
    }

    setBarra(valor) {
        this.barra = valor[0]
    }

    setIntervaloBarra(valor) {
        this.intervaloBarra = valor
    }

    borrarIntervaloBarra() {
        clearInterval(this.intervaloBarra)
    }

    // si tipo está vacío se le asigna "fotogaleria"
    setTipo(tipo) {
        (tipo ? this.tipo = tipo.toLowerCase() : this.tipo = "fotogaleria")
    }

    // si idPropietario está vacío se le asigna el del usuarioLogin
    setIdPropietarioYTipo(idPropietario) {
        if (idPropietario != undefined && idPropietario) {
            this.idPropietario = idPropietario
            this.tipoPropietario = "m"
        } else {
            this.idPropietario = JSON.parse(sessionStorage.getItem("usuarios"))["usuarioLogin"]
            this.tipoPropietario = "u"
        }
    }

    setRuta() {
        let rutaGenerada = ""
        if (this.tipoPropietario === "u") {
            rutaGenerada = `${root}app/assets/fotosUsuarios/${this.idPropietario}/${this.idPropietario}-${this.posicion}.png`
        } else {
            rutaGenerada = `${root}app/assets/fotosMascotas/${this.idPropietario}/${this.idPropietario}-${this.posicion}.png`
        }
        this.ruta = rutaGenerada
    }


    // valida si es de tipo imagen y devuelve true (SI) o false (NO)
    validarTipoImagen() {
        if (!this.file.type.toLowerCase().includes("image")) {
            // Si no contiene la clase se le añade
            if (!this.inputPadre.classList.contains("is-invalid")) {
                this.inputPadre.classList.remove("is-valid")
                this.inputPadre.classList.add("is-invalid")
            }
            return false
        } else {
            // Si no contiene la clase se le añade
            if (!this.inputPadre.classList.contains("is-valid")) {
                this.inputPadre.classList.remove("is-invalid")
                this.inputPadre.classList.add("is-valid")
            }
            return true
        }
    }

    // reestablecer el contador a 0
    static reestablecerContador() {
        Imagen.contador = 0
    }

    // reestablecer el contador a 0
    static setContador(contador) {
        Imagen.contador = contador
    }
}