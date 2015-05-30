var test = function(userCode) {
  eval(userCode);
  var result = {
    pass: true,
    message: 'Congratulations! You passed!'
  };
  if (contactList.Courtney === '2023948221') {
    result.pass = false;
    result.message = 'Oh no! Looks like you got someone else\'s number. Try again!';
    return result;
  }

  return result;
};
