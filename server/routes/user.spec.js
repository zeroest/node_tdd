const request = require('supertest');
const should = require('should');

const app = require('../main');

// describe('GET /users 는', ()=>{
//     it('...', (done)=>{
//         request(app)
//             .get('/api/user/')
//             .end((err, res)=>{
//                 console.log(res.body);
//                 done();
//             })
//     })
// })

describe('GET /api/user/ 는', _=>{

    describe('성공시', _=>{
        it('유저 객체를 담은 배열을 응답한다.', (done)=>{
            request(app)
            .get('/api/user/')
            .end((err, res)=>{
                res.body.should.be.instanceOf(Array);
                done();
            })
        })

        it('최대 limit 갯수만큼 응답한다.', (done)=>{
            request(app)
            .get('/api/user/?limit=2')
            .end((err, res)=>{
                res.body.should.have.lengthOf(2);
                done();
            })
        })
    })

    describe('실패시', _=>{
        it('limit이 숫자형이 아니면 400을 응답한다.', (done)=>{
            request(app)
            .get('/api/user/?limit=two')
            .expect(400)
            .end(done)
        })
    })

});

describe('GET /api/user/9 은', _=>{
    describe('성공시', _=>{
        it('id가 9인 유저 객체를 반환한다.', (done)=>{
            request(app)
            .get('/api/user/9')
            .end((err, res)=>{
                res.body.should.have.property('id', 9);
                done();
            })
        })
    })
    describe('실패시', _=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=>{
            request(app)
            .get('/api/user/one')
            .expect(400)
            .end(done);
        })
        it('id로 유저를 찾을 수 없는 경우 404로 응답한다.', (done)=>{
            request(app)
            .get('/api/user/1')
            .expect(404)
            .end(done);
        })
    })
})

describe('DELETE /api/user/8', _=>{
    // describe('성공시', _=>{
    //     it('204를 응답한다.', (done)=>{
    //         request(app)
    //         .delete('/api/user/8')
    //         .expect(204)
    //         .end(done);
    //     })
    // })
    describe('실패시', _=>{
        it('id가 숫자가 아닐경우 400으로 응답한다.', (done)=>{
            request(app)
            .delete('/api/user/one')
            .expect(400)
            .end(done);
        })
        it('id로 유저를 찾을 수 없는 경우 404로 응답한다.', (done)=>{
            request(app)
            .delete('/api/user/1')
            .expect(404)
            .end(done);
        })
    })
})
/*
describe('POST /api/user/', _=>{
    describe('성공시', _=>{
        let name = 'post1'
        let body;
        before(done=>{
            request(app)
            .post('/api/user')
            .send({ name })
            .expect(201)
            .end((err, res)=>{
                body = res.body;
                done();
            })
        })
        it('생성된 유저 객체를 반환한다.', ()=>{
            body.should.have.property('id');
        })
        it('입력한 name을 반환한다.', ()=>{
            body.should.have.property('name', name)
        })
    })
    describe('실패시', _=>{
        it('name 파라미터 누락시 400을 반환한다.', (done)=>{
            request(app)
            .post('/api/user')
            .send({name: ''} )
            .expect(400)
            .end(done);
        })
        it('name 중복시 409을 반환한다.', (done)=>{
            request(app)
            .post('/api/user')
            .send({name: "postapi"})
            .expect(409)
            .end(done);
        })
    })
})
*/
describe('PUT /api/user/:id', _=>{
    describe('성공시', _=>{
        const name = 'kakkakaaakao'
        it('변경된 name을 응답한다.', (done)=>{
            request(app)
            .put('/api/user/9')
            .send({name})
            .end((err, res)=>{
                res.body.should.have.property('name', name)
                done();
            })
        })
    })
    describe('실패시', _=>{
        it('정수가 아닌 id일 경우 400 응답', (done)=>{
            request(app)
            .put('/api/user/one')
            .send({name : "sonsonson"})
            .expect(400)
            .end(done);
        })
        it('name이 없을 경우 400 응답', (done)=>{
            request(app)
            .put('/api/user/9')
            .send({})
            .expect(400)
            .end(done);
        })
        it('없는 유저일 경우 404 응답', (done)=>{
            request(app)
            .put('/api/user/3')
            .send({name: "nothing"})
            .expect(404)
            .end(done);
        })
        it('이름이 중복일 경우 409 응답', (done)=>{
            request(app)
            .put('/api/user/9')
            .send({name: "postapi"})
            .expect(409)
            .end(done);
        })
    })
})