import React, {Component} from 'react'
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import _ from 'lodash'

class Chart1 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            options: {},
        }
    }

    render() {
        return (
            <div className="Chart1">
                {this.buildChart()}
            </div>
        )
    }

    buildChart() {

        if (this.props.metrics.length) {
            return this.renderChart(this.props.metrics)
        }

    }

    renderChart(pullRequests) {
        let dates = _.chain(pullRequests)
            .map((pullRequest) => {
                return pullRequest.closed
            })
            .uniqBy((closed) => {
                return closed
            })
            .sortBy((closed) => {
                return closed
            })
            .value()

        let data = _.chain(dates).map((date) => {

            let createdPullRequests = _.chain(pullRequests)
                .filter((pullRequest) => {
                        return pullRequest.created === date
                    }
                )
                .value()

            let closedPullRequests = _.chain(pullRequests)
                .filter((pullRequest) => {
                        return pullRequest.closed === date
                    }
                )
                .value()

            let totalHours = _.chain(closedPullRequests)
                .map((pullRequest) => {
                    return pullRequest.hours
                })
                .sum()
                .value()

            let averageHours = parseInt(totalHours / closedPullRequests.length);

            return {
                date: date,
                created: createdPullRequests.length,
                approved: closedPullRequests.length,
                hours: averageHours
            }

        }).value()

        return (
            <div className="App-chart">
                <div><strong>Pull Request Time Metrics</strong></div>
                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>

                    <LineChart data={data}>
                        <Line name={"Approved"} type="monotone" dataKey="approved" stroke="#1D9DFC" strokeWidth={3}
                              dot={false} legendType={"rect"} yAxisId="A"/>
                        <Line name={"Hours in review"} type="monotone" dataKey="hours" stroke="#FC416A" strokeWidth={3}
                              dot={false} legendType={"rect"} yAxisId="B"/>
                        <Line name={"Created"} type="monotone" dataKey="created" stroke="#DDDDDD" strokeWidth={3}
                              dot={false} legendType={"rect"} yAxisId="C"/>
                        <Tooltip/>
                        <XAxis dataKey="date" hide={true}/>
                        <YAxis yAxisId="A" hide={true}/>
                        <YAxis yAxisId="B" hide={true}/>
                        <YAxis yAxisId="C" hide={true}/>
                        <Legend position="top" verticalAlign="top"/>
                    </LineChart>

                </ResponsiveContainer>
            </div>
        )

    }
}

export default Chart1
