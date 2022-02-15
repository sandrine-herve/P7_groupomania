//Imports
const models = require('../models');
const asyncLib = require('async');
const jwtUtils = require('../utils/jwt.utils');

//Routes
module.exports = {
    createComment: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //params
        const content = req.body.content;
        const dateAdd = Date.now();
        const postId = req.body.postId;
        const comment = {
            content: content,
            userId: userId,
            postId: postId,
            //media:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
            dateAdd: dateAdd
        }

        if ( content == null) {
            return res.status(400).json({ 'error':'invalid parameter'});
        }

        console.log(comment);

        models.Comment.create(comment)
        .then(result => {
            res.status(201).json({
                message:'Comment created successfully !',
                comment: result
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong !',
                error: error
            })
        });
        

    },
    getOneComment: function (req, res) {
        const id =req.body.id;
        models.Comment.findOne({
            where: {id},
            order: [['id', 'DESC']], 
        }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(500).json({
                message: 'Something went wrong'
            });
        });
    },

    getAllComment: function (req, res) {
        models.Comment.findAll({
           order:[[
                'createdAt', 'DESC'
           ]]
            }).then(result => {
            res.status(200).json(result);
        }).catch(error => {
            res.status(400).json({
                message: 'Something went wrong'
            });
        });
    },

    deleteComment: function(req, res) {
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const commentIdToDelete = req.body.commentId; 
        

        if ( !userId ) {
            return res.status(400).json({message :'request invalid'})
        }

        models.Comment.destroy({
              where: { id: commentIdToDelete }
        })
        .then(result => {
            res.status(200).json({ message: 'Comment deleted !'})
        })
        .catch( err => {
            res.statut(404).json({ message: 'error !'})
        });  
    },
}