const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set('view engine','hbs');


app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = (`${now}:${req.method} ${req.url}`);
	console.log(log);
	fs.appendFileSync('server.log',log + '\n');
	next();
});

app.use((req,res,next) =>{
	res.render('maintainance.hbs');
});

app.use(express.static( __dirname + '/public'));

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});
app.get('/',(req,res) =>{
	//res.send('<h1>hello express</h1>');
	//res.send({
	//	name: 'kushal',
	//	likes: [
	//	'biking',
	//	'cities'
	//	]
	res.render('home.hbs',{
		pageTitle:'home page',
		welcomeMessage:'welcome to home page',
	});
});


app.get('/about',(req,res) =>{
	//res.send('about page');
	res.render('about.hbs', {
		pageTitle:'About page',
	});
});



app.get('/bad',(req,res) =>{
	res.send({
		error_message : 'this is error'
	});
});
app.listen(3000,() =>{
	console.log("server is up on port 3000");	
});