import React, {Component} from 'react'
import Card from './card.js'

export default class Library extends Component {
    constructor() {
        super()
        this.state = { 
            games: [],
            collected:undefined
        }
    }

    componentDidMount() {
        this.loadGames()
    }

    async loadGames() {
        const response = await fetch(`http://145.24.222.100:8000/games`, {
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
            <Card key={i} name={singleGame.name}/>
        )

        return (
            <div className="library">
                <div>
                    <button>Load next 5 games</button>
                </div>
                <div>
                    Collected: {videogames.length}
                </div>
                <div className="thumbnails">
                    {videogames}
                </div>
            </div>
        )   
    }
}