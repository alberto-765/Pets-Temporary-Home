// contenedor donde se incluirán las mascotas
addEventListener("DOMContentLoaded", function () {
  funcDefault.mostrarSpinner()
  funcDefault.cambiarEstiloFooter()
  // actulizar reservas para poder eliminar mascotas que tuvieras reservas Pasdas
  actualizarReservas()

  // para incluir targetas mascotas
  funcMascotas.crearTarjetasMascotasYAnadir()

  // crear el modal de borrar con las mascotas, generar evento click de confirmar 
  funcMascotas.crearModalBorrarYEventoConfirmar()
  funcDefault.ocultarSpinner()

  function actualizarReservas() {
    funcMascotas.usuario.actualizarReservas()
  }
})





