/* 
* @Author: Mark Bennett
* @Date:   2015-06-02 09:30:02
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-10 20:16:25
*/

'use strict';

{
  title: "Contacts object",
  content: 'var contactList = {\n  "Annabelle": 5103238231,\n  "Beth": 4253839832,\n  "Courtney": 2023948221,\n  "Dalia": 9176241223,\n  "Erica": 2124450339\n}',
  instructions: "Remember in a previous challenge we stored a list of friends' names in an array, which looked like\
  `var friends = ['Annabelle', 'Beth', 'Courtney', 'Dalia', 'Erica']`. An array is a good method for keeping track of lists\
  like this, but what if we wanted to store a phone number for each of our friends? To associate each name with another\
  piece of data, we'd want to use a different structure, called an object.<br><br>Take a look at the code in the editor. You'll\
  notice that each entry in the `contactList` object has two components: a key and a value. The key, in this case a friends'\
  name, is a unique identifier used to access the corresponding value. And as you can see, the values in `contactList` are \
  the friends' phone numbers).<br><br>Looking up a value in an object is similar to accessing an element in an array, except that\
  instead of passing in an integer that represents the element's index, we pass in the key in order to access the value. For \
  example, to retrieve Beth's phone number, we would write `contactList['Beth']`, which would return 4253839832. Object keys \
  can be numbers, but note that unlike arrays, objects are not ordered. Even if you had an object with numeric keys, the keys \
  don't give order to the key/value pairs in the object. So if you had `var myObject = {0: 'zero', 1: 'one'}`, it is incorrect\
  to think of 1 as coming before 2. The concept of order simply doesn't apply to objects.<br><br>Ok, enough talking, let's try it \
  out. How would you get Courtney's phone number from `contactList`? Given it a try on line 9." 
  hint1: "Accessing values in an object will follow the form `objectName[key]`",
  hint2: "Make sure you're using brackets [] rather than parentheses!",
  testCode: 7,
  pointValue: 50
}

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }
  var codeResponse = eval(userCode);

  if (codeResponse === 2023948221){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if(codeResponse === undefined){
    result.message = "Oops! Make sure the key you entered is a string!"
  } 

  return result
}


