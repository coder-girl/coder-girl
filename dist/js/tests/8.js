// null vs. undefined 

var test = function(userCode){
 var userInput = eval(userCode);
 var result = {
   pass: true,
   message: "Congratulations! Time to party!"
 }
 if(typeof(userInput) !== "undefined"){
    result.pass = false;
    result.message = "The party variable has been declared but not assigned to anything yet. This means it is undefined."
 }
 return result;
}
