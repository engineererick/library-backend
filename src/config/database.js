const moongose = require('mongoose');

moongose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then(
    db => console.log('DB is connected')
).catch(
    err => console.log(err)
);