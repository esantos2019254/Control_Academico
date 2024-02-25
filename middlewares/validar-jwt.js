const jwt = require("jsonwebtoken");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    //verificación de token
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer el usuario que corresponde al uid
    const student = await Student.findById(uid);
    const teacher = await Teacher.findById(uid);
    let usuario;
    //verificar que el usuario exista.
    if (!student && !teacher) {
      return res.status(401).json({
        msg: "Usuario no existe en la base de datos",
      });
    }

    //verificar si el uid está habilidato.
    if(student){
      if (!student.estado) {
        return res.status(401).json({
          msg: "Token no válido - Estudiante con estado:false",
        });
      }
      req.usuario = student;
    }

    if(teacher){
      if(!teacher.estado){
        return res.status(401).json({
          msg: "Token no válido - Profesor con estado:false",
        });
      }
      req.usuario = teacher;
    }

    next();
  } catch (e) {
    console.log(e),
      res.status(401).json({
        msg: "Token no válido",
      });
  }
};

module.exports = {
  validarJWT,
};