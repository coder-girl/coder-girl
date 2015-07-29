/* 
* @Author: nimi
* @Date:   2015-05-25 10:32:38
* @Last Modified by:   nimi
* @Last Modified time: 2015-06-13 11:43:32
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
      instructions:"Welcome to Coder Girl! We'll be working through a series of challenges together in order to learn the fundamentals of JavaScript and computer programming. Let's get started! <br><br>\
      In JavaScript you can put any keyboard characters you want in quotes and you have created a \"string\". The quotes can \
      be single or double quotes, but they have to match. A string can be made up of a single letter, a single word or whole paragraphs. The \
      sky is the limit.<br><br><b>Challenge:</b> In the editor on the right, create a string that contains your favorite hashtag for selfies.<br><br>Note that in the editor, it now \
      says `//type your string on the next line`. By putting \"//\" before text, it turns the entire line into a comment that is ignored by JavaScript. \
      It allows you to write comments about your code to remind your later self what you did. So, make sure to write your brilliant new string \
      on line 2. Otherwise, if you write it on line 1 it will be ignored.<br><br>As you work through these challenges, if you ever feel stuck, pop \
      open the chat and reach out to other Coder Girls for help. You can also use the \"show hint\" button to view tips that will point you in the right direction.",
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
      get 7, you leave off the quotes.<br><br><b>Challenge:</b>Say you want to use JavaScript to write a text to your friend Caroline but all of your number\
      keys are broken  other than the number 1.In the editor, write out the string \"2cool4school\" but only using\
      the number 1.",
      hint1:"Your number 1 should NOT be in quotes in your code since you want to do regular addition.",
      hint2:"Your answer should be in the form of: `(6 + 6) + 'wordy' + (3 + 3 + 3) + 'more_wordy'`.",
      pointValue:150
    },

    {
      testCode: 3,
      title: "Puppies v. Kittens",
      instructions: "JavaScript variables can be thought of like nicknames. If you had a dog named Santa's Little Helper, you might not want to have to say Santa's Little Helper every time you call him. You might instead take to calling him Fuzzball.<br><br>Fuzzball then could be a variable that refers to Santa's Little Helper. You would declare this variable by writing:<br><br>`var Fuzzball = \"Santa's Little Helper\";`<br><br>When you first define a variable you need to use the `var` keyword. After that, you can change what Fuzzball is referring to without using `var`.<br><br>For instance, if Santa's Little Helper gets a furcut and you decide that your cat, Grinchy, is more like a Fuzzball, then you could reassign Fuzzball to Grinchy by just writing: `Fuzzball = \"Grinchy\";`<br><br>Then, whenever you call Fuzzball, you would be referring to Grinchy (though she might ignore you).<br><br>You can pick pretty much anything you want for variable names so long as (1) they aren't a few reserved magical JavaScript words, (2) they don't start with a number, and (3) they don't have spaces. Note that capitalization matters. `Fuzzball` is not the same as `fuzzball`.<br><br><b>Challenge: </b>In the editor, define the variable `DuchessFlufferton` and assign it to either \"puppy\" or \"kitten\".",
      content: "// enter your code below",
      pointValue: 50,
      hint1: "Did you make sure to start with the `var` keyword?", 
      hint2: "Did you make sure there is no space between 'Duchess' and 'Flufferton'?"
    },

    {
      testCode: 4,
      title: "Which Wand?",
      content: "var wandCheck1 = 5 < 3;<br>var wandResult1 = /* add the correct boolean here */;\
      <br><br>var wandCheck2 = 10 > 6;<br>var wandResult2 = /* add the correct boolean here */;<br><br>",
      instructions: "At this point, you have already seen several data types, including strings and numbers. Another common \
      data type is a boolean. \"Boolean\" is just a fancy word for the category that includes `true` and `false`. These values are \
      neither strings nor variables - they are their own type altogether. So, you do not put `true` or `false` in quotes.  They stand all on their own. \
      Booleans are particularly useful for comparisons, such as 3 > 2 \
      or 3 < 2. The > and < signs are the traditional symbols for \"is greater than\" and \"is less than\", respectively. So `3 > 2` evaluates \
      to `true`, and `3 < 2` evaluates to `false`.  \
      <br><br>Imagine you are strolling down Diagon Alley and you wander into Ollivander\'s to check out the new wands. \
      You are shocked to find the whole store in disarray. You want to help Ollivander sort the wands by length.  \
      You have the lengths, but you need to determine which length is greater when comparing two wands. \
      <br><br><b>Challenge: </b>In the editor, assign the correct boolean to `wandResult1` and `wandResult2` based on the \
      corresponding `wandCheck1` and `wandCheck2` comparisons. Have at it, Hermione.",
      hint1: "Remember that since `true` and `false` are not strings, they do not require quotation marks.",
      hint2: "`wandResult1` should be `true` if 5 is less than 3. If 5 is not less than 3, `wandResult1` should be `false`.",
      pointValue: 200
    },

    {
      testCode: 5,
      title: "Operation Conquer Operators",
      content: "//insert code below",
      instructions: "You know how we said earlier that you can do math in JavaScript?  We were not kidding. \
      <br><br>Check out a few of the operators available to you: \
      <br><br><b>Addition (+)</b> \
      <br> 2 + 2 = 4 \
      <br><br><b>Subtraction (-)</b> \
      <br> 10 - 2 = 8 \
      <br><br><b>Multiplication (*)</b> \
      <br> 2 * 12 = 24 \
      <br><br><b>Divsion (/)</b> \
      <br>  24/2 = 12 \
      <br><br><b>Modulo (%)</b> \
      <br> (%) returns the remainder from dividing two numbers, so 5 % 2 = 1. Suppose we would like to know if any given number is an even number. \
      We can use modulo here to help us out. If the remainder is 1, not zero, then we know it is an odd number. \
      <br><br><b>Increment (++) </b> \
      <br> ++ is a shortcut to increment a variable that is storing a number by 1. \
      <br> `var x = 10;` \
      <br> `x++` , will return `11`; \
      <br> We can also get really clever and increment by 2 by using `x += 2`. \
      <br><br><b>Decrement (--)</b> \
      <br> -- is a shortcut to decrement (decrease) a variable that is storing a number by 1. \
      <br> `var x = 0;` \
      <br> `x--` , will return `-1`; \
      <br>And similarly, we can decrement by 2 by using `x -= 2` \
      <br><br><b>Challenge: </b>In the editor, set a variable named `moduloResult` equal to the result of 21 % 10.  \
      <br>", 
      hint1: "What does that % mean again? Check above. To be really cool you could say 21 mod 10.",
      hint2: "If you divide 21 by 10, what would the remainder be?",
      pointValue: 300
    },

    {
      testCode: 6,
      title: "Ice Cream for Jane",
      content: 'var janesChoice;<br>var cookiesAndCream = true;<br>var rockyRoad = false;<br>var mintChip = true;<br>var doubleScoop = false; <br>janesChoice = /*write the logical expression here*/;',
      instructions: "<br>In javascript, the || represents the logical OR operator, which returns `true` if at least one of the values being compared has a \"truthy\" value. \
      <br><br>`true || false` will return `true`. \
      <br>`false || true` will return `true`. \
      <br>`true || true` will return `true`. \
      <br>`false || false` will return `false`. \
      <br><br>Additionaly, we have &&, the logical AND operator, which returns `true` only if both values are \"truthy\", and `false` otherwise. \
      <br><br>`true && true` will return `true`. \
      <br>`false && false` will return `false`. \
      <br>`false && true` will return `false`. \
      <br>`true && false` will return `false`. \
      <br><br>And finally, `!` or \"not\", performs logical negation. `!true` evaluates to `false`, and `!false` returns `true`.\
      <br><br>`var atHome = true;` \
      <br><br>`!atHome` is now false when javascript evalutes it. \
      <br>We can also do `!!atHome`, which changes `!atHome` from above to false, and then because of the second !, back to true. \
      <br>This also converts anything into its boolean value, either true or false. For example 0, is a falsey value, whereas other numbers are truthy. \
      So `!!0` will return `false`. \
      <br><br><b>Challenge: </b>Jane is getting ice cream, and would like either a single scoop of cookiesAndCream or mintChip. Assign a value to `janesChoice` \
      by combining all of the variables given with logical operators so that the variable janesChoice will evaulate to `true`.",
      hint1: "Are you wrapping your expressions in parens? `((x || y) && (y && z))`",
      hint2:  "Are you using the NOT operator? `!(a || b)`",
      pointValue: 50
    }, 

    {
      testCode: 7,
      title: "Expressive Expressions",
      content: 'var Timone = 5 == 6;<br>var Pumba = "two wrongs" !== "one right";',
      instructions: "Booleans and operators are core components of expressions. Expressions are any unit of code that simplifies to a single value. You've already seen several examples of expressions: valid expressions include:<br>- variable assignments (`var x = 7`),<br>- mathematical operations (`5 * 7`),<br>- string operations (`'my' + 'string'`),and<br>- logical operations - operations that evaluate to `true` or `false` - (`5 < 6`).<br><br>In addition to the things you have already seen, other common operators that frequently appear in expressions include >= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to). For example, all of the following logical expressions would evaluate to `true`: `'Mark' != 'Marcus'`, `5 == 5`, `'a' <= 'b'`, and `2 >= 2`.<br><br><b>Challenge: </b>Create an expression using either == or != that compares `Timone` and `Pumba` and evaluates to `true`.",
      hint1: "First, create a theory about what value you expect `Timone` and `Pumba` to be. Then choose the appropriate operator",
      hint2: "Your code should look like `Timone ? Pumba`, where the question mark is replaced by the correct operator.",
      pointValue: 100
    },

    {
      testCode: 8,
      title: "To not to be or to really not to be",
      instructions: "JavaScript is quite serious about a thing not being. So much so that it has two different values to represent nothingness. `null` is used when it is certain that something does not exist. `undefined` is used when it is unknown what an item is or whether it exists. <br><br>For instance, if Juliet were single because she dumped her boyfriend Romeo, you would say `var JulietBoyfriend = null`.  But if you are uncertain as to whether Juliet has a boyfriend, you would say `var JulietBoyfriend = undefined`.<br><br>`undefined` and `null` are both called \"falsy\" values in JavaScript. This means the expression `!undefined` evaluates to `true` and the expression !null evaluates to `true`. Strangely, neither `null` nor `undefined` actually equals `false` in JavaScript. Weird, I know.<br><br><b>Challenge: </b>Your buddy Benvolio just called and said he has heard that a party has been declared for this Friday.  He had no further information yet. In the editor, write \"null\" if you think the variable `party` would evaluate to `null` in this instance or \"undefined\" if you think it would evaluate to `undefined`.",
      content: "//enter code here",
      pointValue: 50,
      hint1: "Benvolio has declared the party variable so it exists, but it does not have a meaning yet.",
      hint2: "`undefined` and `null` are not strings, so remember to leave out the quotes!"

    },

    {
      testCode: 9,
      title: "Get out your party shoes!",
      instructions: "Often in coding, you want to be able to (1) execute some code if one statement is true, \
      (2) execute different code if another statement is true, or (3) \
      execute some default code if neither condition (1) or (2) is met. The outline for how to do this is: \
      <br><br> `if(thisIsTrue){`\
        <br>   `// do something;`\
       <br> `} else if(somethingElse){`\
        <br>    `// do something different;`\
      <br>  `} else{`\
      <br>  `// do the default; `\
      <br>  `}` \
      <br><br><b>Challenge: </b>Imagine you are trying to figure out what to wear to this Saturday\'s killer party. Chloe thinks you should wear a skirt. Bethany definitely thinks it is a jeans type of affair.  \
      Stephanie thinks it is really casual. Fill in the code in the editor so that if you decide your `clothes` should be jeans, the `shoes` variable is set to \"boots\", \
      if you choose a skirt, `shoes` is set to  \"platforms\", and \
      if you wear anything else, `shoes` is set to \"flip flops.\"",
      content: "// don't worry about using `var` to declare clothes or shoes - we'll take care of that for you this time<br><br>if (clothes === \"jeans\"){ <br><br>  //enter code here <br> } else if (clothes === \"skirt\"){ <br><br>  //enter code here <br> } else {<br>  //enter code here <br> }",
      pointValue: 100,
      hint1: "Did you make sure to set `shoes` to a string in each condition?",
      hint2: "Did you enclose your strings in quotes?"
    },

    {
      testCode: 10,
      title: "Hooray for Arrays!",
      content: 'var friends = ["Annabelle", "Beth", "Courtney", "Dalia", "Erica"];',
      instructions: "Take a look at the editor. We've added a list of friends' names in a specific format. This type of  \
      list, of the form `['element1', 'element2', 'element3', ...]` is called an array. Arrays are ordered, and each \
      element has an 'index' that demonstrates its position in the list. <br><br>  \
      One thing to note about array order and indexes is that programmers often like to start counting at 0 rather than 1.  \
      This means that \"Annabelle\", the first element in our array of `friends`, is actually at index 0. \"Beth\" is at index 1,  \
      \"Courtney\" is at index 2, and so on. \
      <br><br><b>Challenge: </b>Let's pull an element out of our array. If I wanted the first element in the array, typing `friends[0]`  \
      will return the element in `friends` at index 0. Give it a try - write a statement below the `friends` array  \
      that will return 'Dalia' from the array.", 
      hint1: "Your code should look like `friends[x]`, where x is the index that indicates Dalia's position in the array.",
      hint2: "Remember, the index of the first element in the array is 0, not 1. This means \"Beth\ is at index 1.",
      pointValue: 50
    },

    {
      "testCode":11,
      "title": "A Good Man-darin is Hard to Find",
      "instructions": "Imagine that you keep a list of your current nail polish colors in an array (you're really organized).  Before you buy a new shade you want to know your current count of colors.  You could count all of the items in your list, but that would be a pain.<br><br>Instead, let's use JavaScript's `.length` property for arrays and strings. If you append `.length` at the end of an array or string (or a variable referring to an array or string), the value returned will be the length of the array or string.<br><br>For example,`[\"I\", \"am\", \"an\", \"array\"].length` will return `4` since there are 4 elements in the array. `\"Manicure\".length` would return `8` since there are 8 characters in the string \"Manicure.\"<br><br><b>Challenge: </b>In the editor, there is an array of nail polish colors. Call `.length` on the array to count up all of your magnificent colors.",
      "content": 'var shades = ["A Woman\'s Prague-ative", "A Grape Fit!", "All Sparkly and Gold", "Barre My Soul", "Be Magentale With Me","Berlin There Done That", "Brains and Bronze", "Call Me Gwen-ever", "Cement The Deal", "Chillin\' Like a Villian","Desperately Seeking Sequins", "Don\'t Bossa Nova Me Around", "Teal The Cows Come Home", "Turquoise and Caicos"];',
      "pointValue": 200,
      "hint1": "Did you add '.length' to the end of the shades array?",
      "hint2": "Your answer should be of the form: ArrayVariableName.length"
    },

    {  
      "testCode": 12,
      "title": "Contacts object",
      "content": "var contactList = {<br> 'Annabelle': 5103238231,<br> 'Beth': 4253839832,<br> 'Courtney': 2023948221,<br> 'Dalia': 9176241223,<br> 'Erica': 2124450339<br>}",
      "instructions": "Remember in a previous challenge we stored a list of friends' names in an array, which looked like: <br>`var friends = ['Annabelle', 'Beth', 'Courtney', 'Dalia', 'Erica']`. An array is a good method for keeping track of lists like this, but what if we wanted to store a phone number for each of our friends? To associate each name with another piece of data, we'd want to use a different structure, called an object.<br><br>Take a look at the code in the editor. You'll notice that each entry in the `contactList` object has two components: a key and a value. The key, in this case a friends' name, is a unique identifier used to access the corresponding value. And as you can see, the values in `contactList` are the friends' phone numbers.<br><br>Looking up a value in an object is similar to accessing an element in an array, except that instead of passing in an integer that represents the element's index, we pass in the key in order to access the value. For example, to retrieve Beth's phone number, we would write `contactList['Beth']`, which would return 4253839832. Object keys can be numbers, but note that unlike arrays, objects are not ordered. Even if you had an object with numeric keys, the keys don't give order to the key/value pairs in the object. So if you had `var myObject = {0: 'zero', 1: 'one'}`, it is incorrect to think of 0 as coming before 1. The concept of order simply doesn't apply to objects. Ok, enough talking, let's try it out. <br><br><b>Challenge:</b> How would you get Courtney's phone number from `contactList`? Give it a try.",
      "hint1": "Follow the form `objectName[key]`",
      "hint2": "Make sure you're using brackets [] rather than parentheses!",
      "pointValue": 225
    },
    {  
      "testCode": 13,
      "title": "More on Objects",
      "content": "var tasks = {<br>'monday': ['Finish history project'],<br>'tuesday': ['Wash dishes', 'Turn in Math Homework'],<br>'thursday': ['Go to dance practice', 'Start book report'],<br>}",
      "instructions": "We've added another object to the editor. The `tasks` object contains a list of tasks that need to be accomplished on certain days of the week. Notice that we're storing arrays within our object, which is totally ok. Objects can even store other objects as values (which themselves could have objects as values...).Also notice that different key/value pairs within an object are separated by commas.<br><br>In the previous challenge, you learned that object values can be accessed using bracket notation - if I wanted Tuesday's tasks, I could write `tasks['tuesday']`. But there's another way we can retrieve values from an object called called 'dot notation': `tasks.tuesday`. To convert from bracket notation to dot notation, we simply remove the quotation marks, and replace the brackets with a period.<br><br><b>Challenge:</b> Try it out in the editor - use dot notation to retrieve Monday's tasks.",
      "hint1": "Remember, you don't need the quotes!",
      "hint2": "Don't forget to include the period between the object name and the key name.",
      "pointValue": 200
    }, 
    {  
     "testCode": 14,
     "title": "For every text message",
     "content": '<br>\tvar messages = []; <br>\tfor(var i= /* add an initial value here */;/* add a condition to be checked on each iteration here*/; /* increment your counter variable here */) {<br>\t\tmessages.push("I will not text during class");<br>\t} <br> \tmessages;',
     "instructions": "Oh no, you got caught texting in class. As a punishment, you have to stay after class and write out, 'I will not text during class.' 30 times. You promised your best friend that you would go to the movies, so you can’t waste time on this.<br><br>After thinking for a bit, you realize, you can use what you learned on Coder Girl to do this. Good decision, you can keep your promise with your friend and score some brownie points with your teacher! A For loop is one of the ways in JavaScript that allow Coder Girls to execute a command or a series of commands for a certain number of times.<br><br>The basic structure of a for loop is:<br><br>`for ( expression ) {`<br>`//statements to be executed based on the condition provided`<br>`}`<br><br> A for loop will execute any statements within its curly braces, so long as the condition is met.<br><br>For example:<br><br>`for (var i = 0; i < 10; i++) {`<br>`  //the statements written here will be executed 10 times.`<br>`}`<br><br>The first part of the expression is initializing the variable `i`. Here, we are setting `i` to be 0. We are creating a counter variable, that we can increment later.<br><br>`(var i = 2;...)`. <br><br>Because `i` holds the number 0, our counter will begin starting at 0.<br><br>The second part of the expression is a condition. A condition is checked before each loop runs, and if it is true, the statement is executed.<br><br>`(var i = 0; i < 10;...)`. Here we are setting the upperbound our for loop - we are telling the for loop when to stop.<br><br>So, as long as `i` is less than 10, this for loop will keep iterating and execute the condition provided.<br><br>Since, `i` is 0, and because `i` at this point in time and is less than 10, a statement is executed.<br><br>`(var i = 0; i < 10;  i++)` {<br> 'print me out' // this statement 'print me out' is printed outn <br>}<br><br>The last part of our expression is evaluated at the end of each loop. In other words, after it checks to see if the condition is true, it will increment the variable `i` from 0 to 1, because we are incrementing `i` by 1. (Fun Fact: In addition to incrementing `i`, you can also decrement the counter variable on each iteration. This requires a bit of restructuring, so we will do it another time.)<br><br><b>Challenge:</b> Quick! Fill in the missing parts of the for loop expression, so that you can join your friend at the movies. Don't worry about the contents of the loop for now - we\'ll cover what that code is doing in a later challenge.",
     "hint1": "Double check your expression, are you setting it up correctly?",
     "hint2": "You should start your loop at 0, and set the upper bound to be 30.",
     "pointValue": 300
    }, 
    {
      testCode: 15,
      title: '#string_looping',
      instructions: 'Your friend Charlotte is obsessed with turning anything and everything into a hashtag expression #obsessed. You are considering an intervention.\
      Before you order catering for the intervention, you want to make sure you have some proof.\
      <br><br><b>Challenge</b>You have an tweet from Charlotte. The full tweet \
      is in the editor. Create a for loop that will iterate over the characters in `tweetFromCharlotte` and increment `hashtagCount` every time \
      "#" appears in the string. That way you can count up the hashtags in Charlotte\'s message without having to do it #manually.', 
      content: 'var tweetFromCharlotte = \"Could you believe gym class today? #ridiculous #gym #class #gymclass. If they wanted us to play #tennis they could have at least \
      spread us out on more than two courts.  #courts #play #crowded #noworkout #fitSomeOtherDay  I should really have a talk with Coach. #one_on_one #coach #sitdown\"; \
      <br>var countHashtags = 0; \
      <br>  \
      <br>  // your code here',
      pointValue: 100,
      hint1: 'You want your upper bound of the for loop to be the length of the tweet from Charlotte. Do you remember how to find the `.length` of a string?',
      hint2: 'In the body of your for loop, check the current character to see `if` is a \"#\". If it is, increment `hashtagCount`.',
    }
      ]);
  })
  .done(function(){
    server.listen(app.get('port'), function() {
    // app.listen(app.get('port'), function() {
      console.log("Node app is running at localhost:" + app.get('port'));
    })
    // .error(function(error){
    // .catch(function(error){
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
