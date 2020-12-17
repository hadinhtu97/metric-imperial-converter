const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

describe('Unit Tests', function () {

    describe('Function convertHandler.getInitNum(input)', function () {

        it('Whole number input', function (done) {
            let input = '32L';
            assert.equal(convertHandler.getInitNum(input), 32);
            done();
        });

        it('Decimal Input', function (done) {
            let input = '32.1L';
            assert.equal(convertHandler.getInitNum(input), 32.1);
            done();
        });

        it('Fractional Input', function (done) {
            let input = '4/2L';
            assert.equal(convertHandler.getInitNum(input), 2);
            done();
        });

        it('Fractional Input w/ Decimal', function (done) {
            let input = '2.2/2kg';
            assert.equal(convertHandler.getInitNum(input), 1.1);
            done();
        });

        it('Invalid Input (double fraction)', function (done) {
            let input = '2//2kg';
            assert.equal(convertHandler.getInitNum(input), false);
            done();
        });

        it('No Numerical Input', function (done) {
            let input = 'kg';
            assert.equal(convertHandler.getInitNum(input), 1);
            done();
        });

    });

    describe('Function convertHandler.getInitUnit(input)', function () {

        it('For Each Valid Unit Inputs', function (done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                assert.isString(convertHandler.getInitUnit(ele));
            });
            done();
        });

        it('Unknown Unit Input', function (done) {
            let input = 'kgx';
            assert.equal(convertHandler.getInitUnit(input), false);
            done();
        });

    });

    describe('Function convertHandler.getReturnUnit(initUnit)', function () {

        it('For Each Valid Unit Inputs', function (done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(1, ele), expect[i]);
            });
            done();
        });

    });

    describe('Function convertHandler.renameUnit(unit)', function () {

        it('For Each Valid Unit Inputs', function (done) {
            let input = ['gAl', 'l', 'Mi', 'KM', 'lBS', 'kg'];
            let expect = ['gal', 'L', 'mi', 'km', 'lbs', 'kg'];
            input.forEach((ele, i) => {
                assert.equal(convertHandler.renameUnit(ele), expect[i])
            })
            done();
        });

    });

    describe('Function convertHandler.convert(initNum, initUnit)', function () {

        it('Gal to L', function (done) {
            let input = [5, 'gal'];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1); //0.1 tolerance
            done();
        });

        it('L to Gal', function (done) {
            let input = [1, 'L'];
            let expected = 0.26417;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
            done();
        });

        it('Mi to Km', function (done) {
            let input = [1, 'Mi'];
            let expected = 1.60934;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
            done();
        });

        it('Km to Mi', function (done) {
            let input = [1, 'Km'];
            let expected = 0.62137;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
            done();
        });

        it('Lbs to Kg', function (done) {
            let input = [1, 'lbs'];
            let expected = 0.45359;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
            done();
        });

        it('Kg to Lbs', function (done) {
            let input = [1, 'kg'];
            let expected = 2.20462;
            assert.approximately(convertHandler.convert(input[0], input[1])[0], expected, 0.1);
            done();
        });

    });

});