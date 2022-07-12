"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _dbProductos = require("../services/dbProductos");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

//Esto solo va a funcionar si el archivo ya existe
var Productos = /*#__PURE__*/function () {
  function Productos(nombreTabla) {
    (0, _classCallCheck2["default"])(this, Productos);
    this.tabla = nombreTabla;
  }

  (0, _createClass2["default"])(Productos, [{
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(miObjeto) {
        var productoNuevo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                productoNuevo = {
                  nombre: miObjeto.nombre,
                  precio: miObjeto.precio,
                  url: miObjeto.url
                };
                _context.next = 3;
                return _dbProductos.DBServiceMDB.create(this.tabla, productoNuevo);

              case 3:
                return _context.abrupt("return", productoNuevo);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function save(_x) {
        return _save.apply(this, arguments);
      }

      return save;
    }()
  }, {
    key: "getById",
    value: function () {
      var _getById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(number) {
        var producto;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbProductos.DBServiceMDB.get(this.tabla, number);

              case 2:
                producto = _context2.sent;
                return _context2.abrupt("return", producto);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getById(_x2) {
        return _getById.apply(this, arguments);
      }

      return getById;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
        var productos;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _dbProductos.DBServiceMDB.get(this.tabla);

              case 2:
                productos = _context3.sent;
                return _context3.abrupt("return", productos);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "deleteById",
    value: function () {
      var _deleteById = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(number) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _dbProductos.DBServiceMDB["delete"](this.tabla, number);

              case 2:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function deleteById(_x3) {
        return _deleteById.apply(this, arguments);
      }

      return deleteById;
    }()
  }, {
    key: "deleteAll",
    value: function () {
      var _deleteAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return _dbProductos.DBServiceMDB["delete"](this.tabla);

              case 2:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function deleteAll() {
        return _deleteAll.apply(this, arguments);
      }

      return deleteAll;
    }()
  }, {
    key: "Update",
    value: function () {
      var _Update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id, nuevaData) {
        var productUpdated;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                productUpdated = _objectSpread({
                  id: id
                }, nuevaData);
                _context6.next = 3;
                return _dbProductos.DBServiceMDB.update(this.tabla, id, nuevaData);

              case 3:
                return _context6.abrupt("return", productUpdated);

              case 4:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function Update(_x4, _x5) {
        return _Update.apply(this, arguments);
      }

      return Update;
    }()
  }]);
  return Productos;
}();

var ProductosController = new Productos('productos');
exports.ProductosController = ProductosController;