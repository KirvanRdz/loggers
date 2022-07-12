import express from 'express';
import * as http from 'http';
import path from 'path';
import mainRouter from '../routes';
import config from '../config';
import { engine } from 'express-handlebars';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';


const app = express();

//const myHttpServer = http.Server(app);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Conseguimos el path absoluto de la carpeta layouts
const layoutDirPath = path.resolve(__dirname, '../../views/layouts');

//Conseguimos el path absoluto del esqueleto de nuestro HTML (layouts/index.hbs)
const defaultLayerPth = path.resolve(
  __dirname,
  '../../views/layouts/index.hbs'
);

const partialDirPath = path.resolve(__dirname, '../../views/partials');

//Le decimos a nuestra app de express que vamos a usar handlebars
app.set('view engine', 'hbs');

//Configuramos el handlebars que indicamos en la linea anterior, para eso le pasamos la funcion engine y dentro la configuracion
app.engine(
  'hbs',
  engine({
    layoutsDir: layoutDirPath, //le decimos donde esta la carpeta de layouts
    extname: 'hbs', //indicamos la extension de los archivos (por defecto es .handlebars y es muy largo)
    defaultLayout: defaultLayerPth, //indicamos cual es el layout por defecto que usara,
    partialsDir: partialDirPath,
  })
);

//initWsServer(myHttpServer);

app.use( mainRouter);
//app.use(cookieParser());
//app.use(session(StoreOptions));


const myServer = new http.Server(app);

export default myServer;
