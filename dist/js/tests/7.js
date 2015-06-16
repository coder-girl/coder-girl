// expressions : expressive expressions 

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
