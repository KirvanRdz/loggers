"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DBServiceSQL = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _knex = _interopRequireDefault(require("knex"));

var sqlite3Config = {
  client: 'sqlite3',
  connection: {
    filename: './myDB.sqlite'
  },
  useNullAsDefault: true
};

var DB = /*#__PURE__*/function () {
  function DB() {
    (0, _classCallCheck2["default"])(this, DB);
    this.connection = (0, _knex["default"])(sqlite3Config);
  }

  (0, _createClass2["default"])(DB, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.connection.schema.hasTable('mensajes').then(function (exists) {
        if (exists) return;
        console.log('Creamos la tabla mensajes!');
        return _this.connection.schema.createTable('mensajes', /*#__PURE__*/function () {
          var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(mensajesTable) {
            return _regenerator["default"].wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    mensajesTable.increments('id');
                    mensajesTable.string('email').notNullable();
                    mensajesTable.string('fecha').notNullable();
                    mensajesTable.string('mensaje').notNullable();

                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }));

          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
      });
    }
  }, {
    key: "get",
    value: function get(tableName, id) {
      if (id) return this.connection(tableName).where('id', id);
      return this.connection(tableName);
    }
  }, {
    key: "create",
    value: function create(tableName, data) {
      return this.connection(tableName).insert(data);
    }
  }, {
    key: "update",
    value: function update(tableName, id, data) {
      return this.connection(tableName).where('id', id).update(data);
    }
  }, {
    key: "delete",
    value: function _delete(tableName, id) {
      return this.connection(tableName).where('id', id).del();
    }
  }]);
  return DB;
}();

var DBServiceSQL = new DB();
exports.DBServiceSQL = DBServiceSQL;