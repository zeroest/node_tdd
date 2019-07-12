const app = require('../server/main');

// const syncDb = require('./sync_db');

const port = process.env.port || 4000;

app.listen(port, ()=>{
    console.log(`express on ${port}`)
})

/*
syncDb
.then(_=>{
    console.log('Sync Database!')
})
*/