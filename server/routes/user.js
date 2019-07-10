const express = require('express');
const User = require('./../models/user');

const mongojs = require('mongojs');

const db = mongojs('node_tdd');

const router = express.Router();

router.get('/:id', (req, res)=>{
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
})

router.get('/', (req,res)=>{
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
})

router.delete('/:id', (req, res)=>{
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
})

router.post('/', (req, res)=>{
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


})

module.exports = router;