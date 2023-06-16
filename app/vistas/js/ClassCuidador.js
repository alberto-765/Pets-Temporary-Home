class Cuidador {
    idusuario
    role
    imagenPerfil
    apenom
    codpostal
    direccion
    poblacion
    direccion
    fechanac
    email
    telefono
    mascotas = []
    cuidperro
    cuidgato
    jardin
    fumadores
    cama
    muebles
    tamanocasa
    noninos
    ninosmenos
    ninosmas
    hayperros
    haygatos
    perroscastr
    perrasester
    gatoscastr
    gatasester
    coche
    medoral
    medinyec
    ejercicio
    perrotoy
    perropequeno
    perromediano
    perrogrande
    descripcion

    // servicios con sus precios
    servicios = {}

    // existen dos casuísticas, crear cuidador obtienendo datos y todos los servicios, o solo un servicio concreto
    constructor(datos, obtenerUnServicio = null, obtenerDatos = false) {

        if (obtenerDatos == true) {
            this.idusuario = datos

            // obtener servicios con precios
            this.obtenerServiciosCuidador(obtenerUnServicio)

            // obtener datos del cuidador
            this.obtenerDetallesUsuario()

            //guardar usuario en session
            this.guardarCuidadorEnSession()

            // obtener mascotas y guardar
            this.obtenerYGuardarMascotasSession()
        } else {
            this.idusuario = datos.idusuario

            // obtener servicios con precios
            this.obtenerServiciosCuidador(obtenerUnServicio)

            // setear los datos del cuidador
            this.setAtributosCuidador(datos)
            this.crearClasesMascotas(datos.mascotas)
            //guardar usuario en session
            this.guardarCuidadorEnSession()
        }

    }

    // obtener detalles del usuario, previamente han tenido que ser obteneidos los default
    obtenerDetallesUsuario() {
        const url = base_url + "Inicio_c/obtenerUsuarioDetalles";
        const formData = new FormData()
        formData.append("idusuario", this.idusuario)

        let usuario = funcDefault.llamadaAJAXAsync(url, formData)[0]
        usuario.imagenPerfil = this.extraerImagenPerfil()
        usuario.galeria = this.extraerGaleria()
        this.setAtributosCuidador(usuario)
    }



    // obtener los servicicios con sus precios, si se pasa un servicio se obtiene exclusivamente solo los precios de ese servicio
    obtenerServiciosCuidador(servicio = null) {
        const url = base_url + "Inicio_c/obtenerPrecios";
        const formData = new FormData()
        formData.append("idusuario", this.idusuario)

        if (servicio != null && servicio.trim() != "") {
            formData.append("servicio", servicio)
        }

        let servicios = funcDefault.llamadaAJAXAsync(url, formData)

        let nombreServTemporal = {}

        // recorrer los servicios para guardarlos como un objeto
        for (let elemento of servicios) {
            nombreServTemporal = elemento.nombreServicio

            // eliminamos el nombre del servicio para poder añadir el resto de servicios
            delete elemento.nombreServicio
            this.servicios[nombreServTemporal] = elemento
        }
    }

    // obtener un servicio del cuidador

    // setter de todos los atributos default del cuidador
    setAtributosDefault(usuario) {
        this.role = "cuidador"
        this.apenom = usuario.apenom
        this.direccion = usuario.direccion
        this.poblacion = usuario.poblacion
        this.direccion = usuario.direccion
        this.fechanac = usuario.fechanac
        this.email = usuario.email
        this.telefono = usuario.telefono
        this.codpostal = usuario.codpostal
        this.imagenPerfil = usuario.imagenPerfil
    }

    // setter de todos los detalles del cuidador
    setAtributosCuidador(usuario) {
        this.setAtributosDefault(usuario)
        this.cuidperro = usuario.cuidperro
        this.cuidgato = usuario.cuidgato
        this.jardin = usuario.jardin
        this.fumadores = usuario.fumadores
        this.cama = usuario.cama
        this.muebles = usuario.muebles
        this.tamanocasa = usuario.tamanocasa
        this.noninos = usuario.noninos
        this.ninosmenos = usuario.ninosmenos
        this.ninosmas = usuario.ninosmas
        this.hayperros = usuario.hayperros
        this.haygatos = usuario.haygatos
        this.perroscastr = usuario.perroscastr
        this.perrasester = usuario.perrasester
        this.gatoscastr = usuario.gatoscastr
        this.gatasester = usuario.gatasester
        this.coche = usuario.coche
        this.medoral = usuario.medoral
        this.medinyec = usuario.medinyec
        this.ejercicio = usuario.ejercicio
        this.perrotoy = usuario.perrotoy
        this.perropequeno = usuario.perropequeno
        this.perromediano = usuario.perromediano
        this.perrogrande = usuario.perrogrande
        this.descripcion = usuario.descripcion
        this.galeria = usuario.galeria

        // si no están los servicios es porque obtenerDatos era false
        if (this.servicios != undefined && Object.keys(this.servicios).length == 0) {
            this.servicios = usuario.servicios
        }
    }

    // si se quiere obtener las mascotas y también guardarlas en session 
    obtenerYGuardarMascotasSession() {
        this.obtenerClasesMascotasSinDetalles()
        this.guardarMascotasUsuario()
    }

    // crear clases con las mascotas 
    crearClasesMascotas(mascotas) {
        if (mascotas != undefined && mascotas.length > 0) {
            this.mascotas = []
            for (let mascota of mascotas) {
                this.mascotas.push(new Mascota(mascota, this.role))
            }
        }
    }

    // obtener las clases de las mascotas sin detalles
    obtenerClasesMascotasSinDetalles() {
        const url = base_url + "Inicio_c/obtenerMascotasSinDetalles";
        const formData = new FormData()
        formData.append("usuario", this.idusuario)

        // obtener mascotas y generar sus clases
        this.crearClasesMascotas(funcDefault.llamadaAJAXAsync(url, formData))
    }


    // añadir a session las mascotas del cuidador
    guardarMascotasUsuario() {
        let flujoCuidadores = JSON.parse(sessionStorage.getItem("flujoCuidadores"))
        flujoCuidadores[this.idusuario]["mascotas"] = this.mascotas
        sessionStorage.setItem("flujoCuidadores", JSON.stringify(flujoCuidadores))
    }

    // añadir al cuidador recién obtenido de BBDD a session
    guardarCuidadorEnSession() {
        let flujoCuidadores = JSON.parse(sessionStorage.getItem("flujoCuidadores"))
        if (!flujoCuidadores) {
            flujoCuidadores = {}
        }
        flujoCuidadores[this.idusuario] = this
        sessionStorage.setItem("flujoCuidadores", JSON.stringify(flujoCuidadores))
    }

    // obtener una mascota por el id
    obtenerUnaMascota(idmascota) {
        return this.mascotas.filter(mascota => mascota.idmascota == idmascota)[0]
    }

    // extraer galería y devolverla
    extraerGaleria() {
        const url = base_url + "Inicio_c/extraerGaleria"
        const formData = new FormData()
        formData.append("id", this.idusuario);
        formData.append("tipo", "usuario");
        // para que galeria siempre sea un array aunque haya solo una imagen
        return funcDefault.llamadaAJAXAsync(url, formData)
    }

    // llamada AJAX para extraer imagen de perfil
    extraerImagenPerfil() {
        const url = base_url + "Inicio_c/extraerImagenPerfil";
        const formData = new FormData();
        formData.append("id", this.idusuario);
        formData.append("tipo", "usuario");

        return funcDefault.llamadaAJAXAsync(url, formData);
    }


}