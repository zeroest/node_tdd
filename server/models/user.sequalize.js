const Sequalize = require('sequalize');
const sequalize = new Sequalize({
    dialect: 'sqlite',
    storage: './db.sqlite'
})

const User = sequalize.define('User', {
    id: Sequalize.INTEGER,
    name: Sequalize.STRING
})

module.exports = { Sequalize, sequalize, User };

/*
const Sequalize = require('sequalize');
const sequalize = new Sequalize(
    'practice', //데이터베이스 이름
    'username', //유저명
    'password', //비밀번호
    {
        host: 'localhost'
        dialect: 'mysql'
        //storage: '../db.mongodb' //sqlite 와 같이 파일저장시 사용
    }
)

const User = sequalize.define('User', {
    id: {
        type: Sequalize.INTEGER
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequalize.STRING,
        allowNull: false
    } 
})

module.exports = { Sequalize, sequalize, User };
*/