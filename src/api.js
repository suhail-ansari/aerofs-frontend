const data = require('../fixtures/fakedata.json');

const MAX_TIME_TO_RESOLVE = 30000;

export function fetchMessages() {
  return Promise.resolve(data);
}

export function poll() {
  const message = Object.assign({}, 
    data.messages[parseInt(Math.random() * data.messages.length)]);
  message.timestamp = new Date().getTime();
  message.id = parseInt((Math.random() * 1000) * 2);
  message.last_edited ? (message.last_edited = new Date().getTime()) :  null;
  
  const timeToResolve = parseInt(MAX_TIME_TO_RESOLVE * Math.random());

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(message);
    }, timeToResolve);
  });
}