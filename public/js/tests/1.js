//String Theory

var test = function(userCode){
 var userString = eval(userCode);
 var result = {
   pass: true,
   message: "Nice!  You've stringified!"
 }
 if(typeof(userString) !== "string"){
   result.pass = false;
   result.message = "You do not have a string in the editor.  Make sure that you enclosed your string in matching quotes."
   return result;
 } 
 return result
}

