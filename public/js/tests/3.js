//Variables: Puppies v. Kittens

var test = function(userCode){
 eval(userCode);
 var result = {
   pass: true,
   message: "You got it!"
 }
 if(puppiesVkittens() !== "puppy" && puppiesVkittens() !== "kittens"){
   result.pass = false;
   result.message = "Uh oh, it looks like DuchessFlufferton has not been assigned to either 'puppy' or 'kitten'.  Try again.";
   return result;
 } 


 return result
}
