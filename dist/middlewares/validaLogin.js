"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validarLogin = void 0;
var admin = true;

var validarLogin = function validarLogin(req, res, done) {
  console.log('Is Authenticated');
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) return res.redirect('/login');
  done();
};

exports.validarLogin = validarLogin;