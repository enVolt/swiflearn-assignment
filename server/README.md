# Swiflearn Assignment

## Task 

Create a simple system in which a user is able to come, sign up with basic attributes like name, age, city, the grade of study, the board of study. Then on the backside, we should be able to assign some classes and questions to him. The user will be able to see upcoming classes on his side and some questions. For simplicity, the questions can be simple text. I mainly want to see the API creation part as well. Let me know if you have any doubts

# How to run?

## Backend
* Create a `.env` from `.env.example` file. All the variables are self-explanatory.

* Setup project -- 

```bash
cd server
npm install
```

Start Backend Server
```
npm start
```

## Developer Guide

* Use `sequelize-cli` for migrations
* All the models are currently in `./app/models/index.js`
* Use `bunyan` to watch logs in human readable format ([Bunyan](https://github.com/trentm/node-bunyan#cli-usage)).


## TODO

* models cleanup
* Admin auth implementation is yet to be done.
* Subject has to be created manually.

