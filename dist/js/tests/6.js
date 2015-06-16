// logical or, and, and !

var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }
  eval(userCode);

  if (janesChoice === true){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if (test === false){
    result.message = "Looks like `janesChoice` is returning false - double check your operators and try again!";
  }

  return result;
}
