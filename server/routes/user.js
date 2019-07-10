import express from 'express';
import User from './../models/user';

import mongojs from 'mongojs';

const db = mongojs('node_tdd');

const router = express.Router();

router.get('/allUser', (req,res)=>{
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
    })
})

router.post('/createUser', (req, res)=>{
    let usernameRegex = /^[a-z0-9]+$/;

    console.log(req.body.name)
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
                },
                new: true
            }, (err, data)=>{
                if(err) reject(console.error(err));
                
                resolve(data.seq)
                console.log(data.seq + "===================")
                console.log(data.seq + "this is in result")
                console.log(data.seq + "===================")
            })
        });
    }
    
    getSeq()
    .then((seq)=>{
        console.log(seq + "success!!!!")
        let user = new User({
            id: seq,
            name: req.body.name
        })

        user.save(err =>{
            if(err) throw err;
            return res.json({ success: true })
        })
    })
    .catch((err)=>{
        console.lerror(err);
    })
    })


})

export default router;