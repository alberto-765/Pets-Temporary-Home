class DetallesMascota {
    idmascota // id de la mascota obtenido de la url
    mascota // clase de la mascota
    constructor() {
        // cambiar footer
        funcDefault.cambiarEstiloFooter()

        // id de la mascota obtenido de la url
        this.idmascota = location.href.split("/").slice(-1)

        // sacar mascota para los detalles
        this.mascota = funcMascotas.usuario.obtenerUnaMascota(this.idmascota)
        this.insertarDatosSociales()

    }


    async insertarDatosSociales() {

        // formar el modal con la galería para cuando se ve en grande
        if (funcMascotas.usuario.role == "propietario") {
            await this.formarInsertarGaleriaEnModal()
        }


        let datosSociales = this.formarYDevolverEncabezado()
        datosSociales += this.formarYDevolverTamano()
        datosSociales += this.formarYDevolverAnos()
        datosSociales += this.formarYDevolverMeses()
        datosSociales += this.formarYDevolverSexo()
        datosSociales += this.formarYDevolverDatosDueno()
        datosSociales += this.formarYDevolverPie()

        // microchip
        datosSociales += this.mascota.devolverCheckOCruz("Tiene microchip", this.mascota.microchip);

        // esterilizacion
        datosSociales += this.mascota.devolverCheckOCruz("Está castrado/esterilizada", this.mascota.esterilizacion);

        // socninos
        datosSociales += this.mascota.devolverCheckOCruz("Sociable con niños", this.mascota.socninos);

        // socperros
        datosSociales += this.mascota.devolverCheckOCruz("Sociable con perros", this.mascota.socperros);

        // socgatos
        datosSociales += this.mascota.devolverCheckOCruz("Sociable con gatos", this.mascota.socgatos);

        datosSociales += `</div></div></div>`

        // si es propietario mostrar datos de cuidados y formar y 
        if (funcMascotas.usuario.role == "propietario") {
            await this.insertarDatosCuidados()
            await this.formarYDevolverCarouselGaleria()
        }

        // añadir todo el html generado
        document.getElementById("contenedorDetalles").innerHTML = datosSociales

        funcDefault.activarPopovers()
    }

    // formar y devolver html con encabezado de la lista
    formarYDevolverEncabezado() {
        return ` <div class="col-12 col-sm-5 col-md-4 col-lg-3 d-flex flex-column  shadow-lg p-0 rounded-3 bg-body">
        <div class="card border-0 rounded-3 me-0">
        <img src="${this.mascota.imagenPerfil}" class="img-fluid rounded-top-3" alt="Imagen de perfil mascota" style="height: 15em; object-fit: cover;">
        <div class="card-body pb-0 px-4">
            <h5 class="card-title mb-0">${this.mascota.nombre}</h5>
            <figcaption class="blockquote-footer fs-6 mb-0 mt-1 ms-2 card-text">
                <cite title="raza">${this.mascota.raza}</cite>
            </figcaption>
        
        <ul class="list-group list-group-flush py-2">`
    }

    // formar y devolver html con list item del tamaño de la mascota
    formarYDevolverTamano() {
        switch (this.mascota.tamano) {
            case "T":
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"><span class="col-auto p-0"> Toy </span><img src="${base_url}/app/assets/iconos/toy.png " class="" style="width: 50px;" ></li>`
            case "P":
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"> <span class="col-auto"> Pequeño </span><img src="${base_url}/app/assets/iconos/pequeño.png"  class="" style="width: 50px;" ></li>`
            case "M":
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"> <span class="col-auto"> Mediano </span><img src="${base_url}/app/assets/iconos/mediano.png"  class="" style="width: 50px;" ></li>`
            case "G":
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"> <span class="col-auto"> Grande </span><img src="${base_url}/app/assets/iconos/grande.png"  class="" style="width: 50px;" ></li>`
            case "E":
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"> <span class="col-auto"> Enorme </span><img src="${base_url}/app/assets/iconos/enorme.png"  class="" style="width: 50px;" ></li>`
            default:
                return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"> <span class="col-auto"> Pequeño </span><img src="${base_url}/app/assets/iconos/pequeño.png"  class="" style="width: 50px;" ></li>`

        }

    }

    // formar y devolver html con list item del años de la mascota
    formarYDevolverAnos() {
        if (this.mascota.anos != undefined) {
            return `<li class="list-group-item border-0 d-flex align-items-center p-0 column-gap-3"><span class="col-auto"> ${this.mascota.anos} año`
        } else return `<li class="list-group-item border-0 d-flex align-items-center py-0 column-gap-3"> <span class="col-auto"> ${this.mascota.anos} años`

    }

    // formar y devolver html con list item del meses de la mascota
    formarYDevolverMeses() {
        if (this.mascota.meses > 0) {
            if (this.mascota.meses == 1) {
                return ` y ${this.mascota.meses} mes </span> <i class="bi bi-balloon fs-3 ps-2 col-8"></i></li>`
            } else return ` y ${this.mascota.meses} meses </span <i class="bi bi-balloon fs-3 ps-2 col-8"></i></li>`
        } else return `</span><i class="bi bi-balloon fs-3 col-8"></i></li>`
    }

    // formar y devolver html con list item del sexo de la mascota
    formarYDevolverSexo() {
        if (this.mascota.sexo == "M") {
            return ` <li class="list-group-item  d-flex align-items-center p-0 column-gap-3"><span class="col-auto">Macho</span> <i class="bi bi-gender-male fs-3 ps-2 col-8"></i></li>`
        } else {
            return ` <li class="list-group-item  d-flex align-items-center p-0 column-gap-3"><span class="col-auto">Hembra </span><i class="bi bi-gender-male fs-3 ps-2 col-8"></i></li>`
        }
    }

    // formar y devolver html con datos del dueño
    formarYDevolverDatosDueno() {
        let respuesta = `</ul></div></div></div>
       <div class="col-12  col-sm-6 col-md-7 col-lg-8 d-flex flex-column shadow-lg rounded-3 px-3 py-4 row-gap-5 bg-body">
               <div class="card m-0 border-0">
               <div class=" d-flex justify-content-between justify-content-sm-evenly align-items-center ">
                       <div class="col-4 col-md-3 p-0 text-center" >
                       <img src="${funcMascotas.usuario.imagenPerfil}" class="w-100rounded-1" alt="Imagen de perfil propietario" style="max-height: 200px">
                       </div>
                       <div class="col-7 col-md-8 ">
                           <div class="card-body p-0 p-sm-3">
                               <h5 class="card-title">${funcMascotas.usuario.apenom}</h5>
                               <p class="card-text">Dueño de<span class="text-muted"> ${this.mascota.nombre}</span></p>
                               <p class="card-text mt-3">  
                               <button type="button" class="btn " style="background: rgb(33, 148, 188);"
                               data-bs-toggle="popover" data-bs-placement="bottom"
                               data-bs-custom-class="custom-popover"
                               data-bs-title="Mensaje"
                               data-bs-trigger="hover"
                               data-bs-content="`

        if (this.mascota.masdetalles) {
            respuesta += `${this.mascota.masdetalles}`
        }
        else {
            respuesta += "El cuidador no ha proporcionado más información"
        }

        respuesta += `">Ver mensaje del cuidador
                                   </button>
                               </p>
    `

        return respuesta
    }


    // formar y devolver html con el pie
    formarYDevolverPie() {
        return `</div></div></div></div> 
        <div class="col-12 col-xl-10 align-self-center "><p class="fs-2 ms-4 ms-sm-0">Datos sociales: </p><div class="row mx-4 row-gap-1  fw-semibold listaDetalles ms-5 ms-lg-0 justify-content-lg-between">`
    }

    // crear y añadir el carousel con todas las imágenes de la galería
    async formarYDevolverCarouselGaleria() {
        let contenedorGaleria = ""
        if (this.mascota.galeria.length > 0) {
            // asignar ultima imagen donde irá el boton para ver todas las imagenes
            contenedorGaleria += `
        <div class="row justify-content-center" >  <div class="col-12 mb-3"><p class="fs-2">Galería: </p></div>
<div class="row">
        <div class="col-4"><img src="${this.mascota.galeria[0][1]}" class="rounded-3 object-fit-cover w-100 h-100"></div>
        <div class="col-8">
        <div class="row gap-2 ">`
            for (let indice in this.mascota.galeria) {


                contenedorGaleria += `<div class="col-3 position-relative px-0 " > <img src="${this.mascota.galeria[indice][1]}" class="object-fit-cover rounded-3 w-100 h-100" alt="Foto galería ${indice}" /> `
                if (indice == this.mascota.galeria.length - 1) {
                    contenedorGaleria += ` <div class="rounded-3 w-100  h-100  position-absolute top-0 start-0 d-flex align-items-center justify-content-center bg-dark bg-opacity-50 z-3"><button type="button" class="btn btn-outline-light d-inline" data-bs-toggle="modal" data-bs-target="#verGaleria" style="width: max-content; bottom:20%; right: 10%">
                Ver más
                </button></div>`
                }
                contenedorGaleria += `</div>`
                if (indice == 5) {
                    break
                }

            }


            contenedorGaleria += `
                    </div>
                </div>`


        } else {
            contenedorGaleria += `<div class="col-12 display-6 text-center mt-5" >
    NO HAY IMÁGENES EN LA GALERÍA</div > `

        }
        document.getElementById("contenedorGaleria").innerHTML = contenedorGaleria

    }

    // insertar en el DOM cuidador de la mascota si el dueño en propietario
    async insertarDatosCuidados() {
        // hacer aparecer el contenedor 
        document.getElementById("contenedorMasDetalles").classList.remove("d-none")

        // COLOCAR DATOS SI ES PROPIETARIO
        // annadir actividad
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

        // annadir necesidades
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

        // annadir raciones
        document.getElementById("raciones").value = this.mascota.raciones;

        // annadir horario de paseo
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

        // annadir medicacion si existe y el nombre
        if (this.mascota.medtipo != null) {
            switch (this.mascota.medtipo) {
                case "O":
                    document.getElementById("btn-medtipo1").checked = true;
                    break;
                case "T":
                    document.getElementById("btn-medtipo2").checked = true;
                    break;
                case "I":
                    document.getElementById("btn-medtipo3").checked = true;
                    break;
            }
        }
        // añador el nombre
        document.getElementById("mednom").disabled = false
        document.getElementById("mednom").value = this.mascota.mednom;

    }

    // formar el carousel para el modal de la galeria
    async formarInsertarGaleriaEnModal() {
        let textoCarousel = `<div class="carousel-indicators" > `

        for (let indice in this.mascota.galeria) {
            textoCarousel += `<button type ="button" data-bs-target="#carouselGaleria" data-bs-slide-to="${indice}" class="active" aria - current="true" aria-label="Slide ${indice}" ></button> `


        }

        textoCarousel += `</div ><div class="carousel-inner h-100">`

        for (let indice in this.mascota.galeria) {
            if (indice == 0) {
                textoCarousel += `<div class="carousel-item h-100 active ">
            <img src="${this.mascota.galeria[indice][1]}" class="object-fit-cover rounded h-100 d-block mx-auto"style=" max-height: 70vh;"  alt="Imagen galería mascota">
        </div>`
            } else {
                textoCarousel += `<div class="carousel-item h-100" >
            <img src="${this.mascota.galeria[indice][1]}" class="object-fit-cover rounded h-100  d-block mx-auto" style=" max-height: 70vh;"  alt="Imagen galería mascota">
        </div>`
            }

        }

        textoCarousel += `</div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselGaleria" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselGaleria" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>`

        // añadir el texto al carousel 
        document.getElementById("carouselGaleria").innerHTML = textoCarousel
    }
}


// INICIALIZAR LA CLASE 
var ClassDetallesMascota
addEventListener("DOMContentLoaded", function () {
    ClassDetallesMascota = new DetallesMascota();
})