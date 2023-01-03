const homeHandleRouter = require('./handleRouter/homeHandleRouter')
const userHandleRouter = require('./handleRouter/userHandleRouter')
const postHandleRouter = require('./handleRouter/postHandleRouter')
const personalPageHandleRouter = require('./handleRouter/personalPageHandleRouter')
const router ={
    'home' : homeHandleRouter.showHome,
    'login': userHandleRouter.login,
    'register': userHandleRouter.createUser,
    'post': postHandleRouter.createPost,
    'personalPage': personalPageHandleRouter.showPersonalPage,
    'deletePost': personalPageHandleRouter.deletePost,
    'editPost': personalPageHandleRouter.editPost,
    'editUser': personalPageHandleRouter.editUser,
    'editUserImage': personalPageHandleRouter.editUserImage

}
module.exports = router;