const { Schema, model, default: mongoose, } = require('mongoose');

const cursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

module.exports = model ('Curso', cursoSchema);