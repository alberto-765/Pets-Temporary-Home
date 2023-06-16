<script>
    // eliminar usuario de session
    addEventListener("DOMContentLoaded", function(e) {
        let usuarios = JSON.parse(sessionStorage.getItem("usuarios"))
        delete usuarios.usuarioLogin
        sessionStorage.setItem("usuarios", JSON.stringify(usuarios))
        funcDefault.redirigir("Inicio_c/index")
    })
</script>