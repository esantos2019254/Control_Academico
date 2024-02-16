const { Schema, model, default: mongoose } = require('mongoose');

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
        required: [true, 'El correo es obligatorio'],
        nique: true
    },
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    cursos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curso'
    }],
    role: {
        type: String,
        enum: ['STUDENT_ROLE', 'TEACHER_ROLE'],
        default: 'STUDENT_ROLE'
    },
    estado: {
        type: Boolean,
        default: true
    },
});

module.exports = model ('Student', studentSchema);