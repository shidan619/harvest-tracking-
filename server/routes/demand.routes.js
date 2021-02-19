import express from 'express'
import authCtrl from '../controllers/auth.controller'
import demandCtrl from '../controllers/demand.controller'
const router = express.Router()

router.route('/')
    .get(authCtrl.requireSignin,demandCtrl.list)
    .post(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,demandCtrl.create)

router.route('/:demandId')
    .get(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,demandCtrl.read)
    .put(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,demandCtrl.update)
    .delete(authCtrl.requireSignin,authCtrl.hasAdminAuthorization,demandCtrl.remove)
router.param('demandId',demandCtrl.demandByID)

export default router