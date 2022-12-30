const homeHandleRouter = require('./handleRouter/HomeHandleRouter')
const router = {
    'home': homeHandleRouter.showHome,
    'create': homeHandleRouter.createProduct,
    'delete': homeHandleRouter.deleteProduct,
    'edit': homeHandleRouter.editProduct
}
module.exports = router;