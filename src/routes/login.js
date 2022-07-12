import { errorMonitor } from 'connect-mongo';
import { Router } from 'express';
import passport from 'passport';
import { validarLogin } from '../middlewares/validaLogin';

const router = Router();


const passportOptions = { badRequestMessage: 'Falta email / password' };

router.get('/', validarLogin, async (req, res) => {
    console.log(req.user.email)
    const data = {info:[]}
  
      data.info.push({
          nombre: req.user.email,
        })
        console.log(data)
    res.render('main',data);
   
  });
/* --------- LOGIN ---------- */
router.get('/login', (req, res) => {
    res.render('login')
  });
  
/*router.post('/login',passport.authenticate('login', passportOptions),(req, res) => {
  res.redirect('/');
  
},
);*/

router.post('/login',passport.authenticate('login',{
  successRedirect: '/',
  failureRedirect:'/login-error'
}))


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      res.redirect('/');
    });
  });
  
  router.get('/register', (req, res) => {
    res.render('register');
  });
  
  router.post('/register', (req, res,next) => {
    passport.authenticate('signup', passportOptions, (err, user, info) => {
      console.log('Info SIGNUP');
      console.log(err, user, info);
      if (err) {
        return next(err);
      }
      if (!user) return res.render('signup-error', {});
  
      res.redirect('/');
    })(req, res, next);
  });

  router.get('/login-error', (req, res) => {
    res.render('login-error')
  });
  export default router;
  