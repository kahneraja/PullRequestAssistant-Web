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
            })
        })
    }

    autoPair() {
        let contributors = []
        _.each(this.state.githubMembers, (githubMember) => {
            _.each(this.state.slackMembers, (slackMember) => {
                if (githubMember && slackMember) {
                    if (githubMember.name === slackMember.real_name) {
                        let contributor = {
                            github_member: githubMember,
                            slack_member: slackMember
                        }
                        contributors.push(contributor)
                    }
                }
            })
        })

        _.each(contributors, (contributor) => {
            this.clearGithubMember(contributor.github_member)
            this.clearSlackMember(contributor.slack_member)
        })

        this.setState({contributors: contributors})
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

    save() {
        let contributors = this.state.contributors.map(contributor => {
            return {
                github_name: contributor.github_member.login,
                slack_name: contributor.slack_member.name
            }
        })
        this.props.contributorGateway.save(contributors).then(() => {
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <div>
                <h2>contributors</h2>
                <div onClick={() => this.autoPair()}>Auto Pair</div>
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
                                    <div key={contributor.github_member.login}>@{contributor.github_member.login} -
                                        @{contributor.slack_member.name}</div>
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
                <div onClick={() => this.save()}>Save</div>
            </div>
        )
    }
}

export default Mapping
