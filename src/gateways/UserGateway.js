class UserGateway {

    constructor(domain, jsonStore) {
        this.domain = domain
        this.jsonStore = jsonStore
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
        let url = `${this.domain}/users/${userId}/orgs`
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
        let url = `${this.domain}/slack/members`
        let token = this.jsonStore.get('slackToken')
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Slack-Token': token
            }
        }).then(response => {
            return response.json()
        })
    }

}

export default UserGateway