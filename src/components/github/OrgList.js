import React, {Component} from 'react';

class OrgList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orgs: [],
            repos: [],
        };
    }

    componentDidMount() {
        this.props.gitHubGateway.getOrgs().then((orgs) => {
            this.setState({orgs: orgs})
        })
    }

    addRepo(org) {
        this.props.userGateway.addOrg(org).then(() => {
            this.props.history.push("/")
        })
    }

    render() {
        return (
            <div >
                <h2>Organizations</h2>
                <div>
                    {this.state.orgs.map(org =>
                        <div key={org.id} onClick={() => this.addRepo(org)}>{org.login}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default OrgList
