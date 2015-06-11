var test = function(userCode){
  var result = {
    pass: false,
    message: "Looks like your code wasn't quite right. Please try again!"
  }
  eval(userCode);

  var test = greetGuest("Stephen");

  if (test === "Hi, Stephen" || test === "Hi, Stephen."){
    result.pass = true;
    result.message = "Congratulations! You passed!";
  }

  if (test === undefined){
    result.message = "Don't forget to return the augmented `greeting`!";
  } else if (test === "Hi, ") {
    result.message = "Looks like the greeting string isn't being modified before gets returned. Be sure any modifications you make \
    to the string get stored to the `greeting` variable."
  }

  return result
}
