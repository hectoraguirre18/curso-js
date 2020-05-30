import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

const Details = () => {
  const {id} = useParams()

  const urlLocal = new URL(window.location.href);
  const search_params = urlLocal.searchParams;
  const page = search_params.get('page');

  const baseUrl = 'http://gateway.marvel.com/v1/public/characters'
  const ts = '1';
  const apiKey = '37ddbe23c01f96a51f7935d4c8113bef';
  const hash = 'bb79e8bd2b92a9c26d96b1755ea936d2';

  const url = `${baseUrl}/${id}?ts=${ts}&apikey=${apiKey}&hash=${hash}`;

  const [card, setCard] = useState((<div/>));
  const [comics, setComics] = useState(([]));

  useEffect(() => {
    getDetails()
  }, []);

  const getDetails = () => {
    fetch(url)
    .then(response => response.json().then(result => {
      let data = result.data.results[0];
      setCard(charToCard(data));
      setComics(data.comics.items.map(comic => (
        <ListGroup.Item key={comic.name}>{comic.name}</ListGroup.Item>
      )));
    }))
    .catch(err => console.error(err))
  }

  return (
    <Container>
      <Row>
        <div>
          <Col>
            <Button variant="primary" href={`/characters${page ? `?page=${page}` : ''}`} style={{marginTop: "8px", marginBottom: "19px"}}>Go back</Button>
            {card}
          </Col>
        </div>
        <div>
          <Col style={{marginLeft: "12px"}}>
            <h1 >Comic Appearances</h1>
            <ListGroup>
              {comics}
            </ListGroup>
          </Col>
        </div>
      </Row>
    </Container>
  )
}

function charToCard(char) {
  let modified = new Date(char.modified);
  let now = new Date();
  let diff = (now - modified)/(1000*60*60*24);
  let timeTag = Math.floor(diff) > 1 ? 'days' : 'day';
  if(diff > 30){
      diff /= 30;
      timeTag = Math.floor(diff) > 1 ? 'months' : 'month';
      if(diff > 12) {
          diff /= 12;
          timeTag = Math.floor(diff) > 1 ? 'years' : 'year';
      }
  }
  diff = Math.floor(diff);

  return (
    <Card style={{width: "18rem"}}>
      <img src={`${char.thumbnail.path}.${char.thumbnail.extension}`} alt="" className="card-img-top"/>
      <Card.Body>
        <h5 className="card-title">{char.name}</h5>
        <Card.Text style={{textAlign: "justify"}}>{char.description || 'No description available'}</Card.Text>
        <span style={{fontSize: "x-small"}}>Character Id: {char.id}</span>
      </Card.Body>
      <Card.Footer className="text-muted">Modified: {diff} {timeTag} ago</Card.Footer>
    </Card>
  );
}

export default Details
