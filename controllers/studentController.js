const { response } = require('express');

const Student = require('../models/student');

const studentsGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, students] = await Promise.all([
        Student.countDocuments(query),
        Student.find(query)
            .select('nombre')
            .select('cursos')
            .populate({
                path: 'cursos',
                select: 'nombre'
            })
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

    const student = new Student({
        nombre,
        apellido,
        correo,
        password,
        cursos
    });

    await student.save();
    res.status(200).json({
        student
    });

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