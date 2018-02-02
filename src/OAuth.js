import React, {Component} from 'react'

class OAuth extends Component {
    render() {
        let code = this.getParameterByName("code")
        let domain = process.env.REACT_APP_API_DOMAIN
        let client_id = process.env.REACT_APP_GITHUB_CLIENT_ID
        let client_secret = process.env.REACT_APP_GITHUB_CLIENT_SECRET
        if (code) {

            let url = `${domain}/auth`
            let body = {
                'client_id': client_id,
                'client_secret': client_secret,
                'code': code
            }

            fetch(url, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                response.json().then((json) => {
                    console.log(json.access_token)
                })
            })
        }

        let authorizeUrl = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,read:org,read:user&redirect_uri=${window.location.href}`

        return (
            <div>
                <a href={authorizeUrl}>Authorize with GitHub</a>
            </div>
        )
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href
        name = name.replace(/[\[\]]/g, "\\$&")
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url)
        if (!results) return null
        if (!results[2]) return ''
        return decodeURIComponent(results[2].replace(/\+/g, " "))
    }

}

export default OAuth
