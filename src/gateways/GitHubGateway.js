class GitHubGateway {

    constructor(domain, clientId, clientSecret, jsonStore) {
        this.domain = domain
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.jsonStore = jsonStore
    }

    createToken(code) {
        let url = `${this.domain}/github/token`
        let body = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'code': code
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(response => {
            response.json().then((response) => {
                this.jsonStore.set('gitHubToken', JSON.stringify(response.gitHubToken))
                this.jsonStore.set('id', JSON.stringify(response._id))
            })
        })
    }

    getOrgs() {
        let token = this.jsonStore.get('gitHubToken')
        let url = `https://api.github.com/user/orgs`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`
            }
        }).then(response => {
            return response.json()
        })
    }

    getOrgMembers(org) {
        let token = this.jsonStore.get('gitHubToken')
        let url = `${org.url}/members?per_page=100`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `token ${token}`
            }
        }).then(response => {
            return response.json()
        })
    }

}

export default GitHubGateway