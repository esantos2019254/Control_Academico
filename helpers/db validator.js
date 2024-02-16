const Student = require('../models/student');

const existeStudentById = async (id='') =>{
    const existeStudent = await Student.findOne({id});
    if(existeStudent){
        throw new Error('El estudiante con el ${id} no existe');
    }
}

module.exports = {
    existeStudentById
}