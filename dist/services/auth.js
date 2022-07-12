"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signUpFunc = exports.loginFunc = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _passport = _interopRequireDefault(require("passport"));

var _passportLocal = require("passport-local");

var _user = require("../model/user");

var strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
};
/**
 * Recibimos el objeto request, el username y el password
 * Buscando que haya un match en nuestra DB
 * Si sale todo bien llamamos a done pasando null como primer argumento y como segundo argumento la info del usuario que encontramos en la DB
 * Si no hay match pasamos como segundo argumento false (eso indica que no encontramos un usuario con esa data).
 * Opcionalmente podemos mandar como tercer argumento un mensaje de error
 */

var login = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, email, password, done) {
    var user, valipw;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('LOGIN!!');
            _context.next = 3;
            return _user.UserModel.findOne({
              email: email
            });

          case 3:
            user = _context.sent;

            if (user) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              mensaje: 'Usuario no encontrado'
            }));

          case 6:
            _context.next = 8;
            return user.isValidPassword(password);

          case 8:
            valipw = _context.sent;

            if (valipw) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", done(null, false, {
              mensaje: 'Usuario no encontrado'
            }));

          case 11:
            console.log(user);
            return _context.abrupt("return", done(null, user));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function login(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();
/**
 * Recibimos el objeto request, el username y el password
 * Recibimos del body la info del nuevo usuario
 * Verificamos que el username o email no este tomado, caso contrario devolvemos false en done indicando que hubo un error
 * Creamos el usuario nuevo y devolvemos el usuario creado a done
 */


var signup = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, email, password, done) {
    var query, user, userData, newUser;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            console.log("ENTRE"); // Nota: Username y password no se verifica porque ya lo hace passport.

            if (!(!email || !password)) {
              _context2.next = 5;
              break;
            }

            console.log('Invalid body fields');
            return _context2.abrupt("return", done(null, false, {
              message: 'Invalid Body Fields'
            }));

          case 5:
            query = {
              $or: [{
                email: email
              }]
            };
            _context2.next = 8;
            return _user.UserModel.findOne(query);

          case 8:
            user = _context2.sent;

            if (!user) {
              _context2.next = 15;
              break;
            }

            console.log('User already exists');
            console.log(user);
            return _context2.abrupt("return", done(null, false, {
              message: 'User already exists'
            }));

          case 15:
            userData = {
              email: email,
              password: password
            };
            _context2.next = 18;
            return _user.UserModel.create(userData);

          case 18:
            newUser = _context2.sent;
            console.log(newUser);
            return _context2.abrupt("return", done(null, newUser));

          case 21:
            _context2.next = 26;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](0);
            done(_context2.t0);

          case 26:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 23]]);
  }));

  return function signup(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

var loginFunc = new _passportLocal.Strategy(strategyOptions, login);
exports.loginFunc = loginFunc;
var signUpFunc = new _passportLocal.Strategy(strategyOptions, signup);
/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport 
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */

exports.signUpFunc = signUpFunc;

_passport["default"].serializeUser(function (user, done) {
  console.log('Se Ejecuta el serializeUser');
  done(null, user._id);
});
/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para hacer algun extra de busqueda de informacion
 */


_passport["default"].deserializeUser(function (userId, done) {
  console.log('Se Ejecuta el desserializeUser');

  _user.UserModel.findById(userId).then(function (user) {
    return done(null, user);
  });
});