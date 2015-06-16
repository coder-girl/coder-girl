// conditionals 

var test = function(userCode){
  var pickShoes = function(string) {
    var clothes = string;
    var shoes;
    eval(userCode);

    return shoes; 
  };

  var result = {
     pass: true,
     message: "You got it!"
  }
  
  if (pickShoes("jeans") !== "boots"){
     result.pass = false;
     result.message = "What are you wearing with your jeans?  Boots might be a good choice..."
  } else if (pickShoes("skirt") !== "platforms"){
     result.pass = false;
     result.message = "What are you wearing with your skirt?  Platforms might be a good choice..."
  } else if (pickShoes("anything") !== "flip flops"){
     result.pass = false;
     result.message = "It doesn\'t look like you are defaulting to flip flops."
  }   

  return result;
}