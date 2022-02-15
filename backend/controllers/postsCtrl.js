//Imports
const { cookie } = require('express/lib/response');
const models = require('../models');
const jwtUtils = require('../utils/jwt.utils');
const asyncLib = require('async');
const fs = require('fs');
const { NOW } = require('sequelize');
const multerConfig = require('../utils/multer-config');



//Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//Routes
module.exports = {
    createPost: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //params.
        const name = req.body.name;
        const title = req.body.title;
        const content = req.body.content;
        const dateAdd = Date.now();
        const media = req.body.media;
        const post = {
            name: name,
            title: title,
            content: content,
            userId: userId,
            media: media,
            dateAdd: dateAdd
        }

        if (media) {
            post.media = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
        }

        if (title == null || content == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (title.length <=  TITLE_LIMIT || content.length <= CONTENT_LIMIT ) {
            return res.status(400).json({'error': 'invalid parameters'});
        }

        console.log(post);
        
        models.Post.create(post)
        .then(result => {
            res.status(201).json({
                message:'Post created successfully !',
                post: result
            });
        })

        .catch(error => {
            res.status(500).json({
                message: 'Something went wrong !',
                error: error
            })
        });
        

    },

    getOnePost: function (req, res) {
        const id =req.body.id;
        models.Post.findOne({
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

    getAllPost: function (req, res) {
        models.Post.findAll({
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

    deletePost: function(req, res) {

        models.Post.findOne({ where: { id: req.body.id }})
        .then(post => {
            if ( media != null) {
                const filename = post.media.split('/images/')[1];
                console.log(filename)
                fs.unlink(`images/${filename}`,() => {
                    models.Post.destroy({
                        where: { id: req.body.id }
                    })
                    .then(() => res.status(200).json({ message: 'Post deleted !'}))
                    .catch( error => res.status(404).json({ message: 'Post not deleted !'})); 
                });
             }
             models.Post.destroy({ where: {id: req.body.id }})
            .then(Post => res.json({
                error: false,
                message: 'Post deleted'
            }))
            .catch(error => res.json({
                error: true,
                 error: error
            }));
        })
        .catch( error => res.status(500).json({message: 'error !'}));


        
        }
    
}