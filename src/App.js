import React, {Component} from 'react';
import './App.css';
import OAuth from "./OAuth";
import Charts from "./Charts";

class App extends Component {
    render() {
        return (
            <div className="App">
                <div>
                    <OAuth></OAuth>
                </div>
                <div>
                    <Charts></Charts>
                </div>
            </div>
        )
    }
}

export default App;
