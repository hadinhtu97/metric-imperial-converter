const ConvertHandle = require('../controllers/convertHandle.js');

module.exports = app => {

    let convertHandle = new ConvertHandle();

    app.route('/api/convert').get((req, res) => {
        let input = req.query.input;

        if (input === undefined) {
            res.send("Can't not find 'input' value!");
        } else {
            let firstLetterOfUnit = convertHandle.getFirstLetterOfUnit(input);
            if (firstLetterOfUnit === null) {
                if (isNaN(input)) {
                    res.send('invalid number and unit')
                } else {
                    res.send('invalid unit')
                }
            } else {
                let initNum = input.slice(0, firstLetterOfUnit.index);
                let initUnit = input.slice(firstLetterOfUnit.index);
                if (initNum == '') initNum = 1;

                if (/\/\//.test(initNum) && !convertHandle.isUnit(initUnit)) {
                    res.send('invalid number and unit')
                } else if (/\/\//.test(initNum)) {
                    res.send('invalid number')
                } else {
                    initNum = eval(initNum);
                    if (!convertHandle.isUnit(initUnit) && isNaN(initNum)) {
                        res.send('invalid number and unit')
                    } else if (isNaN(initNum)) {
                        res.send('invalid number')
                    } else if (!convertHandle.isUnit(initUnit)) {
                        res.send('invalid unit')
                    } else {
                        initUnit = initUnit.toLowerCase();
                        if (initUnit == 'l') initUnit = 'L';

                        let returnNum = parseFloat(convertHandle.convert(initNum, initUnit)[0].toFixed(5));
                        let returnUnit = convertHandle.convert(initNum, initUnit)[1];
                        let string = initNum + ' ' + convertHandle.transferUnitToName(initUnit) + ' converts to ' + returnNum + ' ' + convertHandle.transferUnitToName(returnUnit);

                        res.json({
                            initNum: initNum,
                            initUnit: initUnit,
                            returnNum: returnNum,
                            returnUnit: returnUnit,
                            string: string
                        })
                    }
                }
            }
        }
    })
}