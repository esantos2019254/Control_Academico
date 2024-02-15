const { Schema, model } = require('mongoose');

const studentSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    curso1: {
        type: String,
        required: [true, 'El curso1 es obligatorio']
    },
    curso2: {
        type: String,
        required: [true, 'El curso1 es obligatorio']
    },
    curso3: {
        type: String,
        required: [true, 'El curso1 es obligatorio']
    },
    role: {
        type: String,
        required: true,
        enum: ["STUDENT_ROLE"]
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model ('Student', studentSchema);