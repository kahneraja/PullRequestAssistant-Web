import React, {Component} from 'react';

class OrgMemberList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgs: []
        };
    }

    componentDidMount() {
        this.props.userGateway.getOrgs().then((orgs) => {
            this.setState({orgs: orgs})
        })
    }

    render() {
        return (
            <div >
                <h2>Members</h2>
            </div>
        )
    }
}

export default OrgMemberList
