const express = require('express');
require('dotenv').config();
require('./config/database');
require('./models/user');
const cors = require('cors');
const user = require('./routes/user');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const book = require('./routes/book');

const app = express();
app.use(cors());
app.set('port', process.env.PORT || 3000);

app.use(express.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/book', book);

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});