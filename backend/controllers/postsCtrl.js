
//Imports
const { cookie } = require('express/lib/response');
const models = require('../models');

const jwtUtils = require('../utils/jwt.utils');

const fs = require('fs');
const { NOW } = require('sequelize');




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
        const title = req.body.title;
        const content = req.body.content;
        const mediaPost = "";
        if (req.file) { 
        mediaPost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
        // const dateAdd = Date.now();
        // const media = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

    //    if (req.file) {
    //     post.media = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;
    //     }

        if (title == null || content == null) {
            return res.status(400).json({'error': 'missing parameters'});
        }

        if (title.length <=  TITLE_LIMIT || content.length <= CONTENT_LIMIT ) {
            return res.status(400).json({'error': 'invalid parameters'});
        }
        
        models.Post.create({
            title: req.body.title,
            content : req.body.content,
            media :  mediaPost,
            userId: userId,
            dateAdd: Date.now()
        })
        .then(result => {
            res.status(201).json({
                message:'Post created successfully !',
                post: result,
                
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

    // getOnePost: function (req, res) {
        
    //     models.Post.findOne({
    //         where : { id: req.params.id },
    //        })
    //        .then(post => {res.status(200).json(post)})
    //        .catch(error => res.status(404).json({ error }))
    // },

    getAllPost: function (req, res) {
        models.Post.findAll({
           order:[[
                'id', 'DESC'
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

        models.Post.findOne({ 
           where : { id: req.params.id },
        })
        .then(post => {
            // if ( media != null) {
            //     const filename = post.media.split('/images/')[1];
            //     console.log(filename)
            //     fs.unlink(`images/${filename}`,() => {
            //         models.Post.destroy({
            //             where: { id: req.body.id }
            //         })
            //         .then(() => res.status(200).json({ message: 'Post deleted !'}))
            //         .catch( error => res.status(404).json({ message: 'Post not deleted !'})); 
            //     });
            //  }
             models.Post.destroy({ where: {id: req.params.id }})
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


        
    },

    updatePost: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const id = req.body.id;

        models.Post.findOne({ where: {id: id}})
        .then(post => {
            if(userId === post.userId){
                const updatePost = {
                    title: req.body.title,
                    content: req.body.content,
                }
                // if (req.file) {
                //     updatePost.image = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
                //     const filename = post.image.split('/images/')[1];
                //     fs.unlinkSync(`images/${filename}`)
                //     console.log(post.image);
                // }
                models.Post.update(updatePost, {where: {id: id}})
                .then(()=>res.status(200).json({ message: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error}))
            } else {
                return res.status(403).json({'error':'Unauthorize'})
            }
        })
        .catch((error) => res.status(500).json({ error }));
    }
       
    
}
