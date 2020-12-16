require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'));
app.use(express.static(__dirname + '/public'));

const listConvert = [
    ['gal', 'L', 3.78541],
    ['lbs', 'kg', 0.453592],
    ['mi', 'km', 1.60934],
];
const listUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
const listUnitName = ['gallons', 'liters', 'pounds', 'kilogram', 'mile', 'kilometers']

const isUnit = (unit) => {
    let regex = new RegExp(unit, 'i');
    for (let i = 0; i < listUnit.length; i++) {
        if (regex.test(listUnit[i])) {
            return true;
        }
    }
    return false;
}

const convert = (num, unit) => {
    for (let i = 0; i < listConvert.length; i++) {
        if (listConvert[i].indexOf(unit) != -1) {
            if (listConvert[i].indexOf(unit) == 0) return [num * listConvert[i][2], listConvert[i][1]];
            if (listConvert[i].indexOf(unit) == 1) return [num / listConvert[i][2], listConvert[i][0]];
        }
    }
}

app.route('/api/convert').get((req, res) => {
    if (req.query.input === undefined) {
        res.send("Can't not find 'input' value!");
    } else {

        let input = req.query.input;
        let regex = /[^\d.\W]/;
        let firstLetterOfUnit = input.match(regex);

        if (firstLetterOfUnit === null) {
            if (isNaN(input)) {
                res.send('invalid number and unit')
            } else {
                res.send('invalid unit')
            }
        } else {
            let num = input.slice(0, firstLetterOfUnit.index);
            let unit = input.slice(firstLetterOfUnit.index);
            if (num == '') num = 1;
            if (/\/\//.test(num) && !isUnit(unit)) {
                res.send('invalid number and unit')
            } else if (/\/\//.test(num)) {
                res.send('invalid number')
            } else {
                num = eval(num);
                if (!isUnit(unit) && isNaN(num)) {
                    res.send('invalid number and unit')
                } else if (isNaN(num)) {
                    res.send('invalid number')
                } else if (!isUnit(unit)) {
                    res.send('invalid unit')
                } else {
                    unit = unit.toLowerCase();
                    if (unit == 'l') unit = 'L';
                    let returnNum = parseFloat(convert(num, unit)[0].toFixed(5));
                    let returnUnit = convert(num, unit)[1];
                    res.json({
                        initNum: num,
                        initUnit: unit,
                        returnNum: returnNum,
                        returnUnit: returnUnit,
                        string: num + ' ' + listUnitName[listUnit.indexOf(unit)] + ' converts to ' + returnNum + ' ' + listUnitName[listUnit.indexOf(returnUnit)]
                    })
                }
            }
        }
    }
})

app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + process.env.PORT);
})