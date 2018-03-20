class AuditMessageGateway {

  constructor(domain, jsonStore) {
    this.domain = domain
    this.jsonStore = jsonStore
  }


  getMessages() {
    let userId = this.jsonStore.get('id')
    let url = `${this.domain}/audit_messages`
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'USER_ID': userId
      }
    }).then(response => {
      return response.json()
    })
  }

}

export default AuditMessageGateway