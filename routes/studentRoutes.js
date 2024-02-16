const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');

const { existeStudentById } = require('../helpers/db validator');

const { studentsGet, getStudentById, studentsPost, studentsPut, studentsDelete } = require('../controllers/studentController');

const router = Router();

router.get("/", studentsGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], getStudentById);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], studentsPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], studentsPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeStudentById),
        validarCampos
    ], studentsDelete);
module.exports = router;