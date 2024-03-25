const express = require('express');
//const cors = require('cors');
const { mongoConnection } = require("./mongoConnection");
const userRoute = require("../routes/userRoute");
const authRoute = require("../routes/authRoute");

class Server {
	constructor(){
		this.app = express();
		this.port = process.env.PORT;
		this.connectDB();
		this.middlewares();
		this.routes();
	}

	async connectDB(){
		await mongoConnection();
	}

	middlewares(){
		//this.app.use(cors);

		//lectura y parceo del body
		this.app.use(express.json());
		this.app.use(express.static('public'));
	}

	routes(){
		this.app.use(userRoute.path, userRoute.router);
		this.app.use(authRoute.path, authRoute.router);
	}

	listen(){
		this.app.listen(this.port, ()=>{
			console.log(`Running server on ${this.port}`);
		});
	}
}
module.exports = Server;