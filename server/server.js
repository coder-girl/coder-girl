/* 
* @Author: nimi
* @Date:   2015-05-25 10:32:38
* @Last Modified by:   Mark Bennett
* @Last Modified time: 2015-06-11 18:58:36
*/

var express = require('express'),
    app = express(),
    models  = require('./models'),
    Challenge = models.Challenge,
    passport = require('passport'),
    cors = require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    addAllChallenges = require('./challenges/addAllChallenges');
    messageController = require('./messages/messageController');

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../dist/'));

// configure our server with all the middleware and and routing
require('./config/middleware.js')(app, express, passport);

app.set('port', (process.env.PORT || 3000));

models.sequelize.sync()  //Include {force: true} as argument in sync() if want DB to drop on server restart.
  .then(function(){
    return Challenge.bulkCreate([
    {
      testCode: 1,
      title:"String Theory",
      instructions:"In JavaScript you can put any keyboard characters you want in quotes and you have created a \"string\".The quotes can \
      be single or double quotes but they have to match. A string can be made up of a single letter, a single word or whole paragraphs. The \
      sky is the limit.<br><b>Challenge:</b> In the editor, create a string that contains your favorite hashtag for selfies. Note that in the editor, it now \
      says \"//type your string here\". By putting \"//\" before text, it turns the entire line into a comment that is ignored by JavaScript. \
      It allows you to write comments about your code to remind your later self what you did. So, make sure to write your brilliant new string \
      on line 2. Otherwise, if you write it on line 1 it will be ignored.",
      content: "//type your string on the next line",
      pointValue: 100,
      hint1: "Did you place your string in matching quotes (either both single quotes or both double quotes)?",
      hint2: "My answer would be \"#filtersforever\"."
    },

    {
      testCode: 2,
      title: "1+1 Cool 2*2 School",
      content: "// enter code on next line",
      instructions: "Strings are fine and dandy, but sometimes you just need a number. JavaScript has you covered. You can use numbers and do \
      math all within JavaScript. You can add (+), subtract (-), multiply (*) and divide (/). <br><br>Note that if you put a number in quotes, \
      it becomes a string and no longer behaves the way you would expect. For instance if you input `\"2\" + \"5\"` you would get `\"25\"` in \
      return because the two strings would just be smooshed together. This smooshing is called \"concatenation\". If you want to add 2 + 5 to \
      get 7, you leave off the quotes.<br><br>Say you want to use JavaScript to write a text to your friend Caroline but all of your number\
      keys are broken  other than the number 1.<br><b>Challenge:</b>In the editor, write out the string \"2cool4school\" but only using\
      the number 1.",
      hint1:"Your number 1 should NOT be in quotes in your code since you want to do regular addition.",
      hint2:"Your answer should be in the form of: `(6 + 6) + 'wordy' + (3 + 3 + 3) + 'more_wordy'`.",
      pointValue:150
    },

    // {
    //   testCode: 3,
    //   title: "Puppies v. Kittens",
    //   instructions: "JavaScript variables can be thought of like nicknames. If you had a dog named Santa\'s Little Helper, you might not want to have \
    //   to say Santa\'s Little Helper every time you call him. You might instead take to calling him Fuzzball. Fuzzball then could be a variable \
    //   that refers to Santa\'s Little Helper. You would declare this variable by writing: \
    //   <br> `var Fuzzball = \"Santa\'s Little Helper\"; `/
    //   <br>When you first define a variable you need to use the `var` keyword. After that, you can change what Fuzzball is referring to without using `var`.\
    //   For instance, if Santa\'s Little Helper gets a furcut and you decide that your cat, Grinchy, is more like a Fuzzball, \
    //   then you could reassign Fuzzball to Grinchy by just writing: `Fuzzball = \"Grinchy\";`\
    //   Then, whenever you call Fuzzball, you would be referring to Grinchy (though she might ignore you). \
    //   <br>You can pick pretty much anything you want for variable names so long as (1) they aren\'t a few reserved magical JavaScript words, (2) they don\'t \
    //   start with a number, and (3) they don\'t have spaces. Note that capitalization matters. `Fuzzball` is not the same as `fuzzball`.\
    //   <br><b>Challenge:</b>In the editor, define the variable `DuchessFlufferton` and assign it to either \"puppy\" or \"kitten\".",
    //   content: "var puppiesVkittens = function(){ \
    //     <br> // enter code here \
    //     <br> return DuchessFlufferton \
    //     <br> }",
    //   pointValue: 50,
    //   hint1: "Did you make sure to start with the `var` keyword?", 
    //   hint2: "Did you make sure there is no space between 'Duchess' and 'Flufferton'?"
    // },

    {
      testCode: 4,
      title: "Which Wand?",
      content: "var wandCheck1 = 5 < 3;<br>var wandResult1 = // add the correct boolean here and make sure to delete the \"//\";\
      <br><br>var wandCheck2 = 10 > 6;<br>var wandResult2 = // add the correct boolean here and make sure to delete the \"//\";<br><br>",
      instructions: "At this point, you have already seen several data types, including strings and numbers. Another common \
      data type is a boolean. Boolean is just a fancy word for the category that includes `true` and `false`. These values are \
      neither strings nor variables - they are their own type altogether. So, you do not put `true` or `false` in quotes.  They stand all on their own. \
      Booleans are particularly useful for comparisons, such as 3 > 2 \
      or 3 < 2. The > and < signs are the traditional symbols for \"is greater than\" and \"is less than\", respectively. So 3 > 2 evaluates \
      to `true`, and 3 < 2 evaluates to `false`.  \
      <br><br>Imagine you are strolling down Diagon Alley and you wander into Ollivander\'s to check out the new wands. \
      You are shocked to find the whole store in disarray. You want to help Ollivander sort the wands by length.  \
      You have the lengths, but you need to determine which length is greater when comparing two wands. \
      <br><b>Challenge:</b>In the editor, assign the correct boolean to `wandResult1` and `wandResult2` based on the \
      corresponding `wandCheck1` and `wandCheck2` comparisons. Have at it, Hermione.",
      hint1: "Remember that since `true` and `false` are not strings, they do not require quotation marks.",
      hint2: "`wandResult1` should be true if 5 is less than 3. If 5 is not less than 3, `wandResult1` should be false.",
      pointValue: 200
    },

    {
      testCode: 5,
      title: "Operation Conquer Operators",
      content: "",
      instructions: "You know how we said earlier that you can do math in JavaScript.  We were not kidding.\
      <br> Check out a few of the operators available to you: \
      <br>Addition (+)\
      <br> 2 + 2 = 4\
      <br>Subtraction (-)\
      <br> 10 - 2 = 8\
      <br>Multiplication (*)\
      <br> 2 * 12 = 24\
      <br>Divsion (/)\
      <br>  24/2 = 12\
      <br>Modulo (%)\
      <br> (%) returns the remainder from dividing two numbers, so 5 % 2 = 1. \
      <br>  Suppose we would like to know if any given number is an even number. \
      We can use modulus here to help us out. If the remainder is 1, not zero, then we know it is an odd number. \
      Increment (++) \
      <br> ++ is a shortcut to increment a variable that is storing a number by 1.\
      <br> `var x = 10;`\
      <br> `x++` , will return `11`;\
      <br> We can also get really clever and increment by 2 by using x+=2.\
      <br>\
      <br>Decrement (--)\
      <br> -- is a shortcut to decrement (decrease) a variable that is storing a number by 1.\
      <br> `var x = 0;`\
      <br> `x--` , will return `-1`;\
      <br> Enough reading.<br><b>Challenge:</b>In the editor, write the result of 21 % 10.  \
      <br>$$", 
      hint1: "What does that % mean again? Check above. To be really cool you could say 21 mod 10.",
      hint2: "If you divide 21 by 10, what would the remainder be?",
      pointValue: 300
    },

    {
      testCode: 6,
      title: "Ice Cream for Jane",
      content: 'var janesChoice;<br>var vanilla = true;<br> var chocoloate = false;<br>var strawberry = true;<br>var doubleScoopIcecreamCone = false; <br>janesChoice = //write the logical expression here;',
      instructions: "<br>In javascript, the || represents the logical OR operator, which returns `true` if at least one of the values being compared has a \"truthy\" value. \
      <br>`true || false` will return `true`. \
      <br>`false || true` will return `true`. \
      <br>`true || true` will return `true`. \
      <br>`false || false` will return `false`. \
      <br>Additionaly, we have &&, the locial AND operator, which returns `true` only if both values are \"truthy\", and `false` otherwise. \
      <br>`true && true` will return `true`. \
      <br>`false && false` will return `false`. \
      <br>`false && true` will return `false`. \
      <br>`true && false` will return `false`. \
      <br>And finally, `!` or \"not\", performs logical negation. \
      <br>`var atHome = true;` \
      <br>`!atHome` is now false when javascript evalutes it. \
      <br>We can also do `!!atHome`, which changes `!atHome` from above to false, and then because of the second !, back to true. \
      <br>This also converts anything into its boolean value, either true or false. For example 0, is a falsey value, whereas other numbers are truthy. \
      So `!!0` will return `false`. \
      <br><b>Challenge: </b>Jane is getting ice cream, and would like either a single scope of vanilla or strawberry. Assign a value to `janesChoice` \
      by combining all of the variables given with logical operators so that the variable janesChoice will evaulate to `true`.",
      hint1: "Are you wrapping your expressions in parens? ((x || y) && (y && z))",
      hint2:  "Are you using the NOT operator? `!(a || b)`",
      pointValue: 50
    }, 

    // {
    //   testCode: 7,
    //   title: "Expressive Expressions",
    //   content: 'var value1 = 5 === 6;<br>var value2 = "two wrongs" !== "one right";',
    //   instructions: "Booleans and operators are core components of expressions. Expressions are simply defined as any unit of code that \
    //   evaluates to a value. You've already seen several examples of expressions at this point: valid expressions include variable assignments\
    //   (`var x = 7`), mathematical operations (`5 * 7`), string operations (`'my' + 'string'`), and logical operations - operations that \
    //   evaluate to `true` or `false` (`5 < 6`).<br><br>In addition to the things you have already seen, other common operators that \
    //   frequently appear in expressions include >= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to).\
    //   For example, all of the following logical expressions would evaluate to `true`: `'Mark' != 'Marcus'`, `5 == 5`, `'a' <= 'b'`, and /
    //   `2 >= 2`.<br><b>Challenge: </b>Create an expression using either == or != that compares `value1` and `value2` and evaluates to `true`."
    //   hint1: "First, create a theory about what value you expect `value1` and `value2` to take assume. Then choose the appropriate operator",
    //   hint2: "Your code should look like `value1 ? value2`, where the question mark is replaced by the correct operator.",
    //   pointValue: 100
    // },

    // {
    //   testCode: 8,
    //   title: "To not to be or to really not to be",
    //   instructons: "JavaScript is quite serious about a thing not being. So much so that it has two different values to represent nothingness. \
    //   `null` is used when it is certain that something does not exist. `undefined` is used when it is unknown what an item is or whether it exists. For instance, \
    //   if Juliet were single because she dumped her boyfriend Romeo, you would say `var JulietBoyfriend = null`.  But if you are uncertain as to whether \
    //   Juliet has a boyfriend or you do not know his name, you would say `var JulietBoyfriend = undefined`.  `undefined` and `null` are both called \
    //   \"falsy\" values in JavaScript. This means the expression `!undefined` evaluates to `true` and the expression !null evaluates \
    //   to `true`. Strangely, neither `null` nor `undefined` actually equals `false` in JavaScript. /
    //   <br><b>Challenge: </b> Your buddy Benvolio just called and said he has heard that a party has been declared for this Friday.  He had no further information yet. \
    //   In the editor, write \"null\" if you think the variable `party` would evaluate to `null` in this instance or \"undefined\" if you think it would evaluate to `undefined`.",
    //   content: "//enter code here",
    //   pointValue: 50,
    //   hint1: "Benvolio has declared the party variable so it exists, but it does not have a meaning yet.",
    //   hint2: "`undefined` and `null` are not strings, so remember to leave out the quotes!"

    // },

    // {
    //   testCode: 9,
    //   title: "Get out your party shoes!",
    //   instructions: "Often in coding, you want to be able to (1) execute some code if one statement is true, \
    //   (2) execute different code if another statement is true, or (3) \
    //   execute some default code if neither condition (1) or (2) is met. The outline for how to do this is: \
    //    <br> `if(thisIsTrue){`\
    //     <br>   `// do something;`\
    //    <br> `} else if(somethingElse){`\
    //     <br>    `// do something different;`\
    //   <br>  `} else{`\
    //   <br>  `// do the default; `\
    //   <br>  `}` \
    //   <br><b>Challenge: </b>Imagine you are trying to figure out what to wear to this Saturday\'s killer party. Chloe thinks you should wear a skirt. Bethany definitely thinks it is a jeans type of affair.  \
    //   Stephanie thinks it is really casual. Fill in the code in the editor so that if you decide your `clothes` should be jeans, the `shoes` variable is set to \"boots\", \
    //   if you choose a skirt, `shoes` is set to  \"platforms\", and \
    //   if you wear anything else, `shoes` is set to \"flip flops.\"",
    //   content: "var shoes, clothes; // ignore this line 
    //   <br><br> if (clothes === \"jeans\"){ \
    //    <br><br>  //enter code here \
    //   <br> } else if (clothes === \"skirt\"){ \
    //   <br><br>  //enter code here \
    //   <br> } else { \
    //   <br>  //enter code here \
    //   <br> };",
    //   pointValue: 100,
    //   hint1: "Did you make sure to set `shoes` to be a string in each condition?",
    //   hint2: "Did you enclose your strings in quotes?"
    // },

    {
      testCode: 10,
      title: "Hooray for Arrays!",
      content: 'var friends = ["Annabelle", "Beth", "Courtney", "Dalia", "Erica"]',
      instructions: "Take a look at the editor. We've added a list of friends' names in a specific format. This type of  \
      list, of the form `['element1', 'element2', 'element3', ...]` is called an array. Arrays are ordered, and each \
      element has an 'index' that demonstrates its position in the list. <br><br>  \
      One thing to note about array order and indexes is that programmers often like to start counting at 0 rather than 1.  \
      This means that 'Annabelle,' the first element in our array of `friends`, is actually at index 0. 'Beth' is at index 1,  \
      'Courtney' is at index 2, and so on. \
      <br><b>Challenge: </b>Let's pull an element out of our array. If I wanted the first element in the array, typing `friends[0]`  \
      will return the element in 'friends' at index 0. Give it a try - write a statement below the 'friends' array  \
      that will return 'Dalia' from the array.", 
      hint1: "Your code should look like `friends[x]`, where x is the index that indicates Dalia's position in the array.",
      hint2: "Remember, the index of the first element in the array is 0, not 1. This means Dalia is at index 3.",
      pointValue: 50
    }
      ]);
  })
  .done(function(){
    server.listen(app.get('port'), function() {
    // app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'));
    })
    // .error(function(error){
    //   console.error('There was an error with syncing the database: ', error)
    // })
  });

// initialize socket communication 
// var peopleOnline = 0;
io.on('connection', function(socket) {
  // peopleOnline++;
  // io.emit('user connected', peopleOnline);

  socket.on('send message', function(message) {
    // Insert that message to database
    messageController.createMessage(message);

    // Send that message to everyone.
    io.emit('new message', message);
  });

  // socket.on('disconnect', function() {
  //   peopleOnline--;
  //   io.emit('user disconnected', peopleOnline);
  // });

});

// export for testing and flexibility
module.exports = app;
