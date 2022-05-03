// Modulo para no tener la direccion de la base de datos en el codigo 
require('dotenv').config(); //crear variables de entorno

const app = require('./server')
require('./database');

app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'))
})