import React, {Component} from 'react'
import QueryString from 'query-string'

class Token extends Component {

    componentDidMount() {
        let queryString = QueryString.parse(this.props.location.search)
        this.props.gitHubGateway.createToken(queryString.code).then(() => {
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <div>
                Resolving auth...
            </div>
        )
    }

}

export default Token
