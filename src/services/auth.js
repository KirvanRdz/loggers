import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../model/user';

const strategyOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true,
};

/**
 * Recibimos el objeto request, el username y el password
 * Buscando que haya un match en nuestra DB
 * Si sale todo bien llamamos a done pasando null como primer argumento y como segundo argumento la info del usuario que encontramos en la DB
 * Si no hay match pasamos como segundo argumento false (eso indica que no encontramos un usuario con esa data).
 * Opcionalmente podemos mandar como tercer argumento un mensaje de error
 */
const login = async (req, email, password, done) => {
  console.log('LOGIN!!');

  const user = await UserModel.findOne({ email });
  
  
  if (!user) return done(null, false, { mensaje: 'Usuario no encontrado' });
  const valipw= await user.isValidPassword(password);
  if (!valipw) return done(null, false, { mensaje: 'Usuario no encontrado' });
  console.log(user);
  return done(null, user);
};

/**
 * Recibimos el objeto request, el username y el password
 * Recibimos del body la info del nuevo usuario
 * Verificamos que el username o email no este tomado, caso contrario devolvemos false en done indicando que hubo un error
 * Creamos el usuario nuevo y devolvemos el usuario creado a done
 */
const signup = async (req, email, password, done) => {
  try {
    console.log("ENTRE")
    
    // Nota: Username y password no se verifica porque ya lo hace passport.
    if ( !email || !password) {
      console.log('Invalid body fields');
      return done(null, false, {message: 'Invalid Body Fields'});
    }

    const query = {
      $or: [{ email: email }],
    };

   
    const user = await UserModel.findOne(query);
    
    if (user) {
      console.log('User already exists');
      console.log(user);
      return done(null, false, {message: 'User already exists'});
    } else {
      const userData = {
        email,
        password,
      };

      const newUser = await UserModel.create(userData);
      console.log(newUser)
      return done(null, newUser);
    }
  } catch (error) {
    done(error);
  }
};

export const loginFunc = new LocalStrategy(strategyOptions, login);
export const signUpFunc = new LocalStrategy(strategyOptions, signup);


/**
 * Express-session crea un objeto session en la request
 * passport agrega a req.session un objeto llamado passport para guardar la info del usuario
 * Cuando llamamos a done en login o en signup y pasamos el usuario lo siguiente que ocurre es que se ejecuta passport.serializeUser
 * Esta funcion agarra el usuario que recibio y lo guarda en req.session.passport 
 * En este caso estamos creando una key llamado user con la info del usuario dentro de req.session.passport
 */
 passport.serializeUser((user, done) => {
  console.log('Se Ejecuta el serializeUser');
  done(null, user._id);
});

/**
 * DeserializeUser Permite tomar la info que mandamos con el serializeUser para hacer algun extra de busqueda de informacion
 */
 passport.deserializeUser((userId, done) => {
  console.log('Se Ejecuta el desserializeUser');
  UserModel.findById(userId).then((user) => {
    return done(null, user);
  })
});