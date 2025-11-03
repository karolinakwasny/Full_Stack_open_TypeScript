import { describe, it, expect } from 'vitest'
import { calculateExercises } from '../exerciseCalculator'

const errorTests = [
    {givenArray: [], dailyTarget: 2, expectedResult: 'The amount of days can\'t be 0.'},
    {givenArray: [3, 0, -2, 4.5, 0, 3, 1], dailyTarget: 2, expectedResult: 'You can\'t work out negative hours, please provide correct data.'},
    {givenArray: [3, 0, NaN, 4.5, 0, 3, 1], dailyTarget: 2, expectedResult: 'All daily hours must be valid numbers.'},
];

describe('Exercises Calculator error tests', () => {
    errorTests.forEach((errorTest, index) => {
        const testDesc = `Test #${index}: array=${errorTest.givenArray}, target=${errorTest.dailyTarget} should return error: ${errorTest.expectedResult}`;

        it(testDesc, () => {
            expect(() => calculateExercises(errorTest.givenArray, errorTest.dailyTarget))
                .toThrow(errorTest.expectedResult);

        });
    });
});

function generateArray(length: number, value: number): number[] {
    return new Array(length).fill(value);
}

const successTests = [
    {
        givenArray: [1.2, 0.8, 2.5, 3.1, 1.4],
        dailyTarget: 2,
        expectedResult: {
            periodLength: 5,
            trainingDays: 5,
            success: false,
            rating: 2,
            ratingDescription: "Not too bad but could be better",
            target: 2,
            average: 1.8
        }
    },
    {
        givenArray: [2],
        dailyTarget: 2,
        expectedResult: {
            periodLength: 1,
            trainingDays: 1,
            success: true,
            rating: 1,
            ratingDescription: "You really did it!",
            target: 2,
            average: 2
        }
    },
    {
        givenArray: [0, 0, 0, 0, 0, 0, 0],
        dailyTarget: 2,
        expectedResult: {
            periodLength: 7,
            trainingDays: 0,
            success: false,
            rating: 3,
            ratingDescription: "You failed :(",
            target: 2,
            average: 0
        }
    },
    {
        givenArray: generateArray(10000, 1.5),
        dailyTarget: 2,
        expectedResult: {
            periodLength: 10000,
            trainingDays: 10000,
            success: false,
            rating: 2,
            ratingDescription: "Not too bad but could be better",
            target: 2,
            average: 1.5
        }
    }
];

describe('Exercises Calculator success tests', () => {
    successTests.forEach((test, index) => {
        it(`Normal Test #${index}: array=${test.givenArray}, target=${test.dailyTarget}`, () => {
            const result = calculateExercises(test.givenArray, test.dailyTarget);
            expect(result).toEqual(test.expectedResult);
        });
    });
});