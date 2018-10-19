const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

app.use(express.static('client/dist'));

app.listen(3000, () => console.log('listening on port', port, '--------------'));