const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = app => {

    let convertHandler = new ConvertHandler();

    app.route('/api/convert').get((req, res) => {
        let input = req.query.input;
        if (input === undefined) {
            res.send("Can't not find 'input' value!");
        } else {
            let initNum = convertHandler.getInitNum(input);
            let initUnit = convertHandler.getInitUnit(input);
            if (initNum == false && initUnit == false) {
                res.send('invalid number and unit')
            } else if (initNum == false) {
                res.send('invalid number');
            } else if (initUnit == false) {
                res.send('invalid unit')
            } else {
                res.json({
                    initNum: initNum,
                    initUnit: initUnit,
                    returnNum: convertHandler.getReturnNum(initNum, initUnit),
                    returnUnit: convertHandler.getReturnUnit(initNum, initUnit),
                    string: convertHandler.getReturnString(initNum, initUnit)
                })
            }
        }
    })
}