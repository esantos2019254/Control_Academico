const { Schema, model, default: mongoose, } = require('mongoose');

const cursoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    student: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }],
    teacher: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }],
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model ('Curso', cursoSchema);