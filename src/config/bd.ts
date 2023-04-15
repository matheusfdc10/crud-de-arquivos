import { load } from 'ts-dotenv'

const env = load({
    URI_BD: String
})

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