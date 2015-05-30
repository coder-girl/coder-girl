var test = function(userCode) {
  eval(userCode);
  var result = {
    pass: true,
    message: 'You got it, time to head on over to the mall!'
  };
  if (textForLoop().length !== 30) {
    result.pass = false;
    result.message = 'Not quite.  Keep trying!';
    return result;
  } 
  return result;
};
