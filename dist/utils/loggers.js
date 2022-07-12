"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = void 0;

var _winston = _interopRequireDefault(require("winston"));

// Create the logger
var createLogger = _winston["default"].createLogger,
    format = _winston["default"].format,
    transports = _winston["default"].transports;
var combine = format.combine,
    printf = format.printf,
    timestamp = format.timestamp,
    colorize = format.colorize;
/**
 * Ejemplo basico de Logging usando Winston
 * Aca solo imprimimos en consola
 * con format podemos agregarle info extra (ej el timestamp) o definir como va a ser la salida
 * Tambien podemos imprimir la salida en el formato que querramos
 */

var logConfiguration = {
  format: combine(format.simple()),
  transports: [new transports.Console({
    level: 'info'
  }), new transports.File({
    filename: './logs/error.log',
    level: 'error'
  }), new transports.File({
    filename: './logs/info.log',
    level: 'info'
  })]
};
var logger = createLogger(logConfiguration); //   logger.silly('Imprimimos Silly');
//   logger.debug('Imprimimos Debug');
//   logger.verbose('Imprimimos Verbose');
//   logger.info('Imprimimos Info');
//   logger.warn('Imprimimos Warn');
//   logger.error('Imprimimos Error');

exports.logger = logger;