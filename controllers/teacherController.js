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
    try {

        const teacher = new Teacher({ 
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
                if (teacher.cursos.includes(_id)) {
                    return res.status(400).json({ message: `El alumno ya está asignado al curso con ID ${_id}` });
                }
                teacher.cursos.push(_id);
            }
        }

        await teacher.save();
        res.status(200).json({
            teacher
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el profesor' });
    }
}

const teachersPut = async (req, res) => {

    const { id } = req.params;
    const { _id, correo, role, estado, ...resto } = req.body;

    await Teacher.findByIdAndUpdate(id, resto);
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        msg: 'Profesor Actualizado existosamente',
        teacher
    });
}

const teachersDelete = async (req, res) => {

    const { id } = req.params;

    await Teacher.findByIdAndUpdate(id, { estado: false });
    const teacher = await Teacher.findOne({ _id: id });

    res.status(200).json({
        msg: 'Profesor eliminado exitosamente',
        teacher
    });
}
module.exports = {
    teachersGet,
    getTeacherById,
    teachersPost,
    teachersPut,
    teachersDelete
}