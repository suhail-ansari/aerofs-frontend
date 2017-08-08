import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import MessageInput from '../MessageInput';
import MessageList from '../MessageList';

import { guid } from '../utils';

import './Messenger.css';

import * as api from '../api.js';

export default class Messenger extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editMessage: {
        text: '',
        id: ''
      },
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
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleFetchSuccess = this.handleFetchSuccess.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.handleMessageEdit = this.handleMessageEdit.bind(this);
    this.handleErrorDismiss = this.handleErrorDismiss.bind(this);
    this.exitEditMode = this.exitEditMode.bind(this);
    this.fetchMessages = this.fetchMessages.bind(this);
    this.startPolling = this.startPolling.bind(this);
  }

  componentDidMount() {
    /**
     * fetch previous messages & start polling for new messages
     */
    this.fetchMessages();
    this.startPolling();
  }

  _sortMessages(messages) {
    return (
      [...messages].sort((a, b) => a.timestamp > b.timestamp)
    );
  }

  startPolling() {
    api.poll()
      .then(message => {
        let messages = this._sortMessages([
          ...this.state.messages,
          message
        ]);
        this.setState({
          ...this.state,
          messages
        });
        setImmediate(() => {
          this.startPolling();
        });
      })
      .catch(this.handleFetchError);
  }

  fetchMessages() {
    api.fetchMessages()
      .then(this.handleFetchSuccess)
      .catch(this.handleFetchError);
  }

  handleFetchSuccess(data) {
    let messages = this._sortMessages([
      ...data.messages,
      ...this.state.messages
    ]);
    this.setState({
      ...this.state,
      messages
    });
  }

  handleFetchError() {
    this.setState({
      ...this.state,
      error: 'There was an error while fetching messages.'
    });
  }

  handleInputTextChange({ target }) {
    this.setState({
      ...this.state,
      text: target.value
    });
  }

  handleMessageEdit(id) {
    let message = this.state.messages.find((_message) => _message.id === id);
    this.setState({
      ...this.state,
      text: message.content,
      editMode: true,
      editMessage: {
        text: message.content,
        id
      }
    });
  }

  handleErrorDismiss() {
    this.setState({
      ...this.state,
      error: ''
    });
  }

  sendMessage() {
    if (this.state.text !== '') {
      let newMessageId = guid();
      this.setState({
        ...this.state,
        text: '',
        messages: [
          ...this.state.messages,
          {
            id: newMessageId,
            author: this.props.username,
            timestamp: new Date().getTime(),
            content: this.state.text
          }
        ]
      });
    }
  }

  editMessage(id) {
    if (this.state.text !== '') {
      let messages = this.state.messages.map((_message) => {
        if (_message.id === id) {
          _message.content = this.state.text;
          _message.last_edited = new Date().getTime();
        }
        return _message;
      });
      this.setState({
        ...this.state,
        messages,
        text: '',
        editMode: false,
        editMessage: {
          text: '',
          id: ''
        }
      });
    }
  }

  exitEditMode() {
    this.setState({
      ...this.state,
      text: '',
      editMode: false,
      editMessage: {
        text: '',
        index: -1
      }
    });
  }

  render() {

    let containerClass = `col-lg-8 col-md-8 col-sm-12 col-xs-12 col-lg-offset-2 col-md-offset-2 messenger-container`;
    containerClass = `${containerClass} ${this.state.editMode ? 'quote-open' : ''}`;

    return (
      <div className={containerClass}>
        <div className="messenger-header">
          <h4>React Chat</h4>
        </div>
        <div className="message-list-container">
          <MessageList
            username={this.props.username}
            messages={this.state.messages}
            onMessageEdit={this.handleMessageEdit} />
        </div>
        <div className="message-input-container">
          {
            this.state.editMode ?
              <div className="previous-message-container">
                <blockquote>
                  <p>{this.state.editMessage.text}</p>
                </blockquote>
                <span className="glyphicon glyphicon-remove" onClick={this.exitEditMode}></span>
              </div>
              : null
          }
          <MessageInput
            text={this.state.text}
            onInputChange={this.handleInputTextChange}
            onSendMessage={this.state.editMode ? this.editMessage.bind(this, this.state.editMessage.id) : this.sendMessage} />
        </div>
        {
          this.state.error ?
            (
              <div className="alert alert-danger error-message">
                <a href="#" className="close" onClick={this.handleErrorDismiss}>&times;</a>
                {this.state.error}
              </div>
            )
            : null
        }
      </div>
    );
  }

}