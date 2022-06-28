//express
const express = require('express')
const app = express()
//rutas
const productos = require('./router/productos.js')
const index = require('./router/index.js')
//db
const db = require('./models/misproductos.js')
//para poder joinear la ruta ja
const path = require('path')
//importo los motores
const { engine } = require('express-handlebars')
const pug = require('pug');
const ejs = require('ejs');

/*seteo los motores*/
app.engine('handlebars',engine());
app.set('view engine', 'handlebars');
app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'))


//direcctorio de las vistas
app.use(express.static('views'))
app.use(express.json())
app.use(express.urlencoded({ extended : true }))
//uso la INSTANCIA DEL DB y lo paso en el middleware
app.use(function(req,res,next){
	req.db = db
	next()
})

//index para la carga de datos
app.use('/',index)
//plantillas
app.use('/api',productos)

app.listen('8080',()=>{
	console.log('todo perfecto')
	// console.log(db)
})