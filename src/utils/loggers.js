import winston from 'winston';
// Create the logger
const { createLogger, format, transports } = winston;
const { combine, printf, timestamp, colorize } = format;
/**
 * Ejemplo basico de Logging usando Winston
 * Aca solo imprimimos en consola
 * con format podemos agregarle info extra (ej el timestamp) o definir como va a ser la salida
 * Tambien podemos imprimir la salida en el formato que querramos
 */


  const logConfiguration = {
    format: combine(format.simple()),
    transports: [
      new transports.Console({ level: 'info' }),
      new transports.File({
        filename: './logs/error.log',
        level: 'error',
        
      }),
      new transports.File({
        filename: './logs/info.log',
        level: 'info',
      }),
    ],
  };


  export const logger = createLogger(logConfiguration);
  
//   logger.silly('Imprimimos Silly');
//   logger.debug('Imprimimos Debug');
//   logger.verbose('Imprimimos Verbose');
//   logger.info('Imprimimos Info');
//   logger.warn('Imprimimos Warn');
//   logger.error('Imprimimos Error');