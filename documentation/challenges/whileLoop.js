


{
  title: 'While loop party'

  instructions: "It's Friday night and you're at a party thrown by your crush! Your romantic rival Bianca is at the party too (oh no!)! You decide to go toe to toe 
  with her the whole night. Soon, you're the life of the party! You're dancing the night away, making new friends, and catching the eye of a certain someone. 
  Except there's one problem- you overhear Bianca saying that she's going to wait until the end of the night to swoop in and steal your crush! You decide to wait 
  even longer than her! \n \nA while loop is a loop that takes in a conditional and will only run if that condition is met. \n \n Write a function that takes in the number 
  of people at the party as an argument. Use a while loop to count down until everyone has left (that is, until the number of people left at the party = 0). While there 
  are people, you should let people know you're not leaving the party by console logging it. After everyone is gone, you should shout that you win (take that, Bianca!) 
  by returning 'I win!'.",

  content: "var partyMonster = function(guests){ \n //we have provided the skeleton of a while loop, to help \n while(SOME_CONDITION){\n //do some work\n //make 
      sure to change your condition in some way (eg: decrement the count if you're waiting until it hits 0)\n}\n}",

  testCode: 3,

  pointvalue: 100
}


tests: 

var test = function(userCode){
  eval(userCode);
  var result = partyMonster(2)
  if(result === "I win!"){
    return true;
  }
  return false
}
