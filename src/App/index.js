import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MessageInput from '../MessageInput';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      error: '',
      text: '',
      messages: [],
      last_seen: 0
    };

    this.sendHandler = this.sendMessage.bind(
      this,
      { key: 'Enter' }
    );
    this.sendMessage = this.sendMessage.bind(this);
    this.updateText = this.updateText.bind(this);
    this._updateMessages = this._updateMessages.bind(this);
    this._handleError = this._handleError.bind(this);

    this.getMessages();
  }

  getMessages() {
    fetch('/fixtures/fakedata.json')
      .then(res => res.json())
      .then(this._updateMessages)
      .catch(this._handleError);
  }

  _updateMessages(data) {
    this.setState({
      ...this.state,
      messages: [
        ...data.messages,
        ...this.state.messages
      ]
    });
  }

  _handleError(err) {
    this.setState({
      ...this.state,
      error: 'There was an error while fetching messages.'
    });
  }

  updateText({ target }) {
    this.setState({
      ...this.state,
      text: target.value
    });
  }

  sendMessage({ key }) {
    if (key == 'Enter' && this.state.text !== '') {
      console.log(this.state);
    }
  }

  render() {
    return (
      <MessageInput
        text={this.state.text}
        changeHandler={this.updateText}
        keyUpHandler={this.sendMessage}
        sendHandler={this.sendHandler} />
    );
  }

}