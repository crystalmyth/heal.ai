export const calculateBMI = (height_cm, weight_kg) => {
    // (Keep the BMI calculation here or in a separate utility file if it's used elsewhere)
    if (typeof height_cm !== 'number' || typeof weight_kg !== 'number' ||
        isNaN(height_cm) || isNaN(weight_kg) ||
        height_cm <= 0 || weight_kg <= 0) {
        return { bmi: null, bmi_category: 'Invalid input' };
    }

    const height_m = height_cm / 100;
    const bmi = weight_kg / (height_m * height_m);
    const roundedBMI = parseFloat(bmi.toFixed(2));

    let bmi_category = '';
    if (roundedBMI < 18.5) {
        bmi_category = 'Underweight';
    } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
        bmi_category = 'Normal weight';
    } else if (roundedBMI >= 25 && roundedBMI < 30) {
        bmi_category = 'Overweight';
    } else if (roundedBMI >= 30) {
        bmi_category = 'Obese';
    } else {
        bmi_category = 'Undefined';
    }
    return { bmi: roundedBMI, bmi_category };
}
