
﻿var test = function(userCode){
  eval(userCode);
  var result = {
    pass: false,
    message: "Oop! Looks like your code wasn't quite right. Try again!"
  }
  if(reverseIt === "I am a super clever coder. Message me back!"){
    result.pass = true;
    result.message = "You got it! Kayla's message was 'I am a super clever coder.  Message me back!'."
  } else if (reverseIt.length !== kaylaMessage.length) {
    result.message = "Not quite! Looks like the reverseIt variable is not the same length as the original message. Make sure to double-check your iterator values."
  }
  return result
}

