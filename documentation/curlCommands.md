
#### Post a challenge

This command will add a challenge into the database. If the challenge already exists, it won't create a duplicate. Use the format of the object in dataObjects.js as a template of the object being passed into the body of the request

>curl -i -X POST -H "Content-Type: application/json" -d 'ENTER_OBJECT_HERE_BETWEEN_QUOTES' http://localhost:3000/api/challenges/addChallenge


curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Add it all up!","content":"var example = function(){ \n //enter your code here! \n}","instructions":"Write a function that takes two arguments and returns the sum","testCode":3,"pointValue":100,"hint1":"Dont forget that thing!","hint2":"Also be sure to remember that other thing!"}' http://localhost:3000/api/challenges/addChallenge