class GithubGateway {

    constructor(domain, jsonStore) {
        this.domain = domain
        this.jsonStore = jsonStore
    }

    createToken(code) {
        let url = `${this.domain}/github/tokens`
        let body = {
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
                this.jsonStore.set('id', JSON.stringify(response.id))
            })
        })
    }

    addOrg(org) {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/users/${userId}/orgs`
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(org)
        }).then(response => {
            return response.json()
        })
    }

    getOrgs() {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/users/${userId}/github/orgs`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
    }

    getMembers() {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/users/${userId}/github/members`
        return fetch(url, {
            method: 'GET',
        }).then(response => {
            return response.json()
        })
    }

}

export default GithubGateway