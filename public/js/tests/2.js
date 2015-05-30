var test = function(userCode){
  eval(userCode);
  if(example(1,2) === 3){
    return true;
  }

  return false
}