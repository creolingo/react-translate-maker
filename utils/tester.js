import jsdom from 'jsdom';
import TestUtils from 'react-addons-test-utils';
import React from 'react';

function renderComponent(react, props) {
  global.document = jsdom.jsdom('<!DOCTYPE html><html><body></body></html>');
  global.window = global.document.parentWindow;

  const rendered = TestUtils.renderIntoDocument(React.createElement(react, props));

  return TestUtils.findRenderedComponentWithType(rendered, react);
}

export function renderJSX(jsx, context, node) {
  return renderComponent(React.createClass({
    displayName: 'TestJSX',
    render: () => jsx,
  }), undefined, context);
}
