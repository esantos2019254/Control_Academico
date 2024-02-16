const { Schema, model, } = require('mongoose');

const cursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
});

module.exports = model ('Curso', cursoSchema);