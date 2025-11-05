import {calculateBmi} from "./bmiCalculator";

interface Data {
    target:number;
    array:number[];
}

const parseArguments = (args :string[]) :Data => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const target = Number(args[2]);
    if (isNaN(target) || !isFinite(target)) {
        throw new Error('Target must be a number!');
    }

    let returnArray :number[] = [];
    for (let i = 3; i < args.length; i++) {
        const num = Number(args[i]);
        if (isNaN(num) || !isFinite(num)) {
            throw new Error('At least one provided value is not a number!');
        }
        returnArray.push(num);
    }

    return {
        target,
        array: returnArray
    }
}

type helperResult = {
    success: boolean;
    rating: number;
    ratingDescription: string;
}

function getRating(average: number, target: number): helperResult {
    if (average > target)
        return { success: true, rating: 1, ratingDescription: "Great work!" };
    if (average === target)
        return { success: true, rating: 1, ratingDescription: "You really did it!" };
    if (average > target / 2)
        return { success: false, rating: 2, ratingDescription: "Not too bad but could be better" };
    if (average !== 0)
        return { success: false, rating: 3, ratingDescription: "You tried and you should try again" };

    return { success: false, rating: 3, ratingDescription: "You failed :(" };
}

interface Output  {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

export type Result = Output | string;

export const calculateExercises = (givenArray: number[], dailyTarget: number): Result => {
    const numberOfDays: number = givenArray.length;
    if (numberOfDays === 0 ) throw new Error('The amount of days can\'t be 0.');

    if (givenArray.some(num => typeof num !== "number" || isNaN(num) || !isFinite(num))) {
        throw new Error("All daily hours must be valid numbers.");
    }

    const hasNegative :boolean = givenArray.some(num => num < 0);
    if (hasNegative) throw new Error('You can\'t work out negative hours, please provide correct data.');

    const trainingDays :number = givenArray.filter(num => num !== 0).length;
    const sum :number = givenArray.reduce((acc, current) => acc + current, 0);
    const average :number = sum / numberOfDays;

    return {
        periodLength: numberOfDays,
        trainingDays,
        ...getRating(average, dailyTarget),
        target: dailyTarget,
        average
    }

}


try {
    const { target, array } = parseArguments(process.argv);
    console.log(calculateExercises( array, target));
} catch (error :unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error){
        errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
}