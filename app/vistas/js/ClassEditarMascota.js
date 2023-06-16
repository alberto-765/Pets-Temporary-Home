class EditarMascota {
    idmascota // id de la mascota obtenido de la url *POR SEGURIDAD solo es usa para obtener la clase*
    mascota // clase de la mascota
    imagenesContenedorGaleria // contenedor de la galeria
    botonesEditar // botones que habilitan o deshabilitan el editado de un contenedor
    modalConfirmar
    modalSubirImagen
    BSmodalSubirImagen // objeto de bootstrap con el popUp subir Imagen
    BSmodalConfirmar // objeto de bootstrap con el popUp confirmar

    // APARTADO REEMPLAZAR O BORRAR UNA IMAGEN
    idImagen // si es undefined es "fotoPerfil" sino es galeria
    inputSubidaImagen
    imagenReemplazar // clase para la imagen del input file 
    tipoConfirmacion // si la confirmacion es para reemplazar o para eliminar

    constructor() {
        funcDefault.mostrarSpinner()

        this.imagenesContenedorGaleria = document.querySelectorAll("#contenedorGaleria .contenedorImagenGaleria >img")
        this.botonesEditar = document.querySelectorAll(".botonEditar")
        this.modalSubirImagen = document.querySelector("#modalSubirImagen")
        this.modalConfirmar = document.querySelector("#modalConfirmar")
        this.BSmodalConfirmar = new bootstrap.Modal(this.modalConfirmar)
        this.BSmodalSubirImagen = new bootstrap.Modal(this.modalSubirImagen)


        // cambiar footer
        funcDefault.cambiarEstiloFooter()

        // id de la mascota obtenido de la url
        this.idmascota = location.href.split("/").slice(-1)

        // sacar mascota para los detalles
        this.mascota = funcMascotas.usuario.obtenerUnaMascota(this.idmascota)

        this.insertarTodosDatos()

        funcMascotas.eventoInputTamano();
        funcMascotas.activarMedicacion()
        funcDefault.ocultarSpinner()
    }



    // realizar todas las funciones para insertar todos los datos
    async insertarTodosDatos() {
        // poner blur a las imagenes cuando se ponga el cursor encima de los botones de editar o borrar
        this.insertarFotoPerfil()
        this.insertarGaleria()
        await this.colocarInformacionMascota()
        this.eventoBotonEditarContenedor()
        this.eventoBlurImagen()
        this.eventoBtnReemplazar()
        this.eventoBtnEliminar()
        this.eventoModalSubida()
        this.eventoFormInfoMascota()
    }



    // insertar la foto de perfil de la mascota
    insertarFotoPerfil() {
        document.querySelector("#contenedorPerfil img").src = this.mascota.imagenPerfil
    }

    // insetar galeria para las mascotas de los propietarios
    insertarGaleria() {
        if (this.mascota.tipo_user == "propietario") {
            for (let imagen of this.mascota.galeria) {
                this.imagenesContenedorGaleria[imagen[0] - 1].src = imagen[1]
                this.imagenesContenedorGaleria[imagen[0] - 1].classList.remove("noSubida")

            }
        }
    }

    eventoBlurImagen() {
        let divBotones = document.querySelectorAll(".botones > *")
        for (let btn of divBotones) {
            btn.addEventListener("mouseover", function () {
                this.parentElement.previousElementSibling.style.filter = "blur(2px)"
            })
            btn.addEventListener("mouseout", function () {
                this.parentElement.previousElementSibling.style.filter = ""
            })
        }

    }

    // quitar o poner capa oscura al hacer click en el boton de editar un contenedor
    eventoBotonEditarContenedor() {
        for (let boton of this.botonesEditar) {
            boton.addEventListener("click", function () {
                // seleccionamos el padre ".row" mas cercano y luego el row hermano y comprobar si es elementoEditable o no
                let contenedorEditable = this.closest(".row").nextElementSibling


                // si tiene la clase ".elementoEditable" quitarle o ponerle la clase "contenedorDisabled ", sino al primer hijo que sea editable
                if (contenedorEditable.matches(".elementoEditable")) {
                    contenedorEditable.classList.toggle("contenedorDisabled")
                } else {
                    contenedorEditable.querySelector(".elementoEditable").classList.toggle("contenedorDisabled")
                }
            })
        }
    }


    // para cuando se quiere reemplazar una imagen
    eventoBtnReemplazar() {
        let botonesReemplazar = document.querySelectorAll(".botones > .btnReemplazar")

        // al hacer click en reemplazar se abre el modal de confirmacion 
        for (let btn of botonesReemplazar) {
            btn.addEventListener("click", function (e) {


                // añadir texto al modal de confirmacion
                this.modalConfirmar.querySelector(".titulo").innerHTML = `<img  src="${base_url}app/assets/iconos/editar2.png" alt="Icono papelera" style="height: 50px;" >
                <span>¿Estás seguro de reemplazar esta imagen?</span>`

                // añadir url de la imagen, si el contenedor padre tiene la clase btnPerfil es la foto de perfil y sino galeria
                if (e.target.closest(".btnPerfil")) {
                    this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src="${this.mascota.imagenPerfil}" alt="Imagen de perfil de tu mascota"  title="Imagen de perfil de tu mascota" />`
                    this.idImagen = undefined
                } else {
                    this.idImagen = parseInt(e.target.closest(".botones").dataset.id)

                    // si la mascota tiene esa imagen en la galeria
                    if (this.mascota.galeria[this.idImagen]) {
                        this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src=${this.mascota.galeria[this.idImagen][1]} alt="Imagen de perfil de tu mascota" title="Imagen de galeria de tu mascota"/>`
                    } else {
                        this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src="${base_url}app/assets/img/subirImagen.png" alt="Imagen de perfil de tu mascota" title="Imagen de galeria de tu mascota"/>`
                    }
                }

                this.tipoConfirmacion = "reemplazar"
                this.BSmodalConfirmar.show()

                // añadir texto al modal de subirImagen
                this.modalSubirImagen.querySelector(".titulo").innerHTML = ` <img src="${base_url}app/assets/iconos/subirImagen.png" alt="Icono imagen subida" style="height: 50px;">
                <span>Sube tu nueva imagen</span>`
                this.modalSubirImagen.querySelector(".modal-body").innerHTML = `<form class="row rounded p-4 row-gap-4 text-center needs-validation justify-content-center" id="formSubir" novalidate>
                <div class="col-10">
                    <input class="form-control" type="file" id="subirImagen" accept="image/*">
                    <div class="invalid-feedback position-relative">Deber subir una foto de perfil, con alguno de estos formatos <i class="bi bi-exclamation-circle formatosImagenes fs-5 position-relative mouseOver">
                            <div class="d-none ms-3 position-absolute ">
                                <i class="bi bi-caret-left-fill  text-black fs-6 z-0"></i>
                                <ul class="list-unstyled z-1 bg-dark text-secondary p-3 rounded fs-6 position-absolute start-50" style="top: -50%;">
                                    <li>jpeg</li>
                                    <li>jpg</li>
                                    <li>gif</li>
                                    <li>svg</li>
                                    <li>svg</li>
                                </ul>
                            </div>
                        </i>
                    </div>
                </div>
            </form>`

                this.modalSubirImagen.querySelector(".modal-footer").innerHTML = ` <button class="btn btn-success btn-small me-5 btnSubir" type="submit"  form="formSubir">Continuar</button>`

                // guardar valores necesarios para el modal subirImagen
                this.inputSubidaImagen = document.querySelector("#subirImagen")

                // evento submit para el formulario
                this.eventoFormSubirImagen()

            }.bind(this))
        }
    }

    // para cuando se quiere borrar una imagen
    eventoBtnEliminar() {
        let botonesBorrar = document.querySelectorAll(".botones > .btnBorrar")


        // al hacer click en reemplazar se abre el modal de confirmacion 
        for (let btn of botonesBorrar) {
            btn.addEventListener("click", function (e) {

                // Si la imagen es noSubida no hacer nada 
                if (!btn.parentElement.previousElementSibling.matches(".noSubida")) {


                    // añadir texto al modal de confirmacion
                    this.modalConfirmar.querySelector(".titulo").innerHTML = `<img  src="${base_url}app/assets/iconos/iconoBorrar2.png" alt="Icono papelera" style="height: 50px;" >
                    <span>¿Estás seguro de borrar esta imagen?</span>`

                    // añadir url de la imagen, si el contenedor padre tiene la clase btnPerfil es la foto de perfil y sino galeria
                    if (e.target.closest(".btnPerfil")) {
                        this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src=${this.mascota.imagenPerfil} alt="Imagen de perfil de tu mascota"  title="Imagen de perfil de tu mascota" />`
                        this.idImagen = undefined
                    } else {
                        this.idImagen = parseInt(e.target.closest(".botones").dataset.id)
                        // si la mascota tiene esa imagen en la galeria
                        if (this.mascota.galeria[this.idImagen]) {

                            this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src=${this.mascota.galeria[this.idImagen][1]} alt="Imagen de perfil de tu mascota" title="Imagen de perfil de tu mascota"/>`
                        } else {
                            this.modalConfirmar.querySelector(".modal-body").innerHTML = `<img class="rounded w-50" src="${base_url}app/assets/img/subirImagen.png" alt="Imagen de perfil de tu mascota" title="Imagen de galeria de tu mascota"/>`

                        }

                    }


                    this.tipoConfirmacion = "eliminar"
                    this.BSmodalConfirmar.show()

                    // añadir texto al modal de subirImagen
                    this.modalSubirImagen.querySelector(".titulo").innerHTML = `<span>Tu imagen está siendo eliminada</span>`
                    this.modalSubirImagen.querySelector(".modal-body").innerHTML = `<img  src="${base_url}app/assets/iconos/borrar.gif" alt="Gif papelera" style="height: 90px;" >`

                    this.modalSubirImagen.querySelector(".modal-footer").innerHTML = `  <button class="btn btn-success btn-small me-5 btnSubir" type="button" id="btnConfirmar">Continuar</button>`

                }
            }.bind(this))
        }


    }
    // cuando se quiere reemplazar una imagen
    eventoFormSubirImagen() {
        document.querySelector("#formSubir").addEventListener("submit", function (e) {
            e.preventDefault()
            e.stopPropagation()
            e.target.classList.remove("was-validated")


            if (e.target.checkValidity()) {
                // ocultar el boton del modal
                this.ocultarBtnFormSubir()

                // si idImagen existe es una imagen de la galeria
                if (this.idImagen != undefined) {
                    Imagen.setContador(this.idImagen + 1)
                    this.imagenReemplazar = new Imagen(this.inputSubidaImagen.files[0], this.inputSubidaImagen, this.mascota.idmascota)

                    // validar que es una imagen
                    if (this.imagenReemplazar.validarTipoImagen()) {
                        this.imagenReemplazar.eliminarImagenBBDD()
                        this.crearVentanaCargaYSubirImg()

                        setTimeout(function () {
                            // mostrar datos actualizados 
                            this.ocutarModalSubirImagen()
                            this.reinicarDatosMascota()
                        }.bind(this), 3000)
                    }
                } else {
                    this.imagenReemplazar = new Imagen(this.inputSubidaImagen.files[0], this.inputSubidaImagen, this.mascota.idmascota, "fotoperfil")

                    // la imagen de perfil solo se puede reemplazar
                    if (this.imagenReemplazar.validarTipoImagen()) {
                        this.imagenReemplazar.eliminarImagenBBDD()
                        this.crearVentanaCargaYSubirImg()

                        setTimeout(function () {
                            // mostrar datos actualizados 
                            this.ocutarModalSubirImagen()
                            this.reinicarDatosMascota()
                        }.bind(this), 3000)
                    }
                }
            } else {
                e.target.classList.add("was-validated")
                scrollTo(top)
            }
        }.bind(this))
    }




    // evento que se lanza cuando se muestra el modal de eliminar imagen
    eventoModalSubida() {
        this.modalSubirImagen.addEventListener("shown.bs.modal", function (e) {

            // Si el tipo de confirmacion es eliminar hacer todo el proceso de eliminacion de la imagen
            if (this.tipoConfirmacion == "eliminar") {

                // si idImagen existe es una imagen de la galeria, la imagen de perfil no puede eliminarse
                if (this.idImagen != undefined) {

                    let rutaImagen = this.mascota.galeria.filter(elemento => elemento[0] == (this.idImagen + 1))[0]
                    funcMascotas.usuario.eliminarFileImagen(rutaImagen[1])
                    funcMascotas.usuario.eliminarImagenBBDD(rutaImagen[1], this.mascota.idmascota, rutaImagen[0])

                    // ocultar el boton del modal
                    this.ocultarBtnFormSubir()
                    this.reinicarDatosMascota()
                    setTimeout(function () {
                        // mostrar datos actualizados 
                        location.reload()
                    }.bind(this), 3000)
                }
            }
        }.bind(this))
    }

    // crear la ventana de carga de la imagen
    crearVentanaCargaYSubirImg() {

        // insertar todo el html de la carga en el formulario
        document.querySelector("#formSubir").innerHTML = this.imagenReemplazar.formarCargaImagen()
        this.imagenReemplazar.crearIntervaloBarra() // inicializar carga imagen 
        this.imagenReemplazar.subirImagenYMostrarEstado() // subir imagen
    }

    // si la imagen se sube correctamente ocultar modal
    ocutarModalSubirImagen() {
        this.BSmodalSubirImagen.hide()
    }

    // si la imagen se sube correctamente ocultar modal
    ocutarModalConfirmar() {
        this.BSmodalConfirmar.hide()
    }

    // reiniciar los datos de la mascota sin necesidad de recargar
    reinicarDatosMascota() {
        funcDefault.mostrarSpinner()
        funcMascotas.resetearMascotasUsuario()

        scrollTo(top)
        setTimeout(function () {
            location.reload()
        }, 1000)
    }

    ocultarBtnFormSubir() {
        document.querySelector(".btnSubir").style.display = "none"
    }

    // colocar la informacon de la mascota en el formulario
    async colocarInformacionMascota() {

        // si es de tipo perro marcar boton perro y habilitar select tamaño
        if (this.mascota.tipo == "P") {
            document.getElementById("btn-perro").checked = true;
            document.getElementById("select-tamaño").disabled = false;
        }
        else {
            document.getElementById("btn-gato").checked = true;
        }

        // colocar el nombre
        document.getElementById("nombre").value = this.mascota.nombre;

        // crear option macho
        let optionMacho = document.createElement("option");
        optionMacho.text = "Macho";
        optionMacho.value = "M";

        // crear option hembra
        let optionHembra = document.createElement("option");
        optionHembra.text = "Hembra";
        optionHembra.value = "H";

        // crear fragmento para añadir
        let fragmento = document.createDocumentFragment();

        // colocar el sexo
        if (this.mascota.sexo == "M") {
            // macho como selected
            optionMacho.defaultSelected = true;

            fragmento.appendChild(optionMacho);
            fragmento.appendChild(optionHembra);

            document.getElementById("sexo").appendChild(fragmento);
        } else {
            // hombra como selected
            optionHembra.defaultSelected = true;

            fragmento.appendChild(optionMacho);
            fragmento.appendChild(optionHembra);

            document.getElementById("sexo").appendChild(fragmento);
        }

        // colocar la raza
        document.getElementById("raza").value = this.mascota.raza;
        // colocar edades, años y meses
        document.getElementById("anos").value = this.mascota.anos;
        document.getElementById("meses").value = this.mascota.meses;

        // tiene microchip
        if (this.mascota.microchip == 1)
            document.getElementById("btn-microchip1").checked = true;
        else document.getElementById("btn-microchip2").checked = true;

        // sociable con gatos
        if (this.mascota.socgatos == 1)
            document.getElementById("btn-socgatos1").checked = true;
        else document.getElementById("btn-socgatos2").checked = true;

        // sociable con niños
        if (this.mascota.socninos == 1)
            document.getElementById("btn-socninos1").checked = true;
        else document.getElementById("btn-socninos2").checked = true;

        // castrado
        if (this.mascota.esterilizacion == 1)
            document.getElementById("btn-esterilizacion1").checked = true;
        else document.getElementById("btn-esterilizacion2").checked = true;

        // sociable con perros
        if (this.mascota.socperros == 1)
            document.getElementById("btn-socperros1").checked = true;
        else document.getElementById("btn-socperros2").checked = true;

        // añadir mensaje si existe
        if (this.mascota.masdetalles != null) {
            document.getElementById("masdetalles").value = this.mascota.masdetalles;
        }

        // COLOCAR DATOS SI ES PROPIETARIO
        if (funcDefault.tipo_user == "propietario") {
            // añadir actividad
            switch (this.mascota.actividad) {
                case "M":
                    document.getElementById("btn-actividad1").checked = true;
                    break;
                case "N":
                    document.getElementById("btn-actividad2").checked = true;
                    break;
                case "T":
                    document.getElementById("btn-actividad3").checked = true;
                    break;
            }

            // añadir necesidades
            switch (this.mascota.necesidades) {
                case 2:
                    document.getElementById("btn-necesidades1").checked = true;
                    break;
                case 4:
                    document.getElementById("btn-necesidades2").checked = true;
                    break;
                case 6:
                    document.getElementById("btn-necesidades3").checked = true;
                    break;
            }

            // añadir raciones
            document.getElementById("raciones").value = this.mascota.raciones;

            // añadir horario de paseo
            switch (this.mascota.paseo) {
                case "M":
                    document.getElementById("btn-paseo1").checked = true;
                    break;
                case "T":
                    document.getElementById("btn-paseo2").checked = true;
                    break;
                case "N":
                    document.getElementById("btn-paseo3").checked = true;
                    break;
            }

            // añadir medicacion si existe y el nombre
            if (this.mascota.medtipo != null) {
                switch (this.mascota.medtipo) {
                    case "O":
                        document.getElementById("btn-medtipo1").checked = true;
                        document.getElementById("btn-medtipo1").type = "checkbox";
                        break;
                    case "T":
                        document.getElementById("btn-medtipo2").checked = true;
                        document.getElementById("btn-medtipo2").type = "checkbox";
                        break;
                    case "I":
                        document.getElementById("btn-medtipo3").checked = true;
                        document.getElementById("btn-medtipo3").type = "checkbox";
                        break;
                }

                // añadir el nombre medicamento
                document.getElementById("mednom").disabled = false
                document.getElementById("mednom").value = this.mascota.mednom;
            }


        }

    }

    // evento para el formulario formInfoMascota
    eventoFormInfoMascota() {
        document.querySelector("#formInfoMascota").addEventListener("submit", function (e) {
            e.preventDefault()
            e.stopPropagation()
            e.target.classList.remove("was-validated")


            if (e.target.checkValidity()) {
                // subir imagenes del usuario
                const url = base_url + "Usuarios_c/editarMascota";

                // Creación del formData
                const formData = new FormData(e.target);
                formData.append("idmascota", this.mascota.idmascota);

                const respuesta = funcDefault.llamadaAJAXAsync(url, formData)
                if (respuesta[0] === true) {
                    this.reinicarDatosMascota()
                } else {
                    funcDefault.mostrarPopUpError(`<div class=text-center> ${respuesta[1]}</div>`)
                }
            } else {
                e.target.classList.add("was-validated")
                scrollTo(top)
            }
        }.bind(this))
    }
}
// INICIALIZAR LA CLASE 
var editarMascota
addEventListener("DOMContentLoaded", function () {
    editarMascota = new EditarMascota()
})
