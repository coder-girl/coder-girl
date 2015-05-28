/* 
* @Author: nimi
* @Date:   2015-05-25 11:12:43
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-26 15:24:52
*/

'use strict';

var http = require('http');
var Promise = require('bluebird');
var Challenges = require('../models').Challenges;
var fs = require('fs');

module.exports = {
  handleSubmit : function(req, res, next){
    var test = module.exports.findTests;
    var append  = Promise.promisify(fs.appendFile);
    var testCode = req.params.testCode
    var pathName = __dirname + '/' + testCode + '.js';
    var code = req.body.userCode;
    test(pathName, testCode)
      .then(function(value){
        console.log('!!!!!!!!!!!!!!!!!!!', value);
        append(pathName, code)
          .then(function(){
            console.log('I promise this worked');
            res.send(200);
          })
      })
      .error(function(error){
        console.error(error);
        res.send(404);
      })
  },

  findTests : Promise.method(function(pathName, testCode){
    return new Promise (function(resolve, reject){
      var request = http.get({
          hostname: 'localhost',
          port: '8080',
          path: '/api/tests/getTest/' + testCode
         }, function(response){
          if(response.statusCode === 404){
             reject(new Error('The file was not found on the test server'))
          } else {
            response.on('data', function(chunk){
              fs.writeFile(pathName, chunk, function (err) {
                if(err){
                  console.error(err);
                }
              })
            });
            response.on('end', function(data){
              console.log('The file has been written')
              resolve(pathName);
            });
          }
        })
      request.on('error', function(error){
        console.error('-------There was an error receiving file from testingServer-------')
        console.error(error);
        reject(error);
      })
      request.end();
    })
  })
}
