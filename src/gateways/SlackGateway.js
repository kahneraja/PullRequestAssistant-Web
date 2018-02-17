class SlackGateway {

    constructor(domain, clientId, clientSecret, jsonStore) {
        this.domain = domain
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.jsonStore = jsonStore
    }

    createToken(code) {
        let url = `${this.domain}/slack/tokens`
        let redirect_uri = `http://${window.location.host}/slack/authorization/token`
        let body = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'code': code,
            'id': this.jsonStore.get('id'),
            'redirect_uri': redirect_uri
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
                this.jsonStore.set('slackToken', JSON.stringify(response.slack_token))
            })
        })
    }

    getMembers() {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/users/${userId}/slack/members`
        return fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            return response.json()
        })
    }

}

export default SlackGateway