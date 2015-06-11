/* 
* @Author: Mark Bennett
* @Date:   2015-06-02 09:24:08
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 20:16:27
*/

'use strict';

{
  title: "Hooray for Arrays!",
  content: 'var friends = ["Annabelle", "Beth", "Courtney", "Dalia", "Erica"]',
  instructions: "Take a look at the editor. We've added a list of friends' names in a specific format. This type of \
                  list, of the form ['element1', 'element2', 'element3', ...] is called an array. Arrays are ordered, and each \
                  element has an 'index' that demonstrates its position in the list. <br><br>\
                  One thing to note about array order and indexes is that programmers often like to start counting at 0 rather than 1. \ 
                  This means that 'Annabelle,' the first element in our array of friends, is actually at index 0. 'Beth' is at index 1, \ 
                  'Courtney' is at index 1, and so on. <br><br>\
                  Let's pull an element out of our array. If I wanted the first element in the array, typing `friends[0]` \
                  will return the element in 'friends' at index 0. Give it a try - write a statement below the 'friends' array \
                  that will return 'Dalia' from the array.", 
  hints: ["Your code should look like `friends[x]`, where x is the index that indicates Dalia's position in the array.",
          "Remember, the index of the first element in the array is 0, not 1. This means Dalia is at index 3."],
  testCode: 5,
  pointValue: 50
}

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }
  var codeResponse = eval(userCode);

  if (codeResponse === "Dalia"){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if(codeResponse === "Erica" || codeResponse === "Courtney"){
    result.message = "Looks like the index you used was off by 1. Remember that array indexes start from 0!"
  } 

  return result
}