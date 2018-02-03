import React, {Component} from 'react';
import Home from "./components/Home";
import Charts from "./components/Charts";
import Authorize from "./components/github/Authorize";
import {Route, Switch} from "react-router-dom";
import Token from "./components/github/Token";
import JsonStore from "./JsonStore";
import GitHubGateway from "./gateways/GitHubGateway";
import RepoList from "./components/github/RepoList";

class Main extends Component {
    render() {

        let jsonStore = new JsonStore()
        let gitHubGateway = new GitHubGateway(
            process.env.REACT_APP_API_DOMAIN,
            process.env.REACT_APP_GITHUB_CLIENT_ID,
            process.env.REACT_APP_GITHUB_CLIENT_SECRET,
            jsonStore
        )

        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/charts' component={Charts}/>
                    <Route path='/github/authorize' component={Authorize}/>
                    <Route path='/github/token' component={(props) =>
                        <Token {...props} gitHubGateway={gitHubGateway}/>
                    }/>
                    <Route path='/github/repo-list' component={(props) =>
                        <RepoList {...props} gitHubGateway={gitHubGateway}/>
                    }/>
                </Switch>
            </main>
        )
    }
}

export default Main
