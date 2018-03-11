import React, {Component} from 'react';
import Chart1 from "./Chart1";
import Chart2 from "./Chart2";

class Charts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            metrics: [],
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_DOMAIN}/stats`).then(response => {
            response.json().then((json) => {
                this.setState({metrics: json})
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Chart1 metrics={this.state.metrics}></Chart1>
                </div>
                <div>
                    <Chart2 metrics={this.state.metrics}></Chart2>
                </div>
            </div>
        )
    }
}

export default Charts
