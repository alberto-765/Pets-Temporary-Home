class Mascota {
    // atributos que tienen todas las mascotas
    imagenPerfil
    galeria = []
    idmascota
    nombre
    tipo
    raza
    tamano
    sexo
    anos
    meses
    microchip
    esterilizacion
    socninos
    socperros
    socgatos
    dueno // id del dueño
    tipo_user // tipo de usuario que es el dueño
    // atributos si la mascota tiene detalles(es de un propietario)
    actividad
    necesidades
    paseo
    raciones
    medtipo
    mednom
    masdetalles

    constructor(mascota, tipo_user) {

        // set atributos por default
        this.tipo_user = tipo_user
        this.idmascota = mascota.idmascota
        this.nombre = mascota.nombre
        this.tipo = mascota.tipo
        this.raza = mascota.raza
        this.tamano = mascota.tamano
        this.sexo = mascota.sexo
        this.anos = mascota.anos
        this.meses = mascota.meses
        this.microchip = mascota.microchip
        this.esterilizacion = mascota.esterilizacion
        this.socninos = mascota.socninos
        this.socperros = mascota.socperros
        this.socgatos = mascota.socgatos
        this.dueno = mascota.dueno

        // comprobar que existe uno de los atributos de la tabla detalles
        if (this.tipo_user == "propietario") {
            this.actividad = mascota.actividad
            this.necesidades = mascota.necesidades
            this.paseo = mascota.paseo
            this.raciones = mascota.raciones
            this.medtipo = mascota.medtipo
            this.mednom = mascota.mednom
            this.masdetalles = mascota.masdetalles

            //extraer la galeria si la mascota no la tiene
            if (mascota.galeria && mascota.galeria.length > 0) {
                this.galeria = mascota.galeria
            } else {
                this.extraerGaleria()
            }
        }

        // extraer imagen de perfil si la mascota no la tiene
        if (mascota.imagenPerfil && mascota.imagenPerfil.length > 0) {
            this.imagenPerfil = mascota.imagenPerfil
        } else {
            this.extraerImagenPerfil();
        }

    }

    // crear fila de la tabla para los modales borrar y confirmar
    crearFilaModal(indice, crearCheck = false) {
        let fila = "<tr>";
        fila += `<td class="lh-lg">${indice}</td><td class="lh-lg">${this.nombre}</td>`;
        if (this.tipo == "P") fila += `<td>Perro</td>`;
        else fila += `<td class="lh-lg">Gato</td>`;

        fila += `<td class="lh-lg">${this.raza}</td>`;

        switch (this.tamano) {
            case "T":
                fila += `<td class="lh-lg">Toy</td>`;
                break;
            case "P":
                fila += `<td class="lh-lg">Pequeño</td>`;
                break;
            case "M":
                fila += `<td class="lh-lg">Mediano</td>`;
                break;
            case "G":
                fila += `<td class="lh-lg">Grande</td>`;
                break;
            case "E":
                fila += `<td class="lh-lg">Enorme</td>`;
                break;
        }
        switch (this.sexo) {
            case "M":
                fila += `<td ><div class="d-flex align-items-center justify-content-center"><i class="bi bi-gender-male text-primary fs-4 pe-2"></i> Macho</div></td>`;
                break;
            case "H":
                fila += `<td> <div class="d-flex align-items-center justify-content-center"><i class="bi bi-gender-female text-warning fs-3 pe-2"></i> Hembra </div></td>`;
                break;
        }

        if (crearCheck) {
            fila += ` <td class="">
            <input type="checkbox" class="form-check-input fs-4 seleccionarMascota bg-secondary" value="${this.idmascota}"></td</tr>`;
        } else {
            fila += `</tr>`
        }
        // devolver fila con la fila
        return fila
    }

    // llamada AJAX para eliminarla de BBDD e imágenes
    eliminarMascota() {
        const url = base_url + "Usuarios_c/eliminarMascota";
        const formData = new FormData();
        formData.append("idmascota", this.idmascota)

        // si todo está "OK" devolverá true
        return funcDefault.llamadaAJAXAsync(url, formData)
    }

    // crear tarjeta de la mascota
    crearTarjeta() {


        let tarjeta = "";
        tarjeta += ` <div class="col-12 col-sm-12 col-md-12 col-lg-11 col-xl-10 col-xxl-10  mb-5 " >`;

        tarjeta += `<div class="row rounded-4  bg-body-secondary column-gap-md-5 column-gap-sm-2 tarjeta_Mascota">
      <div class="col-12 col-md-4 p-0 h-100">
            <div class="card text-bg-dark  rounded-2 h-100 justify-content-center " >
                <img src="${this.imagenPerfil}" alt="Foto perfil mascota" class="card-image opacity-25 object-fit-cover h-100">
                    <div class="card-img-overlay d-flex flex-column flex-wrap justify-content-end">
                        <div class="card-title fw-semibold m-0 row align-items-center">`;

        if (this.tipo == "P") {
            tarjeta += `<h5 class="col-12 col-md-3 col-xxl-2 px-0">Perro</h5><div class="col-12 col-md-6"><img class="iconoTipoMascota " src="${base_url}app/assets/iconos/perroLight2.png" alt="Icono perro"></div>`;
        }
        else {
            tarjeta += `<h5 class="col-12 col-md-3 col-xxl-2 px-0">Gato</h5> <div class="col-12 col-md-6"><img class="iconoTipoMascota col-4" src="${base_url}app/assets/iconos/gatoLight.png" alt="Icono gato"></div>`;
        }

        tarjeta += `</div> <div class="card-text ">${this.raza} - `;

        // Tamaño
        switch (this.tamano) {
            // toy
            case "T":
                tarjeta += `Toy<img class="" src="${base_url}app/assets/iconos/toyLight.png" style="height: 25px;" alt="Icono toy">`;
                break;

            // pequeño
            case "P":
                tarjeta += `Pequeño<img class="" src="${base_url}app/assets/iconos/pequeñoLight.png" style="height: 25px;" alt="Icono pequeño">`;
                break;

            // grnade
            case "G":
                tarjeta += `Grande<img class="" src="${base_url}app/assets/iconos/grandeLight.png" style="height: 25px;" alt="Icono perro grande">`;
                break;

            // Enorme
            case "E":
                tarjeta += `Enorme<img class="" src="${base_url}app/assets/iconos/enormeLight.png" style="height: 25px;" alt="Icono perro enorme">`;
                break;

            // mediano
            default:
                tarjeta += `Mediano<img class="" src="${base_url}app/assets/iconos/medianoLight.png" style="height: 25px;" alt="Icono perro mediano">`;
                break;
        }

        // Años
        tarjeta += ` - ${this.anos} años `;

        // si los meses no son 0
        if (this.meses != 0) {
            tarjeta += `y ${this.meses} meses`;
        }
        tarjeta += ` </div></div></div></div><div class="col-12 col-md-7 flex-grow-1 d-flex p-4 "><div class="card-body row w-100 h-100 me-2">
            <h5 class="card-title col-8 align-self-end">${this.nombre} `;


        if (this.sexo == "H") {
            tarjeta += `<i class="bi bi-gender-female text-warning fs-5 ps-md-3"></i></h5 >`;
        }
        else {
            tarjeta += `<i class="bi bi-gender-male text-primary fs-5 ps-md-3"></i></h5 >`;
        }

        if (funcDefault.tipo_user == "cuidador") {
            tarjeta += `<div class="col-4 text-end align-self-end"> <a href="${base_url}Cuidadores_c/editarMascota/${this.idmascota}" class="z-3 text-decoration-none link-dark "><i class="bi bi-pencil-square fs-6"></i>  Editar</a></div>`;
        }
        else {
            tarjeta += `<div class="col-4 text-end align-self-end"><a href="${base_url}Propietarios_c/editarMascota/${this.idmascota}" class="z-3 text-decoration-none link-dark "><i class="bi bi-pencil-square fs-6"></i> Editar</a></div>`;
        }

        tarjeta += `<div class="row card-text mt-3 mx-2 row-gap-2 row-gap-sm-1">`;

        // microchip
        tarjeta += this.devolverCheckOCruz("Tiene microchip", this.microchip);

        // esterilizacion
        tarjeta += this.devolverCheckOCruz("Está castrado/esterilizada", this.esterilizacion);

        // socninos
        tarjeta += this.devolverCheckOCruz("Sociable con niños", this.socninos);

        // socperros
        tarjeta += this.devolverCheckOCruz("Sociable con perros", this.socperros);

        // socgatos
        tarjeta += this.devolverCheckOCruz("Sociable con gatos", this.socgatos);

        tarjeta += `</div>`

        if (funcDefault.tipo_user == "propietario") {
            tarjeta += `  <a href="${base_url}Inicio_c/detallesMascotas/${this.idmascota}" class="link-dark text-decoration-none d-flex align-items-center justify-content-end gap-2">Ver Más <i class="bi bi-three-dots fs-3"></i></a>`;
        } else {
            tarjeta += `<a href="${base_url}Cuidadores_c/detallesMascotas/${this.idmascota}" class=" link-dark text-decoration-none d-flex align-items-center justify-content-end gap-2">Ver Más <i class="bi bi-three-dots fs-3"></i></a>`;
        }

        tarjeta += `</div></div></div></div> `;

        return tarjeta;
    }

    // llamada AJAX para extraer imagen de perfil
    extraerImagenPerfil() {
        const url = base_url + "Inicio_c/extraerImagenPerfil";
        const formData = new FormData();
        formData.append("id", this.idmascota);
        formData.append("tipo", "mascota");

        this.imagenPerfil = funcDefault.llamadaAJAXAsync(url, formData);
    }

    // extraer galería y devolverla
    extraerGaleria() {
        const url = base_url + "Inicio_c/extraerGaleria"
        const formData = new FormData()
        formData.append("id", this.idmascota);
        formData.append("tipo", "mascota");
        // para que galeria siempre sea un array aunque haya solo una imagen
        let galeriaTemporal = funcDefault.llamadaAJAXAsync(url, formData)
        for (let imagen of galeriaTemporal) {
            this.galeria.push(imagen)

        }
    }

    // devuelve check o cruz si la mascota tiene el atributo a true
    devolverCheckOCruz(texto, siCheck) {
        if (siCheck == 1) {
            return `<div class="col-7 col-lg-5 d-flex align-items-center gap-3 pt-0 justify-content-start " style="white-space: nowrap;">
            <i class="bi bi-check-circle-fill fs-4 text-success"></i>
                    ${texto}
                </div> `;
        } else {
            return `<div class="col-7 col-lg-5 d-flex align-items-center gap-3 pt-0 justify-content-start " style="white-space: nowrap;">
            <i class="bi bi-x-circle-fill fs-4 text-danger-emphasis"></i>
            ${texto}
            </div > `;
        }
    }
}