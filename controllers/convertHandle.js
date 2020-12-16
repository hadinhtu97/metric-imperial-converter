function ConvertHandle() {
    const listConvert = [
        ['gal', 'L', 3.78541],
        ['lbs', 'kg', 0.453592],
        ['mi', 'km', 1.60934],
    ];
    const listUnit = ['gal', 'L', 'lbs', 'kg', 'mi', 'km'];
    const listUnitName = ['gallons', 'liters', 'pounds', 'kilogram', 'mile', 'kilometers']

    this.getFirstLetterOfUnit = (input) => {
        let regex = /[^\d.\W]/;
        return input.match(regex)
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
    this.convert = (num, unit) => {
        for (let i = 0; i < listConvert.length; i++) {
            if (listConvert[i].indexOf(unit) != -1) {
                if (listConvert[i].indexOf(unit) == 0) return [num * listConvert[i][2], listConvert[i][1]];
                if (listConvert[i].indexOf(unit) == 1) return [num / listConvert[i][2], listConvert[i][0]];
            }
        }
    }

    this.transferUnitToName = (unit) => {
        return listUnitName[listUnit.indexOf(unit)];
    }
}

module.exports = ConvertHandle;