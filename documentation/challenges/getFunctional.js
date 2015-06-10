/* 
* @Author: Mark Bennett
* @Date:   2015-06-04 12:31:58
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-05 15:47:54
*/

'use strict';

{
  "title": "Let's get functional",
  "content": '// This is the skeleton of a function\nvar greetGuest = function(guestName) {\n  var greeting = "Hi";\n  // write your code here! 
  \n\n  return greeting\n}',
  "instructions": "At this point, you've learned many useful ways to store and access information using variables. But what if 
  we want a way to save entire sections of code, which we could then call on to use at some time in the future? This is where functions
  come into play. Functions are a core component of programming - they help us structure our code, and by wrapping a part of a program in some 
  named value, they greatly reduce code repetition.\n\nImagine you are having some friends over, and want to program a way 
  to greet guests as they arrive. It would seem like quite a bit of work to write out a distinct greeting procedure for 
  each guest that shows up. Instead, you'd probably want to define a standard greeting method, and then apply that method with each 
  guest in turn. Let's write a function to help handle the greetings.\n\nAs the code in the editor demonstrates, functions are made 
  up of a few components. Since we'll want to reference our code later, we're storing the function to the `greetGuest` variable. Next,
   we're identifying greetGuest as a `function`, and then passing `guestName` ", 
  "hint1": "",
  "hint2": "",
  "testCode": 15,
  "pointValue": 50
}

var test = function(userCode){
  if(eval(userCode) === 2023948221){
    return true;
  }

  return false
}
