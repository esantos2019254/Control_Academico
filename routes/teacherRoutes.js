const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');

const { existeTeacherById } = require('../helpers/db validator');

const { teachersGet, getTeacherById, teachersPost, teachersPut, teachersDelete } = require('../controllers/teacherController');

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
        validarCampos,
    ], teachersPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ], teachersPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeTeacherById),
        validarCampos
    ], teachersDelete);
module.exports = router;