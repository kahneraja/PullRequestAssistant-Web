class UserGateway {

    constructor(domain, jsonStore) {
        this.domain = domain
        this.jsonStore = jsonStore
    }

    addOrg(org) {
        console.log(org)
        let userId = this.jsonStore.get('auth')._id
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

}

export default UserGateway