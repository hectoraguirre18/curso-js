import React, {useEffect, useState} from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

const Characters = () => {
  const urlLocal = new URL(window.location.href);
  const search_params = urlLocal.searchParams;
  const page = parseInt(search_params.get('page')) || 1;

  const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
  const ts = '1';
  const apiKey = '37ddbe23c01f96a51f7935d4c8113bef';
  const hash = 'bb79e8bd2b92a9c26d96b1755ea936d2';

  const characterCount = 40;

  const url = `${baseUrl}?limit=${characterCount}&offset=${(page-1)*characterCount}&ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  const [pageCount, setPageCount] = useState(null);
  const [characterList, setCharacterList] = useState([]);

  useEffect(() => {
    getCharacters()
  }, []);

  const getCharacters = () => {
    fetch(url)
    .then(response => response.json().then(chars => {
      setPageCount(Math.ceil(chars.data.total*1.0/characterCount))
      let items = chars.data.results.map(character => charToListItem(character, page))
      setCharacterList(items);
    }))
    .catch(err => console.error(err))
  }

  let lastPageBtn = pageCount !== null && page > 1
    ? (<Button href={`/characters?page=${page-1}`}>Last Page</Button>)
    : (<div></div>);

  let nextPageBtn = pageCount === null || page === pageCount
    ? (<div></div>)
    : (<Button href={`/characters?page=${page+1}`}>Next Page</Button>);

  return (
    <div>
      <div className="row align-items-center" style={{margin: "12px"}}>
        <img src="https://logos-download.com/wp-content/uploads/2018/07/Marvel_logo_red.png"  alt="" height="64"/>
        <h1 style={{marginLeft: "12px", display: "inline"}}>List of Characters</h1>
      </div>
      <div className="row align-items-end" style={{margin: "16px"}}>
        {lastPageBtn}
        <div className="flex-grow-1"></div>
        <h5 id="page" style={{color: "#e7e7e7"}}>Page {page} of {pageCount}</h5>
        <div className="flex-grow-1"></div>
        {nextPageBtn}
      </div>
      <ListGroup id="lista" style={{borderRadius: "10px"}}>
        {characterList}
      </ListGroup>
    </div>
  )
}

const charToListItem = (character, page) => {
  let id = character.id;
  let name = character.name;
  let description = character.description;
  let thumbnail = `${character.thumbnail.path}.${character.thumbnail.extension}`

  return (
    <a href={`/character/${id}${page ? `?page=${page}` : ''}`} className="container-fluid list-group-item list-group-item-action rounded-md" key={id} style={{backgroundColor: "#00264D", cursor: "pointer", margin: "4px"}}>
      <div className="row align-items-center">
        <div className="thumbnail">
          <img className="rounded-sm" src={thumbnail} alt="" width="75" height="75"/>
        </div>
        <Col style={{marginLeft: "16px"}}>
          <Row>
            <h4>{name}</h4>
          </Row>
          <Row>
            <small>{description || 'No description available'}</small>
          </Row>
          <Row style={{marginTop: "12px"}} >
            <small>Id: {id}</small>
          </Row>
        </Col>
      </div>
    </a>
  );
}

export default Characters