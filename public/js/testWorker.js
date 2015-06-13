/* 
* @Author: nimi
* @Date:   2015-05-26 17:08:55
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-12 16:14:09
*/

'use strict';


self.onmessage = function(event){
  var testCode = event.data[0];
  var userCode = event.data[1];

  importScripts('./tests/' + testCode + '.js');

  self.postMessage({started: true, finished: false});
  var result = {};
  try  {
    result = eval(test(userCode));
  } catch (error) {
    result.message = "Looks like there is an error in your code. Hover your mouse over the sidebar of the editor to see if you have any syntax errors.";
    result.pass = false; 
  }
  result.finished = true;

  self.postMessage(result)
}
