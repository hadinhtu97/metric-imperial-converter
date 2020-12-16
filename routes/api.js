const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = app => {

    let convertHandler = new ConvertHandler();

    app.route('/api/convert').get((req, res) => {
        let input = req.query.input;
        if (input === undefined) {
            res.send("Can't not find 'input' value!");
        } else {
            let firstLetterOfUnit = convertHandler.getFirstLetterOfUnit(input);
            if (firstLetterOfUnit === null) {
                if (isNaN(input)) {
                    res.send('invalid number and unit')
                } else {
                    res.send('invalid unit')
                }
            } else {
                let initNum = convertHandler.getInitNum(input);
                let initUnit = convertHandler.getInitUnit(input);

                if (convertHandler.checkMultipleFractions(initNum) && !convertHandler.isUnit(initUnit)) {
                    res.send('invalid number and unit')
                } else if (convertHandler.checkMultipleFractions(initNum)) {
                    res.send('invalid number')
                } else {
                    initNum = eval(initNum);
                    if (!convertHandler.isUnit(initUnit) && isNaN(initNum)) {
                        res.send('invalid number and unit')
                    } else if (isNaN(initNum)) {
                        res.send('invalid number')
                    } else if (!convertHandler.isUnit(initUnit)) {
                        res.send('invalid unit')
                    } else {
                        initUnit = convertHandler.renameUnit(initUnit);
                        res.json({
                            initNum: initNum,
                            initUnit: initUnit,
                            returnNum: convertHandler.getReturnNum(initNum, initUnit),
                            returnUnit: convertHandler.getReturnUnit(initNum, initUnit),
                            string: convertHandler.getReturnString(initNum, initUnit)
                        })
                    }
                }
            }
        }
    })
}