// hooray for arrays 

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

