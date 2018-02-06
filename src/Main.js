import React, {Component} from 'react'
import Home from "./components/Home"
import Charts from "./components/Charts"
import GitHubAuthorizationGrant from "./components/github/authorization/Grant"
import GitHubAuthorizationToken from "./components/github/authorization/Token"
import SlackAuthorizationGrant from "./components/slack/authorization/Grant"
import SlackAuthorizationToken from "./components/slack/authorization/Token"
import {Route, Switch} from "react-router-dom"
import JsonStore from "./JsonStore"
import GitHubGateway from "./gateways/GitHubGateway"
import OrgList from "./components/github/OrgList"
import UserGateway from "./gateways/UserGateway"
import SlackGateway from "./gateways/SlackGateway"
import OrgMemberList from "./components/github/OrgMemberList";

class Main extends Component {
    render() {

        let jsonStore = new JsonStore()
        let gitHubGateway = new GitHubGateway(
            process.env.REACT_APP_API_DOMAIN,
            process.env.REACT_APP_GITHUB_CLIENT_ID,
            process.env.REACT_APP_GITHUB_CLIENT_SECRET,
            jsonStore
        )
        let slackGateway = new SlackGateway(
            process.env.REACT_APP_API_DOMAIN,
            process.env.REACT_APP_SLACK_CLIENT_ID,
            process.env.REACT_APP_SLACK_CLIENT_SECRET,
            jsonStore
        )
        let userGateway = new UserGateway(
            process.env.REACT_APP_API_DOMAIN,
            jsonStore
        )

        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/charts' component={Charts}/>
                    <Route path='/github/authorization/grant' component={GitHubAuthorizationGrant}/>
                    <Route path='/github/authorization/token' component={(props) =>
                        <GitHubAuthorizationToken {...props} gitHubGateway={gitHubGateway}/>
                    }/>
                    <Route path='/github/orgs/members' component={(props) =>
                        <OrgMemberList {...props}
                                       gitHubGateway={gitHubGateway}
                                       userGateway={userGateway}
                        />
                    }/>
                    <Route path='/github/orgs' component={(props) =>
                        <OrgList {...props}
                                 gitHubGateway={gitHubGateway}
                                 userGateway={userGateway}
                        />
                    }/>
                    <Route path='/slack/authorization/grant' component={SlackAuthorizationGrant}/>
                    <Route path='/slack/authorization/token' component={(props) =>
                        <SlackAuthorizationToken {...props} slackGateway={slackGateway}/>
                    }/>
                </Switch>
            </main>
        )
    }
}

export default Main
