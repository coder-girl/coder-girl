/* 
* @Author: Mark Bennett
* @Date:   2015-05-23 15:41:07
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-23 16:45:07
*/

'use strict';

var React = require('react/addons');
var CheckboxWithLabel = require('../Header.js');
var TestUtils = React.addons.TestUtils;
var stubRouterContext = require('utils/stubRouterContext');

var Subject = stubRouterContext(CheckboxWithLabel);

jest.dontMock('../Header.js');
describe('Header', function() {
  it('changes the text after click', function() {

    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <Subject labelOn="On" labelOff="Off" />
    );

    // Verify that it's Off by default
    var label = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'label');
    expect(label.getDOMNode().textContent).toEqual('Off');

    // Simulate a click and verify that it is now On
    var input = TestUtils.findRenderedDOMComponentWithTag(
      checkbox, 'input');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('On');
    TestUtils.Simulate.change(input);
    expect(label.getDOMNode().textContent).toEqual('Off');
  });
});