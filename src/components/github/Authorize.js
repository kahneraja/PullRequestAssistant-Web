import React, {Component} from 'react'

class Authorize extends Component {
    render() {
        let client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
        let redirect_uri = `http://${window.location.host}/github/token`
        let authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,read:org,read:user&redirect_uri=${redirect_uri}`
        return (
            <div>
                <a href={authorizeUrl}>Authorize with GitHub</a>
            </div>
        )
    }
}

export default Authorize
