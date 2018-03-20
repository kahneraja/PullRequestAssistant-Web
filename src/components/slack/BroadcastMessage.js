import React, {Component} from 'react';

class BroadcastMessage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isSent: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target)
    this.props.slackGateway.broadcastMessage(data.get('channel'), data.get('message'))
    this.setState({isSent: true})
  }

  render() {
    return (
      <div>
        <h2>Message</h2>
        {!this.state.isSent ? (
          <div>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label htmlFor="channel">channel</label>
                <input id="channel" name="channel" type="text"/>
              </div>
              <div>
                <label htmlFor="message">message</label>
                <input id="message" name="message" type="text"/>
              </div>
              <div>
                <button>Send</button>
              </div>
            </form>
          </div>
        ) : (
          <div>Yay!</div>
        )}
      </div>
    )
  }
}

export default BroadcastMessage
