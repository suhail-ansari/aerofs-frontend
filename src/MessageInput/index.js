import React from 'react';

export default ({ text, onInputChange, onSendMessage }) => {
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      onSendMessage();
    }}>
      <div className="form-group">
        <div className="input-group">
          <input
            placeholder="Type a message and press enter to send"
            className="form-control"
            value={text}
            onChange={onInputChange} />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Send</button>
          </span>
        </div>
      </div>
    </form>
  );
}
