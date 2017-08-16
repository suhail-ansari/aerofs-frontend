const data = require('../fixtures/fakedata2.json');
import { guid } from './utils';

const MAX_TIME_TO_RESOLVE = 30000;

export function fetchMessages() {
  return Promise.resolve(data);
}

export function poll() {
  const timeToResolve = parseInt(MAX_TIME_TO_RESOLVE * Math.random());

  return new Promise(resolve => {
    setTimeout(() => {
      const message = Object.assign({},
        data.messages[parseInt(Math.random() * data.messages.length)]
      );
      message.timestamp = new Date().getTime();
      message.id = guid();
      message.last_edited ? (message.last_edited = new Date().getTime()) : null;

      console.log('Receiving Message from \'Server\':', message);

      resolve(message);
    }, timeToResolve);
  });
}
