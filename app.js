require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.use(express.static(__dirname + '/public'));

const listMetricImperial = [
    ['gal', 'L', 3.78541],
    ['lbs', 'kg', 0.453592],
    ['mi', 'km', 1.60934],
]
const listUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km']

const isUnit = (unit) => {
    let regex = new RegExp(unit, 'i');
    for (let i = 0; i < listUnit.length; i++) {
        if (regex.test(listUnit[i])) {
            return true;
        }
    }
    return false;
}

app.route('/api/convert').get((req, res) => {
    if (req.query.input === undefined) {
        res.json("Can't not find 'input' value!");
    } else {
        let input = req.query.input;
        let regex = /[^\d.\W]/;
        let firstLetterOfUnit = input.match(regex);
        if (firstLetterOfUnit === null) {
            if (isNaN(input)) {
                res.json('invalid number and unit')
            }
            res.json('invalid unit')
        }
        let num = input.slice(0, firstLetterOfUnit.index);
        let unit = input.slice(firstLetterOfUnit.index);
        if (!isUnit(unit) && isNaN(num)) {
            res.json('invalid number and unit')
        }
        if (isNaN(num)) {
            res.json('invalid number')
        }
        if (!isUnit(unit)) {
            res.json('invalid unit')
        }
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
})