const { response } = require('express');
const bcryptjs = require('bcryptjs');
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
                match: { estado: true },
                select: 'nombre'
            })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    const studentCursos = students.map(student => ({
        _id: student._id,
        nombre: student.nombre,
        cursos: student.cursos.map(curso => curso.nombre)
    }));

    res.status(200).json({
        total,
        students: studentCursos
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

    const salt = bcryptjs.genSaltSync();
    student.password = bcryptjs.hashSync(password, salt);

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
        msg: 'Datos Actualizados existosamente',
        student
    });
}

const studentsDelete = async (req, res) => {

    const { id } = req.params;

    await Student.findByIdAndUpdate(id, { estado: false });
    const student = await Student.findOne({ _id: id });

    res.status(200).json({
        msg: 'Cuenta eliminada exitosamente',
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