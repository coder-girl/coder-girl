var test = function(userCode) {
  eval(userCode);
  
  var result = {
    pass: false,
    message: 'Not quite. Keep trying!'
  };
  
  if (messages.length === 30) {
    result.pass = true;
    result.message = 'You got it, time to head on over to the movies!';
  } else if (messages.length === 31 || messages.length === 29) {
    result.message = "So close!! Looks like your counter was off by 1. Double check your condition and starting value, and try again!"
  }

  return result;
};
