# CYF-glossary-backend



## All available end points

### GET - Read all the terms
* https://cyf-glossary-backend.herokuapp.com/all-terms


### POST - Create a term 
* https://cyf-glossary-backend.herokuapp.com/all-terms


### GET - Read a single term
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### PUT - Update a term 
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### DELETE - Remove a term
* https://cyf-glossary-backend.herokuapp.com/all-terms/:id


### GET - Find terms by Tags
* https://cyf-glossary-backend.herokuapp.com/tags/:id


---

## Before calling the API

1. Please note that all the endpoints are open to public. As there is no user authentication feature. The terms you created may be deleted or updated by other users. 

2. Anyone may create new terms. No sign in requried.


---

## Seeds

1. We also created seeds in the database. So you have a few terms to start with. The seeds data contains *names*, *discription*, *link* and *tags*

2. Check it out at backend/db/seeds.js and backend/db/userSeeds.js
