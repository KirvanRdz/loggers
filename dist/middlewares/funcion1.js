"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarAdmin = void 0;
var admin = true;

var validarAdmin = function validarAdmin(req, res, next) {
  if (admin) next();else res.status(401).json({
    msg: 'No autorizado'
  });
};

exports.validarAdmin = validarAdmin;