import React, {Component} from 'react';

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }

    componentDidMount() {
        this.props.slackGateway.getMembers().then((response) => {
            this.setState({members: response.members})
        })
    }

    render() {
        return (
            <div >
                <h2>Members</h2>
                <div>
                    {this.state.members.map(member =>
                        <div key={member.id}>{member.profile.real_name} @{member.name}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default MemberList
