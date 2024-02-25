const { validationResult } = require('express-validator');

const Curso = require('../models/curso');
const Student = require('../models/student');
const Teacher = require('../models/teacher')

const validarCampos = (req, res, next) =>{
    
    const error = validationResult(req);
    if(!error.isEmpty){
        return res.status(400).json(error);
    }

    const { cursos } = req.body
    const student = new Student();

    if (cursos && cursos.length > 0) {
        for (let _id of cursos) {
            const curso = Curso.findById(_id);
            if (!curso) {
                return res.status(400).json({ message: `El curso con ID ${_id} no existe` });
            }
            if (student.cursos.includes(_id)) {
                return res.status(400).json({ message: `El alumno ya está asignado al curso con ID ${_id}` });
            }
            if (student.cursos.length >= 3) {
                return res.status(400).json({ message: 'El alumno ya está asignado a 3 cursos' });
            }
            student.cursos.push(_id);
        }
    }
    next();
}

const validarCamposTeacher = (req, res, next) =>{

    const error = validationResult(req);
    if(!error.isEmpty){
        return res.status(400).json(error);
    }

    const { cursos } = req.body
    const teacher = new Teacher();

    if (cursos && cursos.length > 0) {
        for (let _id of cursos) {
            const curso = Curso.findById(_id);
            if (!curso) {
                return res.status(400).json({ message: `El curso con ID ${_id} no existe` });
            }
            if (teacher.cursos.includes(_id)) {
                return res.status(400).json({ message: `El maestro ya está asignado al curso con ID ${_id}` });
            }
            teacher.cursos.push(_id);
        }
    }
    next();
}

module.exports = {
    validarCampos,
    validarCamposTeacher
}