class Usuario {
    // atributos que tienen todos los usuarios
    idusuario
    role
    imagenPerfil
    apenom
    direccion
    poblacion
    direccion
    fechanac
    email
    telefono
    codpostal
    mascotas = []
    // atributos si es un cuidador
    galeria = []
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

    // existen dos casuísticas, crear usuario teniendo el id y obtienendo todos los datos, o crear un usuario con los datos que llegan
    constructor(datos, obtenerDatos = false) {
        if (obtenerDatos) {
            this.idusuario = datos

            // obtener atributos del usuario y asignarlos a los de la clase
            this.obtenerUsuario()

            //guardar usuario en session
            this.guardarUsuarioEnSession()

            // obtener las mascotas sin detalles(cuidador), con detalles(propietario)
            this.obtenerYGuardarMascotasSession()
        } else {
            this.idusuario = datos.idusuario
            this.setAtributosDefault(datos)
            this.setAtributosCuidador(datos)
            this.crearClasesMascotas(datos.mascotas)
        }
    }


    // obtener atributos default y si es cuidador también los detalles y sus servicios
    obtenerUsuario() {

        if (this.role == "cuidador") {
            // obtener servicios con precios
            this.obtenerServiciosCuidador()
            this.obtenerDetallesUsuario()
        } else {
            this.obtenerAtributosDefaultUsuario()
        }
    }
    // obtener atributos default del usuario
    obtenerAtributosDefaultUsuario() {
        const url = base_url + "Inicio_c/obtenerUsuario";
        const formData = new FormData()
        formData.append("idusuario", this.idusuario)

        let usuario = funcDefault.llamadaAJAXAsync(url, formData)[0]
        usuario.imagenPerfil = this.extraerImagenPerfil()
        this.setAtributosDefault(usuario)
    }

    // obtener detalles del usuario, previamente han tenido que ser obteneidos los default
    obtenerDetallesUsuario() {
        const url = base_url + "Inicio_c/obtenerUsuarioDetalles";
        const formData = new FormData()
        formData.append("idusuario", this.idusuario)

        // obtener usuario, imagen de perfil y galeria
        let usuario = funcDefault.llamadaAJAXAsync(url, formData)[0]
        usuario.imagenPerfil = this.extraerImagenPerfil()
        usuario.galeria = this.extraerGaleria()

        this.setAtributosCuidador(usuario)
    }

    // obtener los servicicios con sus precios
    obtenerServiciosCuidador() {
        const url = base_url + "Inicio_c/obtenerPrecios";
        const formData = new FormData()
        formData.append("idusuario", this.idusuario)

        let servicios = funcDefault.llamadaAJAXAsync(url, formData)

        let nombreServTemporal = {}
        // recorrer los servicios para guardarlos como un objeto
        for (let elemento of servicios) {
            nombreServTemporal = elemento.nombreServicio

            // eliminamos el nombre del servicio para poder añadir el resto de atributos del tirón
            delete elemento.nombreServicio

            this.servicios[nombreServTemporal] = elemento

        }

    }
    // setter de los atributos que tienen todos los usuarios
    setAtributosDefault(usuario) {
        if (usuario.role == "propietario" || usuario.role == "P") {
            this.role = "propietario"
        } else {
            this.role = "cuidador"
        }

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

    // setter de todos los atributos que tienen los cuidadores
    setAtributosCuidador(usuario) {
        this.setAtributosDefault(usuario)

        // atributos si es un cuidador
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

        // si se quiere mascota + detalles
        if (this.role == "propietario") {
            this.obtenerClasesMascotasConDetalles()
            this.guardarMascotasUsuario()
        } else {
            this.obtenerClasesMascotasSinDetalles()
            this.guardarMascotasUsuario()
        }
    }

    // crear clases con las mascotas 
    crearClasesMascotas(mascotas) {
        this.mascotas = []
        if (mascotas != undefined && mascotas.length > 0) {
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

    // obtener las clases de las mascotas sin detalles
    obtenerClasesMascotasConDetalles() {
        const url = base_url + "Inicio_c/obtenerMascotasConDetalles";
        const formData = new FormData()
        formData.append("usuario", this.idusuario)

        // obtener mascotas y generar sus clases
        this.crearClasesMascotas(funcDefault.llamadaAJAXAsync(url, formData))
    }

    // añadir a session las mascotas del usuario
    guardarMascotasUsuario() {
        let usuarios = JSON.parse(sessionStorage.getItem("usuarios"))
        usuarios[this.idusuario]["mascotas"] = this.mascotas
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    // añadir al usuario recién obtenido de BBDD a session
    guardarUsuarioEnSession() {
        let usuarios = JSON.parse(sessionStorage.getItem("usuarios"))
        usuarios[this.idusuario] = this

        sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
    }

    // obtener una mascota por el id
    obtenerUnaMascota(idmascota) {
        return this.mascotas.filter(mascota => mascota.idmascota == idmascota)[0]
    }

    // elimminar imagen de BBDD
    eliminarImagenBBDD(ruta, idpropietario, posicion) {
        const url = base_url + "Usuarios_c/eliminarFotoBBDD";

        // datos necesarios de la foto para eliminarla 
        let data = new FormData()
        data.append("ruta", ruta)
        data.append("posicion", posicion)
        data.append("idpropietario", idpropietario)

        return funcDefault.llamadaAJAXAsync(url, data)
    }

    // eliminar file de una imagen
    eliminarFileImagen(ruta) {
        const url = base_url + "Usuarios_c/eliminarFileImagen";

        // datos necesarios de la foto para eliminarla 
        let data = new FormData()
        data.append("ruta", ruta)

        return funcDefault.llamadaAJAXAsync(url, data)
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

    // actualizar las reservas del usario
    actualizarReservas() {
        const url = base_url + "Usuarios_c/actualizarReservas";
        const formData = new FormData();
        formData.append("idusuario", this.idusuario);

        if (funcDefault.llamadaAJAXAsync(url, formData) !== true) {
            funcDefault.mostrarPopUpError("<div class='text-center'>No se han podido actualizar tus reservas</div>")
        }
    }

    // extraer reservas Activas del usuario
    extraerReservasActivas() {
        const url = base_url + "Usuarios_c/extraerReservasActivas";
        const formData = new FormData();
        formData.append("idusuario", this.idusuario);

        return funcDefault.llamadaAJAXAsync(url, formData);
    }
    // extraer reservas Pasadas del usuario
    extraerReservasFinalizadas() {
        const url = base_url + "Usuarios_c/extraerReservasFinalizadas";
        const formData = new FormData();
        formData.append("idusuario", this.idusuario);

        return funcDefault.llamadaAJAXAsync(url, formData);
    }
    // extraer reservas Venideras del usuario
    extraerReservasVenideras() {
        const url = base_url + "Usuarios_c/extraerReservasVenideras";
        const formData = new FormData();
        formData.append("idusuario", this.idusuario);

        return funcDefault.llamadaAJAXAsync(url, formData);
    }

    // eliminar el usuario de session y reservasMostradas
    eliminarUsuarioSession() {
        let usuarios = JSON.parse(sessionStorage.getItem("usuarios"))
        delete usuarios[this.idusuario]
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
    }
}