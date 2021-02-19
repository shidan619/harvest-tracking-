import express from 'express'
import authCtrl from '../controllers/auth.controller'
import newsCtrl from '../controllers/news.controller'
const router = express.Router()

router.route('/')
    .get(authCtrl.requireSignin,newsCtrl.list)
    .post(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,newsCtrl.create)

router.route('/:newsId')
    .get(authCtrl.requireSignin,newsCtrl.read)
    .put(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,newsCtrl.update)
    .delete(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,newsCtrl.remove)
router.param('newsId',newsCtrl.newsByID)

export default router