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

    getRepos(org) {
        this.props.gitHubGateway.getRepos(org).then((repos) => {
            this.setState({repos: repos})
        })
    }

    render() {
        return (
            <div >
                <h2>Organizations</h2>
                <div>
                    {this.state.orgs.map(org =>
                        <div key={org.id} onClick={() => this.getRepos(org.login)}>{org.login}</div>
                    )}
                </div>
                <h2>Repositories</h2>
                <div>
                    {this.state.repos.map(repo =>
                        <div key={repo.id}>{repo.full_name}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default OrgList
