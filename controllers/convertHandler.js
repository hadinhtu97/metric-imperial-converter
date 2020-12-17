function ConvertHandler() {
    const listConvert = [
        ['gal', 'L', 3.78541],
        ['lbs', 'kg', 0.453592],
        ['mi', 'km', 1.60934],
    ];
    const listUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const listUnitName = ['gallons', 'liters', 'pounds', 'kilogram', 'miles', 'kilometers']

    this.getInitNum = (input) => {
        let firstLetterOfUnit = this.getFirstLetterOfUnit(input);
        if (firstLetterOfUnit == false) {
            if (isNaN(input)) return false;
        }
        initNum = input.slice(0, firstLetterOfUnit.index) == '' ? 1 : input.slice(0, firstLetterOfUnit.index);
        if (this.isMultipleFractions(initNum)) return false;
        initNum = eval(initNum);
        if (isNaN(initNum)) return false;
        return initNum;
    }

    this.getInitUnit = (input) => {
        let firstLetterOfUnit = this.getFirstLetterOfUnit(input);
        if (firstLetterOfUnit == false) return false;
        let initUnit = input.slice(firstLetterOfUnit.index);
        if (!this.isUnit(initUnit)) return false;
        initUnit = this.renameUnit(initUnit);
        return initUnit;
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

    this.getFirstLetterOfUnit = (input) => {
        let regex = /[^\d.\W]/;
        return input.match(regex) == null ? false : input.match(regex);
    }

    this.convert = (initNum, initUnit) => {
        for (let i = 0; i < listConvert.length; i++) {
            if (listConvert[i].indexOf(initUnit) != -1) {
                if (listConvert[i].indexOf(initUnit) == 0) return [initNum * listConvert[i][2], listConvert[i][1]];
                if (listConvert[i].indexOf(initUnit) == 1) return [initNum / listConvert[i][2], listConvert[i][0]];
            }
        }
    }

    this.isUnit = (unit) => {
        let checkUnit = this.renameUnit(unit);
        for (let i = 0; i < listUnit.length; i++) {
            if (checkUnit == listUnit[i]) {
                return true;
            }
        }
        return false;
    }

    this.isMultipleFractions = (initInput) => {
        return /\/\//g.test(initInput);
    }

    this.renameUnit = (unit) => {
        return unit.toLowerCase() == 'l' ? 'L' : unit.toLowerCase();
    }

    this.transferUnitToName = (unit) => {
        return listUnitName[listUnit.indexOf(unit)];
    }
}

module.exports = ConvertHandler;