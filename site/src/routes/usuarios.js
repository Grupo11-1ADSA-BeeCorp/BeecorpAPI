var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.get("/", function (req, res) {
    usuarioController.testar(req, res);
});

router.get("/listar", function (req, res) {
    usuarioController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
});
router.post("/cadastrarFuncionario", function (req, res) {
    usuarioController.cadastrarFuncionario(req, res);
});
router.post("/cadastrarPrimeiraFazenda", function (req, res) {
    usuarioController.cadastrarPrimeiraFazenda(req, res);
});
router.post("/cadastrarNovaFazenda", function (req, res) {
    usuarioController.cadastrarNovaFazenda(req, res);
});


router.post("/autenticar", function (req, res) {
    usuarioController.entrar(req, res);
});

router.get("/dadosfunc/:idSession", function (req, res) {
    usuarioController.obterdadosfuncionario(req, res);
})
router.get("/dadosfazenda/:idSession", function (req, res) {
    usuarioController.obterdadosfazenda(req, res);
})
router.post("/cadastrarSensores", function (req,res) {
    usuarioController.cadastrarSensores(req,res);
});
module.exports = router;