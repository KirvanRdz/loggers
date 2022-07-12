"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = require("express");

var _productos = require("../controller/productos");

var _funcion = require("../middlewares/funcion1");

var _socket = require("../services/socket");

var router = (0, _express.Router)();
router.get('/', _funcion.validarAdmin, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var productos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log('LLEGO REQUEST GET PRODUCTOS');
            _context.next = 3;
            return _productos.ProductosController.getAll();

          case 3:
            productos = _context.sent;
            res.json({
              data: productos
            });

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
router.get('/:id', /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var id, producto;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            id = req.params.id; //const id = req.params.id

            _context2.next = 3;
            return _productos.ProductosController.getById(id);

          case 3:
            producto = _context2.sent;

            if (producto) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", res.status(404).json({
              msg: 'Product not found'
            }));

          case 6:
            res.json({
              data: producto
            });

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
router.post('/', /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var _req$body, precio, nombre, url, nuevoProducto, result;

    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            console.log(req.body);
            _req$body = req.body, precio = _req$body.precio, nombre = _req$body.nombre, url = _req$body.url;

            if (!(!nombre || !precio || !url)) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", res.status(400).json({
              msg: 'Falta Nombre, Precio o url en el Body'
            }));

          case 4:
            nuevoProducto = {
              precio: precio,
              nombre: nombre,
              url: url
            };
            _context3.next = 7;
            return _productos.ProductosController.save(nuevoProducto);

          case 7:
            result = _context3.sent;
            (0, _socket.socketEmit)('producto', result);
            res.json({
              msg: nuevoProducto
            });

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
router.put('/:id', /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var _req$body2, precio, nombre, url, id, producto, nuevoProducto, result;

    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _req$body2 = req.body, precio = _req$body2.precio, nombre = _req$body2.nombre, url = _req$body2.url;
            id = req.params.id; //const id = req.params.id

            _context4.next = 4;
            return _productos.ProductosController.getById(id);

          case 4:
            producto = _context4.sent;

            if (producto) {
              _context4.next = 7;
              break;
            }

            return _context4.abrupt("return", res.status(404).json({
              msg: 'Product not found'
            }));

          case 7:
            if (!(!nombre || !precio || !url)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", res.status(400).json({
              msg: 'Falta Nombre, Precio o url en el Body'
            }));

          case 9:
            nuevoProducto = {
              precio: precio,
              nombre: nombre,
              url: url
            };
            _context4.next = 12;
            return _productos.ProductosController.Update(id, nuevoProducto);

          case 12:
            result = _context4.sent;
            res.json({
              data: result
            });

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
router["delete"]('/:id', /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var id;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            id = req.params.id; //const id = req.params.id

            _context5.next = 3;
            return _productos.ProductosController.deleteById(id);

          case 3:
            res.json({
              msg: 'Ok'
            });

          case 4:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;