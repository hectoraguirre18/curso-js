import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import Characters from './components/Characters.jsx';
import Details from './components/Details.jsx';

function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="characters" />
        <Route path="/characters" exact>
          <Characters/>
        </Route>
        <Route path="/character/:id" exact>
          <Details/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
