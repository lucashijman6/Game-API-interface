import React from 'react'
import Axios from 'axios'

class CreateGame extends React.Component {
    constructor(props) {
        super(props)
        
        this.onChangeName = this.onChangeName.bind(this)
        this.onChangeCompany = this.onChangeCompany.bind(this)
        this.onChangeConsole = this.onChangeConsole.bind(this)
        this.onChangeRelease = this.onChangeRelease.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        
        this.state = {
            name: '',
            company: '',
            console: '',
            release: ''
        }
    }

    onChangeName(e) {
        this.setState({
            name: e.target.value
        })
    }

    onChangeCompany(e) {
        this.setState({
            company: e.target.value
        })
    }

    onChangeConsole(e) {
        this.setState({
            console: e.target.value
        })
    }

    onChangeRelease(e) {
        this.setState({
            release: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault()

        const newGame = {
            name: this.state.name,
            company: this.state.company,
            console: this.state.console,
            release: this.state.release
        }

        Axios.post(`http://145.24.222.100:8001/games`, newGame)
            .then(res => console.log(res.data))
        
        this.setState({
            name: '',
            company: '',
            console: '',
            release: ''
        })
    }

    render() {
        return(
            <div>
                <h3>Voeg een game toe aan de library.</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name: </label>
                        <input type="text" onChange={this.onChangeName}></input>
                    </div><div>
                        <label>Company: </label>
                        <input type="text" onChange={this.onChangeCompany}></input>
                    </div><div>
                        <label>Console: </label>
                        <input type="text" onChange={this.onChangeConsole}></input>
                    </div><div>
                        <label>Release: </label>
                        <input type="text" onChange={this.onChangeRelease}></input>
                    </div><div>
                        <input type="submit" value="Maak aan"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default CreateGame