import { Router } from 'express';
import os from 'os';
import { logger } from '../utils/loggers';
const router = Router();

router.get('/', async (req, res) => {
  
const numCPUs = os.cpus().length;
let data = {process1:[]}

  data.process1.push({
      argumentos: process.argv,
      so: process.platform,
      vnode: process.version,
      rss: JSON.stringify(process.memoryUsage().rss),
      path: process.title,
      id: process.pid,
      carpeta: process.cwd(),
      noPro: numCPUs
  })
  logger.error(JSON.stringify(data)) 
 res.render('info',data);
 
});



export default router;
