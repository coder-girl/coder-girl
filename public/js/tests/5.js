// operators : operation conquer operators 

var test = function(userCode){
  var code = eval(userCode);
  var result = {
    pass: false,
    message: "Oops! Looks like your code wasn't quite right. Try again!"
  }
  if (code === 1){
    result.pass = true;
    result.message = "You got it!"
  } 

  return result
}

