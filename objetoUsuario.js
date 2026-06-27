class Usuario {
    constructor(nombre, correo, clave) {
        this.nombre = nombre;
        this.correo = correo;
        this._clave = clave;
    }

    mostrarUsuario() {
        document.getElementById("resultado").classList.remove("ocultar");
       return "nombre del usuario: " + this.nombre + "<br>" +
        "correo del usuario: " + this.correo + "<br>" +
        "clave del usuario: " + "*".repeat(this._clave.length) + "<br><br>";
    }

    cambiarClave() {
        const correoIngresado = document.getElementById("correoABuscar").value;
        const claveNueva = document.getElementById("claveNuevaIngresada").value;

        const numeroArray = ['1','2','3','4','5','6','7','8','9','0'];
        const abecedarioArray = [
            "A","B","C","D","E","F","G","H","I","J","K","L","M",
            "N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z",
        ];

        if (correoIngresado != this.correo) {
            mostrarResultado("correo incorrecto. No se puede cambiar la clave");
            return;
        }

        if (claveNueva.length < 8) {
            mostrarResultado("Error. La contraseña debe tener minimo 8 caracteres");
            return;
        }

        let tieneNumeros = false;
        for (let i = 0; i < claveNueva.length; i++) {
            for (let j = 0; j < numeroArray.length; j++) {
                if (claveNueva[i] == numeroArray[j]) {
                    tieneNumeros = true;
                }
            }
        }

        if (!tieneNumeros) {
            mostrarResultado("Error. La contraseña no contiene numeros");
            return;
        }

        let tieneMayusculas = false;
        for (let i = 0; i < claveNueva.length; i++) {
            for (let j = 0; j < abecedarioArray.length; j++) {
                if (claveNueva[i] == abecedarioArray[j]) {
                    tieneMayusculas = true;
                }
            }
        }

        if (!tieneMayusculas) {
            mostrarResultado("Error. La contraseña no tiene mayusculas");
            return;
        }

        this._clave = claveNueva;
        mostrarResultado("la contraseña cumple con todas las condiciones");
    }

    obtenerClave() {
        const verClave = document.getElementById("correoAVerificar").value;
        if (verClave == this.correo) {
            document.getElementById("resultado").innerHTML += ""
            mostrarResultado(this._clave);
        } else {
            return "correo incorrecto";
        }
    }
}

let usuarios = []

document.getElementById("btn1").addEventListener("click", () => {
    document.getElementById("resultado").classList.add("ocultar")
    document.getElementById("like").classList.add("ocultar")
    document.getElementById("teFalla").classList.add("ocultar")
    document.getElementById("oso").classList.add("ocultar")
    document.getElementById("verClave").classList.add("ocultar")
    document.getElementById("agregarUsuario").classList.toggle("ocultar")
    document.getElementById("btn1").classList.toggle("ocultar");
        })

document.getElementById("btn-agregar").addEventListener("click", () => {
    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("email").value;
    const clave  = document.getElementById("clave").value;
    usuarios.push(new Usuario(nombre, correo, clave));
    console.log(usuarios)
    document.getElementById("btn1").classList.toggle("ocultar");
    document.getElementById("agregarUsuario").classList.toggle("ocultar")
    document.getElementById("like").classList.toggle("ocultar")
})

document.getElementById("btn2").addEventListener("click", () => {
    document.getElementById("verClave").classList.add("ocultar")

    if (usuarios.length == 0) {
        document.getElementById("like").classList.add("ocultar")
        document.getElementById("oso").classList.add("ocultar")
        document.getElementById("teFalla").classList.toggle("ocultar")
        mostrarResultado("Primero debe ingresar un usuario. haz click en agregar Usuario");

    }else {
        document.getElementById("like").classList.add("ocultar")
        document.getElementById("oso").classList.add("ocultar")

        let usuariosAMostrar = "";
        usuarios.forEach((usuario) => {
            usuariosAMostrar += usuario.mostrarUsuario();
        })

        mostrarResultado(usuariosAMostrar);

        document.getElementById("barraDeBusquedad").classList.remove("ocultar")
        document.getElementById("inputBarraBusquedad").value = "";
        mostrarUsuariosFiltrados("");
    }
})

