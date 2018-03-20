class SlackGateway {

    constructor(domain, jsonStore) {
        this.domain = domain
        this.jsonStore = jsonStore
    }

    createToken(code) {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/users/${userId}/slack/tokens`
        let redirect_uri = `${window.location.protocol}//${window.location.host}/slack/authorization/token`
        let body = {
            'code': code,
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
            return response.json()
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

    broadcastMessage(channel, message) {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/slack/broadcast_message`
        let body = {
            'user_id': userId,
            'message': message,
            'channel': channel
        }

        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }

}

export default SlackGateway