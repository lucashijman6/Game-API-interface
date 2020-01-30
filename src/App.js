import React from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css'
import Library from './components/library'
import EditGame from './components/editgame'
import CreateGame from './components/creategame'
import { render } from '@testing-library/react'

function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Library}/>
        <Route path="/edit/:id" component={EditGame}/>
        <Route path="/create" component={CreateGame}/>
      </div>
    </Router>
  );
}

export default App