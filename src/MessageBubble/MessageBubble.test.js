import React from 'react';
import { shallow } from 'enzyme';
import MessageBubble from './index';

describe("<MessageBubble/>", () => {
  test("should render a MessageBubble component", () => {

    let message = {
      "id": 11,
      "author": "alex",
      "timestamp": 1421953601859,
      "content": "i'm on like aleutian time these days :P",
      "last_edited": 1421953605859
    };
    let onMessageEdit = jest.fn();

    let tree = shallow(
      <MessageBubble
        index={0}
        onMessageEdit={onMessageEdit}
        displayAuthor={false}
        message={message}
        position={'right'} />
    );

    let mainDiv = tree.find('.message-bubble.right');
    expect(mainDiv).toBeDefined();

    mainDiv.simulate('mouseover');
    tree.update();
    expect(tree.state().hoveredOver).toEqual(true);

    let editLink = tree.find('a.message-edit');
    expect(editLink).toBeDefined();
    expect(editLink.text()).toEqual('Edit');

    editLink.simulate('click');
    expect(onMessageEdit.mock.calls.length).toEqual(1);

    mainDiv.simulate('mouseout');
    tree.update();
    expect(tree.state().hoveredOver).toEqual(false);

  });
});