import {Router} from 'express'
import { LogIn, implementRefreshAccessToken, SignUp } from '../controllers/authController.js'

const router=Router()

router.post("/signup", SignUp)
router.post("/login",LogIn)
router.get("/refresh",implementRefreshAccessToken)

export default router;