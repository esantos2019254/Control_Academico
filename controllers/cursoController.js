const { response } = require('express');

const Curso = require('../models/curso');

const cursosGet = async (req, res = response) => {

    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, cursos] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        cursos
    });
}

const getCursosById = async (req, res) => {

    const { id } = req.params;
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        curso
    });
}

const cursosPost = async (req, res) => {
    const { nombre } = req.body;
    try {
        const curso = new Curso({ 
            nombre
        });
    
        await curso.save();
        res.status(200).json({
            curso
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el curso' });
    }

}

const cursosPut = async (req, res) => {

    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    await Curso.findByIdAndUpdate(id, resto);
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        msg: 'Estudiante Actualizado existosamente',
        curso
    });
}

const cursosDelete = async (req, res) => {

    const { id } = req.params;

    await Curso.findByIdAndUpdate(id, { estado: false });
    const curso = await Curso.findOne({ _id: id });

    res.status(200).json({
        msg: 'Estudiante eliminado exitosamente',
        curso
    });
}
module.exports = {
    cursosGet,
    getCursosById,
    cursosPost,
    cursosPut,
    cursosDelete
}