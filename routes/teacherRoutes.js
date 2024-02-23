const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarCamposTeacher } = require('../middlewares/validarCampos');

const { existeTeacherById } = require('../helpers/db validator');

const { teachersGet, getTeacherById, teachersPost } = require('../controllers/teacherController');

const router = Router();

router.get("/", teachersGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ], getTeacherById);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCamposTeacher,
    ], teachersPost);
module.exports = router;