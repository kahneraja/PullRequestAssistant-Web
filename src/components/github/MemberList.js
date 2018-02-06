import React, {Component} from 'react';

class MemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            members: []
        };
    }

    componentDidMount() {
        this.props.userGateway.getOrgs().then((orgs) => {
            let org = orgs[0]
            this.props.gitHubGateway.getOrgMembers(org).then((members) => {
                this.setState({members: members})
            })
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
