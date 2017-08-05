import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor() {
    this.state = { name: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      name: target.value
    });
  }

  handleSubmit(event) {
    if (this.state.name) {
      this.props.onNameEnter(this.state.name);
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <div className="panel panel-default">
            <div className="panel-body">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <div className="input-group">
                    <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} />
                    <span class="input-group-btn">
                      <button class="btn btn-default" type="submit">Submit</button>
                    </span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
