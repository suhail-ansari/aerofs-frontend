import React from 'react';
import Messenger from './index';
import { mount } from 'enzyme';
import { spy, stub } from 'sinon';

test('should initialize', () => {

  let promise = Promise.resolve({
    json: () => Promise.resolve({
      messages: [{
        "id": 11,
        "author": "alex",
        "timestamp": 1421953601859,
        "content": "i'm on like aleutian time these days :P",
        "last_edited": 1421953605859
      }]
    })
  });

  global.fetch = jest.fn(() => promise);

  let fetchMessagesSpy = spy(Messenger.prototype, 'fetchMessages');
  let sendMessageSpy = spy(Messenger.prototype, 'sendMessage');
  let handleInputTextChangeSpy = spy(Messenger.prototype, 'handleInputTextChange');
  let handleMessageEditSpy = spy(Messenger.prototype, 'handleMessageEdit');
  let editMessageSpy = spy(Messenger.prototype, 'editMessage');
  let exitEditModeSpy = spy(Messenger.prototype, 'exitEditMode');

  let wrapper = mount(
    <Messenger username={'Sam'} />
  );

  expect(wrapper.find('input')).toBeDefined();
  expect(wrapper.find('button')).toBeDefined();
  expect(fetchMessagesSpy.callCount).toEqual(1);

  let input = wrapper.find('input');
  let form = wrapper.find('form');
  let button = wrapper.find('button');

  setImmediate(() => {
    expect(wrapper.find('.message-bubble').length).toEqual(1);

    input.simulate('change', { target: { value: 'hello, world' } });
    expect(handleInputTextChangeSpy.calledOnce).toEqual(true);
    expect(input.props().value).toEqual('hello, world');

    form.simulate('submit', { preventDefault: () => { } });
    expect(sendMessageSpy.calledOnce).toEqual(true);

    expect(wrapper.find('.message-bubble').length).toEqual(2);

    let rightBubble = wrapper.find('.message-bubble.right');
    rightBubble.simulate('mouseover');
    
    let editTextButton = rightBubble.find('a.message-edit');
    editTextButton.simulate('click');
    
    wrapper.update();
    
    expect(handleMessageEditSpy.calledOnce).toEqual(true);

    expect(wrapper.find('blockquote').text()).toEqual(input.props().value);

    form.simulate('submit');

    expect(editMessageSpy.calledOnce).toEqual(true);

    rightBubble.simulate('mouseout');
    
    rightBubble.simulate('mouseover');
    editTextButton.simulate('click');

    let closeQuoteButton = wrapper.find('.glyphicon.glyphicon-remove');
    closeQuoteButton.simulate('click');

    expect(exitEditModeSpy.calledOnce).toEqual(true);

  });

});