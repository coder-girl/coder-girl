// booleans : which wand? 

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!  These wands are a mess!"
  }

  var codeResponse = eval(userCode);

  if (wandResult1 === false && wandResult2 === true){
    result.pass = true;
    result.message = "Congratulations! You passed! Off to get a mug of butterbeer!";
  }

  if (typeof wandResult1 === "string" || typeof wandResult2 === "string"){
    result.message = "Remember not to use quotation marks around `true` and `false`";
  } 

  return result
}
