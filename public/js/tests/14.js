var test = function(userCode) {
  var codeForloop = eval(userCode);
  var result = {
    pass: true,
    message: 'You got it, time to head on over to the mall!'
  };
  if (codeForloop !== 'for(var i = 0; i < 30; i++) {\'I will not text during class.\'}') {
    result.pass = false;
    result.message = 'Not quite.  Keep trying!';
    return result;
  }
  return result;
};
