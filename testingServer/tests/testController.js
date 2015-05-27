/* 
* @Author: nimi
* @Date:   2015-05-26 11:55:47
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 14:55:19
*/

'use strict';

var fs = require('fs');
var EventEmitter = require('events').EventEmitter;
var events = new EventEmitter;

module.exports = {
  getTest : function(req, res, next){
    var fileName = req.params.test + '.js'
    var options = {
      root : __dirname + '/testStorage/' 
    }

    res.sendFile(fileName, options, function(error){
      if(error){
        console.error('----------There was an error sending the file from the testingServer----------')
        console.error(error);
        res.sendStatus(404);
      }
    });
  }
}

