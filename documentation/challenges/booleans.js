/* 
* @Author: Mark Bennett
* @Date:   2015-06-09 19:30:53
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 20:16:30
*/

'use strict';

{
  title: "Billions of booleans",
  content: 'var test1 = 5 < 3;\n var result1 = // add the correct boolean here!;\n\nvar test2 = 10 > 6;\n var result2 = // add the correct boolean here!;\n\n',
  instructions: "At this point, you've already seen several primitive data types, including strings, numbers, and objects. Another common \
  data type is a boolean, which simply distinguishes between two possibilities: `true` or `false`. Notice that these values are \
  neither strings nor variables - they are their own type altogether. Booleans are particularly useful for comparisons, such as `3 > 2` \
  or `3 < 2`. The > and < signs are the traditional symbols for “is greater than” and “is less than”, respectively. So `3 > 2` evaluates \
  to `true`, and 3 < 2 evaluates to `false`.<br><br>In the editor, assign the correct boolean to `result1` and `result2` based on the \
  corresponding `test1` and `test2` comparisons.",
  hint1: "Remember that since `true` and `false` aren't strings, they don't require quotation marks. ",
  hint2: "The value of `result1` should equal the value of `test`. So if `result3 = 6 < 12`, then `test3 = true` would be the correct assignment.",
  testCode: 6,
  pointValue: 100
}

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }

  var codeResponse = eval(userCode);

  if (result1 === false && result2 === true){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if (typeof result1 === "string" || typeof result2 === "string"){
    result.message = "Remember not to use quotation marks around `true` and `false`";
  } 

  return result
}

