const express = require('express');
const { engine } = require('express-handlebars'); //tuve que cambiar exphbs por { engine } 
const path = require('path');


// initializations

const app = express();

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join (__dirname, 'views'));

app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));


// Global Vaiables

// Routes
app.use(require('./routes/index.routes'));
/*
app.get('/',(req, res)=> {
    res.render('index')
    //res.send('Hello World')
});
*/
// Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;