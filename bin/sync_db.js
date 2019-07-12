const models = require('../server/models/user.sequelize');

models.sequelize.sync(/*{force: true}*/)

// module.exports = ()=>{
//     return models.sequelize.sync(/*{force: true}*/)
// };