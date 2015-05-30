var test = function(userCode) {
  eval(userCode);
  var result = {
    pass: true,
    message: 'You got it! Kayla\'s message was \'I am a super clever coder.  Message me back!!\'.'
  };
  if (reverseIt() !== 'I am a super clever coder.  Message me back!') {
    result.pass = false;
    result.message = 'Not quite.  Keep trying!';
    return result;
  }
  return result;
};
