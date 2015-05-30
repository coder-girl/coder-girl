var test = function(userCode) {
  var result = {
    pass: false,
    message: 'Looks like your code wasn\'t quite right. Please try again!'
  };

  var codeResponse = eval(userCode);

  if (codeResponse.pop() === 'Finish history project') {
    result.pass = true;
    result.message = 'Congratulations! You passed!';
  }

  if (codeResponse.length && codeResponse.length === 2) {
    result.message = 'Looks like you may have gotten your days mixed up - make sure you\'re returning Monday\'s tasks!';
  }

  return result;
};
