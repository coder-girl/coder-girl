/* 
* @Author: nimi
* @Date:   2015-05-22 11:26:24
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-22 12:06:42
*/

'use strict';

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleViewAction = function(action){
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  })
};

AppDispatcher.handleServerAction = function(action){
  this.dispatch({
    source: 'SERVER_ACTION',
    action: action
  })
};
 module.exports = AppDispatcher;
