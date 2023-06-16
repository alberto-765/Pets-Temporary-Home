class FuncUsuarios {
    usuario // siempre que haya un usuario logueado se guardará

    constructor() {

        // por defecto el usuario es el de la session 
        this.comprobarExistenciaYCrearUsuario(funcDefault.getUsuario())
    }

    // si no existe el usuario en session, crear usuario obteniendo datos
    comprobarExistenciaYCrearUsuario(usuario) {
        if (usuario) {
            let usuarioSession = JSON.parse(sessionStorage.getItem("usuarios"))

            // si ya existe el usuario solamente se crea la clase sin obtener datos de BBDD
            if (usuarioSession[usuario]) {
                this.usuario = new Usuario(usuarioSession[usuario])
            } else {
                this.usuario = new Usuario(usuario, true)
            }
        }
    }


    // 1.9 Para guarderia se irá desde las 7:00 am hasta las 19:30 con un max de 10 horas
    generarFechaMaxGuarderiaInputHasta(fechaDesde) {
        // 1.9 se le suma una hora
        const fechMin = new Date(fechaDesde)
        fechMin.setHours(fechMin.getHours() + 10)

        // 1.9 se obtiene la fecha maxima permitida que son las 19:30
        const fechaMax = new Date(fechaDesde)
        fechaMax.setHours(19)
        fechaMax.setMinutes(30)

        // 1.9 si la fecha elegida mas 10 horas supera las 19:30 se mostrará como maximo las 19:30
        if (this.validarFechaMayorYMenor(fechMin, fechaMax)) {
            return `${fechaMax.getFullYear()}-${(fechaMax.getMonth() + 1).toString().padStart(2, '0')}-${fechaMax.getDate().toString().padStart(2, '0')}T${fechaMax.getHours().toString().padStart(2, '0')}:${fechaMax.getMinutes().toString().padStart(2, '0')}`
        } else {
            return `${fechMin.getFullYear()}-${(fechMin.getMonth() + 1).toString().padStart(2, '0')}-${fechMin.getDate().toString().padStart(2, '0')}T${fechMin.getHours().toString().padStart(2, '0')}:${fechMin.getMinutes().toString().padStart(2, '0')}`
        }
    }

    // 1.9 Para paseo la fecha max y min será 1 hora mas
    // 1.9 Para guarderia la fecha min será 1 hora mas
    generarFechaMinYMaxGuardYPaseoInputHasta(fechaDesde) {

        // 1.9 se le suma una hora a fechaDesde
        const dateDesde = new Date(fechaDesde)
        dateDesde.setHours(dateDesde.getHours() + 1)

        // 1.9 se obtiene la fecha maxima permitida que son las 19:30
        const fechaMax = new Date(fechaDesde)
        fechaMax.setHours(19)
        fechaMax.setMinutes(30)

        // 1.9 si la fecha elegida mas 1 hora supera las 19:30 se mostrará la fecha max como limite (19:30)
        if (this.validarFechaMayorYMenor(dateDesde, fechaMax)) {
            return `${fechaMax.getFullYear()}-${(fechaMax.getMonth() + 1).toString().padStart(2, '0')}-${fechaMax.getDate().toString().padStart(2, '0')}T${fechaMax.getHours().toString().padStart(2, '0')}:${fechaMax.getMinutes().toString().padStart(2, '0')}`
        } else {
            return `${dateDesde.getFullYear()}-${(dateDesde.getMonth() + 1).toString().padStart(2, '0')}-${dateDesde.getDate().toString().padStart(2, '0')}T${dateDesde.getHours().toString().padStart(2, '0')}:${dateDesde.getMinutes().toString().padStart(2, '0')}`
        }
    }


    // 1.9 Si el momento actual son las 6:00 am se pondrá como hora mínima las 7:00 am
    // 1.9 Si el momento actual son las 11:00 am esa será la hora mínima para la reserva
    generarFechaMinAlojamiento() {

        const momentoActual = new Date()
        momentoActual.setHours(momentoActual.getHours() + 1)

        // 1.9 La fecha default minima son las 07:00 am
        const fechaMin = new Date()
        fechaMin.setHours(7);
        fechaMin.setMinutes(0);

        const fechaMax = new Date()
        fechaMax.setHours(23)
        fechaMax.setMinutes(59)

        // validar si el momento actual esta entre las 7:00 am y las 23:59
        if (this.validarFechaMayorYMenor(momentoActual, fechaMin, fechaMax)) {

            return `${momentoActual.getFullYear()}-${(momentoActual.getMonth() + 1).toString().padStart(2, '0')}-${momentoActual.getDate().toString().padStart(2, '0')}T${momentoActual.getHours().toString().padStart(2, '0')}:${momentoActual.getMinutes().toString().padStart(2, '0')}`
        } else {

            // cuando el momento actual no cumple la validacion anterior es porque está entre las 23:59 y las 7:00am
            return `${fechaMin.getFullYear()}-${(fechaMin.getMonth() + 1).toString().padStart(2, '0')}-${fechaMin.getDate().toString().padStart(2, '0')}T${fechaMin.getHours().toString().padStart(2, '0')}:${fechaMin.getMinutes().toString().padStart(2, '0')}`
        }
    }



    // 1.9 Al seleccionar alojamiento la fecha minima de recogida es el dia siguiente a las 7:00am
    generarMinAlojamientoInputHasta(inputDesde) {
        const fechaInputDesde = new Date(inputDesde)
        fechaInputDesde.setDate(fechaInputDesde.getDate() + 1)
        fechaInputDesde.setHours(7)
        fechaInputDesde.setMinutes(0)

        return `${fechaInputDesde.getFullYear()}-${(fechaInputDesde.getMonth() + 1).toString().padStart(2, '0')}-${fechaInputDesde.getDate().toString().padStart(2, '0')}T${fechaInputDesde.getHours().toString().padStart(2, '0')}:${fechaInputDesde.getMinutes().toString().padStart(2, '0')}`
    }

    // validar si la fecha del input desde está dentro del rango de su min y max
    validarFechaMayorYMenor(fechaIntermedia, fechaMinima, fechMaxima = null) {
        let validacionPasada = false

        const dateFechaIntermedia = new Date(fechaIntermedia)
        const dateFechMin = new Date(fechaMinima)
        const dateFechMax = new Date(fechMaxima)

        const fechaIntermediaSinHoras = new Date(`${dateFechaIntermedia.getFullYear()}-${(dateFechaIntermedia.getMonth() + 1).toString().padStart(2, '0')}-${dateFechaIntermedia.getDate().toString().padStart(2, '0')}`)
        const horaFechaIntermedia = parseInt(dateFechaIntermedia.getHours())
        const minutosFechaIntermedia = parseInt(dateFechaIntermedia.getMinutes())

        const fechaFechMenSinHoras = new Date(`${dateFechMin.getFullYear()}-${(dateFechMin.getMonth() + 1).toString().padStart(2, '0')}-${dateFechMin.getDate().toString().padStart(2, '0')}`)

        // 1.9 Validar si la fecha del fechaIntermedia es mayor que la fechaMinima
        if (fechaMinima) {

            if (fechaIntermediaSinHoras.getTime() == fechaFechMenSinHoras.getTime()) {

                // 1.9 cuando se guarda durante mucho tiempo y se pasan las 24 horas del día y tenemos dos fechas del mismo dia da error
                // Ejemplo: 22:22 y 01:19 del mismo díafechaMinima
                const horaFechMin = parseInt(dateFechMin.getHours())
                const minutosFechMin = parseInt(dateFechMin.getMinutes())

                // ejemplo horaFechaIntermedia 01:30 y horaFechMin 01:10
                if (horaFechaIntermedia == horaFechMin) {
                    if (minutosFechaIntermedia >= minutosFechMin) {
                        validacionPasada = true
                    }

                    // ejemplo horaFechMin 01:10 y horaFechaIntermedia 22:22
                } else if (horaFechaIntermedia > 10 && horaFechMin < 10) {
                    validacionPasada = true
                } else {
                    validacionPasada = horaFechaIntermedia >= horaFechMin
                }

            } else {
                validacionPasada = dateFechaIntermedia.getTime() >= dateFechMin.getTime()
            }

            if (validacionPasada == false) return validacionPasada
        }



        const fechaFechMaxSinHoras = new Date(`${dateFechMax.getFullYear()}-${(dateFechMax.getMonth() + 1).toString().padStart(2, '0')}-${dateFechMax.getDate().toString().padStart(2, '0')}`)

        // Si se cumple lo anterior validar si fecha del fechaIntermedia es menor que la fechaMinima
        // 1.9 Validar si la fecha del fechaIntermedia es menor que la fechaMaxima
        if (fechMaxima) {
            if (fechaIntermediaSinHoras.getTime() == fechaFechMaxSinHoras.getTime()) {

                // 1.9 cuando se guarda durante mucho tiempo y se pasan las 24 horas del día y tenemos dos fechas del mismo dia da error
                // Ejemplo: 22:22 y 01:19 del mismo díafechaMinima
                const horaFechMax = parseInt(dateFechMax.getHours())
                const minutosFechMax = parseInt(dateFechMax.getMinutes())

                // ejemplo horaFechaIntermedia 01:30 y horaFechMax 01:10
                if (horaFechaIntermedia == horaFechMax) {
                    if (minutosFechaIntermedia < minutosFechMax) {
                        validacionPasada = true
                    }

                    // ejemplo horaFechaIntermedia 01:10 y horaFechMax 22:22
                } else if (horaFechMax > 10 && horaFechaIntermedia < 10) {
                    validacionPasada = true
                } else {
                    validacionPasada = horaFechaIntermedia < horaFechMax
                }

            } else {
                validacionPasada = dateFechaIntermedia.getTime() < dateFechMax.getTime()
            }
        }
        return validacionPasada
    }

    // 1.9 La reserva tiene que hacerse conn una hora de antelacion y estar entre las 7:00 am y 18:30
    generarFechaMinGuarderiaYPaseoInputDesde() {
        const momentoActual = new Date()
        momentoActual.setHours(momentoActual.getHours() + 1)

        // 1.9 La fecha default minima son las 07:00 am
        const fechaMin = new Date()
        fechaMin.setHours(7);
        fechaMin.setMinutes(0);

        // 1.9 La fecha default maxima son las 07:00 am
        const fechaMax = new Date()
        fechaMax.setHours(18)
        fechaMax.setMinutes(30)

        // validar si el momento actual esta entre las 7:00 am y las 18:30
        if (this.validarFechaMayorYMenor(momentoActual, fechaMin, fechaMax)) {
            return `${momentoActual.getFullYear()}-${(momentoActual.getMonth() + 1).toString().padStart(2, '0')}-${momentoActual.getDate().toString().padStart(2, '0')}T${momentoActual.getHours().toString().padStart(2, '0')}:${momentoActual.getMinutes().toString().padStart(2, '0')}`
        } else {


            // cuando no se cumple la validacion anterior puede ser porque sea menos de las 7:00 am o mas de las 18:30
            // si el momento actual no es mayor de las 7:00 am se mueve a dicha hora
            if (!this.validarFechaMayorYMenor(momentoActual, fechaMin)) {

                return `${fechaMin.getFullYear()}-${(fechaMin.getMonth() + 1).toString().padStart(2, '0')}-${fechaMin.getDate().toString().padStart(2, '0')}T${fechaMin.getHours().toString().padStart(2, '0')}:${fechaMin.getMinutes().toString().padStart(2, '0')}`
            } else {

                // si el momento actual no es menor a las 18:30 se mueve a las 7:00am del dia siguiente
                fechaMin.setDate(fechaMin.getDate() + 1);
                return `${fechaMin.getFullYear()}-${(fechaMin.getMonth() + 1).toString().padStart(2, '0')}-${fechaMin.getDate().toString().padStart(2, '0')}T${fechaMin.getHours().toString().padStart(2, '0')}:${fechaMin.getMinutes().toString().padStart(2, '0')}`
            }


        }
    }

    // para alojamiento la fecha tiene que estar entre las 7:00 am y las 23:59, debe haber 1 hora de antelacion
    validarFechaAlojamiento(input) {
        const momentoActual = new Date()
        const fechaValidar = new Date(input.value)

        // si hay menos de un dia de diferencia se le suma una hora
        if (((fechaValidar - momentoActual) / (1000 * 60 * 60 * 24)) < 1 && momentoActual.getDate() >= 7)
            fechaValidar.setHours(fechaValidar.getHours() + 1)

        // si la hora esta entre las 07:00 y las 23:59
        if (fechaValidar.getHours() >= 7 && fechaValidar.getHours() < 24) {

            // si la fecha cumple sus maximos y minimos
            if (this.validarFechaMayorYMenor(input.value, input.min, input.max)) {
                return true
            }
        }

        return false
    }

    // para guarderia y paseo la fecha del inputDesde tiene que estar entre las 7:00 am y las 18:30 + 1 de antelacion si es el mismo dia
    validarFechaGuarPaseoInputDesde(input) {
        const momentoActual = new Date()
        // si hay menos de un dia de diferencia se le suma una hora
        const fechaValidar = new Date(input.value)

        // si ambas fechas son del mismo día se le suma una hora
        if (((fechaValidar - momentoActual) / (1000 * 60 * 60 * 24)) < 1 && momentoActual.getDate() >= 7)
            fechaValidar.setHours(fechaValidar.getHours() + 1)

        // si la hora esta entre las 07:00 y las 18:30
        if (fechaValidar.getHours() >= 7 && fechaValidar.getHours() <= 18 || (fechaValidar.getHours() == 18 && fechaValidar.getMinutes() <= 30)) {

            // si la fecha cumple sus maximos y minimos
            if (this.validarFechaMayorYMenor(input.value, input.min, input.max)) {
                return true
            }
        }

        return false
    }

    // para guarderia y paseo la fecha del inputDesde tiene que estar entre las 8:00 am y las 19:30 
    validarFechaGuarPaseoInputHasta(input) {
        const fechaValidar = new Date(input.value)

        // si la hora esta entre las 8:00 am y las 19:30 
        if (fechaValidar.getHours() >= 8 && fechaValidar.getHours() <= 19 || (fechaValidar.getHours() == 19 && fechaValidar.getMinutes() <= 30)) {

            // si la fecha cumple los maximos y minimos del inputHasta
            if (this.validarFechaMayorYMenor(input.value, input.min, input.max)) {
                return true
            }
        }

        return false
    }
}
// INICIALIZAR LA CLASE 
var funcUsuarios
addEventListener("DOMContentLoaded", function () {
    funcUsuarios = new FuncUsuarios()
})
