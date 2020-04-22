const limpiarCuarto = () => {
  return new Promise((resolve, reject) => {
    console.log("Limpiando cuarto...")
    setTimeout(() => {
      console.log("Cuarto limpio!")
      resolve(hacerTarea())
    }, 1000)
  })
}

const hacerTarea = () => {
  return new Promise((resolve, reject) => {
    console.log("Haciendo tarea...")
    setTimeout(() => {
      console.log("Tarea hecha!")
      resolve(salirDeAntro())
    }, 1000)
  })
}

const salirDeAntro = () => {
  return new Promise((resolve, reject) => {
    console.log("Saliendo de antro...")
    setTimeout(() => {
      resolve("Llegamos al antro! A bailar!")
    }, 1000)
  })
}

limpiarCuarto()
.then(res => {
  return res;
})
.then(res => {
  return res;
})
.then(res => {
  console.log(res)
})