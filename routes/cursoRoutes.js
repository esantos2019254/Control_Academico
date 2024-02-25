const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');
const { tieneRole } = require('../middlewares/validar-roles');
const { validarJWT } = require('../middlewares/validar-jwt');

const { existeCursoById } = require('../helpers/db validator');

const { cursosGet, getCursosById, cursosPost, cursosPut, cursosDelete } = require('../controllers/cursoController');

const router = Router();

router.get("/", cursosGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], getCursosById);

router.post(
    "/",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], cursosPost);

router.put(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('TEACHER_ROLE'),
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosDelete);
module.exports = router;