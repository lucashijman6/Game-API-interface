import React, { Component } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import axios from 'axios'
import FormTitle from './components/FormTitle'

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
      createGameModal: false,
      editGameModal: false
    }
  }

  // Game aanmaken
  onChangeName(e) {
    console.log("Verander naam")
    this.setState({
      name: e.target.value
    })
  }

  onChangeCompany(e) {
    console.log("Verander bedrijf")
    this.setState({
      company: e.target.value
    })
  }

  onChangeConsole(e) {
    console.log("Verander console")
    this.setState({
      console: e.target.value
    })
  }

  onChangeRelease(e) {
    console.log("Verander releasedatum")
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

    console.log("Nieuwe game aanmaken")

    axios.post(`http://145.24.222.100:8001/games`, newGame).then((response) => {
      this.setState({
        name: '',
        company: '',
        console: '',
        release: ''
      })
      this.autoReloadGames()
    })

    this.toggleCreateGameModal()
  }
  
  // Collectie laden
  componentWillMount() {
    console.log("ComponentWillMount")

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
    console.log("Verwijder game")

    axios.delete('http://145.24.222.100:8001/games/' + _id).then((response) => {
      this.autoReloadGames()
    })
  }

  // Te bewerken item inladen
  editGame(_id, name, company, console, release) {
    console.log("Laad game informatie in")

    this.setState({
      editGameData: { _id, name, company, console, release }, editGameModal: ! this.state.editGameModal
    })
  }

  // Item updaten
  updateGame() {
    console.log("Bewerk game")

    let { name, company, console, release } = this.state.editGameData

    axios.put('http://145.24.222.100:8001/games/' + this.state.editGameData._id, {
      name, company, console, release 
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }}).then((response) => {
      this.autoReloadGames()
    })
  }

  toggleCreateGameModal() {
    console.log("Toggle create game modal")

    this.setState({
      createGameModal: !this.state.createGameModal
    })
  }

  toggleEditGameModal() {
    console.log("Toggle edit game modal")

    this.setState({
      editGameModal: !this.state.editGameModal
    })
  }

  // Interface gelijk updaten na CRUD actie
  autoReloadGames() {
    console.log("Automatisch games herladen")

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
      return (
        <tr key={game._id}>
          <td>
          <p><a class="popup" href="/">{game.name}<span class="classic">Company: {game.company}<br></br>Console: {game.console}<br></br>Release: {game.release}</span></a></p></td>
          <td>
            <Button color="warning" size="sm" className="mr-2" onClick={this.editGame.bind(this, game._id, game.name, game.company, game.console, game.release)}>Edit</Button>
            <Button color="danger" size="sm" onClick={this.deleteGame.bind(this, game._id)}>Delete</Button>
          </td>
        </tr>
      )
    })

    return (
      <div>
        <Button className="mt-3 ml-3" color="primary" onClick={this.toggleCreateGameModal.bind(this)}>Nieuw spel</Button>

        {/* Display game library */}
        {games}

        {/* Create game modal */}
        <Modal isOpen={this.state.createGameModal} toggle={this.toggle}>
          <ModalHeader>
            <FormTitle value={"Nieuw spel"} />
          </ModalHeader>
          <ModalBody>
            <Form formTitle="Nieuw spel" onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label for="game_name" sm={3}>Name</Label>
                <Col sm={9}>
                  <Input type="text" name="game_name" id="game_name" onChange={this.onChangeName}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="game_company" sm={3}>Campany</Label>
                <Col sm={9}>
                  <Input type="text" name="game_company" id="game_company" onChange={this.onChangeCompany}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="game_console" sm={3}>Console</Label>
                <Col sm={9}>
                  <Input type="text" name="game_console" id="game_console" onChange={this.onChangeConsole}/>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="game_release" sm={3}>Release date</Label>
                <Col sm={9}>
                  <Input type="date" name="game_release" id="game_release" onChange={this.onChangeRelease}/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.onSubmit.bind(this)}>Aanmaken</Button>
            <Button color="danger" onClick={this.toggleCreateGameModal.bind(this)}>Annuleren</Button>
          </ModalFooter>
        </Modal>

        {/* Edit game modal */}
        <Modal isOpen={this.state.editGameModal} toggle={this.toggleEditGameModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditGameModal.bind(this)}></ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="game_name" sm={3}></Label>
                <Col cm={9}>
                  <Input type="text" name="edit_game_name" id="game_name" value={this.state.editGameData.name} onChange={(e) => {
                  let { editGameData } = this.state
                  editGameData.name = e.target.value
                  this.setState({ editGameData })
                }}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="game_company" sm={3}></Label>
                <Col cm={9}>
                  <Input type="text" name="game_company" id="game_company" value={this.state.editGameData.company} onChange={(e) => {
                  let { editGameData } = this.state
                  editGameData.company = e.target.value
                  this.setState({ editGameData })
                }}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="game_console" sm={3}></Label>
                <Col cm={9}>
                  <Input type="text" name="game_console" id="game_console" value={this.state.editGameData.console} onChange={(e) => {
                  let { editGameData } = this.state
                  editGameData.console = e.target.value
                  this.setState({ editGameData })
                }}/>
                </Col>
              </FormGroup>
              <FormGroup>
                <Label for="game_release" sm={3}></Label>
                <Col cm={9}>
                  <Input type="date" name="game_release" id="game_release" value={this.state.editGameData.release} onChange={(e) => {
                  let { editGameData } = this.state
                  editGameData.release = e.target.value
                  this.setState({ editGameData })
                }}/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.updateGame.bind(this)}>Bijwerken</Button>
            <Button onClick={this.toggleEditGameModal.bind(this)}>Annuleren</Button>
          </ModalFooter>
        </Modal>
      </div>
    )};
}

export default App;