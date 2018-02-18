import React, {Component} from 'react'

class Grant extends Component {
    render() {
        let client_id = process.env.REACT_APP_SLACK_CLIENT_ID
        let redirect_uri = `${window.location.host}/slack/authorization/token`
        let authorizeUrl = `https://slack.com/oauth/authorize?client_id=${client_id}&scope=chat:write:bot,users:read&redirect_uri=${redirect_uri}`
        return (
            <div>
                <div>
                    <a href={authorizeUrl}>Authorize with Slack</a>
                </div>

            </div>
        )
    }
}

export default Grant
