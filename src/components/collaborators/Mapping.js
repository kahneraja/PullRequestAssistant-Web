import React, {Component} from 'react';
import {Col, Grid, Row} from "react-bootstrap";

class Mapping extends Component {

    constructor(props) {
        super(props);
        this.state = {
            githubMembers: [],
            slackMembers: []
        }
    }

    componentDidMount() {
        this.props.githubGateway.getMembers().then((members) => {
            this.setState({githubMembers: members})
        })
        this.props.slackGateway.getMembers().then((members) => {
            this.setState({slackMembers: members})
        })
    }

    render() {
        return (
            <div>
                <h2>Collaborators</h2>
                <Grid>
                    <Row className="show-grid">
                        <Col xs={6}>
                            <div>SLACK</div>
                            {
                                this.state.slackMembers.map(member =>
                                    <div key={member.id}>{member.profile.real_name} @{member.real_name}</div>
                                )
                            }
                        </Col>
                        <Col xs={6}>
                            <div>GITHUB</div>
                            {
                                this.state.githubMembers.map(member =>
                                    <div key={member.id}>{member.name} @{member.login}</div>
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
