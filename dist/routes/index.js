"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _compression = _interopRequireDefault(require("compression"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

var _config = _interopRequireDefault(require("../config"));

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _auth = require("../services/auth");

var _productos = _interopRequireDefault(require("./productos"));

var _productos_faker = _interopRequireDefault(require("./productos_faker"));

var _info = _interopRequireDefault(require("./info"));

var _randoms = _interopRequireDefault(require("./randoms"));

var _login = _interopRequireDefault(require("./login"));

var router = (0, _express.Router)();
var ttlSeconds = 600;
var StoreOptions = {
  store: _connectMongo["default"].create({
    mongoUrl: _config["default"].MONGO_ATLAS_URL,
    crypto: {
      secret: 'squirrel'
    }
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: ttlSeconds * 1000
  }
};
router.use((0, _expressSession["default"])(StoreOptions)); //Indicamos que vamos a usar passport en todas nuestras rutas

router.use(_passport["default"].initialize()); //Permitimos que passport pueda manipular las sessiones de nuestra app

router.use(_passport["default"].session()); // loginFunc va a ser una funcion que vamos a crear y va a tener la logica de autenticacion
// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario

_passport["default"].use('login', _auth.loginFunc); //signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios


_passport["default"].use('signup', _auth.signUpFunc);

router.use('/productos', _productos["default"]);
router.use('/productos-test', _productos_faker["default"]);
router.use('/info', _info["default"]);
router.use('/api', _randoms["default"]);
router.use('/', _login["default"]);
var _default = router;
exports["default"] = _default;