import { Router } from 'express';
import { ProductosFakerController } from '../controller/productos_faker';
import { validarAdmin } from '../middlewares/funcion1';
const router = Router();

router.get('/', validarAdmin, async (req, res) => {
  console.log('LLEGO REQUEST GET PRODUCTOS');
  const productos = await ProductosFakerController.getAll();
  console.log(productos)
  res.render('main',productos);
 
});



export default router;
