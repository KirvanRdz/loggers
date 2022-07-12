const admin = true;

export const validarLogin = (req, res, done) => {

  console.log('Is Authenticated')
  console.log(req.isAuthenticated())
  if (!req.isAuthenticated()) return res.redirect('/login');

  done();
};
