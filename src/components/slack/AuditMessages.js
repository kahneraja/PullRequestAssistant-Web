import React, {Component} from 'react';

class AuditMessages extends Component {

    constructor(props) {
        super(props);
        this.state = {
          messages: []
        };
    }

    componentDidMount() {
        this.props.slackGateway.getAuditMessages().then((messages) => {
            this.setState({messages: messages})
        })
    }

    render() {
        return (
            <div >
                <h2>Messages</h2>
                <div>
                    {this.state.messages.map(message =>
                        <div key={message.id}>#{message.channel} @{message.message}</div>
                    )}
                </div>
            </div>
        )
    }
}

export default AuditMessages
