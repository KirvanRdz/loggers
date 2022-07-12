import { Router } from 'express';
import { fork } from 'child_process';
import path from 'path';
import { PORT } from '../main';
const router = Router();
const scriptPath = path.resolve(__dirname, '../utils/random.js');
router.get('/randoms', async (req, res) => {
  let {cant}= req.query;
  if (!cant)
    cant=0;
  console.log(cant)
  const computo = fork(scriptPath);
  computo.send(cant);
  computo.on('message', (sum) => {
  var repetidos = {};

sum.forEach(function(numero){
  repetidos[numero] = (repetidos[numero] || 0) + 1;
});
console.log(repetidos);
    res.json({
      puerto: PORT,
      resultado: repetidos,
    });
  });
 
});



export default router;
