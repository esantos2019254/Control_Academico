const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validarCampos');

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
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        validarCampos,
    ], cursosPost);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursosDelete);
module.exports = router;