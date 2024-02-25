const { generarJWT } = require("../helpers/generar-jwt.js");
const Student = require("../models/student.js");
const Teacher = require("../models/teacher.js");
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;
    let token;
    let usuario;
    try {
        // verificar que el correo exista
        const student = await Student.findOne({ correo });
        const teacher = await Teacher.findOne({ correo });

        if (!student && !teacher) {
            return res.status(400).json({
                msg: 'El correo no está registrado'
            })
        }

        if (student) {
            // verificar si el usuario está activo
            if (!student.estado) {
                return res.status(400).json({
                    msg: 'El estudiante no existe en la base de datos'
                });
            }
            // verificar que la contraseña sea la correcta
            const validPasswordS = bcryptjs.compareSync(password, student.password);
            console.log(password);
            console.log(student.password);
            if (!validPasswordS) {
                return res.status(400).json({
                    msg: 'Contraseña incorrecta'
                });
            }
            token = await generarJWT(student.id);
            usuario = student;
        }

        if (teacher) {
            // verificar si el usuario está activo
            if (!teacher.estado) {
                return res.status(400).json({
                    msg: 'El usuario no existe en la base de datos'
                });
            }
            // verificar que la contraseña sea la correcta
            const validPasswordT = bcryptjs.compareSync(password, teacher.password);
            if (!validPasswordT) {
                return res.status(400).json({
                    msg: 'Contraseña incorrecta'
                });
            }
            token = await generarJWT(teacher.id);
            usuario = teacher;
        }

        res.status(200).json({
            msg: 'Login ok',
            usuario,
            token
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    login
};