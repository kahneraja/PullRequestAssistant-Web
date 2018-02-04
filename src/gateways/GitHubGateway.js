class GitHubGateway {

    constructor(domain, clientId, clientSecret, jsonStore) {
        this.domain = domain
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.jsonStore = jsonStore
    }

    auth(code) {
        let url = `${this.domain}/auth`
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
            response.json().then((auth) => {
                this.jsonStore.set('auth', JSON.stringify(auth));
            })
        })
    }

    getOrgs() {
        let token = this.jsonStore.get('auth').githubToken
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

}

export default GitHubGateway