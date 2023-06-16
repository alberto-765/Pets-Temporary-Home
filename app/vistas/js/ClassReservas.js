class Reservas {
    tabsReservas // tabs con las temporalidades de las reservas
    serviciosActuales // servicios actuales obtenidos de BBDD
    tablaReservas // data table de reservas
    reservas // reservas que se muestran en cada momento
    reservasMostradas // reservas que se estan mostrando 
    constructor() {
        funcDefault.cambiarEstiloFooter()


        this.tabsReservas = document.querySelector("#tabsReservas")

        // actualizar reservas del cuidador
        this.actualizarReservas()

        this.formarThead()

        // inicializar datatable
        this.inicializarDataTable()

        this.obtenerServiciosActuales()
        this.pintarReservasMostradas()
        this.eventoCambiarReservas()
    }
    // iniciarlizar datatables
    inicializarDataTable() {


        this.tablaReservas = $("#tablaReservas").DataTable({

            // cambiar lenguaje a español
            language: {
                "decimal": "",
                "emptyTable": "No tienes reservas",
                "info": "Mostrando _END_ de _TOTAL_ Reservas",
                "infoEmpty": "Mostrando 0 de 0 Reservas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Reservas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "No se han encontrado reservas",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
            scrollY: true, // Habilita la barra de desplazamiento horizontal si es necesario
            paging: true, // Habilitar paginación
            lengthChange: true, // Habilitar cambio de cantidad de registros mostrados por página
            searching: true, // Habilitar búsqueda
            ordering: true, // Habilitar ordenamiento de columnas
            info: true, // Mostrar información sobre la tabla (ej. "Mostrando X a Y de Z entradas")
            autoWidth: true, // Ajustar automáticamente el ancho de las columnas
            responsive: true, // Habilitar modo responsivo para adaptarse a dispositivos móviles
            columnDefs: [
                { orderable: false, targets: 'no-ordenable' }, // Deshabilitar ordenamiento para columnas específicas con la clase CSS 'no-ordenable'
                { className: 'text-center', targets: '_all' }
            ],
            columns: [
                { data: 'columna0' },
                { data: 'columna1' },
                { data: 'columna2' },
                { data: 'columna3' },
                { data: 'columna4' },
                { data: 'columna5' },
                { data: 'columna6' },
                { data: 'columna7' },
                { data: 'columna8' },
                { data: 'columna9' },
                { data: 'columna10' }
            ],
            // Deshabilitar el ajuste automático del ancho de las columnas
            fixedColumns: true
        });
    }

    // formar tabla dependiendo del tipo de usuario
    formarThead() {
        const thead = ` 
                    <tr >
                    <th class="text-center">#</th>
                    <th class="text-center">Servicio <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/servicio_alojamiento.gif alt="Icono Servicio" tilte="Icono Servicio"/></th>
                    <th class="text-center">${funcDefault.tipo_user == "propietario" ? "Cuidador" : "Cliente"} <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/amigo.gif alt="Icono Mascota" tilte="Icono Persona"/></th>    
                    <th class="text-center">Mascota <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/hueso.gif alt="Icono Mascota" tilte="Icono Mascota"/></th>
                                       <th class="text-center">Fecha Inicio <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/enero-1.gif alt="Icono Fecha Inicio" tilte="Icono Fecha Inicio"/></th>
                    <th class="text-center">Fecha Finalización <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/calendario.gif alt="Icono Fecha Finalización" tilte="Icono Fecha Finalización"/></th>
                    <th class="text-center">Transporte <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/transporte.gif alt="Icono Transporte" tilte="Icono Transporte"/></th>
                    <th class="text-center">Precio <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/precio.gif alt="Icono Precio" tilte="Icono Precio"/></th>
                    <th class="text-center">Dirección <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/camino.gif alt="Icono Dirección" tilte="Icono Dirección"/></th>
                    <th class="text-center">Población <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/pueblo.gif alt="Icono Dirección" tilte="Icono Población"/></th>
                    <th class="text-center">Código Postal <img class="ms-3 iconoTablaReserva" src=${base_url}app/assets/iconos/codPostal.gif alt="Icono Código Postal" tilte="Icono Código Postal"/></th>
                </tr>
                `


        // añadir thead a la tabla 
        document.querySelector("#tablaReservas thead").innerHTML = thead
    }

    // actualizar las reservas del usuario 
    actualizarReservas() {
        funcUsuarios.usuario.actualizarReservas()
    }

    // al entrar se muestran siempre las reservas activas
    mostrarReservasActivas() {
        this.reservas = funcUsuarios.usuario.extraerReservasActivas()
        this.limpiarYAnadirReservas()
        this.setReservasMostradas("activas")
    }

    // evento mostrar reservas pasadas
    mostrarReservasVenideras() {
        this.reservas = funcUsuarios.usuario.extraerReservasVenideras()
        this.limpiarYAnadirReservas()
        this.setReservasMostradas("venideras")
    }

    // evento mostrar reservas venideras
    mostrarReservasFinalizadas() {
        this.reservas = funcUsuarios.usuario.extraerReservasFinalizadas()
        this.limpiarYAnadirReservas()
        this.setReservasMostradas("finalizadas")
    }

    // limpiar el data tables y añadir nuevos datos
    limpiarYAnadirReservas() {
        this.tablaReservas.clear(); // Limpia la tabla antes de agregar nuevos datos


        this.tablaReservas.rows.add(this.formarRow());
        this.tablaReservas.draw(); // Vuelve a dibujar la tabla con los nuevos datos
    }

    // evento cambiar reservas del panel de tabs
    eventoCambiarReservas() {

        this.tabsReservas.addEventListener("click", function (e) {
            if (this.reservasMostradas != e.target.id && e.target.id == "reservasActivas") {
                this.mostrarReservasActivas()
            } else if (this.reservasMostradas != e.target.id && e.target.id == "reservasVenideras") {
                this.mostrarReservasVenideras()
            } else if (this.reservasMostradas != e.target.id && e.target.id == "reservasFinalizadas") {
                this.mostrarReservasFinalizadas()
            }

        }.bind(this))
    }

    // formar row para datatables
    formarRow() {
        let nuevosRows = []

        if (this.reservas && this.reservas.length > 0) {
            for (let reserva of this.reservas) {
                nuevosRows.push({
                    columna0: reserva.numero_fila.toString(),
                    columna1: this.serviciosActuales[reserva.servicio].toString(),
                    columna2: reserva.cuidador.toString(),
                    columna3: `<a class="text-decoration-none link-dark" title="Ver detalles de la mascota ${reserva.idmascota.toString()}" href="${base_url}Inicio_c/detallesMascotas/${reserva.idmascota.toString()}" >${reserva.idmascota.toString()}</a>`,
                    columna4: reserva.fechinicio.toString(),
                    columna5: reserva.fechfin.toString(),
                    columna6: (reserva.transporte == 0) ? "No" : "Si",
                    columna7: reserva.importe.toString(),
                    columna8: (reserva.direccion) ? reserva.direccion.toString() : "-",
                    columna9: (reserva.poblacion) ? reserva.poblacion.toString() : "-",
                    columna10: (reserva.codpostal) ? reserva.codpostal.toString() : "-",
                })
            }
        }
        return nuevosRows
    }

    // obtener servicios de la BBDD
    obtenerServiciosActuales() {
        const url = base_url + "Inicio_c/obtenerServicios";
        const formData = new FormData();
        this.serviciosActuales = funcDefault.llamadaAJAXAsync(url, formData);
    }

    // setter reservasMostradas en session
    setReservasMostradas(reservasMostradas) {
        this.reservasMostradas = reservasMostradas
        sessionStorage.setItem("reservasMostradas", JSON.stringify(reservasMostradas))

        // activar el tab correspondiente
        switch (this.reservasMostradas) {
            case "venideras":
                this.tabsReservas.querySelector(".active").classList.remove("active")
                this.tabsReservas.querySelector("#reservasVenideras").classList.add("active")
                break
            case "finalizadas":
                this.tabsReservas.querySelector(".active").classList.remove("active")
                this.tabsReservas.querySelector("#reservasFinalizadas").classList.add("active")
                break
            case "activas":
            default:
                this.tabsReservas.querySelector(".active").classList.remove("active")
                this.tabsReservas.querySelector("#reservasActivas").classList.add("active")
                break
        }
    }
    // getter reservasMostradas en session
    getReservasMostradas() {
        this.reservasMostradas = JSON.parse(sessionStorage.getItem("reservasMostradas"))
    }

    // pintar las reservas que están guardadas en session
    pintarReservasMostradas() {
        this.getReservasMostradas()
        if (this.reservasMostradas) {
            switch (this.reservasMostradas) {
                case "venideras":
                    this.mostrarReservasVenideras()
                    break
                case "finalizadas":
                    this.mostrarReservasFinalizadas()
                    break
                case "activas":
                default:
                    this.mostrarReservasActivas()
                    break
            }


        } else {
            // por defecto se puestran las activas
            this.mostrarReservasActivas()
        }
    }
}

// INICIALIZAR LA CLASE 
var reservas
addEventListener("DOMContentLoaded", function () {
    reservas = new Reservas();
})