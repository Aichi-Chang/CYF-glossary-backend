# CYF-glossary-backend



## All available end points

### GET - Read all the terms
* https://cyf-glossary-backend.herokuapp.com/all-terms


### POST - Create a term 
* https://cyf-glossary-backend.herokuapp.com/all-terms


### GET - Read a single term
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### PUT - Update a term 
1. Can only be performed by admin and mentor roles
2. User will need to register and logged in
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### DELETE - remove a term
1. Can only be performed by admin and mentor roles
2. User will need to register and logged in
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### POST - User registration
* https://cyf-glossary-backend.herokuapp.com/register


### POST - User login
* https://cyf-glossary-backend.herokuapp.com/login


### GET - Read all users
1. Can only be performed by admin role
2. User will need to register and logged in
* https://cyf-glossary-backend.herokuapp.com/users


### GET - Read a single user
1. Can only be performed by admin role
2. User will need to register and logged in
* https://cyf-glossary-backend.herokuapp.com/users/:id


---

## Before calling the API

1. As the user need to register and log in to perfrom specific tasks. The server has an authentication feature and it will generate a token once user logged in.

2. To keep it simple. You will then need to create a *lib* folder and a file called *auth.js* in the frontend to save the token in your local storage.

3. The auth.js files looks like this (Not sure if we should give it to the students without explaination)

4. So now you have the token saved in your local storage (You can check it out in the browser inspect -> Application -> Storage -> Local Storage). When calling a secure route, you will need to enclose this token with fetch method. It could looks like this:
```js
import Auth from '../lib/auth'
.
.
.
fetch(url, {
  method: 'POST', // *GET, POST, PUT, DELETE, etc.
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
  credentials: 'same-origin', // include, *same-origin, omit
  headers: {
    Authorization: `Bearer ${Auth.getToken()}` // Auth.getToken() function will return localStorage.getItem('token')
    'Content-Type': 'application/json'
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  body: JSON.stringify(data) // body data type must match "Content-Type" header
})
```

---

## Seeds

1. We also created seeds in the database. So depending on the roles, you will be able to perform specific tasks (e.g. delete terms or get to read all users in the database)

2. Check it out at backend/db/seeds.js and backend/db/userSeeds.js
