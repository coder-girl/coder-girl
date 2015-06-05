var test = function(userCode){
  eval(userCode);

  var result= {
    pass: false,
    message: "Oh no you didn't pass!"
  }
  if(example(1,2) === 3){
    result.pass = true;
    result.message = "Congrats!"
  }

  return result
}
