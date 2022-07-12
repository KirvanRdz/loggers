
import { initDb } from './services/db';
import serverApp from './services/server';
import { initWsServer } from './services/socket';
import Server from './services/server';
import minimist from 'minimist';
import cluster from 'cluster';
import os from 'os';
//import { DBService } from './services/dbChat';

const init = async () => {
    await initDb();
    
    if (modo=='CLUSTER' && cluster.isPrimary) {
      console.log(`NUMERO DE CPUS ===> ${numCPUs}`);
      console.log(`PID MASTER ${process.pid}`);
    
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }
    
      cluster.on('exit', (worker, code) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} at ${Date()}`);
        cluster.fork();
      });
    } else {
      /* --------------------------------------------------------------------------- */
      /* WORKERS */
      
      const io = initWsServer(Server);
      serverApp.listen(args.port, () => console.log(
        `Servidor express escuchando en el puerto ${args.port} - PID WORKER ${process.pid}`
      ));
    }
    
   
    
  };
  //DBService.init();
  const optionalArgsObject = {
    alias: {
      //Para pasar un alias a los argumentos que nos envian
      h: 'help',
      v: 'version',
      x: 'mialiasPersonalizado',
      m: 'message',
    },
    default: {
      //Si no nos envian el argumento, se setea por default
      port: 8080,
      modo: 'FORK',
    },
  };

  const args = minimist(process.argv,optionalArgsObject);
  const modo= args.modo
  export const PORT=args.port;
  //Obtengo el numero de nucleos disponibles en mi PC
  const numCPUs = os.cpus().length;
  console.log(args);
  init();