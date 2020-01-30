import React from 'react'
import Axios from 'axios'

class EditGame extends React.Component {
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

    componentDidMount() {
        Axios.get('http://145.24.222.100:8001/games/' + this.props.match.params.id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    company: response.data.company,
                    console: response.data.console,
                    release: response.data.release
                })
            })
            .catch(function(error) {
                console.log(error)
            })
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
        const updatedGame = {
            name: this.state.name,
            company: this.state.company,
            console: this.state.console,
            release: this.state.release
        }
        Axios.put(`http://145.24.222.100:8001/games/` + this.props.match.params.id, updatedGame)
            .then(res => console.log(res.data))
        
        this.props.history.push('/')
    }

    render() {
        return(
            <div>
                <h3>Bewerk deze game</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                        <label>Name: </label>
                        <input type="text" value={this.state.name} onChange={this.onChangeName}></input>
                    </div><div>
                        <label>Company: </label>
                        <input type="text" value={this.state.company} onChange={this.onChangeCompany}></input>
                    </div><div>
                        <label>Console: </label>
                        <input type="text" value={this.state.console} onChange={this.onChangeConsole}></input>
                    </div><div>
                        <label>Release: </label>
                        <input type="text" value={this.state.release} onChange={this.onChangeRelease}></input>
                    </div><div>
                        <input type="submit" value="Update game"></input>
                    </div>
                </form>
            </div>
        )
    }
}

export default EditGame