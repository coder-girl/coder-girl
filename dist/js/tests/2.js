//Numbers 2 Cool 4 School

var test = function(userCode){
  var userString = eval(userCode);
  var result = {
    pass: true,
    message: "You got it! You are definately 2Cool4School"
  }
  if (typeof userString !== "string"){
    result.pass = false;
    result.message = "Oops! Looks like your code isn't a string. Give it another try.";
  } else if (userString !== '2cool4school' && userString !== '2 cool 4 school'){
    result.pass = false;
    result.message = "Not quite.  Try again.";
  }  
  return result;
}

