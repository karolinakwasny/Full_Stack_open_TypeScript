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

console.log(calculateExercises([3,0,2,4.5,0,3,1], 2));