const express = require('express');
//const cors = require('cors');
const { mongoConnection } = require("./mongoConnection");
//const userRoute = require("../routes/userRoute");
//const authRoute = require("../routes/authRoute");
const routes = require("../routes");

class Server {
	constructor(){
		this.app = express();
		this.port = process.env.PORT;
		this.connectDB();
		this.middlewares();
		this.configRoutes();
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

	configRoutes(){
		for(let i in routes)
			this.app.use(routes[i].path, routes[i].router);
	}

	listen(){
		this.app.listen(this.port, ()=>{
			console.log(`Running server on ${this.port}`);
		});
	}
}
module.exports = Server;