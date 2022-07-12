
import compression from 'compression';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import config from '../config';
import { Router } from 'express';
import passport from 'passport';
import { signUpFunc, loginFunc } from '../services/auth';
import productsRouter from './productos';
import productsTestRouter from './productos_faker';
import infoRouter from './info';
import randomsRouter from './randoms';
import mainRouter from './login';
const router = Router();

const ttlSeconds = 600;
const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: config.MONGO_ATLAS_URL,
    crypto: {
      secret: 'squirrel',
    },
  }),
  secret: 'shhhhhhhhhhhhhhhhhhhhh',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
  
};


router.use(session(StoreOptions));
//Indicamos que vamos a usar passport en todas nuestras rutas
router.use(passport.initialize());
//Permitimos que passport pueda manipular las sessiones de nuestra app
router.use(passport.session());
// loginFunc va a ser una funcion que vamos a crear y va a tener la logica de autenticacion
// Cuando un usuario se autentique correctamente, passport va a devolver en la session la info del usuario
passport.use('login', loginFunc);


//signUpFunc va a ser una funcion que vamos a crear y va a tener la logica de registro de nuevos usuarios
passport.use('signup', signUpFunc);
router.use('/productos', productsRouter)
router.use('/productos-test', productsTestRouter)
router.use('/info', infoRouter)
router.use('/api', randomsRouter)
router.use('/', mainRouter)


export default router;