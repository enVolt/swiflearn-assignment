# Swiflearn Assignment

## Task 

Create a simple system in which a user is able to come, sign up with basic attributes like name, age, city, the grade of study, the board of study. Then on the backside, we should be able to assign some classes and questions to him. The user will be able to see upcoming classes on his side and some questions. For simplicity, the questions can be simple text. I mainly want to see the API creation part as well. Let me know if you have any doubts

## What functionality does it have?

* Basic Student Signup/Login flow
* Ability to create
  * Questions
  * Lectures
* Ability to assign/unassign (to Students)
  * Questions
  * Lectures
* Ability to fetch (for User)
  * Unanswered Questions
  * Assigned Lectures


# Guide to Repo

This repository has two parts -

1. Client
2. Server

Both need to be started in order to run the project.

## Prerequisites

* Node.js (This was built on v12.14.1)
* PostgreSQL (or can be run on MySQL by installing relevant adapter on `server` part)

# How to run

1. Create `.env` file for Backend (`PROJECT_DIR/server/.env`) refering to `.env.example`. All the variables are self-explanatory.

2. Install Deps -

```bash
cd ./client
npm i

cd ../server
npm i
npm run migrate
npm run seed
```

3. Start Backend -

```bash
cd ./server
npm start
````

4. From a different terminal, run Frontend -

```bash
cd ./client
PORT=3001 npm start
```

5. Web browser should open pointing to `http://localhost:3001`


