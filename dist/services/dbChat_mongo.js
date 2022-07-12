"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBServiceMongo = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var productoSchema = new _mongoose["default"].Schema({
  author: {
    id: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    apellido: {
      type: String,
      required: true
    },
    edad: {
      type: Number,
      required: true
    },
    alias: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      required: true
    }
  },
  text: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
});

var DB = /*#__PURE__*/function () {
  function DB() {
    (0, _classCallCheck2["default"])(this, DB);
    this.srv = process.env.MONGO_SRV || 'ejemplo';

    _mongoose["default"].connect(this.srv);

    this.productos = _mongoose["default"].model('chats', productoSchema);
  }

  (0, _createClass2["default"])(DB, [{
    key: "getAll",
    value: function getAll() {
      return this.productos.find();
    }
  }, {
    key: "getId",
    value: function getId(id) {
      return this.productos.findById(id);
    }
  }, {
    key: "create",
    value: function create(data) {
      return this.productos.create(data);
    }
  }, {
    key: "update",
    value: function update(id, data) {
      return this.productos.findByIdAndUpdate(id, data, {
        "new": true
      });
    }
  }]);
  return DB;
}();

var DBServiceMongo = new DB();
exports.DBServiceMongo = DBServiceMongo;