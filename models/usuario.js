const { Schema, model } = require ('mongoose');

const UsuarioSchema = Schema({
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    contraseña: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    role: {
        type: String,
        required: true,
        enum: ["STUDENT_ROLE", "TECHEAR_ROLE"]
    } 
});

module.exports = model ('Usuario', UsuarioSchema);
















// Añadir validación de que la contraseña tenga al menos una mayúscula y uno o más caracteres especiales (signos de puntu
// exportar el modelo de usuario para poder acceder a él desde otros archivos
// module.exports permite que se puedan utilizar los datos del modulo en otro lugar
// module.export devuelve un objeto con la informacion del modulo
/*
const Usuario = require('./usuario.model');
console.log(Usuario === module.exports) // TRUE

Usuario.find()
    .then(usuarios =>{
        console.log(usuarios);
    })
    .catch(error=>{
        console.log(error);
    }); */ 