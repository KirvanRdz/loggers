"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _connectMongo = require("connect-mongo");

var _express = require("express");

var _passport = _interopRequireDefault(require("passport"));

var _validaLogin = require("../middlewares/validaLogin");

var router = (0, _express.Router)();
var passportOptions = {
  badRequestMessage: 'Falta email / password'
};
router.get('/', _validaLogin.validarLogin, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.user.email);
            data = {
              info: []
            };
            data.info.push({
              nombre: req.user.email
            });
            console.log(data);
            res.render('main', data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
/* --------- LOGIN ---------- */

router.get('/login', function (req, res) {
  res.render('login');
});
/*router.post('/login',passport.authenticate('login', passportOptions),(req, res) => {
  res.redirect('/');
  
},
);*/

router.post('/login', _passport["default"].authenticate('login', {
  successRedirect: '/',
  failureRedirect: '/login-error'
}));
router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
});
router.get('/register', function (req, res) {
  res.render('register');
});
router.post('/register', function (req, res, next) {
  _passport["default"].authenticate('signup', passportOptions, function (err, user, info) {
    console.log('Info SIGNUP');
    console.log(err, user, info);

    if (err) {
      return next(err);
    }

    if (!user) return res.render('signup-error', {});
    res.redirect('/');
  })(req, res, next);
});
router.get('/login-error', function (req, res) {
  res.render('login-error');
});
var _default = router;
exports["default"] = _default;