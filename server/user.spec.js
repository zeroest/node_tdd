const request = require('supertest');
const should = require('should');

const app = require('./main');

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

describe('GET /api/user/8 은', _=>{
    describe('성공시', _=>{
        it('id가 8인 유저 객체를 반환한다.', (done)=>{
            request(app)
            .get('/api/user/8')
            .end((err, res)=>{
                res.body.should.have.property('id', 8);
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
    describe('성공시', _=>{
        it('204를 응답한다.', (done)=>{
            request(app)
            .delete('/api/user/8')
            .expect(204)
            .end(done);
        })
    })
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