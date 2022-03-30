
//Imports
const { cookie } = require('express/lib/response');
const express = require('express');
//const fileUpload = require('express-fileupload');
const app = express();

const models = require('../models');

const jwtUtils = require('../utils/jwt.utils');

const fs = require('fs');
const { NOW } = require('sequelize');






//Routes
module.exports = {
    // ne fonctionne pas mais j eveux uploader le nom du fichier dans mon dossier images
    upload_image: function (req, res) {
    // Deuxime fonction qui ne fonctionne pas 
    //     const { filename, mimetype, size } = req.file;
    // const filepath = req.file.path;
    // models.Post.insert({
    //     filename,
    //     filepath,
    //     mimetype,
    //     size,
    // })
    //  .into('image_files')
    //  .then(() => res.json({ success: true, filename }))
    //  .catch(err => res.json({ success: false, message: 'upload failed', stack: err.stack })); 
        
    //  Premiere fonction mais qui n'insert pas de fichier dans le dossier images/ 
        // try {
            
        //     if (req.file) {
        //       // Utilise la librairie sharp pour redimensionner en 200x100, et renvoi la miniature dans un autre fichier dans le dossier de destination choisi dans le diskStorage 
        //        sharp(req.file.path, { failOnError: false }) 
        //       .resize({ width: 200, height: 100 })
        //       .toFile(
        //          path.resolve(req.file.destination + '/thumbnail', req.file.filename),
        //         )

        //         let filename = req.file.filename
        //     }
        //     res.send('Upload fini')
        // } catch (e) {
        //     res.status(400).send(e)
        // }
    },
    // Image Upload Routes
// app.post('/image', imageUpload.single('image'), (req, res) => {
//     const { filename, mimetype, size } = req.file;
//     const filepath = req.file.path;
//    db
//      .insert({
//       filename,
//       filepath,
//       mimetype,
//       size,
//      })
//      .into('image_files')
//      .then(() => res.json({ success: true, filename }))
//      .catch(err => res.json({ success: false, message: 'upload failed', stack: err.stack })); 
//    });

    createPost: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        //Constants
        const TITLE_LIMIT = 2;
        const CONTENT_LIMIT = 4;
     
        //params.
        const post = JSON.parse(req.body.post);
        const title = post.title;
        const content = post.content;
        const mediaPost = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` :  ""; 
        
      
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
            title: title,
            content: content,
            media : mediaPost,
            // ok sur le front mais n'inscrit rien dans le fichier images et n'affiche pas le nom de l'image dans bdd.
            // media : `${req.protocol}://${req.get("host")}/images/${req.file.filename}`, met une erreur not read properties of undefined filename
            //  media: req.body.media, 
            //  affiche sur la console back la base64 de l'image mais pas sur le front ko
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
        
        models.Post.findOne({
            where: { id: req.params.id },
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
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);

        models.Post.findOne({
            where: {id: req.body.id},
        })
        .then( (post) => {
            models.Post.destroy()
            .then(()=> { res.status(200).json({ message: "Post supprimé !"})})
            .catch((error)=> { res.status(400).json({ error: error, message:"Le post n'a pas pu être supprimé !"})})
        }
        )
        .catch((error) => {res.status(400).json({ error: error, message: "Une erreur est survenue" })});
        
    },

    updatePost: function(req, res) {
        //getting auth header.
        const headerAuth = req.headers['authorization'];
        const userId = jwtUtils.getUserId(headerAuth);
        const id = req.body.id;

        models.Post.findOne({ where: { id: req.params.id }})
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
                models.Post.update(updatePost, {where: { id: req.params.id }})
                .then(()=>res.status(200).json({ message: 'Post modifié !'}))
                .catch(error => res.status(400).json({ error}))
            } else {
                return res.status(403).json({'error':'Unauthorize'})
            }
        })
        .catch((error) => res.status(500).json({ error }));
    }
       
    
}
