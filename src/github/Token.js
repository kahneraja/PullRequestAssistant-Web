import React, {Component} from 'react'
import QueryString from 'query-string'

class Token extends Component {

    constructor(props) {
        super(props);
        this.state = {
            token: "",
        };
    }

    componentDidMount() {
        let queryString = QueryString.parse(this.props.location.search)
        let domain = process.env.REACT_APP_API_DOMAIN
        let client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
        let client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
        let url = `${domain}/auth`
        let body = {
            'client_id': client_id,
            'client_secret': client_secret,
            'code': queryString.code
        }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then((auth) => {
                localStorage.setItem('auth', JSON.stringify(auth));
                this.props.history.push("/");
            })
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
