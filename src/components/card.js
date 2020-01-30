import React from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id:this.props.id,
            name:this.props.name,
            company:this.props.company,
            console:this.props.console,
            release:this.props.release
        }
    }

    async componentDidMount() {
        const response = await fetch(this.props.url)
        const json = await response.json()
        this.setState({ name: json.name, company: json.company, console: json.console, release: json.release })
    }

    render() {
        return (
            <div className="card">
                <a className="popup"><span className="titleprop">{this.props.name}</span>
                    <div className="classic">
                        <div>
                            Company: {this.props.company}<br></br>
                            Console: {this.props.console}<br></br>
                            Release date: {this.props.release}
                        </div>
                    </div>
                </a><br></br><br></br>
                <Link className="edit" to="/edit/">edit</Link>
                <Link className="delete" to="/delete">delete</Link>
            </div>
        )
    }
}

export default Card