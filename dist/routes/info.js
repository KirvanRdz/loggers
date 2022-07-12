"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _os = _interopRequireDefault(require("os"));

var _loggers = require("../utils/loggers");

var router = (0, _express.Router)();
router.get('/', /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var numCPUs, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            numCPUs = _os["default"].cpus().length;
            data = {
              process1: []
            };
            data.process1.push({
              argumentos: process.argv,
              so: process.platform,
              vnode: process.version,
              rss: JSON.stringify(process.memoryUsage().rss),
              path: process.title,
              id: process.pid,
              carpeta: process.cwd(),
              noPro: numCPUs
            });

            _loggers.logger.error(JSON.stringify(data));

            res.render('info', data);

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
var _default = router;
exports["default"] = _default;