import React, {Component} from 'react'
import {Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import _ from 'lodash'

class Chart3 extends Component {

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
        let commentCountList = _.chain(pullRequests)
            .map((pullRequest) => {
                return pullRequest.comments
            })
            .uniqBy((commentCount) => {
                return commentCount
            })
            .sortBy((commentCount) => {
                return commentCount
            })
            .value()

        let data = _.chain(commentCountList).map((commentCount) => {

            let createdPullRequests = _.chain(pullRequests)
                .filter((pullRequest) => {
                        return pullRequest.comments === commentCount
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

            return {
                commentCount: commentCount,
                created: createdPullRequests.length,
                hours: averageHours
            }


        }).value()

        console.log(data)

        return (
            <div className="App-chart">
                <div><strong>Pull Request Size Metrics</strong></div>
                <ResponsiveContainer width='100%' aspect={4.0 / 2.0}>
                    <LineChart data={data}>
                        <Line name="Comments" type="monotone" dataKey="commentCount" stroke="#1D9DFC" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="A"/>
                        <Line name="Hours in review" type="monotone" dataKey="hours" stroke="#FC416A" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="B"/>
                        <Line name="Created" type="monotone" dataKey="created" stroke="#DDDDDD" strokeWidth={3}
                              dot={false} legendType="rect" yAxisId="C"/>
                        <Tooltip/>
                        <XAxis hide={true}/>
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

export default Chart3
