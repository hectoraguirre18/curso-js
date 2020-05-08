const obtenerClima = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Clima soleado: 30°C")
    }, 4000)
  })
}

const obtenerTrafico = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Poquillo trafico")
    }, 3000)
  })
}

const PlanViaje = async () => {
  try {
    const clima = obtenerClima()
    const trafico = obtenerTrafico()
    const plan = await Promise.all([clima, trafico])
    return plan
  } catch (error) {
    throw error
  }
}

PlanViaje()
  .then(infoPlan => {
    console.log(infoPlan)
  })
  .catch(error => {
    console.error(error)
  })