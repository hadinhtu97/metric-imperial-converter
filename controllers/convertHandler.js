function ConvertHandler() {
    const listConvert = [
        ['gal', 'L', 3.78541],
        ['lbs', 'kg', 0.453592],
        ['mi', 'km', 1.60934],
    ];
    const listUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const listUnitName = ['gallons', 'liters', 'pounds', 'kilogram', 'miles', 'kilometers']

    this.getFirstLetterOfUnit = (input) => {
        let regex = /[^\d.\W]/;
        return input.match(regex);
    }

    this.getInitNum = (input) => {
        let firstLetterOfUnit = this.getFirstLetterOfUnit(input);
        return input.slice(0, firstLetterOfUnit.index) == '' ? 1 : input.slice(0, firstLetterOfUnit.index);
    }

    this.getInitUnit = (input) => {
        let firstLetterOfUnit = this.getFirstLetterOfUnit(input);
        return input.slice(firstLetterOfUnit.index);
    }

    this.isUnit = (unit) => {
        let regex = new RegExp(unit, 'i');
        for (let i = 0; i < listUnit.length; i++) {
            if (regex.test(listUnit[i])) {
                return true;
            }
        }
        return false;
    }

    this.checkMultipleFractions = (initInput) => {
        return /\/\//g.test(initInput);
    }

    this.renameUnit = (unit) => {
        return unit.toLowerCase() == 'l' ? 'L' : unit.toLowerCase();
    }

    this.getReturnNum = (initNum, initUnit) => {
        return parseFloat(this.convert(initNum, initUnit)[0].toFixed(5));
    }

    this.getReturnUnit = (initNum, initUnit) => {
        return this.convert(initNum, initUnit)[1];
    }

    this.getReturnString = (initNum, initUnit) => {
        return initNum + ' ' + this.transferUnitToName(initUnit) + ' converts to ' + this.getReturnNum(initNum, initUnit) + ' ' + this.transferUnitToName(this.getReturnUnit(initNum, initUnit))
    }

    this.convert = (initNum, initUnit) => {
        for (let i = 0; i < listConvert.length; i++) {
            if (listConvert[i].indexOf(initUnit) != -1) {
                if (listConvert[i].indexOf(initUnit) == 0) return [initNum * listConvert[i][2], listConvert[i][1]];
                if (listConvert[i].indexOf(initUnit) == 1) return [initNum / listConvert[i][2], listConvert[i][0]];
            }
        }
    }

    this.transferUnitToName = (unit) => {
        return listUnitName[listUnit.indexOf(unit)];
    }
}

module.exports = ConvertHandler;