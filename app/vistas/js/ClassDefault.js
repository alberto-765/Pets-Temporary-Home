class Classdefault {
    // propiedades 
    spinner = $("#spinner")
    tipo_user = $("#header").data("tipo") || null
    popUpError = document.querySelector("#alerta")
    idusuario // el usuario se setea en el 
    static prevurl // url de página anterior
    urlInvalidas = ["registro_c", "inicio_c/index", "inicio_c/login", "inicio_c"] // url inválidas para hacer prevurl
    // constructor
    constructor() {
        this.crearUsuariosSession()
        this.eventoVolverTop()

        // añadir velocidad muy lenta a jquery
        $.fx.speeds['muy lento'] = 1500;
        this.idusuario = this.getUsuario()

        // obtener url anterior de sessionn storage y guardar la actual
        this.getPrevUrl()
        this.setPrevUrl()
    }


    // llamada AJAX ASINCRONA
    async llamadaFetch(url, formData = null) {
        let resultadoAJAX = await fetch(url, {
            method: "POST",
            body: formData,
            mode: "cors",
        }).then((response) => {

            // Si todo está correcto se devuelve la respuesta sino se muestra alert
            if (response.ok) return response.json();
            else return "error";
        });
        return resultadoAJAX;
    }

    // llamada AJAX sincrona
    llamadaAJAXAsync(url, data = null) {
        var respuesta = false
        $.ajax({
            async: false,
            url: url,
            data: data,
            dataType: "json",
            type: 'POST',

            // para que deje enviar FormData
            processData: false,
            // para que permita enviar cualquier tipo de formato
            contentType: false,
            success: function (json) {
                respuesta = json
            },

            // mostrar alerta con el error
            error: function (xhr, status) {
                let mensajeError = xhr.responseText
                // Coger el error para mostrarselo al usuario 
                let inicioError = mensajeError.indexOf("1644") + 4
                let finError = mensajeError.indexOf(" in ")
                respuesta = mensajeError.slice(inicioError, finError).trim()
            }
        })
        return respuesta
    }

    // mostrar un spiner de carga
    mostrarSpinner(spinnerPers = null) {

        // Si se quiere un spiner personalizado se modifica el default 
        if (spinnerPers != null) {
            this.spinner.html(spinnerPers)
        }

        $("body").addClass("no-scroll")

        $(document).scrollTop(0)
        this.spinner.removeClass("d-none")
    }

    // quitar el spinner de carga
    ocultarSpinner() {
        $("body").removeClass("no-scroll")
        this.spinner.addClass("d-none")
    }

    // evento del boton de volver al top de la página
    eventoVolverTop() {
        // boton para voler arriba
        const goTop = $("#goTop")

        // evennto detectar scroll 
        addEventListener("scroll", function (e) {

            // cuando llegue a 300 mostrar el boton de go top
            if (scrollY >= 200) {
                goTop.fadeIn("slow")
            }
            else {
                goTop.fadeOut("slow")
            }
        })
        // evento click para volver al top
        goTop.on("click", function (e) {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            })

        })
    }

    // método para mostrar el popUp de error con el mensaje personalizado
    mostrarPopUpError(mensaje) {
        // incluir mensaje
        this.popUpError.querySelector(".modal-body").innerHTML = mensaje

        // mostrar modal de errores haciendo click en el boton
        $(this.popUpError).modal("show")
    }


    // obtener id del usuario que ha hecho login de sessionStorage
    getUsuario() {
        return JSON.parse(sessionStorage.getItem("usuarios")).usuarioLogin
    }

    // asignar id del usuario que ha hecho login
    setUsuarioLogin(idusuario) {
        let usuarios = JSON.parse(sessionStorage.getItem("usuarios"))
        usuarios.usuarioLogin = idusuario
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    // redirigir a inicioUsuario si no llega url, a la prevurl si se cumplen las validaciones o a la url indicada
    redirigir(url = null) {
        if (url == null) {
            location.href = base_url + "Usuarios_c/inicioUsuario/"
        } else if (url == "prevurl") {

            // si prevurl es igual a alguna de las irl invalidas o es undefined se redirige al inicio de usuarios_c
            if (!this.urlInvalidas.some(valor => Classdefault.prevurl.toLowerCase() == base_url + valor) && Classdefault.prevurl != undefined) {
                location.href = Classdefault.prevurl
            } else {
                location.href = base_url + "Usuarios_c/inicioUsuario/"
            }
        } else {
            location.href = base_url + url
        }
    }

    // setter de prevurl en session storage
    setPrevUrl() {
        sessionStorage.setItem("prevurl", location.href)
    }

    // getter de prevurl de session storage
    getPrevUrl() {
        Classdefault.prevurl = sessionStorage.getItem("prevurl")
    }

    // cambiar estilo del footer por bg gris
    cambiarEstiloFooter() {
        $("footer").removeClass("bg-transparent").addClass("bg-secondary shadow-lg")
    }

    // crear objeto usuarios en session si no está hecho
    crearUsuariosSession() {
        if (!sessionStorage.getItem("usuarios")) {
            sessionStorage.setItem("usuarios", JSON.stringify({ usuarioLogin: "" }))
        }
    }

    // activar todos los popovers de boostrap
    activarPopovers() {
        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    }

}

// INICIALIZAR LA CLASE 
var funcDefault
addEventListener("DOMContentLoaded", function () {
    funcDefault = new Classdefault();
})