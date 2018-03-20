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
import SlackGateway from "./gateways/SlackGateway"
import GithubMemberList from "./components/github/MemberList"
import SlackMemberList from "./components/slack/MemberList"
import Mapping from "./components/contributors/Mapping";
import ContributorGateway from "./gateways/ContributorGateway";
import BroadcastMessage from "./components/slack/BroadcastMessage";
import AuditMessages from "./components/slack/AuditMessages";

class Main extends Component {
  render() {

    let jsonStore = new JsonStore()
    let githubGateway = new GithubGateway(
      process.env.REACT_APP_API_DOMAIN,
      jsonStore
    )
    let slackGateway = new SlackGateway(
      process.env.REACT_APP_API_DOMAIN,
      jsonStore
    )
    let contributorGateway = new ContributorGateway(
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
            <GithubMemberList {...props} githubGateway={githubGateway}/>
          }/>
          <Route path='/github/orgs' component={(props) =>
            <OrgList {...props} githubGateway={githubGateway}/>
          }/>
          <Route path='/slack/authorization/grant' component={SlackAuthorizationGrant}/>
          <Route path='/slack/authorization/token' component={(props) =>
            <SlackAuthorizationToken {...props} slackGateway={slackGateway}/>
          }/>
          <Route path='/slack/members' component={(props) =>
            <SlackMemberList {...props} slackGateway={slackGateway}/>
          }/>
          <Route path='/slack/broadcast-message' component={(props) =>
            <BroadcastMessage {...props} slackGateway={slackGateway}/>
          }/>
          <Route path='/slack/audit-messages' component={(props) =>
            <AuditMessages {...props} slackGateway={slackGateway}/>
          }/>
          <Route path='/contributors/mapping' component={(props) =>
            <Mapping {...props}
                     slackGateway={slackGateway}
                     githubGateway={githubGateway}
                     contributorGateway={contributorGateway}
            />
          }/>
        </Switch>
      </main>
    )
  }
}

export default Main
