const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Teacher = require('../models/teacher');

const teachersGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, teachers] = await Promise.all([
        Teacher.countDocuments(query),
        Teacher.find(query)
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

    const teachersCursos = teachers.map(teacher => ({
        _id: teacher._id,
        nombre: teacher.nombre,
        cursos: teacher.cursos.map(curso => curso.nombre)
    }));

    res.status(200).json({
        total,
        teachers: teachersCursos
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

    const salt = bcryptjs.genSaltSync();
    teacher.password = bcryptjs.hashSync(password, salt);

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