document.getElementById("cambiarclave").classList.toggle("ocultar")
document.getElementById("claveNueva").classList.toggle("ocultar")

document.getElementById("btn3").addEventListener("click", () => {
    document.getElementById("resultado").classList.add("ocultar")
    if (usuarios.length == 0) {
        document.getElementById("like").classList.add("ocultar")
        document.getElementById("oso").classList.add("ocultar")
        document.getElementById("teFalla").classList.remove("ocultar")
        mostrarResultado("Primero debe ingresar un usuario. haz click en agregar Usuario");
} else{
    document.getElementById("like").classList.add("ocultar")
    document.getElementById("oso").classList.add("ocultar")
    document.getElementById("cambiarclave").classList.toggle("ocultar")
}
})

document.getElementById("correoIngresado").addEventListener("click", () => {
    document.getElementById("claveNueva").classList.toggle("ocultar")
})

document.getElementById("contraseñaIngresada").addEventListener("click", () => {
    const correoIngresado = document.getElementById("correoABuscar").value;
    const usuarioEncontrado = usuarios.find(usuario => usuario.correo == correoIngresado);
    if (usuarioEncontrado) {
        usuarioEncontrado.cambiarClave()
        document.getElementById("cambiarclave").classList.toggle("ocultar")
        document.getElementById("claveNueva").classList.toggle("ocultar")
    } else {
        mostrarResultado("Usuario no encontrado");
    }
})

document.getElementById("verClave").classList.toggle("ocultar")

document.getElementById("btn4").addEventListener("click", () => {
    document.getElementById("resultado").classList.add("ocultar")
    if (usuarios.length == 0) {
        document.getElementById("like").classList.add("ocultar")
        document.getElementById("oso").classList.add("ocultar")
        document.getElementById("teFalla").classList.remove ("ocultar")
        mostrarResultado("Primero debe ingresar un usuario. haz click en agregar Usuario");
    }else{
        document.getElementById("like").classList.add("ocultar")
        document.getElementById("oso").classList.add("ocultar")
        document.getElementById("verClave").classList.toggle("ocultar")
    }   
})

document.getElementById("paraVerClave").addEventListener("click", () => {
    document.getElementById("like").classList.add("ocultar")

    const correoIngresado = document.getElementById("correoAVerificar").value;
    const usuarioEncontrado = usuarios.find(usuario => usuario.correo == correoIngresado);
    if (usuarioEncontrado) {
        usuarioEncontrado.obtenerClave()
        document.getElementById("oso").classList.toggle("ocultar")
    } else {
        mostrarResultado("Usuario no encontrado");
    }

    document.getElementById("verClave").classList.toggle("ocultar")
})

function mostrarUsuariosFiltrados(filtro) {
     const filtroMinusculas = filtro.toLowerCase();
 
    const usuariosFiltrados = usuarios.filter((usuario) =>
        usuario.nombre.toLowerCase().includes(filtroMinusculas) ||
        usuario.correo.toLowerCase().includes(filtroMinusculas)
    );
 
    if (usuariosFiltrados.length === 0) {
        mostrarResultado("No se encontraron usuarios con ese nombre o correo");
        return;
    }
 
    let usuariosAMostrar = "";
    usuariosFiltrados.forEach((usuario) => {
        usuariosAMostrar += usuario.mostrarUsuario();
    })
 
    mostrarResultado(usuariosAMostrar);
}

document.getElementById("inputBarraBusquedad").addEventListener("input", () => {
    const filtro = document.getElementById("inputBarraBusquedad").value;
    mostrarUsuariosFiltrados(filtro);
})

function mostrarResultado (mensaje){
    document.getElementById("resultado").classList.remove("ocultar")
    document.getElementById("resultado").innerHTML = mensaje
}
/*window.onload()*/ 