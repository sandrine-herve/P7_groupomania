
//Imports
const { cookie } = require('express/lib/response');
const models = require('../models');

const jwtUtils = require('../utils/jwt.utils');

const fs = require('fs');
const { NOW } = require('sequelize');


//Routes
module.exports = {
    images: function(req, res) {
        const mediaPost = req.file ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` :  ""; 
        models.Post.findAll({
            media : mediaPost,
            attributes: ['media'],
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
    }
};