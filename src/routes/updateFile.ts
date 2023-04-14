import { Router } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import { ArquivoController, ErroUpload } from '../controllers/ArquivoController'

export const updateFileRouter = Router()

updateFileRouter.put('/:id', async (req: any, res: any) => {
    const id = req.params.id
    if (!req.files || Object.keys(req.files).length == 0) {
        return res.status(400).send('Nenhum arquivo recebido')
    }

    const diretorio = path.join(__dirname, '..', '..', 'arquivos_temporarios')
    if (!fs.existsSync(diretorio)) {
        fs.mkdirSync(diretorio)
    }

    const bd = req.app.locals.bd
    const arquivoCtrl = new ArquivoController(bd)

    const {_id, caminhoArquivoTemp} = await arquivoCtrl.updateFile(id ,req.files.files)

    fs.unlinkSync(caminhoArquivoTemp)

    res.json({
        id: _id
    })
})