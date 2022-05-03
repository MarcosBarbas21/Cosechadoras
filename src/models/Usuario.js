const bcrypt = require('bcryptjs/dist/bcrypt');
const {Schema, model} = require('mongoose');
require('bcryptjs');

const UsuarioSchema = new Schema({
    nombre: {type: String, required: true},
    password: {type: String, required: true}

}, {
    timestamp: true
})

UsuarioSchema.methods.encrypPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);

};

UsuarioSchema.methods.matchPassword = function (password) {
    return bcrypt.compare(password, this.password)
}

module.exports = model('Usuario', UsuarioSchema);
