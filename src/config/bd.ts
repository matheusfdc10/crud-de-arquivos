// import mongoose from 'mongoose'
import { load } from 'ts-dotenv'

// import { app } from '../app'

const env = load({
    URI_BD: String
})

// export const conectarNoBD = async () => {
//     mongoose.set("strictQuery", true);
//     await mongoose.connect(env.URI_BD)
//         .then((conexao) => {
//             app.locals.bd = conexao.connection
//             // console.log(conexao)
//             console.log('conectado ao banco')
//         })
//         .catch(err => {
//             console.log(err)
//         })


import { MongoClient } from 'mongodb'

import { app } from '../app'

export const conectarNoBD = async () => {
    const clienteMongo = new MongoClient(env.URI_BD, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    try {
        const conexao = await clienteMongo.connect()
        app.locals.bd = conexao.db()
        console.log(`App conectado ao bd ${conexao.db().databaseName}`)

        process.on('SIGINT', async () => {
            try {
                await conexao.close()
                console.log('Conexão com o bd fechada')
            } catch (erro) {
                console.log(erro)
            }
        })
    } catch (erro) {
        console.log(erro)
    }
}