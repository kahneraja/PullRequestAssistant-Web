import React, {Component} from 'react';
import Home from "./Home";
import Charts from "./Charts";
import Authorize from "./github/Authorize";
import {Route, Switch} from "react-router-dom";
import Token from "./github/Token";

class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/charts' component={Charts}/>
                    <Route path='/github/authorize' component={Authorize}/>
                    <Route path='/github/token' component={Token}/>
                </Switch>
            </main>
        )
    }
}

export default Main
