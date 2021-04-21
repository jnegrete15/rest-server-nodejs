const express = require('express');
const cors = require('cors');
const { dbconnection } = require('../database/config')

class Server {

  constructor(){
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    //Connect to database
    this.connectDatabase();

    //Middlewares
    this.middlewares();

    //App routes
    this.routes();
  }

  async connectDatabase(){
    await dbconnection()
  }

  middlewares(){

    //CORS
    this.app.use( cors() )
    this.app.use( express.json() )

    //Public directory
    this.app.use(express.static('public'));
  }

  routes(){
    this.app.use(this.usersPath , require('../routes/user'));
  }

  startServer(){
    this.app.listen(this.port)

  }
}

module.exports = Server;