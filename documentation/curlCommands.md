
#### Post a challenge

This command will add a challenge into the database. If the challenge already exists, it won't create a duplicate. Use the format of the object in dataObjects.js as a template of the object being passed into the body of the request

>curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Add it all up!","content":"var example = function(){ \n //enter your code here! \n}","instructions":"Write a function that takes two arguments and returns the sum","testCode":3,"pointValue":100,"hint1":"Dont forget that thing!","hint2":"Also be sure to remember that other thing!"}' http://localhost:3000/api/challenges/addChallenge


1) 

curl -i -X POST -H "Content-Type: application/json" -d '{"title":"String Theory","instructions":"In JavaScript you can put any keyboard characters you want in quotes and you have created a \"string\".    The quotes can be single or double quotes but they have to match.  <br><br>A string can be made up of a single letter,   a single word or whole paragraphs.  The sky is the limit.  <br><br>In the editor, create a string that contains your favorite hashtag for selfies.  <br><br>Note that in the editor, it now says \"//type your string here\".  By putting \"//\" before text, it turns the entire line into   a comment that is ignored by JavaScript.  It allows you to write comments about your code to remind your later self what you did.   So, make sure to write your brilliant new string on line 2.  Otherwise, if you write it on line 1 it will be ignored.","content":"//type your string on the next line","testCode":1,"pointValue":100,"hint1":"Did you place your string in matching quotes (either both single quotes or both double quotes)?","hint2":"My answer would be \"#filtersforever\"."}' http://localhost:3000/api/challenges/addChallenge


2)


curl -i -X POST -H "Content-Type: application/json" -d '{"title":"1+1 Cool 2*2 School","content":"//enter code on next line","instructions":"Strings are fine and dandy, but sometimes you just need a number.   JavaScript has you covered.  You can use numbers and do math all within JavaScript. You can add (+), subtract (-), multiply (*) and divide (/).  <br><br>Note that if you put a number in quotes, it becomes a string and no longer behaves the way you would expect.   For instance if you input \"2\" + \"5\" you would get \"25\" in return because the two strings would just be smooshed together.  This smooshing is called \"concatenation\".  If you want to add 2 + 5 to get 7, you leave off the quotes.  <br><br>Say you want to use JavaScript to write a text to your friend Caroline but all of your number keys are broken  other than the number 1.  In the editor, write out the string \"2cool4school\" but only using the number 1.","hint1":"Your number 1 should NOT be in quotes in your code since you want to do regular addition.","hint2":"Your answer should be in the form of: (6 + 6) + 'wordy' + (3 + 3 + 3) + 'more_wordy'.","testCode":2,"pointValue":150}' http://localhost:3000/api/challenges/addChallenge

3)

curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Puppies v. Kittens","instructions":"JavaScript variables can be thought of like nicknames. If you had a dog named Santa\"s Little Helper, you might not want to have to say Santa\"s Little Helper every time you call him.  You might instead take to calling him Fuzzball.  Fuzzball then would be a variable that refers to Santa\"s Little Helper.  You would declare this variable by writing: <br> var Fuzzball = \"Santa\"s Little Helper\"; <br> When you first define a variable you need to use that \"var\" keyword.  After that, you can change what Fuzzball is referring to without stating \"var\". For instance, if Santa\"s Little Helper gets a furcut and you decide that your cat, Grinchy is more like a Fuzzball, then you could reassign Fuzzball to Grinchy by just writing: <br>Fuzzball = \"Grinchy\"; <br>Then, whenever you call Fuzzball you would be calling Grinchy (though she might ignore you). <br>You can pick pretty much anything you want for variable names so long as (1) they aren\"t a few reserved magical JavaScript words, (2) they can\"t start with a number, and (3) they can\"t have spaces.  Note that capitalization matters.  Fuzzball is not the same as fuzzball. <br>In the editor, define the variable \"DuchessFlufferton\" and assign it to either \"puppy\" or \"kitten\"","content":"//enter code on line below","testCode":3,"pointValue":150,"hint1":"Did you make sure to start with the 'var' keyword?","hint2":"Did you make sure there is no space between 'Duchess' and 'Flufferton'?"}' http://localhost:3000/api/challenges/addChallenge

4)

curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Which Wand?","content":"var wandCheck1 = 5 < 3;\n var wandResult1 = // add the correct boolean here and make sure to delete the \"//\";\n\nvar wandCheck2 = 10 > 6;\n var wandResult2 = // add the correct boolean here and make sure to delete the \"//\";\n\n","instructions":"At this point, you have already seen several data types, including strings and numbers. Another common   data type is a boolean.  Boolean is just a fancy word for the category that includes true and false. True and false are   neither strings nor variables - they are their own type altogether. So, you do not put true or false in quotes.  They stand all on their own.   Booleans are particularly useful for comparisons, such as 3 > 2   or 3 < 2. The > and < signs are the traditional symbols for is greater than and is less than, respectively. So 3 > 2 evaluates   to true, and 3 < 2 evaluates to false.    <br><br>Imagine you are strolling down Diagon Alley and you wander into Ollivander\"s to check out the new wands.   You are shocked to find the whole store in disarray.  You want to help Ollivander sort the wands by length.    You have the lengths, but you need to determine which length is greater when comparing two wands.   In the editor, assign the correct boolean to wandResult1 and wandResult2 based on the   corresponding wandCheck1 and wandCheck2 comparisons. Have at it, Hermione.","hint1":"Remember that since true and false are not strings, they do not require quotation marks.","hint2":"wandResult1 should be true if 5 is less than 3.  If 5 is not less than 3, wandResult1 should be false.","testCode":4,"pointValue":200}' http://localhost:3000/api/challenges/addChallenge


5)

curl -i -X POST -H "Content-Type: application/json" -d '{"title":"Operation Conquer Operators","content":"","instructions":"You know how we said earlier that you can do math in JavaScript.  We were not kidding.  <br> Check out a few of the operators available to you:   <br>Addition (+)  <br> 2 + 2 = 4  <br>Subtraction (-)  <br> 10 - 2 = 8  <br>Multiplication (*)  <br> 2 * 12 = 24  <br>Divsion (/)  <br>  24/2 = 12  <br>Modulo (%)  <br> (%) returns the remainder from dividing two numbers, so 5 % 2 = 1.   <br>  Suppose we would like to know if any given number is an even number.   We can use modulus here to help us out. If the remainder is 1, not zero, then we know it is an odd number.   Increment (++)   <br> ++ is a shortcut to increment a variable that is storing a number by 1.  <br> var x = 10;  <br> x++ , will return 11;  <br> We can also get really clever and increment by 2 by using x+=2.  <br>  <br>Decrement (--)  <br> -- is a shortcut to decrement (decrease) a variable that is storing a number by 1.  <br> var x = 0;  <br> x-- , will return -1;  <br>  Enough reading.  Time for a challenge.  In the editor, write the result of 21 % 10.    <br>$$","hint1":"What does that % mean again?  Check above.  To be really cool you could say 21 mod 10.","hint2":"If you divide 21 by 10, what would the remainder be?","testCode":5,"pointValue":300}' http://localhost:3000/api/challenges/addChallenge


6)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


7)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


8)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


9)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


10)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


11)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


12)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge


13)

curl -i -X POST -H "Content-Type: application/json" -d 'enter challenge here' http://localhost:3000/api/challenges/addChallenge









