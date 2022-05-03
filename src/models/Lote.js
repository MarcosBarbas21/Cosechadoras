const {Schema, model} = require('mongoose');

const LoteSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    Coordenadas:{
        type: String,
        required: true
    } 
}, {
    timestamps: true
}
)

module.exports = model('Lotes', loteSchema)