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

const existeTeacherById = async (id='') =>{
    const existeTeacher = await Curso.findOne({id});
    if(existeTeacher){
        throw new Error('El estudiante con el ${id} no existe');
    }
}

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

module.exports = {
    existeStudentById,
    existeCursoById,
    existeTeacherById,
    existenteEmail
}