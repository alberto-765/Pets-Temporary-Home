class FuncMascotas {
    usuario // siempre que haya un usuario se guardarán las mascotas del mismo en el array mascotas
    mascotasParaEliminar = []
    constructor() {

        // por defecto el usuario es el de la session 
        this.comprobarExistenciaYCrearUsuario(funcDefault.getUsuario())
    }

    // recorrer las mascotas y realizar una casuística diferente
    recorrerMascotas(tipoRecorrido) {
        let respuestas = ""
        if (this.usuario.mascotas.length > 0) {


            switch (tipoRecorrido.toLowerCase()) {
                // casuística crear tarjetas de todas las mascotas
                case "creartarjetas":
                    respuestas = ""
                    for (let mascota of this.usuario.mascotas) {
                        respuestas += mascota.crearTarjeta()
                    }
                    break;

                // casuística crear filas para modal borrar 
                case "crearmodalborrar":
                    respuestas = ""
                    for (let indice in this.usuario.mascotas) {
                        respuestas += this.usuario.mascotas[indice].crearFilaModal(indice, true)
                    }
                    break;
                // casuística crear filas para modal confirmar 
                case "crearmodalconfirmar":
                    respuestas = ""
                    for (let indice in this.mascotasParaEliminar) {
                        respuestas += this.mascotasParaEliminar[indice].crearFilaModal(indice)
                    }

                    break;
                // casuística elimnar las mascotas del array "mascotasParaEliminar"
                case "eliminarmascotas":
                    respuestas = []

                    // si alguna de las respuestas contiene false se rompe el bucle y se muestra el error
                    let respuesta
                    for (let mascota of this.mascotasParaEliminar) {
                        respuesta = mascota.eliminarMascota()

                        // si se encuentra false es porque hay error
                        if (respuesta.indexOf(false) !== -1) {
                            respuestas = respuesta
                            break
                        } else {
                            respuestas.push(respuesta)
                        }
                    }
                    break;
            }
        }
        if (respuestas) return respuestas
    }


    // crear tarjetas si hay mascotas, sino enlaces de añadir mascota
    crearTarjetasMascotasYAnadir() {
        let innerHTML = ""
        if (this.usuario.mascotas.length > 0) {
            innerHTML += this.crearEnlaceAnadirMascota()
            innerHTML += this.recorrerMascotas("creartarjetas")
        } else {
            innerHTML += this.crearEnlacesNoHayMascota()
        }
        document.getElementById("contenedorMascotas").innerHTML = innerHTML
    }

    // enlaces para crear una mascota
    crearEnlaceAnadirMascota() {
        if (funcDefault.tipo_user == "cuidador") {
            // crear mascota cuidador
            return `<a href="${base_url}Cuidadores_c/crearMascota" class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10  lead link-info text-decoration-none fw-normal me-auto mb-5"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añadir otra mascota</span></a>`;
        } else {
            // crear mascota propietario
            return `<a href="${base_url}Propietarios_c/crearMascota" class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10  lead link-info text-decoration-none fw-normal me-auto mb-5"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añadir otra mascota</span></a>`;
        }
    }

    // crear enlaces cuando no hay mascotas
    crearEnlacesNoHayMascota() {
        let cadena = `<div class="col-12  col-lg-11 col-xl-10 col-xxl-11 fs-5 text-muted me-auto mb-2">
            <i class="bi bi-emoji-smile"></i> ¡UPS! ¡Parece que no tienes mascotas! <i class="bi bi-emoji-smile-upside-down"></i>
        </div>`;
        if (funcDefault.tipo_user == "cuidador") {
            cadena += ` <a href="${base_url}Cuidadores_c/crearMascota" class="col-12 col-lg-11 col-xl-10 col-xxl-11 lead link-info text-decoration-none fw-normal me-auto"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añade a tu primera mascota </span></a>`;
        } else {
            cadena += ` <a href="${base_url}Propietarios_c/crearMascota" class="col-12 col-lg-11 col-xl-10 col-xxl-11 lead link-info text-decoration-none fw-normal me-auto"> <i class="bi bi-plus-circle "></i> <span class="ms-1 "> Añade a tu primera mascota </span></a>`;
        }
        return cadena
    }


    // insertar las mascotas seleccionadas en el modal  confirmar al hacer click en el boton eliminar
    eventoAnadirModalConfirmar() {
        $("#btn-eliminar").one("click", function () {

            // vaciar array por si contiene datos de un borraro realizado anteriormente
            this.mascotasParaEliminar = []
            let listaChecks = document.querySelectorAll("#mascotasBorrar .seleccionarMascota:checked");

            // recoger las mascotas seleccionadas y añadirlas al array "mascotasParaEliminar"
            for (let input of listaChecks) {
                if (input.checked) {
                    input.checked = false;

                    // filtar mascota que tenga ese id
                    let mascotaParaEliminar = this.usuario.mascotas.filter(elemento => elemento.idmascota == parseInt(input.value))[0]
                    this.mascotasParaEliminar.push(mascotaParaEliminar);
                }
            }
            this.crearModalConfirmarYEventoEliminar();

        }.bind(this));
    }

    // evento para confirmar el eliminado de las mascotas seleccionadas 
    eventoConfirmarEliminado() {
        $("#btn-confirmar").one("click", function (e) {
            funcDefault.mostrarSpinner()
            // eliminar mascotas del array "mascotasParaEliminar"
            let respuestas = this.recorrerMascotas("eliminarmascotas")


            this.resetearMascotasUsuario()

            // si no hay false dentro de la respuesta todo está OK
            if (respuestas.indexOf(false) === -1) {
            } else {
                // si el error no viene vacio mostrar 
                if (respuestas[1]) {
                    funcDefault.mostrarPopUpError(`<div>${respuestas[1]}</div>`)
                } else {
                    funcDefault.mostrarPopUpError("<div>Ha sucedido un error al intentar <strong>eliminar</strong> una de las mascotas</div>")
                }
            }

            // 1.8 En algunas ocasiones se borra la mascota pero no se resetea el Session, por lo que se hará haya o no error en la respuesta
            this.crearTarjetasMascotasYAnadir()
            // reiniciar pop up elmiinar
            this.crearModalBorrarYEventoConfirmar()
            setTimeout(function () {
                funcDefault.ocultarSpinner()
            }.bind(this), 1000)
        }.bind(this));
    }

    // crear modal borrar con las mascotas del usuario y el evento click de confirmar
    crearModalBorrarYEventoConfirmar() {
        if (this.usuario.mascotas.length > 0) {
            document.getElementById("mascotasBorrar").innerHTML = this.recorrerMascotas("crearmodalborrar")
        } else {
            document.getElementById("mascotasBorrar").closest(".contenedorTablaBorrar").innerHTML = "<strong>No tienes ninguna mascota</strong>"
        }
        this.eventoAnadirModalConfirmar();
    }

    // añadir al modal de confirmar las mascotas seleccionadas para ser eliminadas y crear evento click de confirmar eliminacion
    crearModalConfirmarYEventoEliminar() {
        if (this.mascotasParaEliminar.length > 0) {

            // Version 1.8: se resuelve fallo que al no seleccionar mascotas para eliminar se borrarba la tabla mascotasConfirmar 

            if (document.getElementById("mascotasConfirmar") == null) {
                document.querySelector(".contenedorTablaConfirmar").innerHTML = `<div class="contenedorTablaConfirmar"> <table class="table table-striped text-center w-100">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Raza</th>
                        <th>Tamaño</th>
                        <th>Sexo</th>
                      
                    </tr>
                </thead>
                <tbody id="mascotasBorrar">
                </tbody>
            </table></div>`
            }
            document.getElementById("mascotasConfirmar").innerHTML = this.recorrerMascotas("crearmodalconfirmar");
            this.eventoConfirmarEliminado();
        } else {
            document.getElementById("mascotasConfirmar").closest(".contenedorTablaConfirmar").innerHTML = "<strong>No has seleccionado ninguna mascota</strong>"
        }
    }

    // si no existe el usuario en session, crear usuario obteniendo datos
    comprobarExistenciaYCrearUsuario(usuario) {
        // si no existe el usuario cogerlo de la url
        if (!usuario) {
            usuario = this.obtenerUsuarioURL()
        }


        if (usuario) {
            const usuarioSession = JSON.parse(sessionStorage.getItem("usuarios"))
            // si ya existe el usuario solamente se crea la clase sin obtener datos de BBDD
            if (usuarioSession[usuario]) {
                this.usuario = new Usuario(usuarioSession[usuario])
            } else {
                this.usuario = new Usuario(usuario, true)
            }
        }
    }


    // cambiar el tipo de input del input mediacion seleccionado para que pueda deseleccionarse
    activarMedicacion() {
        // 3 botones de medicacion
        const btnsMedicacion = document.querySelectorAll(".btnTipoMedicacion");

        // input nombre medicacion
        const mednom = document.getElementById("mednom");

        for (let input of btnsMedicacion) {
            input.addEventListener("change", function (e) {

                // si está seleccionado convertir a checkbox para que luego pueda ser deseleccionado sino volver a convertir a radio
                if (this.checked) {
                    this.type = "checkbox"
                    mednom.disabled = false;

                    // 1.8 Se soluciona error que hacia que se quedara seleccionado el resto de botones
                    const btnMedicacionActivados = Array.from(btnsMedicacion).filter(btn => (btn != this && btn.checked))
                    if (btnMedicacionActivados.length > 0) {
                        $(btnMedicacionActivados).prop("checked", false)
                    }
                } else {
                    this.type = "radio"
                    mednom.disabled = true;
                }



            });
        }
    }

    // activar input tamaño si se selecciona tipo mascota "perro"
    eventoInputTamano() {
        let selectTamaño = document.getElementById("select-tamaño");

        // btn-perro input
        let btnPerro = document.getElementById("btn-perro");

        let btnGato = document.getElementById("btn-gato");

        btnPerro.addEventListener("change", function (e) {
            // si está seleccionado activar select tamaño
            if (this.checked) selectTamaño.disabled = false;
        });

        btnGato.addEventListener("change", function (e) {
            // si está seleccionado activar select tamaño
            if (this.checked) selectTamaño.disabled = true;
        });
    }

    // volver a obtener las mascotas del usuario y mostrar tarjetas
    resetearMascotasUsuario() {
        this.usuario.obtenerYGuardarMascotasSession()
    }

    obtenerUsuarioURL() {
        const posibleUsuario = decodeURI(location.href.split("/").slice(-2, -1))

        if (posibleUsuario != "crearMascota" && posibleUsuario != "eliminarMascota" && posibleUsuario != "editarMascota" && posibleUsuario != "subirImagenesMascota" && posibleUsuario != "mascotas") {
            return posibleUsuario
        } else {
            return null
        }
    }
}
// INICIALIZAR LA CLASE 
var funcMascotas
addEventListener("DOMContentLoaded", function () {
    funcMascotas = new FuncMascotas()
})
