const mongoose = require('mongoose');
/*
const MONGODB_URI = process.env.MONGODB_URI;

const COSECHADORADB_MONGODB_HOST = process.env.COSECHADORADB_MONGODB_HOST;

const COSECHADORADB_MONGODB_DATABASE = process.env.COSECHADORADB_MONGODB_DATABASE;*/

const { COSECHADORADB_MONGODB_HOST, COSECHADORADB_MONGODB_DATABASE } = process.env;

const MONGODB_URI =`mongodb://${COSECHADORADB_MONGODB_HOST}/${COSECHADORADB_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    
})

    .then(db => console.log('Base de datos conectada'))//evento satifactorio
    .catch(err =>console.error(err));//evento con error
    /*
    const loteSchema = mongoose.Schema({
        Name:String,
        Coordenadas: String

    }) //esquema

    const LoteModel = mongoose.model('Lotes', loteSchema)
    
    // Mostrar Coleciones
    const mostrar = async ()=>{
        const lotes = await LoteModel.find()
        console.log(lotes)
    }
    
    // Crear Colecciones
    const crear = async ()=>{
        const lote = new LoteModel({
            Name:'Lote2',
            Coordenadas:'[-62.9451799, -35.9885804],[-62.9529691, -35.9822604],[-62.9473686, -35.9777457],[-62.9467678, -35.9781711],[-62.9445255, -35.976452],[-62.9373264, -35.9823472],[-62.9451799, -35.9886153]'

        })
        const resultado = await lote.save()
        console.log(resultado)
    }

    // Modificar Colecciones
    const actualizar = async (id)=>{
        const lote = await LoteModel.updateOne({_id:id,},
            {
                $set:{
                    Name:'Lote2'
                }
            })
    }
    
    // Eliminar Colecciones
    const eliminar = async (id)=>{
        const lote = await LoteModel.deleteOne({_id:id})
        console.log(lote)
    }

    // Llamada a procedimientos
    mostrar()
    //crear()
    //actualizar('625ebb8869c809b48f9b2d8c')
    //eliminar()*/