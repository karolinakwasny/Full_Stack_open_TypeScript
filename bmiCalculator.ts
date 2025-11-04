interface Measurements {
    inputHeight: number;
    inputWeight: number;
}

const parseArguments = (args: string[]): Measurements => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            inputHeight: Number(args[2]),
            inputWeight: Number(args[3])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export type Result = string ;
export const calculateBmi = (height: number, weight: number): Result => {
    if (!Number.isFinite(height) || !Number.isFinite(weight)) {
        throw new Error('Height and weight must be finite numbers.');
    }
    if ((height <= 0) || (weight <= 0)) throw new Error('Height and weight has to be bigger than 0.');

    let height_in_m = height / 100;
    const bmi = parseFloat((weight / (height_in_m * height_in_m)).toFixed(1));

    switch (true){
        case (bmi < 18.5) :
            return 'Underweight';
        case (bmi <= 24.9) :
            return 'Normal range';
        case (bmi <= 39.9) :
            return 'Overweight';
        case (bmi > 39.9) :
            return 'Obese';
        default:
            return 'Something went wrong!'
    }
}

try {
    const { inputHeight, inputWeight } = parseArguments(process.argv);
    console.log(calculateBmi(inputHeight, inputWeight));
} catch (error :unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error){
        errorMessage = 'Error: ' + error.message;
    }
    console.log(errorMessage);
}
