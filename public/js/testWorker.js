/* 
* @Author: nimi
* @Date:   2015-05-26 17:08:55
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-04 18:14:38
*/

'use strict';


self.onmessage = function(event){
  var testCode = event.data[0];
  var userCode = event.data[1];

  importScripts('./tests/' + testCode + '.js');

  self.postMessage({started: true, finished: false});
  var result = eval(test(userCode)) ;
  result.finished = true;

  self.postMessage(result)
}
