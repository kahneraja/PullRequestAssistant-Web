import React, {Component} from 'react';

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }

    componentDidMount() {
        this.props.gitHubGateway.getMembers().then((members) => {
            this.setState({members: members})
        })
    }

    render() {
        return (
            <div >
                <h2>Members</h2>
                <div>
                    {this.state.members.map(member =>
                        <div key={member.id}>{member.login}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default MemberList
