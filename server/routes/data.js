import data from '../controllers/data.js'
import koa_router from 'koa-router'
const router = koa_router()

router.get('/imgList/:type', data.getBanners)
export default router
