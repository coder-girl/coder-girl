/* 
* @Author: nimi
* @Date:   2015-05-26 17:08:55
* @Last Modified by:   nimi
* @Last Modified time: 2015-05-28 15:52:53
*/

'use strict';

self.addEventListener('message', function(e) {
  // Send the message back.
  var testCode = e.data[0];
  var userCode = e.data[1];

  importScripts('./tests/' + testCode + '.js');

  var result = eval(test(userCode)) ;

  self.postMessage(result)
}, false);
