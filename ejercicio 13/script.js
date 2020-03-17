const hacerTarea = (tarea, callback) => {
  console.log(`Haciendose p3ndejo y fingiendo que hace la tarea de ${tarea}...`);
  setTimeout(()=>{
    console.log('Tarea \"terminada\"');
    callback();
  }, 3000);
}

hacerTarea("Derecho informatico", ()=>{
  console.log("Ahora pedaaaaaaaa ");
});

