const urlLocal = new URL(window.location.href);
const search_params = urlLocal.searchParams;
const id = search_params.get('id');

const url = `https://jsonplaceholder.typicode.com/posts/${id}`
const detalle = fetch(url)
  .then(response => response.json())
  .then(post => {
      document.getElementById('id').innerHTML = `Post ${post.id}. Posted by: ${post.userId}`;
      document.getElementById('title').innerHTML = post.title;
      document.getElementById('body').innerHTML = post.body;
      document.getElementById('loading').innerHTML = '';
      document.getElementById('card').style = 'visibility: visible;';
  })