"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatController = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _moment = _interopRequireDefault(require("moment"));

var _dbChat = require("../services/dbChat");

var Chat = /*#__PURE__*/function () {
  function Chat(nombreTabla) {
    (0, _classCallCheck2["default"])(this, Chat);
    this.tabla = nombreTabla;
  }

  (0, _createClass2["default"])(Chat, [{
    key: "save",
    value: function () {
      var _save = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(miObjeto) {
        var chatNuevo;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                chatNuevo = {
                  email: miObjeto.email,
                  fecha: (0, _moment["default"])().format('DD/MM/YYYY h:mm:ss a'),
                  mensaje: miObjeto.mensaje
                };
                _context.next = 3;
                return _dbChat.DBServiceSQL.create(this.tabla, chatNuevo);

              case 3:
                return _context.abrupt("return", chatNuevo);

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
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
        var chats;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return _dbChat.DBServiceSQL.get(this.tabla);

              case 2:
                chats = _context2.sent;
                return _context2.abrupt("return", chats);

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);
  return Chat;
}();

var ChatController = new Chat('mensajes');
exports.ChatController = ChatController;