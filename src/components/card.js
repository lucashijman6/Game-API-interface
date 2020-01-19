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
                <div class="prop">{this.props.name}</div>
                <div class="prop">{this.props.company}</div>
                <div class="prop">{this.props.console}</div>
                <div class="prop">{this.props.release}</div>
            </div>
        )
    }
}

export default Card