const pagarComida = new Promise((resolve, reject) => {
  setTimeout(async () => {
    let proveedorPago = await Promise.race([paypal, tarjeta])
    resolve({done: true, proveedorPago, clienteId: 45613})
  }, 3000)
})

const paypal = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Paypal")
  }, 3000)
})

const tarjeta = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Tarjeta")
  }, 2000)
})

pagarComida.then((result) => {
  console.log(result)
})