import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:this.props.name
        }
    }

    componentDidMount() {
        this.loadDetails()
    }

    async loadDetails() {
        const response = await fetch(this.props.url)
        const json = await response.json()
        this.setState({ name: json.name, company: json.company, console: json.console, release: json.release})
    }

    render() {
        return (
            <div class="card">
                <a class="popup" href><span class="titleprop">{this.props.name}</span>
                    <div class="classic">
                        <div>
                            Bedrijf: {this.props.company}<br></br>
                            Console: {this.props.console}<br></br>
                            Release date: {this.props.release}
                        </div>
                    </div>
                </a><br></br><br></br>
                <button class="edit">edit</button>
                <button class="delete">delete</button>
            </div>
        )
    }
}

export default Card