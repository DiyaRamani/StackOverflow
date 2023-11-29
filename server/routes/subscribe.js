import express from 'express'
import { subscription } from '../controllers/Users.js'

const router = express.Router()

router.post('/:id',subscription)

export default router
