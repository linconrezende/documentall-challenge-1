# NodeJS as res api and VueJS as front end
Simple REST API using Sequelize and Express and a front-end using VueJS with Vuetify.
> **Any project can allways be better but I came up with this solution with the time and knowledge that I have today.**

# Table of Contents  
[Demo](#de-mo)  
[About the project](#ABOUT)  
[Best case scenario](#BESTCASE)  
[NodeJS API](#nodeapi)  
[API call examples](#call-examples)  
[Installation](#install-guide)  
[REQUIREMENTS](#require-ments)  
[Clone folder](#CLONE)  
[back-end](#back-end)  
[front-end](#front-end)   

<a name="de-mo"/>

# DEMO
(coming soon)

<a name="ABOUT"/>

## About the project
https://nodejs.org | https://vuejs.org | https://vuetifyjs.com  
This project is part of the selection process to work for [Documentall](https://www.documentall.com.br/)

<a name="BESTCASE"/>

# Best case scenario
Firstly, I would separete the front-end and the back-end and implement CI/CD (dockerfile and pipelines if using AWS) but for this project's purpose, it's better this way. Secondly use OAuth if it's exposed to the internet.  
I could also implement unit tests in the front-end and in the back-end and a decent documentation.

<a name="nodeapi"/>

# NodeJS API
(coming soon)

<a name="call-examples"/>

## API call examples
(coming soon)

<a name="install-guide"/>

# Installation

<a name="require-ments"/>

## REQUIREMENTS
- [Node 14.x](https://nodejs.org/en/)
- [vue-cli 3.x (vue-cli is not required but recommended)](https://v3.vuejs.org/guide/installation.html#release-notes)
- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [sequelize-cli (required to run migrations but can be installed locally with --save-dev option)](https://sequelize.org/master/manual/migrations.html)
- [nodemon (require for hot reload and dev purposes can be installed globally or locally with --save-dev option)](https://www.npmjs.com/package/nodemon)

<a name="CLONE"/>

## Clone folder:
git clone https://github.com/linconrezende/documentall-challenge-1

<a name="back-end"/>

## back-end (nodejs rest api)
### Install NodeJS (back-end) dependencies:
`cd node`  
`npm install`  

(if not instelled globally)  
`npm install --save-dev sequelize-cli`  

### Configuration
Create a copy of the .env.example file and change it accordingly (database connection)  

### Migrate database:
`npx sequelize-cli db:migrate`  

### Serve the api
`npm run serve`  



<a name="front-end"/>

## front-end (vue 3 with vuetify framework)
### Install vuejs (front-end) dependencies:
`cd vue`  (or cd ../vue if you are in the node folder)  
`npm install`  

### Configuration
Create a copy of the .env.example file and change it accordingly (api connection)  

### Serve the application
`npm run serve`  

### Building the application for production
`npm run build --production`  
