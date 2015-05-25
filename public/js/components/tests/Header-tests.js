/* 
* @Author: Mark Bennett
* @Date:   2015-05-23 15:41:07
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-05-25 11:53:19
*/

'use strict';


jest.dontMock('../Header.js');

describe('Header', function() {
  it('exists on the DOM', function() {
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;
    var stubRouterContext = require('./utils/stubRouterContext');
    var Header = require('../Header.js');
    // var Subject = stubRouterContext(Header);
    var component; 
    beforeEach(function() {
      component = TestUtils.renderIntoDocument( <Header /> );
    });
    var node = TestUtils.scryRenderedDOMComponentsWithClass(
      component, 'welcome-header');
    // expect(isDOMComponent(node));
  });
});