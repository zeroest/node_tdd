const app = require('../server/main');

const port = process.env.port || 4000;
app.listen(port, ()=>{
    console.log(`express on ${port}`)
})