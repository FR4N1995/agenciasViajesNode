import express from "express";
import router from './routes/index.js';
import db from './config/db.js';




const app = express();

//Definir el Puerto
const port = process.env.port || 4000;


//conectar a la base de datos
db.authenticate()
    .then(() =>{console.log('base de datos Conectada')})
    .catch(error => console.log(error));

// habilitar Pug
app.set('view engine', 'pug');

//obtener año actual (middlewere)
app.use((req, res, next)=>{
    const year = new Date();
    const mes = year.toLocaleString('default', {month: 'long'});
    res.locals.actualyear = year.getFullYear();
    res.locals.mesActual = mes;
    res.locals.diaActual = year.getDate();
    res.locals.namecite = 'Agencia de viajes';
     return next();
})

//agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//definir la carpeta publica
app.use(express.static('public'));
// esta linea fue para que pudiera encontrar los estilos al dar clic en un viajek
app.use('/viajes', express.static('public'));

// Agregar Router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
})