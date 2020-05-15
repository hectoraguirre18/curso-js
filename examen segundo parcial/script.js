const urlLocal = new URL(window.location.href);
const search_params = urlLocal.searchParams;
const page = search_params.get('page') || 1;

const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
const ts = '1';
const apiKey = '37ddbe23c01f96a51f7935d4c8113bef';
const hash = 'bb79e8bd2b92a9c26d96b1755ea936d2';

const characterCount = 40;

const url = `${baseUrl}?limit=${characterCount}&offset=${(parseInt(page)-1)*characterCount}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

if(parseInt(page) > 1)
  document.getElementById('lastPageBtn').className = 'btn btn-primary';

const detalle = fetch(url)
  .then(response => response.json().then(chars => {
    document.getElementById('page').innerHTML = `Page ${page} of ${Math.ceil(chars.data.total*1.0/characterCount)}`
    if(parseInt(page) == Math.ceil(chars.data.total*1.0/characterCount))
      document.getElementById('nextPageBtn').className = 'btn btn-primary invisible';
    let items = '';
    chars.data.results.forEach(character => {
      let id = character.id;
      let name = character.name;
      let description = character.description;
      let thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`

      let item = charToListItem({
        id: character.id,
        name:  character.name,
        description: character.description,
        thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`
      })

      items = items.concat(item)
    })

    const listaHtml = document.getElementById('lista');
    listaHtml.innerHTML = items;
  }))
  .catch(err => console.error(err))

function charToListItem(char) {
  return `<a class="container-fluid list-group-item list-group-item-action character-list-item rounded-md" href="detalle.html?id=${char.id}${page > 1 ? `&page=${page}` : ''}">
      <div class="row align-items-center">
          <div class="col thumbnail">
              <img class="rounded-sm" src="${char.thumbnail}" width="75" height="75">
          </div>
          <div class="col" style="margin-left: 16px;">
              <div class="row">
                  <h4>${char.name}</h4>
              </div>
              <div class="row">
                  <small>${char.description || 'No description available'}</small>
              </div>
              <div class="row" style="margin-top: 12px;">
                  <small>Id: ${char.id}</small>
              </div>
          </div>
      </div>
  </div>`;
}

function lastPage() {
  const url = new URL(window.location.href);
  if(parseInt(page) > 2)
    url.search = `?page=${parseInt(page)-1}`;
  else
    url.search = '';
  location.href = url.toString()
}

function nextPage() {
  const url = new URL(window.location.href);
  url.search = `?page=${parseInt(page)+1}`;
  location.href = url.toString()
}