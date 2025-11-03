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

console.log(calculateBmi(180, 74));

