import React, {Component} from 'react'
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import _ from 'lodash'

class Chart2 extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {},
            options: {},
        }
    }

    render() {
        return (
            <div>
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
        let changeCountList = _.chain(pullRequests)
            .map((pullRequest) => {
                return this.roundToNearest(pullRequest.changes)
            })
            .uniqBy((changeCount) => {
                return changeCount
            })
            .sortBy((changeCount) => {
                return changeCount
            })
            .value()

        let data = _.chain(changeCountList).map((changeCount) => {

            let createdPullRequests = _.chain(pullRequests)
                .filter((pullRequest) => {
                        return this.roundToNearest(pullRequest.changes) === changeCount
                    }
                )
                .value()

            let totalHours = _.chain(createdPullRequests)
                .map((pullRequest) => {
                    return pullRequest.hours
                })
                .sum()
                .value()

            let averageHours = parseInt(totalHours / createdPullRequests.length, 10);


            let totalComments = _.chain(createdPullRequests)
                .map((pullRequest) => {
                    return pullRequest.comments
                })
                .sum()
                .value()

            let averageComments = parseInt(totalComments / createdPullRequests.length, 10);

            return {
                changeCount: changeCount,
                created: createdPullRequests.length,
                comments: averageComments,
                hours: averageHours
            }


        }).value()

        return (
            <div className="App-chart">
                <div><strong>Pull Request Size Metrics</strong></div>
                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                    <LineChart data={data}>
                        <Line name="Created" type="monotone" dataKey="created" stroke="#DDDDDD" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="C"/>
                        <Line name="Comments" type="monotone" dataKey="comments" stroke="#5bab43" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="D"/>
                        <Line name="Changes" type="monotone" dataKey="changeCount" stroke="#1D9DFC" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="A"/>
                        <Line name="Hours in review" type="monotone" dataKey="hours" stroke="#FC416A" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="B"/>
                        <Tooltip/>
                        <XAxis hide={true}/>
                        <YAxis yAxisId="A" hide={true}/>
                        <YAxis yAxisId="B" hide={true}/>
                        <YAxis yAxisId="C" hide={true}/>
                        <YAxis yAxisId="D" hide={true}/>
                        <Legend position="top" verticalAlign="top"/>
                    </LineChart>

                </ResponsiveContainer>
            </div>
        )

    }

    roundToNearest(num) {
        return Math.round(num / 200.0) * 200
    }
}

export default Chart2
