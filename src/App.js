import React, {Component} from 'react';
import './App.css';
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";
import Chart3 from "./Chart3";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metrics: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:9000/metrics').then(response => {
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
                <div>
                    <Chart3 metrics={this.state.metrics}></Chart3>
                </div>
            </div>
        );
    }
}

export default App;
