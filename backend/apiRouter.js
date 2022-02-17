//Imports
const express = require('express');
const { argsArePrimaryKeys } = require('sequelize/lib/utils');
const usersCtrl = require('./controllers/usersCtrl');
const postsCtrl = require('./controllers/postsCtrl');
const commentsCtrl = require('./controllers/commentsCtrl');
const multer = require('./utils/multer-config');
const auth = require('./utils/auth')

//Router
exports.router = (function() {
    const apiRouter = express.Router();

    //Users routes
    apiRouter.route('/users/signUp').post(usersCtrl.signUp);
    apiRouter.route('/users/login').post(usersCtrl.login);
    apiRouter.route('/users/user').get(usersCtrl.getUserProfile);
    apiRouter.route('/users/delete').delete(usersCtrl.deleteUser);
    apiRouter.route('/users/logout').get(usersCtrl.logout);

    //Posts routes
    apiRouter.route('/posts/new').post(postsCtrl.createPost);
    apiRouter.route('/posts/getOne').get(postsCtrl.getOnePost);
    apiRouter.route('/posts/getAll').get(postsCtrl.getAllPost);
    apiRouter.route('/posts/delete').delete(postsCtrl.deletePost);
    //apiRouter.route('/posts/update').update(postsCtrl.updatePost);
    
    //Comments routes
    apiRouter.route('/comments/new').post( commentsCtrl.createComment);
    apiRouter.route('/comments/getOne').get(commentsCtrl.getOneComment);
    apiRouter.route('/comments/getAll').get(commentsCtrl.getAllComment);
    apiRouter.route('/comments/delete').delete(commentsCtrl.deleteComment);
    //apiRouter.route('/comments/update').update(commentsCtrl.updateComment);

    return apiRouter;
})();
