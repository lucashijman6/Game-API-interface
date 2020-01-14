import React from 'react'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name:this.props.name
        }
    }

    componentDidMount() {
        
    }

    async loadDetails() {
        const response = await fetch(this.props.url)
        const json = await response.json()
        this.setState({ name: json.name, company: json.company, console: json.console, release: json.release})
    }

    render() {
        return (
            <div>
                Titel: {this.props.name}
            </div>
        )
    }
}

export default Card