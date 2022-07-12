"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var _default = {
  MONGO_ATLAS_URL: process.env.MONGO_SRV || 'mongoSRV',
  PORT: process.env.PORT || 8080
};
exports["default"] = _default;