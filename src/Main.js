import React, {Component} from 'react'
import Home from "./components/Home"
import Charts from "./components/Charts"
import GithubAuthorizationGrant from "./components/github/authorization/Grant"
import GithubAuthorizationToken from "./components/github/authorization/Token"
import SlackAuthorizationGrant from "./components/slack/authorization/Grant"
import SlackAuthorizationToken from "./components/slack/authorization/Token"
import {Route, Switch} from "react-router-dom"
import JsonStore from "./JsonStore"
import GithubGateway from "./gateways/GithubGateway"
import OrgList from "./components/github/OrgList"
import UserGateway from "./gateways/UserGateway"
import SlackGateway from "./gateways/SlackGateway"
import GithubMemberList from "./components/github/MemberList"
import SlackMemberList from "./components/slack/MemberList"
import Mapping from "./components/collaborators/Mapping";

class Main extends Component {
    render() {

        let jsonStore = new JsonStore()
        let githubGateway = new GithubGateway(
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
                    <Route path='/github/authorization/grant' component={GithubAuthorizationGrant}/>
                    <Route path='/github/authorization/token' component={(props) =>
                        <GithubAuthorizationToken {...props} githubGateway={githubGateway}/>
                    }/>
                    <Route path='/github/members' component={(props) =>
                        <GithubMemberList {...props}
                                          githubGateway={githubGateway}
                                          userGateway={userGateway}
                        />
                    }/>
                    <Route path='/github/orgs' component={(props) =>
                        <OrgList {...props}
                                 githubGateway={githubGateway}
                                 userGateway={userGateway}
                        />
                    }/>
                    <Route path='/slack/authorization/grant' component={SlackAuthorizationGrant}/>
                    <Route path='/slack/authorization/token' component={(props) =>
                        <SlackAuthorizationToken {...props} slackGateway={slackGateway}/>
                    }/>
                    <Route path='/slack/members' component={(props) =>
                        <SlackMemberList {...props}
                                         slackGateway={slackGateway}
                        />
                    }/>
                    <Route path='/collaborators/mapping' component={(props) =>
                        <Mapping {...props}
                                 slackGateway={slackGateway}
                                 githubGateway={githubGateway}
                        />
                    }/>
                </Switch>
            </main>
        )
    }
}

export default Main
