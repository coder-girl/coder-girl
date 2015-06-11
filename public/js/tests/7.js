var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }
  eval(userCode);

  if (score === 4){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if(codeResponse === NaN){
    result.message = "Oops! Make sure you pass the correct argument between the parentheses!"
  } 

  return result
}

