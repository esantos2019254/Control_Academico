const Student = require('../models/student');
const Curso = require('../models/curso');

const existeStudentById = async (id='') =>{
    const existeStudent = await Student.findOne({id});
    if(existeStudent){
        throw new Error('El estudiante con el ${id} no existe');
    }
}

const existeCursoById = async (id='') =>{
    const existeCurso = await Curso.findOne({id});
    if(existeCurso){
        throw new Error('El estudiante con el ${id} no existe');
    }
}

module.exports = {
    existeStudentById,
    existeCursoById
}