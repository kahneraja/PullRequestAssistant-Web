class ContributorGateway {

    constructor(domain, jsonStore) {
        this.domain = domain
        this.jsonStore = jsonStore
    }

    save(contributors) {
        let userId = this.jsonStore.get('id')
        let url = `${this.domain}/contributors`
        let body = {
            contributors: contributors
        }
        return fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'User-Id': userId
            },
            body: JSON.stringify(body)
        }).then(response => {
            return response
        })
    }
}

export default ContributorGateway