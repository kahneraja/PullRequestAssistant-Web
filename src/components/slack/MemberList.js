import React, {Component} from 'react';

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }

    componentDidMount() {
        this.props.userGateway.getSlackMembers().then((members) => {
            this.setState({members: members})
        })
    }

    render() {
        return (
            <div >
                <h2>Members</h2>
                <div>
                    {this.state.members.map(member =>
                        <div key={member.id}>{member.profile.real_name} @{member.real_name}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default MemberList
