import React, {Component} from 'react';

class RepoList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            repos: [],
        };
    }

    componentDidMount() {
        this.props.gitHubGateway.getRepos().then((repos) => {
            this.setState({repos: repos})
        })
    }

    render() {
        return (
            <div >
                Repositories...
                <div>
                    {this.state.repos.map(repo =>
                        <div key={repo.id}>{repo.name}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default RepoList
