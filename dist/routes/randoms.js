"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _child_process = require("child_process");

var _path = _interopRequireDefault(require("path"));

var _main = require("../main");

var router = (0, _express.Router)();

var scriptPath = _path["default"].resolve(__dirname, '../utils/random.js');

router.get('/randoms', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var cant, computo;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cant = req.query.cant;
            if (!cant) cant = 0;
            console.log(cant);
            computo = (0, _child_process.fork)(scriptPath);
            computo.send(cant);
            computo.on('message', function (sum) {
              var repetidos = {};
              sum.forEach(function (numero) {
                repetidos[numero] = (repetidos[numero] || 0) + 1;
              });
              console.log(repetidos);
              res.json({
                puerto: _main.PORT,
                resultado: repetidos
              });
            });

          case 6:
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
var _default = router;
exports["default"] = _default;