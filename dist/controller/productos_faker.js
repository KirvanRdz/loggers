"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProductosFakerController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _faker = require("@faker-js/faker");

_faker.faker.locale = 'en'; //Esto solo va a funcionar si el archivo ya existe

var Productos = /*#__PURE__*/function () {
  function Productos() {
    (0, _classCallCheck2["default"])(this, Productos);
  }

  (0, _createClass2["default"])(Productos, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var data, i;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = {
                  productos: []
                };

                for (i = 0; i < 10; i++) {
                  data.productos.push({
                    nombre: _faker.faker.vehicle.vehicle(),
                    precio: _faker.faker.finance.amount(),
                    url: _faker.faker.image.imageUrl()
                  });
                }

                return _context.abrupt("return", data);

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);
  return Productos;
}();

var ProductosFakerController = new Productos();
exports.ProductosFakerController = ProductosFakerController;