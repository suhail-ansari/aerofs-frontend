import React, { Component } from 'react';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
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
      <div className="container-fluid" style={{marginTop: "10%"}}>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 col-lg-offset-3 col-md-offset-3">
            <div className="jumbotron">
              <div className="panel panel-default">
                <div className="panel-body">
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <h5>Enter name to login</h5>
                      <div className="input-group">
                        <input type="text" className="form-control" value={this.state.name} onChange={this.handleChange} />
                        <span className="input-group-btn">
                          <button className="btn btn-default" type="submit">Submit</button>
                        </span>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    );
  }
}
