"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PORT = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _db = require("./services/db");

var _server = _interopRequireDefault(require("./services/server"));

var _socket = require("./services/socket");

var _minimist = _interopRequireDefault(require("minimist"));

var _cluster = _interopRequireDefault(require("cluster"));

var _os = _interopRequireDefault(require("os"));

//import { DBService } from './services/dbChat';
var init = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var i, io;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _db.initDb)();

          case 2:
            if (modo == 'CLUSTER' && _cluster["default"].isPrimary) {
              console.log("NUMERO DE CPUS ===> ".concat(numCPUs));
              console.log("PID MASTER ".concat(process.pid));

              for (i = 0; i < numCPUs; i++) {
                _cluster["default"].fork();
              }

              _cluster["default"].on('exit', function (worker, code) {
                console.log("Worker ".concat(worker.process.pid, " died with code ").concat(code, " at ").concat(Date()));

                _cluster["default"].fork();
              });
            } else {
              /* --------------------------------------------------------------------------- */

              /* WORKERS */
              io = (0, _socket.initWsServer)(_server["default"]);

              _server["default"].listen(args.port, function () {
                return console.log("Servidor express escuchando en el puerto ".concat(args.port, " - PID WORKER ").concat(process.pid));
              });
            }

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function init() {
    return _ref.apply(this, arguments);
  };
}(); //DBService.init();


var optionalArgsObject = {
  alias: {
    //Para pasar un alias a los argumentos que nos envian
    h: 'help',
    v: 'version',
    x: 'mialiasPersonalizado',
    m: 'message'
  },
  "default": {
    //Si no nos envian el argumento, se setea por default
    port: 8080,
    modo: 'FORK'
  }
};
var args = (0, _minimist["default"])(process.argv, optionalArgsObject);
var modo = args.modo;
var PORT = args.port; //Obtengo el numero de nucleos disponibles en mi PC

exports.PORT = PORT;

var numCPUs = _os["default"].cpus().length;

console.log(args);
init();