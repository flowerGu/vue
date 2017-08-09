import data from '../controllers/data.js'
import koa_router from 'koa-router'
const router = koa_router()

router.get('/banner', data.getBanners)
console.log(data.getBanners)
export default router
