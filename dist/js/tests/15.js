// string loop - hashtags 

var stringLoopTest = function(userCode){
 eval(userCode);
 var result = {
   pass: false,
   message: "Not quite. Take another look and try again!"
 }
 if (if hashtagCount === 13){
   result.pass = true;
   result.message = "#GreatJob! #SuperCoder"
 } else if (hashtagCount === 0){
  result.pass = false;
  result.message = "Looks like `hashtagCount` never got incremented. Make sure your conditional is doing what you expect!"
 }
 return result
}
