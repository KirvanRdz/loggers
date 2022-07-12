"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var http = _interopRequireWildcard(require("http"));

var _path = _interopRequireDefault(require("path"));

var _routes = _interopRequireDefault(require("../routes"));

var _config = _interopRequireDefault(require("../config"));

var _expressHandlebars = require("express-handlebars");

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _expressSession = _interopRequireDefault(require("express-session"));

var _connectMongo = _interopRequireDefault(require("connect-mongo"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])(); //const myHttpServer = http.Server(app);

app.use(_express["default"]["static"]('public'));
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_express["default"].json()); //Conseguimos el path absoluto de la carpeta layouts

var layoutDirPath = _path["default"].resolve(__dirname, '../../views/layouts'); //Conseguimos el path absoluto del esqueleto de nuestro HTML (layouts/index.hbs)


var defaultLayerPth = _path["default"].resolve(__dirname, '../../views/layouts/index.hbs');

var partialDirPath = _path["default"].resolve(__dirname, '../../views/partials'); //Le decimos a nuestra app de express que vamos a usar handlebars


app.set('view engine', 'hbs'); //Configuramos el handlebars que indicamos en la linea anterior, para eso le pasamos la funcion engine y dentro la configuracion

app.engine('hbs', (0, _expressHandlebars.engine)({
  layoutsDir: layoutDirPath,
  //le decimos donde esta la carpeta de layouts
  extname: 'hbs',
  //indicamos la extension de los archivos (por defecto es .handlebars y es muy largo)
  defaultLayout: defaultLayerPth,
  //indicamos cual es el layout por defecto que usara,
  partialsDir: partialDirPath
})); //initWsServer(myHttpServer);

app.use(_routes["default"]); //app.use(cookieParser());
//app.use(session(StoreOptions));

var myServer = new http.Server(app);
var _default = myServer;
exports["default"] = _default;