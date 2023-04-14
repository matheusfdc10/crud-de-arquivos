import { Router } from 'express'
import { unlinkSync } from 'fs'
import { ErroDownload, ArquivoController } from '../controllers/ArquivoController';

export const deleteFile = Router()

deleteFile.delete('/:id', async (req, res) => {
    const id = req.params.id

    const bd = req.app.locals.bd
    const arquivoCtrl = new ArquivoController(bd)

    try {
        const response = await arquivoCtrl.deleteFile(id)
        return res.status(200).json({ deleted: !!response })
    } catch (erro) {
        switch (erro) {
            case ErroDownload.ID_INVALIDO:
                return res.status(400).json({ mensagem: ErroDownload.ID_INVALIDO })
            case ErroDownload.NAO_FOI_POSSIVEL_GRAVAR:
                return res.status(500).json({ mensagem: ErroDownload.NAO_FOI_POSSIVEL_GRAVAR })
            case ErroDownload.NENHUM_ARQUIVO_ENCONTRADO:
                return res.status(404).json({ mensagem: ErroDownload.NENHUM_ARQUIVO_ENCONTRADO })
            default:
                return res.status(500).json({ mensagem: 'Erro no servidor' })

        }
    }
});