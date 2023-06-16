class DetallesCuid {
    idCuidador // id cuidador obtenido por url
    cuidador // clase del cuidador obtenida por session
    constructor() {
        funcDefault.mostrarSpinner()
        funcDefault.cambiarEstiloFooter()
        this.idCuidador = location.href.split("/").slice(-1)[0]

        // crear clase obteniendo el cuidador de session
        this.obtenerCuidadorYGuardarSession()

        this.obtenerCalendarioBBDDConfigurarInsertar()

        this.formarYañadirCarousel()
        this.anadirServicios()
        this.iniciarMapa()
        this.eventoCargarReservar()


        // 1.8 se annade tiempo de espera para que se vean los placeholder de carga
        // 1.8 si se viene de hacer login no se mostrará la carga
        if (Classdefault.prevurl == base_url + "Inicio_c/buscarCuidador") {
            setTimeout(function () {
                this.crearTarjetaMascotas()
                this.insertar_Nom_Dirr_Desc_Edad_Tlf_Correo()
                this.insertarDetalles()
                this.anadirFotoPerfilCuid()

                // ocultar spinner datos ya cargados
                funcDefault.ocultarSpinner()
            }.bind(this), 1000)
        } else {
            this.crearTarjetaMascotas()
            this.insertar_Nom_Dirr_Desc_Edad_Tlf_Correo()
            this.insertarDetalles()
            this.anadirFotoPerfilCuid()

            // ocultar spinner datos ya cargados
            funcDefault.ocultarSpinner()
        }


    }

    // obtener cuidador y guardarlo en session "usuarios"
    obtenerCuidadorYGuardarSession() {
        let flujoCuidadores = JSON.parse(sessionStorage.getItem("flujoCuidadores"))

        // si flujoCuidaodres no existe o no está cuidador volver a url prev
        if (!flujoCuidadores || !flujoCuidadores[this.idCuidador]) {
            funcDefault.redirigir("prevurl")
        } else {
            this.cuidador = new Cuidador(flujoCuidadores[this.idCuidador])

            // reescribir el usuario
            let usuariosSession = JSON.parse(sessionStorage.getItem("usuarios"))
            usuariosSession[this.cuidador.idusuario] = this.cuidador

            // volver a guardar los usuarios modificados
            sessionStorage.setItem("usuarios", JSON.stringify(usuariosSession))
        }
    }

    // configurar el calendario del cuidador
    configurarCalendario() {
        let calendario = new FullCalendar.Calendar(document.querySelector(".calendario"), {
            //1.8 para que comience por el lunes
            firstDay: 1,

            //1.8 para que la vista por default sea por dias
            initialView: 'dayGridMonth',
            locale: "es",

            //1.8 elementos que apareceran en el header
            headerToolbar: {
                left: 'dayGridMonth,timeGridWeek',
                center: 'title',
                right: 'prev today next'
            },

            //1.8 para que las cuadrículas sean de 1 hora
            slotDuration: '01:00:00',

            //1.8 para que sea de 7:00 am a 24:00 pm 
            slotMinTime: '07:00:00',
            slotMaxTime: '24:00:00',


            buttonText: {
                today: 'Hoy',
                dayGridMonth: 'Mes',
                timeGridWeek: 'Semana'
            },
            businessHours: false,
            height: 650,
        })

        calendario.render();
        return calendario
    }

    // obtener los datos de calendario del cuidador
    async obtenerCalendarioBBDDConfigurarInsertar() {
        const url = base_url + "Inicio_c/selectCalendario"

        // agregar id usuario
        const formData = new FormData()

        formData.append("idusuario", this.cuidador.idusuario)

        // hacer llamada AJAX
        await this.insertarCalendario(await funcDefault.llamadaFetch(url, formData))
    }

    // insertar los datos del cuidador en el calendario
    async insertarCalendario(calendarioData) {
        let calendario = this.configurarCalendario()
        // añadir cada evento al calendario
        for (let evento of calendarioData) {

            let fechafin = new Date(evento.calfechfin)
            let fechainicio = new Date(evento.calfechinicio)

            // no disponible
            if (evento.role == "N") {
                calendario.addEvent({


                    start: fechainicio,
                    end: fechafin,
                    display: 'block', // Mostrar por horas en el formato semanal
                    rendering: 'background',
                    color: '#cff4fc'

                })

            } else {
                // reservado
                calendario.addEvent({

                    start: fechainicio,
                    end: fechafin,
                    display: 'block', // Mostrar por horas en el formato semanal
                    rendering: 'background',
                    color: '#f8d7da',

                })
            }
        }
    }

    // insertar el nombre, direccion, descripcion, edad, telefono y correo
    insertar_Nom_Dirr_Desc_Edad_Tlf_Correo() {

        // insertar nombre
        const containersNombre = document.querySelectorAll(".nombreCuidador")

        for (let elemento of containersNombre) {
            elemento.innerHTML = this.cuidador.apenom

            // 1.8 ocultar el placeholder de carga
            elemento.parentElement.classList.remove("d-none")
            elemento.parentElement.nextElementSibling.classList.add("d-none")
        }

        // 1.8 insertar dirección y ocultar placeholder de carga
        const direccion = document.querySelector("#direccion")

        direccion.innerHTML = `${this.cuidador.poblacion}, ${this.cuidador.codpostal}, ${this.cuidador.direccion}`
        direccion.nextElementSibling.classList.add("d-none")


        // 1.8 insertar descripcion y ocultar placeholder de carga
        const descripcion = document.querySelector("#descripcion")

        descripcion.innerHTML = this.cuidador.descripcion
        descripcion.classList.remove("d-none")
        descripcion.nextElementSibling.classList.add("d-none")

        // calcular edad
        const hoy = new Date();
        const cumpleanos = new Date(this.cuidador.fechanac);
        let edad = hoy.getFullYear() - cumpleanos.getFullYear();
        const m = hoy.getMonth() - cumpleanos.getMonth();

        // restar un año si el mes de nacimiento es mayor al mes actual o si es el mismo mes pero el dia del cumple es mayor
        if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
            edad--;
        }

        // 1.8 insertar edad y ocultar paceholder de carga
        const liEdad = document.querySelector("#edad")
        liEdad.innerHTML += edad + " años"
        liEdad.querySelector(".placeholder-glow").classList.add("d-none")

        // 1.8 insertar telefono y ocultar paceholder de carga
        const liTelefono = document.querySelector("#telefono")
        liTelefono.innerHTML += this.cuidador.telefono
        liTelefono.querySelector(".placeholder-glow").classList.add("d-none")

        // 1.8 insertar correo y ocultar paceholder de carga
        const liCorre = document.querySelector("#correo")
        liCorre.innerHTML += this.cuidador.email
        liCorre.querySelector(".placeholder-glow").classList.add("d-none")
    }

    // insertar los datos procedentes de la tabla detalles
    insertarDetalles() {
        let detallesCasa = ""
        detallesCasa += `<li class="list-group-item list-group-item-dark">`

        switch (this.cuidador.tamanocasa) {
            case "P":
                detallesCasa += ` Superficie de 24-45m2</li >`
                break
            case "M":
                detallesCasa += ` Superficie de 50-75m2</li >`
                break
            case "G":
                detallesCasa += ` Superficie mayor de 80m2</li >`
                break
            default:
                detallesCasa += ` Superficie no especificada</li >`
                break
        }

        // si tiene jardín o terraza
        if (this.cuidador.fumadores == 0)
            detallesCasa += ` <li class="list-group-item list-group-item-danger">No tiene jardín/terraza</li>`
        else
            detallesCasa += ` <li class="list-group-item list-group-item-success">Tiene jardín/terraza</li>`

        // si hay fumadores
        if (this.cuidador.fumadores == 0)
            detallesCasa += ` <li class="list-group-item list-group-item-danger">Hay fumadores</li>`
        else
            detallesCasa += ` <li class="list-group-item list-group-item-success">No hay fumadores</li>`


        // si puede subir a los muebles
        if (this.cuidador.muebles == 0)
            detallesCasa += ` <li class="list-group-item list-group-item-danger">No pueden subir a los muebles</li>`
        else
            detallesCasa += ` <li class="list-group-item list-group-item-success">Pueden subir a los muebles</li>`

        // si puede subir a la cama
        if (this.cuidador.cama == 0)
            detallesCasa += ` <li class="list-group-item list-group-item-danger">No pueden subir a la cama</li>`
        else
            detallesCasa += ` <li class="list-group-item list-group-item-success">Pueden subir a la cama</li>`

        // si hay niños
        if (this.cuidador.noninos == 0) {
            detallesCasa += ` <li class="list-group-item list-group-item-danger">Hay niños</li>`

            // si hay niños menos de 12
            if (this.cuidador.ninosmenos == 1)
                detallesCasa += ` <li class="list-group-item list-group-item-danger">Hay niños menores de 12 años</li>`
            else
                detallesCasa += ` <li class="list-group-item list-group-item-success">No hay niños menores de 12 años</li>`


            // si hay niños mayores de 12
            if (this.cuidador.ninosmas == 1)
                detallesCasa += ` <li class="list-group-item list-group-item-danger">Hay niños mayores de 12 años</li>`
            else
                detallesCasa += ` <li class="list-group-item list-group-item-success">No hay niños mayores de 12 años</li>`
        }
        else
            detallesCasa += ` <li class="list-group-item list-group-item-success">No hay niños</li>`


        // añadir cadena a la lista masMascotas
        document.getElementById("casa").innerHTML = detallesCasa

        let detallesMascotas = ""

        // si hay perros
        if (this.cuidador.hayperros == 1)
            detallesMascotas += ` <li class="list-group-item list-group-item-success">No hay perros</li>`
        else
            detallesMascotas += ` <li class="list-group-item list-group-item-danger">Hay perros</li>`

        // si hay gatos
        if (this.cuidador.haygatos == 0)
            detallesMascotas += ` <li class="list-group-item list-group-item-success">No hay gatos</li>`
        else
            detallesMascotas += ` <li class="list-group-item list-group-item-danger">Hay gatos</li>`


        // si acepta perros y gatos de todos los sexos no castradaso/esterilizadas
        if (this.cuidador.perroscastr == 1 && this.cuidador.perrasester == 1 && this.cuidador.gatasester == 1 && this.cuidador.gatoscastr == 1)
            detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta perr@s y gat@s no castrados/esterilizadas</li>`
        else {
            // si acepta gatas y gatos no castradas
            if (this.cuidador.gatoscastr == 1 && this.cuidador.gatoscastr == 1)
                detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta gat@s no castrados/esterilizadas</li>`
            else if (this.cuidador.gatoscastr == 0 && this.cuidador.gatoscastr == 0)
                detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta gat@s no castrados/esterilizadas</li>`
            else {
                // gatos
                if (this.cuidador.gatoscastr == 1)
                    detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta gatos no castrados</li>`
                else
                    detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta gatos no castrados</li>`

                // gatas 
                if (this.cuidador.gatasester == 1)
                    detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta gatas no esterilizadas</li>`
                else
                    detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta gatas no esterilizada</li>`
            }

            // si acepta perros y perras no castradas 
            if (this.cuidador.perroscastr == 1 && this.cuidador.perrasester == 1)
                detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta perr@s no castrados/esterilizadas</li>`
            else if (this.cuidador.perroscastr == 0 && this.cuidador.perrasester == 0)
                detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta perr@s no castrados/esterilizadas</li>`
            else {

                // perros 
                if (this.cuidador.perroscastr == 1)
                    detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta perros no castrados</li>`
                else
                    detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta perros no castrados</li>`

                // perras 
                if (this.cuidador.perrasester == 1)
                    detallesMascotas += ` <li class="list-group-item list-group-item-success">Acepta perros no esterilizadas</li>`
                else
                    detallesMascotas += ` <li class="list-group-item list-group-item-danger">No acepta perros no esterilizadas</li>`
            }


        }

        // añadir cadena a la lista masMascotas
        document.getElementById("masMascotas").innerHTML = detallesMascotas

        let masDetalles = ""

        if (this.cuidador.coche == 1)
            masDetalles += `<li class="list-group-item list-group-item-dark">Puede ofrecer transporte</li > `
        else masDetalles += `<li class="list-group-item list-group-item-dark">No puede ofrecer transporte</li > `

        if (this.cuidador.ejercucui == 1)
            masDetalles += `<li class="list-group-item list-group-item-success">Puede ofrecer ejercicio</li > `
        else masDetalles += `<li class="list-group-item list-group-item-danger">No puede ofrecer ejercicio</li > `

        if (this.cuidador.medoral == 1 && this.cuidador.medinyec == 1)
            masDetalles += `<li class="list-group-item list-group-item-success">Puede administrar medicación oral e inyectada</li > `
        else {
            if (this.cuidador.medoral == 1)
                masDetalles += `<li class="list-group-item list-group-item-success">Puede administrar medicación oral</li > `
            else if (this.cuidador.medoral == 0)
                masDetalles += `<li class="list-group-item list-group-item-danger">No puede administrar medicación oral</li > `


            if (this.cuidador.medinyec == 1)
                masDetalles += `<li class="list-group-item list-group-item-success">Puede administrar medicación inyectada</li > `
            else masDetalles += `<li class="list-group-item list-group-item-danger">No puede administrar  medicación inyectada</li > `

            if (this.cuidador.cachorro == 1)
                masDetalles += `<li class="list-group-item list-group-item-success">Puede cuidar a cachorros</li > `
            else masDetalles += `<li class="list-group-item list-group-item-danger">No puede cuidar a cachorros</li > `
        }

        // añadir cadena a la lista masDetalles
        document.getElementById("masDetalles").innerHTML = masDetalles

        // tamaños de perros que puede cuidar
        let btn_tamaños = document.getElementById("puedeCuidar")
        for (let boton in btn_tamaños.children) {
            switch (boton) {
                case "0":
                    if (this.cuidador.perrotoy == 1)
                        btn_tamaños.firstElementChild.classList.add("active")
                    break
                case "1":
                    if (this.cuidador.perropequeno == 1)
                        btn_tamaños.children[boton].classList.add("active")
                    break
                case "2":
                    if (this.cuidador.perromediano == 1)
                        btn_tamaños.children[boton].classList.add("active")
                    break
                case "3":
                    if (this.cuidador.perrogrande == 1)
                        btn_tamaños.children[boton].classList.add("active")
                    break
                case "4":
                    if (this.cuidador.perroenorme == 1)
                        btn_tamaños.lastElementChild.classList.add("active")
                    break
            }
        }

        // tamaños de perros que puede cuidar
        let btn_tipos = document.getElementById("tiposMascotaCuidar")
        for (let boton in btn_tipos.children) {
            switch (boton) {
                case "0":
                    if (this.cuidador.cuidperro == 1)
                        btn_tipos.firstElementChild.classList.add("active")
                    break
                case "1":
                    if (this.cuidador.cuidgato == 1)
                        btn_tipos.children[boton].classList.add("active")
                    break
            }
        }

    }

    // añadir la foto de perfil del cuidador en los contenedores necesarios
    anadirFotoPerfilCuid() {
        const imagenes = document.querySelectorAll(".fotoPerfilCuid")

        // asignar la url de la foto de perfil
        for (let img of imagenes) {
            img.src = this.cuidador.imagenPerfil
            img.alt = "Foto Perfil Cuidador"
            img.nextElementSibling.classList.add("d-none")
            img.classList.remove("d-none")
        }
    }


    // insertar carousel con la galería
    formarYañadirCarousel() {
        let textoCarousel = ""
        if (this.cuidador.galeria.length > 0) {
            textoCarousel += `<div class="carousel-indicators" >`

            for (let imagen in this.cuidador.galeria) {
                textoCarousel += `<button type="button" data-bs-target="#carouselGaleriaDetalles" data-bs-slide-to="${imagen}" class="active" aria-current="true" aria-label="Slide ${imagen}"></button>`
            }

            textoCarousel += `</div><div class="carousel-inner" style="height: 50vh;">`

            for (let imagen in this.cuidador.galeria) {
                if (imagen == 0) {
                    textoCarousel += `<div class="carousel-item active text-center h-100">
             <img src="${this.cuidador.galeria[imagen][1]}" class="object-fit-contain rounded h-100 rounded" alt="Imagen galería mascota">
             </div>`
                } else {
                    textoCarousel += `<div class="carousel-item text-center h-100" >
             <img src="${this.cuidador.galeria[imagen][1]}" class="object-fit-contain rounded h-100 rounded" alt="Imagen galería mascota">
             </div>`
                }

            }

            textoCarousel += `</div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselGaleriaDetalles" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselGaleriaDetalles" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                    </button>`

        } else {
            textoCarousel = `<h5 class="lead"> No tiene imágenes en la galería<h4>`
        }
        // añadir el texto al carousel 

        document.getElementById("carouselGaleriaDetalles").innerHTML = textoCarousel
    }

    // añadir los servicios que ofrece, con los precios
    async anadirServicios() {
        let cadenaTarifas = ""
        let indice = 1
        for (let servicio in this.cuidador.servicios) {

            switch (servicio) {
                case "Alojamiento":
                    cadenaTarifas += `<div class=" col-12 col-md-8 ${(indice < Object.keys(this.cuidador.servicios).length) ? "border-bottom" : ""} pb-4">
 
                    <div class="row  container-servicios">
                        <div class="col-8 col-lg-4">
                            <h4 class="mb-0">Alojamiento</h4>
                            <p class="fw-3 text-muted font-monospace">Noche en casa del cuidador</p>
                        </div>
                        <div class="col-4 col-lg-2 text-start  align-middle">
                            <img class="" src="${base_url}app/assets/iconos/housenight.png" alt="Alojamiento en casa de cuidador">
                        </div>
                        <div class="col-12 col-lg-3  text-danger-emphasis text-center" >
                           <blockquote class="blockquote">
                               Servicio ${this.cuidador.servicios.Alojamiento.precio}€
                           </blockquote>
                        </div>
                        <div class="col-12 col-lg-3 text-warning-emphasis text-center">
                        <blockquote class=" blockquote">
                        Plus transporte `
                    // 1.8 El plusTransporte solo se mostrará si es mayor a 0
                    if (this.cuidador.servicios.Alojamiento.plustransporte > 0) {

                        cadenaTarifas += `${this.cuidador.servicios.Alojamiento.plustransporte}€ </blockquote></div>`
                    } else {
                        cadenaTarifas += `-</blockquote></div>`
                    }


                    cadenaTarifas += `</div></div>`
                    break
                case "Guardería":

                    cadenaTarifas += ` <div class="col-12 col-md-8 ${(indice < Object.keys(this.cuidador.servicios).length) ? "border-bottom" : ""}" >

                    <div class="row container-servicios mt-4">
    
                        <div class="col-8 col-lg-4">
                            <h4 class="mb-0">Guardería</h4>
                            <p class="fw-3 text-muted font-monospace">Día en casa del cuidador</p>
                        </div>
                        <div class="col-4 col-lg-2  text-start  align-middle">
                            <img class="" src="${base_url}app/assets/iconos/houseday.png" alt="Guarderia de dia">
                        </div>
                        <div class="col-12 col-lg-3  text-danger-emphasis text-center">
                            <blockquote class="blockquote">
                                Servicio ${this.cuidador.servicios.Guardería.precio}€
                            </blockquote>
                        </div>
                        <div class="col-12 col-lg-3 text-warning-emphasis text-center">    <blockquote class=" blockquote">
                       `

                    // 1.8 El plusTransporte solo se mostrará si es mayor a 0
                    if (this.cuidador.servicios.Guardería.plustransporte > 0) {

                        cadenaTarifas += ` Plus transporte ${this.cuidador.servicios.Guardería.plustransporte}€
                    </blockquote>
                    </div>`
                    } else {
                        cadenaTarifas += `-</blockquote></div>`
                    }

                    cadenaTarifas += `</div></div > `
                    break
                case "Paseo":
                    cadenaTarifas += `<div class="col-12 col-md-8 " >

                <div class="row container-servicios mt-4 ${(indice < Object.keys(this.cuidador.servicios).length) ? "border-bottom" : ""}">
                    <div class="col-8 col-lg-4">
                        <h4 class="mb-0">Paseo</h4>
                        <p class="fw-3 text-muted font-monospace ">Por tu barrio</p>
                    </div>
                    <div class="col-4 col-lg-2  text-start  align-middle">
                        <img class="" src="${base_url}app/assets/iconos/paseo.png" alt="Paseo por tu barrio ">
                    </div>
                    <div class="col-12 col-lg-3 text-danger-emphasis text-center">
                        <blockquote class="blockquote">
                            Servicio ${this.cuidador.servicios.Paseo.precio}€
                        </blockquote>
                    </div> 
                    <div class="col-12 col-lg-3 text-danger-emphasis text-center">
                    <blockquote class="blockquote">
                       -
                    </blockquote>
                </div></div> </div > `
                    break
            }

            indice++
        }
        // añadir cadena al contenedor de servicios
        document.getElementById("servicios").innerHTML += cadenaTarifas
    }


    // iniciar el mapa de la ubicacion
    iniciarMapa() {
        let direccion = `${this.cuidador.direccion} ${this.cuidador.poblacion} ${this.cuidador.codpostal} `

        var map = new google.maps.Map(document.getElementById("mapa"), {
            zoom: 17,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var geoCoder = new google.maps.Geocoder();
        geoCoder.geocode({
            "address": direccion
        }, function (results, status) {

            // si ha obtenido la direcciónz
            if (status == "OK") {
                map.setCenter(results[0].geometry.location);
                var circle = new google.maps.Circle({
                    map: map,
                    center: results[0].geometry.location,
                    radius: 100, // Define el radio en metros de tu área
                    strokeColor: '#BBD6B8', // Color del borde del círculo
                    strokeOpacity: 0.8, // Opacidad del borde del círculo
                    strokeWeight: 2, // Grosor del borde del círculo
                    fillColor: '#DDFFBB', // Color del relleno del círculo
                    fillOpacity: 0.15 // Opacidad del relleno del círculo
                });
            } else {

                if (status === "ZERO_RESULTS") {
                    document.getElementById("mapa").innerHTML = "No hubo resultados para la dirección ingresada.";
                } else if (status === "OVER_QUERY_LIMIT" || status === "REQUEST_DENIED" || status === "UNKNOWN_ERROR") {
                    document.getElementById("mapa").innerHTML = "Error general del mapa.";
                } else if (status === "INVALID_REQUEST") {
                    document.getElementById("mapa").innerHTML = "Error al generar el mapa";
                }
            }
        })
    }


    // crear las tarjetas de las mascotas del cuidador 
    async crearTarjetaMascotas() {

        // contenedor al que añadir las tarjetas
        const perfilMascota = document.getElementById("perfilMascota")

        let cadena = "";

        //1.8 se añade placeholder de carga, el cual debe de ser ocultado al añadir el nuevo html
        perfilMascota.lastElementChild.classList.add("d-none")

        // si hay mascotas
        if (this.cuidador.mascotas.length > 0) {
            for (let mascota of this.cuidador.mascotas) {

                cadena += `<a href = "${base_url}Inicio_c/detallesMascotas/${this.cuidador.idusuario}/${mascota.idmascota}" class="d-flex column-gap-4 text-decoration-none link-dark tarjetaMasc_detallesCuid"> <div class="col-3 col-md-4 col-lg-3"><img src="${mascota.imagenPerfil}" alt="Foto de perfil de ${mascota.nombre}" title="Mascotas del cuidador" class="  object-fit-cover rounded-circle border-2 w-100 h-100 "></div>
            <div class="col-9 col-md-8 col-lg-9  d-flex flex-column justify-content-center">
            <h6 class="fs-5">${mascota.nombre}</h6>
            <p class="muted fs-6">${mascota.raza} - `

                switch (mascota.tamano) {
                    case "T":
                        cadena += `Toy`
                        break
                    case "P":
                        cadena += `Pequeño`
                        break
                    case "M":
                        cadena += `Mediano`
                        break
                    case "G":
                        cadena += `Grande`
                        break
                    case "E":
                        cadena += `Enorme`
                        break
                }

                if (mascota.anos > 1) {
                    cadena += ` - ${mascota.anos} años`
                } else cadena += ` - ${mascota.anos} año`

                if (mascota.meses > 0) {
                    if (mascota.meses == 1) {
                        cadena += ` y ${mascota.meses} mes </p>`
                    } else cadena += ` y ${mascota.meses} meses</p>`
                } else cadena += `</p>`

                cadena += `</div ></a> `

                perfilMascota.innerHTML += cadena
            }
        } else { perfilMascota.innerHTML += `<div class="col-10 lead text-danger-emphasis"> -No tiene mascotas</div> ` }
    }

    // evento para la pagina de reservas
    eventoCargarReservar() {
        document.querySelector("#reservar").addEventListener("click", function (e) {
            e.preventDefault()
            e.stopPropagation()
            // si el usuario de la funcion padre es null o no existe es porque no se ha hecho login
            if (!funcUsuarios.usuario || funcUsuarios.usuario == null || funcUsuarios.usuario == undefined) {
                funcDefault.redirigir("Inicio_c/login")
            } else {
                funcDefault.redirigir("Propietarios_c/cargarReservar/" + this.cuidador.idusuario)
            }
        }.bind(this))
    }

}

var detallesCuid
addEventListener("DOMContentLoaded", function () {
    detallesCuid = new DetallesCuid()
})