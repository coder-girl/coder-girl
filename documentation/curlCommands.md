
#### Post a challenge

This command will add a challenge into the database. If the challenge already exists, it won't create a duplicate. Use the format of the object in dataObjects.js as a template of the object being passed into the body of the request

>curl -i -X POST -H "Content-Type: application/json" -d 'ENTER_OBJECT_HERE_BETWEEN_QUOTES' http://localhost:3000/api/challenges/addChallenge
