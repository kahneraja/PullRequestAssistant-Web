import React, {Component} from 'react'

class Grant extends Component {
    render() {
        let client_id = process.env.REACT_APP_SLACK_CLIENT_ID
        let redirect_uri = `http://${window.location.host}/slack/authorization/token`
        let authorizeUrl = `https://slack.com/oauth/authorize?client_id=${client_id}&scope=post,read&redirect_uri=${redirect_uri}`
        return (
            <div>
                <a href={authorizeUrl}>Authorize with Slack</a>
            </div>
        )
    }
}

export default Grant
