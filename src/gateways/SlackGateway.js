class SlackGateway {

    constructor(domain, clientId, clientSecret, jsonStore) {
        this.domain = domain
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.jsonStore = jsonStore
    }

    createToken(code) {
        let url = `${this.domain}/slack/token`
        let redirect_uri = `http://${window.location.host}/slack/authorization/token`
        let body = {
            'client_id': this.clientId,
            'client_secret': this.clientSecret,
            'code': code,
            'userId': this.jsonStore.get('id'),
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
                this.jsonStore.set('slackToken', JSON.stringify(response.slackToken))
            })
        })
    }


}

export default SlackGateway