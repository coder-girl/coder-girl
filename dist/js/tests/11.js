var test = function(userCode) {
  var numberOfShades = eval(userCode);
  var result = {
    pass: true,
    message: 'Congratulations! You deserve that new shade.  Treat Your-self to Teal, perhaps?'
  };
  if (typeof (numberOfShades) !== 'number') {
    result.pass = false;
    result.message = 'Your code is not returning a number. Did you call `.length` on the shades array?';
    return result;
  }
  if (numberOfShades !== 14) {
    result.pass = false;
    result.message = 'Your count is not quite right. Make sure you are calling `.length` on the shades array.';
  }
  return result;
};

