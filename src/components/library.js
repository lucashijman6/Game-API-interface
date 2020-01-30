import React, {Component} from 'react'
import Card from './card.js'
import { Link } from 'react-router-dom'

export default class Library extends Component {
    constructor() {
        super()
        this.state = { 
            games: []
        }
    }

    async componentDidMount() {
        let start = 1
        const response = await fetch(`http://145.24.222.100:8001/games?start=` + start + `&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        this.setState({games: json.items})
    }

    async componentDidUpdate() {
        let start = 1
        const response = await fetch(`http://145.24.222.100:8001/games?start=` + start + `&limit=5`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        const json = await response.json()
        this.setState({games: json.items})
    }

    render() {
        let videogames = this.state.games.map((singleGame, i) =>
            <Card key={i} name={singleGame.name} company={singleGame.company} console={singleGame.console} release={singleGame.release}/>
        )

        return (
            <div className="library">
                <div className="thumbnails">
                    <ul>{videogames}</ul>
                </div>
                <div>
                    <Link to="/create">Nieuwe game</Link>
                    <button className="button">Load previous 5 games</button>
                    <button className="button">Load next 5 games</button>
                </div>
            </div>
        )   
    }
}