# Metric Imperial Converter

I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted. (Hint: Split the input by looking for the index of the first character which will mark the start of the unit)

I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)

I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)

I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)

All incoming units should be accepted in both upper and lower case, but should be returned in both the initUnit and returnUnit in lower case, except for liter, which should be represented as an uppercase 'L'.

If my unit of measurement is invalid, returned will be 'invalid unit'.

If my number is invalid, returned will be 'invalid number'.

If both the unit and number are invalid, returned will be 'invalid number and unit'.

I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.

My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in the format '{initNum} {initial_Units} converts to {returnNum} {return_Units}' with the result rounded to 5 decimals.

All 16 unit tests are complete and passing.

All 5 functional tests are complete and passing.
