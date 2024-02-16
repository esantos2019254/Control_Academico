const { response } = require('express');

const Student = require('../models/student');
const Curso = require('../models/curso');

const studentsGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, students] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        students
    });
}

const getStudentById = async (req, res) => {

    const { id } = req.params;
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        student
    });
}

const studentsPost = async (req, res) => {
    const { nombre, apellido, correo, password, cursos } = req.body;
    try {

        const student = new Student({ 
            nombre, 
            apellido, 
            correo, 
            password, 
            cursos: []
        });

        if (cursos && cursos.length > 0) {
            for (let _id of cursos) {
                const curso = await Curso.findById(_id);
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

        await student.save();
        res.status(200).json({
            student
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el alumno' });
    }
}

const studentsPut = async (req, res) => {

    const { id } = req.params;
    const { _id, correo, role, estado, ...resto } = req.body;

    await Student.findByIdAndUpdate(id, resto);
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Estudiante Actualizado existosamente',
        student
    });
}

const studentsDelete = async (req, res) => {

    const { id } = req.params;

    await Student.findByIdAndUpdate(id, { estado: false });
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        student
    });
}
module.exports = {
    studentsGet,
    getStudentById,
    studentsPost,
    studentsPut,
    studentsDelete
}