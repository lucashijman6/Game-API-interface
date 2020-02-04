import React, { Component } from 'react'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    
    this.onChangeName = this.onChangeName.bind(this)
    this.onChangeCompany = this.onChangeCompany.bind(this)
    this.onChangeConsole = this.onChangeConsole.bind(this)
    this.onChangeRelease = this.onChangeRelease.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    
    this.state = {
      games: [],
      name: '',
      company: '',
      console: '',
      release: '',
      editGameData: {
        name: '',
        company: '',
        console: '',
        release: ''
      },
      editGameModal: false
    }
  }

  // Game aanmaken
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

    axios.post(`http://145.24.222.100:8001/games`, newGame).then((response) => {
      this.setState({
        name: '',
        company: '',
        console: '',
        release: ''
      })
      this.autoReloadGames()
    })
  }
  
  // Collectie laden
  componentWillMount() {
    axios.get('http://145.24.222.100:8001/games', {
      headers: {
        'Accept':'application/json'
      }
    }).then((response) => {
      this.setState({
        games:response.data.items
      })
    })
  }

  // Item verwijderen
  deleteGame(_id) {
    axios.delete('http://145.24.222.100:8001/games/' + _id).then((response) => {
      this.autoReloadGames()
    })
  }

  // Item updaten
  editGame(_id, name, company, console, release) {
    this.setState({
      editGameData: { _id, name, company, console, release }, editGameModal: ! this.state.editGameModal
    })
  }

  updateGame() {
    let { name, company, console, release } = this.state.editGameData
    axios.put('http://145.24.222.100:8001/games/' + this.state.editGameData._id, {
      name, company, console, release 
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }).then((response) => {
      this.autoReloadGames()
    })
  }

  toggleEditGameModal() {
    this.setState({
      editGameModal: ! this.state.editGameModal
    })
  }

  // Interface gelijk updaten na CRUD actie
  autoReloadGames() {
    axios.get('http://145.24.222.100:8001/games', {
      headers: {
        'Accept':'application/json'
      }
    }).then((response) => {
      this.setState({
        games:response.data.items
      })
    })
  }

  // Interface rendering
  render() {
    let games = this.state.games.map((game) => {
      return(
        <tr key={game._id}>
          <td>
          <p><a class="popup" href="/">{game.name}<span class="classic">Company: {game.company}<br></br>Console: {game.console}<br></br>Release: {game.release}</span></a></p></td>
          <td>
            <Button color="success" size="sm" className="mr-2" onClick={this.editGame.bind(this, game._id, game.name, game.company, game.console, game.release)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteGame.bind(this, game._id)}>Delete</Button>
          </td>
        </tr>
      )
    })
    return (
      <div>
        {/*Return de library*/}
        {games}<br></br><br></br>

        {/*Return de aanmaakform*/}
        <form onSubmit={this.onSubmit}>
          <h3>Voeg een game toe</h3>
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
          </div><div><br></br>
            <input type="submit" value="Maak aan"></input>
          </div>
        </form>

        {/* Return de updateform*/}
        <Modal isOpen={this.state.editGameModal} toggle={this.toggleEditGameModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditGameModal.bind(this)}></ModalHeader>
          <ModalBody>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>Name: </label>
              <input type="text" value={this.state.editGameData.name} onChange={(e) => {
                let { editGameData } = this.state
                editGameData.name = e.target.value
                this.setState({ editGameData })
              }}></input>
            </div><div>
              <label>Company: </label>
              <input type="text" value={this.state.editGameData.company} onChange={(e) => {
                let { editGameData } = this.state
                editGameData.company = e.target.value
                this.setState({ editGameData })
              }}></input>
            </div><div>
              <label>Console: </label>
              <input type="text" value={this.state.editGameData.console} onChange={(e) => {
                let { editGameData } = this.state
                editGameData.console = e.target.value
                this.setState({ editGameData })
              }}></input>
            </div><div>
              <label>Release: </label>
              <input type="text" value={this.state.editGameData.release} onChange={(e) => {
                let { editGameData } = this.state
                editGameData.release = e.target.value
                this.setState({ editGameData })
              }}></input>
            </div>
          </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.updateGame.bind(this)}>Update</Button>
            <Button onClick={this.toggleEditGameModal.bind(this)}>Annuleer</Button>
          </ModalFooter>
        </Modal>
      </div>
    )};
}

export default App;