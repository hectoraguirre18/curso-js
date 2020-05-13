const url = `https://jsonplaceholder.typicode.com/posts/`
const detalle = fetch(url)
  .then(response => response.json())
  .then(posts => {
    const lista = posts.map(post =>
      `<a href="detalle.html?id=${post.id}" class="list-group-item list-group-item-action">${post.id} ${post.title} </a>`).join('')
    const listaHtml = document.getElementById('lista');
    listaHtml.innerHTML = lista;
  })