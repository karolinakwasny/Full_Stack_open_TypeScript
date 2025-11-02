import { describe, it, expect } from 'vitest' // or 'jest' if using Jest
import { calculateBmi } from '../bmiCalculator'

const tests = [
    {height: 170, weight: 53.2, expectedResult: 'Underweight'}, // 18.4
    {height: 170, weight: 53.3, expectedResult: 'Underweight'}, // 18.44
    {height: 170, weight: 53.33, expectedResult: 'Normal range'}, // 18.45
    {height: 170, weight: 72.0, expectedResult: 'Normal range'}, // 24.9
    {height: 170, weight: 72.2, expectedResult: 'Overweight'}, // 25.0
    {height: 170, weight: 166.0, expectedResult: 'Obese'}, // 40.1
    {height: 170, weight: 115.2, expectedResult: 'Overweight'}, // 39.9
    {height: 0, weight: 70, expectedResult: 'error'}, // error
    {height: 170, weight: -1, expectedResult: 'error'}, // error
    {height: NaN, weight: 53.2, expectedResult: 'error'}, // error
];

describe('BMI Calculator', () => {
    tests.forEach((test, index) => {
        const testDesc = `Test #${index}: height=${test.height}, weight=${test.weight} should return ${test.expectedResult}`;

        it(testDesc, () => {
            if (test.expectedResult === 'error') {
                expect(() => calculateBmi(test.height, test.weight)).toThrow();
            } else {
                const result = calculateBmi(test.height, test.weight);
                expect(result.toLowerCase()).toBe(test.expectedResult.toLowerCase());
            }
        });
    });
});
