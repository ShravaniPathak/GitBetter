import {Router} from 'express'
import { LogIn, refreshAccessToken, SignUp } from '../controllers/authController.js'

const router=Router()

router.post("/signup", SignUp)
router.post("/login",LogIn)
router.post("/refresh",refreshAccessToken)

export default router;