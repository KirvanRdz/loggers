"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.socketEmit = exports.initWsServer = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _socket = _interopRequireDefault(require("socket.io"));

var _productos = require("../controller/productos");

var _chat_mongo = require("../controller/chat_mongo");

var io;

var initWsServer = function initWsServer(server) {
  io = (0, _socket["default"])(server);
  io.on('connection', function (socket) {
    //console.log('Nueva Conexion establecida!');
    //console.log(new Date());
    socket.on('allProducts', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
      var productos;
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _productos.ProductosController.getAll();

            case 2:
              productos = _context.sent;
              productos.forEach(function (unProducto) {
                socket.emit('producto', unProducto);
              });

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));
    socket.on('allChat', /*#__PURE__*/(0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
      var chats;
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _chat_mongo.ChatControllerMongo.getAll();

            case 2:
              chats = _context2.sent;
              socket.emit('chat', chats);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    })));
    socket.on('chatMessage', /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(unChat) {
        var chat;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return _chat_mongo.ChatControllerMongo.save(unChat);

              case 2:
                chat = _context3.sent;
                //console.log(chat)
                io.emit('newchat', chat);

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }());
  });
  return io;
};

exports.initWsServer = initWsServer;

var socketEmit = function socketEmit(eventName, message) {
  io.emit(eventName, message);
};

exports.socketEmit = socketEmit;