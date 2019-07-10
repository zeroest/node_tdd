
const mongojs = require('mongojs');
const mongoose = require('mongoose');
const User = require('./../models/user');

const db = mongojs('node_tdd');

const index = (req,res)=>{
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if(Number.isNaN(limit)){
        return res.status(400).end();
    }

    User.find({},(err, users)=>{
        if(err) throw err;
        

        if(!users){
            return res.status(401).json({
                error: "something error in server",
                code : 1
            })
        }

        return res.json(
            users
        )
    }).limit(limit)
}

const selectOne = (req, res)=>{
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end()
    }

    User.findOne({id}, (err, user)=>{
        if(!user){
           return res.status(404).end() 
        }
        return res.json(user)
    })
}

const deleteOne = (req, res)=>{
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    
    User.findOne({id}, (err, user)=>{
        if(err) throw err;

        if(!user){
            return res.status(404).end();
        }

        User.deleteOne({ _id: user._id }, err=>{
            if(err) throw err;
            res.status(204).end();
        })
    })
}

const updateOne = (req, res)=>{
    let usernameRegex = /^[a-z0-9]+$/;

    if(!req.body.name){
        return res.status(400).end();
    }

    if(!usernameRegex.test(req.body.name)){
        return res.status(400).json({
            error: 'bad username',
            code: 1
        })
    }
    
    User.findOne({name: req.body.name}, (err, exist)=>{
        if(err) throw err;
        if(exist){
            return res.status(409).json({
                error: 'username exists',
                code: 2
            })
        }
        function getSeq(){
            return new Promise((resolve, reject)=>{
                db.seq.findAndModify({
                    query: {
                        _id: "user"
                    },
                    update: {
                        $inc: { seq : 1 }
                    }
                    // ,new: true
                }, (err, data)=>{
                    if(err) reject(console.error(err));
                    
                    resolve(data.seq)
                })
            });
        }
    
        getSeq()
        .then((seq)=>{
            let user = new User({
                id: seq,
                name: req.body.name
            })

            user.save(err =>{
                if(err) throw err;
                return res.status(201).json(user)
            })
        })
        .catch((err)=>{
            console.lerror(err);
        })
    })
}

const createOne = (req, res)=>{
    const id = parseInt(req.params.id, 10);
    const name = req.body.name;
    if(Number.isNaN(id)){
        return res.status(400).end();
    }
    if(!name){
        return res.status(400).end();
    }

    function checkName(){
        return new Promise((resolve, reject)=>{
            User.findOne({name}, (err, user)=>{
                if(err) reject(console.error(err));
        
                // console.log('==================')
                // console.log(user)
                // console.log('==================')
        
                if(user){
                    resolve(true); 
                }else{
                    resolve(false);
                }
                
            })

        })
    }
    User.findOne({id}, (err, user)=>{
        if(err) throw err;
        
        if(!user){
            return res.status(404).end();
        }

        checkName()
        .then((result)=>{
            if(result){
                return res.status(409).end();
            }

            user.name = name;
            
            user.save((err, user)=>{
                if(err) throw err;
                return res.status(201).json(user)
            })

        })
        .catch((err)=>{
            if(err) throw err;
        })

    })
}

module.exports = {
    index, selectOne, deleteOne, updateOne, createOne 
}