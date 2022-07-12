
  const between = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };
  const random=(cantidad) => {
    const salida=[];
    for (let i = 0; i < cantidad; i++) {
        salida.push(between(1,1000))
      }
      return salida;
  }
  process.on('message', (cantidad) => {
    if (cantidad==0) 
    process.send(random(100000000));
    else
      process.send(random(cantidad));
    
  });
  