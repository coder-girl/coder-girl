
var test = function(userCode){
  var num = eval(userCode);

  var result= {
    pass: false,
    message: "Not quite.  Try again!"
  }
  if(num=== 1){
    result.pass = true;
    result.message = "You got it!  You are a mod star!"
  }

  return result
}

