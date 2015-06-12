/* 
* @Author: Mark Bennett
* @Date:   2015-06-09 18:58:06
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 20:16:26
*/

'use strict';

{
  title: "More on Objects",
  content: 'var tasks = {\n  "monday": ["Finish history project"],\n  "tuesday": ["Wash dishes", "Turn in Math Homework"],\n  \
  "thursday": ["Go to dance practice", "Start book report"],\n }',
  instructions: "We've added another object to the editor. The `tasks` object contains a list of tasks that need to be accomplished on certain\
  days of the week. Notice that we're storing arrays within our object, which is totally ok. Objects can even store other objects as values \
  (which themselves could have objects as values... you get the idea). In the previous challenge, you learned that object values can be \
  accessed using bracket notation - if I wanted Tuesday's tasks, I could write `tasks['tuesday']`. But there's another way we can retrieve \ 
  values from an object called called 'dot notation': `tasks.tuesday`. To convert from bracket notation to dot notation, we simply remove the\
  quotation marks, and replace the brackets with a period.<br><br>Try it out in the editor - use dot notation to retrieve Monday's tasks.", 
  hint1: "Remember, you don't need the quotes!",
  hint2: "Don't forget to include the period between the object name and the key name",
  testCode: 12,
  pointValue: 100
}

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }

  var codeResponse = eval(userCode);

  if (codeResponse.pop() === "Finish hinstory project"){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if (codeResponse.length && codeResponse.length === 2){
    result.message = "Looks like you may have gotten your days mixed up - make sure you're returning Monday's tasks!";
  } 

  return result
}