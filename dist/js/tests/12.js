var test = function(userCode) {
  var code = eval(userCode);
  var result = {
    pass: false,
    message: 'Oops! Looks like your code is not quite right. Try again!'
  };
  
  if (code === contactList.Courtney) {
    result.pass = true;
    result.message = 'Congratulations! That\'s correct!';
  } else if (typeof code === "number") {
    result.message = "Oops! Looks like you returned the wrong number. Remember to pass in \"Courtney\""; 
  }

  return result;
};

