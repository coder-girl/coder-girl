// operators : operation conquer operators 

var test = function(userCode){
  eval(userCode);
  var result = {
    pass: false,
    message: "Oops! Looks like your code wasn't quite right. Try again!"
  }
  if (moduloResult === 1){
    result.pass = true;
    result.message = "You got it!"
  } else if (typeof moduleResult !== "number") {
    result.message = "Looks like moduloResult isn't set to a number. Check you code and try again!"
  }

  return result
}

