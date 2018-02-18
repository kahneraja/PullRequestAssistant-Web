import React, {Component} from 'react'
import {Col, Grid, Row} from "react-bootstrap"
import _ from 'lodash'

class Mapping extends Component {

    constructor(props) {
        super(props)
        this.state = {
            githubMembers: [],
            slackMembers: [],
            contributors: []
        }
    }

    componentDidMount() {
        this.props.githubGateway.getMembers().then((members) => {
            this.setState({githubMembers: members})
            this.props.slackGateway.getMembers().then((members) => {
                this.setState({slackMembers: members})
                this.autoPair()
            })
        })
    }

    autoPair() {
        _.each(this.state.githubMembers, (githubMember) => {
            _.each(this.state.slackMembers, (slackMember) => {
                if (githubMember && slackMember){
                    if (githubMember.name === slackMember.real_name) {
                        this.addGithubContributor(githubMember)
                        this.addSlackContributor(slackMember)
                    }
                }
            })

        })
    }

    addGithubContributor(member) {
        let contributors = this.state.contributors
        contributors.push({
            github_name: member.login
        })
        this.setState({contributors: contributors})
        this.clearGithubMember(member)
    }

    addSlackContributor(member) {
        let contributors = this.state.contributors
        let last = _.last(contributors)
        last.slack_name = member.name
        this.setState({contributors: contributors})
        this.clearSlackMember(member)
    }

    clearGithubMember(member) {
        let members = this.state.githubMembers
        _.remove(members, function (m) {
            return m.login === member.login
        });
        this.setState({githubMembers: members})
    }

    clearSlackMember(member) {
        let members = this.state.slackMembers
        _.remove(members, function (m) {
            return m.name === member.name
        });
        this.setState({slackMembers: members})
    }

    render() {
        return (
            <div>
                <h2>contributors</h2>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={4}>
                            <div>GITHUB</div>
                            {
                                this.state.githubMembers.map(member =>
                                    <div key={member.id}
                                         onClick={() => this.addGithubContributor(member)}>{member.name} @{member.login}</div>
                                )
                            }
                        </Col>
                        <Col xs={4}>
                            <div>Contributors</div>
                            {
                                this.state.contributors.map(contributor =>
                                    <div key={contributor.github_name}>@{contributor.github_name} -
                                        @{contributor.slack_name}</div>
                                )
                            }
                        </Col>


                        <Col xs={4}>
                            <div>SLACK</div>
                            {
                                this.state.slackMembers.map(member =>
                                    <div key={member.id}
                                         onClick={() => this.addSlackContributor(member)}>{member.real_name} @{member.name}</div>
                                )
                            }
                        </Col>
                    </Row>
                </Grid>

            </div>
        )
    }
}

export default Mapping
