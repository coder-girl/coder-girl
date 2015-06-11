/* 
* @Author: Mark Bennett
* @Date:   2015-06-10 11:08:49
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 20:16:26
*/

'use strict';

{
  title: "Expressive Expressions",
  content: 'var value1 = 5 === 6;\nvar value2 = "two wrongs" !== "one right";',
  instructions: "Booleans and operators are core components of expressions. Expressions are simply defined as any unit of code that \
  evaluates to a value. You've already seen several examples of expressions at this point: valid expressions include variable assignments\
  (`var x = 7`), mathematical operations (`5 * 7`), string operations (`'my' + 'string'`), and logical operations - operations that \
  evaluate to `true` or `false` (`5 < 6`).<br><br>In addition to the things you have already seen, other common operators that \
  frequently appear in expressions include >= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to).\
  For example, all of the following logical expressions would evaluate to `true`: `'Mark' != 'Marcus'`, `5 == 5`, `'a' <= 'b'`, and /
  `2 >= 2`.<br><br>Try it out. Create an expression using either == or != that compares `value1` and `value2` and evaluates to `true`."
  hint1: "First, create a theory about what value you expect `value1` and `value2` to take assume. Then choose the appropriate operator",
  hint2: "Your code should look like `value1 ? value2`, where the question mark is replaced by the correct operator.",
  testCode: 8,
  pointValue: 100
}

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }

  var codeResponse = eval(userCode);

  if (codeResponse === true){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if (codeResponse === false){
    result.message = "Looks like you may have used the wrong operator. Try again!"
  } 

  return result
}