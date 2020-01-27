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
                <select class="detailslijst">
                    <div class="titleprop"></div>
                    <option default hidden>{this.props.name}</option>
                    <option class="prop" disabled>Bedrijf: {this.props.company}</option>
                    <option class="prop" disabled>Console: {this.props.console}</option>
                    <option class="prop" disabled>Release date: {this.props.release}</option>
                </select>
                <button>edit</button>
            </div>
        )
    }
}

export default Card