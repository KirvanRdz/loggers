"use strict";

var between = function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var random = function random(cantidad) {
  var salida = [];

  for (var i = 0; i < cantidad; i++) {
    salida.push(between(1, 1000));
  }

  return salida;
};

process.on('message', function (cantidad) {
  if (cantidad == 0) process.send(random(100000000));else process.send(random(cantidad));
});