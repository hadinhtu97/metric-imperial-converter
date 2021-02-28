# Metric Imperial Converter

## Description
Backend APIs convert between units of metric imperial

## Use
```
git clone https://github.com/hadinhtu97/metric-imperial-converter
cd metric-imperial-converter
npm install
npm run start
```

## APIs
* GET: `[]/api/convert?input=[value]`
  * accepted number and unit.
  * unit accepted in both upper and lower case.
  * You can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.
  * Exam: 
    * `[]/api/convert?input=2.5L`
    * `[]/api/convert?input=gal`
  * List unit:
    * `L` and `gal`
    * `lbs` and `kg`
    * `mi` and `km`

## Testing
Unit test and functional test are in `test` directory.

Use `npm run test` to run tests (you need to run project first to test functional)

### Demo
[Link Demo](https://metric-imperial-converter.hadinhtu97.repl.co/)
