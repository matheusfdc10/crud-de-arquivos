import { Router } from 'express'

export const teste = Router()

teste.get('/', async (req, res) => {
    return res.status(200).send('OK')
})