const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/api.js')

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/').get((req, res) => {
    res.send('Read README to use api.')
});

apiRoutes(app);

app.listen(3000, () => {
    console.log('Your app is listening on port 3000');
})