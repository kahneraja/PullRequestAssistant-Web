import React, {Component} from 'react';
import './App.css';
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metrics: [],
        };
    }

    componentDidMount() {
        fetch('http://stash-pull-request-assistant.herokuapp.com/metrics').then(response => {
            response.json().then((json) => {
                this.setState({metrics: json})
            })
        })
    }

    render() {
        return (
            <div className="App">
                <div>
                    <Chart1 metrics={this.state.metrics}></Chart1>
                </div>
                <div>
                    <Chart2 metrics={this.state.metrics}></Chart2>
                </div>
            </div>
        );
    }
}

export default App;
