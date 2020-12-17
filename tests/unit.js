const assert = require('chai').assert;
const ConvertHandler = require('../controllers/convertHandler');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getInitNum(input)', function () {

        test('Whole number input', function (done) {
            let input = '32L';
            assert.equal(convertHandler.getInitNum(input), 32);
            done();
        });

        test('Decimal Input', function (done) {
            let input = '32.1L';
            assert.equal(convertHandler.getInitNum(input), 32.1);
            done();
        });

        test('Fractional Input', function (done) {
            let input = '4/2L';
            assert.equal(convertHandler.getInitNum(input), 2);
            done();
        });

        test('Fractional Input w/ Decimal', function (done) {
            let input = '2.2/2kg';
            assert.equal(convertHandler.getInitNum(input), 1.1);
            done();
        });

        test('Invalid Input (double fraction)', function (done) {
            let input = '2//2kg';
            assert.equal(convertHandler.getInitNum(input), false);
            done();
        });

        test('No Numerical Input', function (done) {
            let input = 'kg';
            assert.equal(convertHandler.getInitNum(input), 1);
            done();
        });

    });

    suite('Function convertHandler.getInitUnit(input)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg', 'GAL', 'L', 'MI', 'KM', 'LBS', 'KG'];
            input.forEach(function (ele) {
                assert.equal(convertHandler.getInitUnit(input), true);
            });
            done();
        });

        test('Unknown Unit Input', function (done) {
            let input = 'kgx';
            assert.equal(convertHandler.getInitUnit(input),false);
            done();
        });

    });

    suite('Function convertHandler.getReturnUnit(initUnit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
            let expect = ['L', 'gal', 'km', 'mi', 'kg', 'lbs'];
            input.forEach(function (ele, i) {
                assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
            });
            done();
        });

    });

    suite('Function convertHandler.spellOutUnit(unit)', function () {

        test('For Each Valid Unit Inputs', function (done) {
            //see above example for hint
            done();
        });

    });

    suite('Function convertHandler.convert(num, unit)', function () {

        test('Gal to L', function (done) {
            let input = [5, 'gal'];
            let expected = 18.9271;
            assert.approximately(convertHandler.convert(input[0], input[1]), expected, 0.1); //0.1 tolerance
            done();
        });

        test('L to Gal', function (done) {

            //done();
        });

        test('Mi to Km', function (done) {

            //done();
        });

        test('Km to Mi', function (done) {

            //done();
        });

        test('Lbs to Kg', function (done) {

            //done();
        });

        test('Kg to Lbs', function (done) {

            //done();
        });

    });

});