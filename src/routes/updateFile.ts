import { Router } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import { ArquivoController, ErroUpload } from '../controllers/ArquivoController'

export const updateFileRouter = Router()

updateFileRouter.put('/:id', async (req: any, res: any) => {
    const id = req.params.id
    const file = req.files.files
    if (!req.files || Object.keys(req.files).length == 0) {
        if(Object.keys(req.files).length > 1) {
            return res.status(400).send('Mais de um arquivo recebido')
        }
        return res.status(400).send('Nenhum arquivo recebido')
    }

    
    try {
        const diretorio = path.join(__dirname, '..', '..', 'arquivos_temporarios')
    
        if (!fs.existsSync(diretorio)) {
            fs.mkdirSync(diretorio)
        }

        const bd = req.app.locals.bd
        const arquivoCtrl = new ArquivoController(bd)

        const {_id, caminhoArquivoTemp} = await arquivoCtrl.updateFile(id ,file)

        fs.unlinkSync(caminhoArquivoTemp)

        return res.status(200).json({
            id: _id
        })
    } catch (erro) {
        console.log(erro)
        return res.status(500).json({ mensagem: 'Erro ao tentar atualizar' })
    }
})