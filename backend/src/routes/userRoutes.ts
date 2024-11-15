import { Router } from 'express'
import { UserController } from '../controllers/userController'

const router = Router()
const userController = new UserController()

router.post('/start', (req, res) => userController.start(req, res))

export default router

