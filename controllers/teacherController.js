const { response } = require('express');

const Teacher = require('../models/teacher');
const Curso = require('../models/curso');

const teachersGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, teachers] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        teachers
    });
}

const getTeacherById = async (req, res) => {

    const { id } = req.params;
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        teacher
    });
}

const teachersPost = async (req, res) => {
    const { nombre, apellido, correo, password, cursos } = req.body;

    const teacher = new Teacher({
        nombre,
        apellido,
        correo,
        password,
        cursos
    });

    await teacher.save();
    res.status(200).json({
        teacher
    });
    
}
module.exports = {
    teachersGet,
    getTeacherById,
    teachersPost
}