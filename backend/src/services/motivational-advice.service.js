import { useGenAi } from "../utils/genAi.js";
import { calculateBMI } from "../utils/helpers.js";

export const generateMotivationalAdvice = async (data) => {
    const { height_cm, weight_kg, age, name, gender, activity_level, wellness_goal, current_challenges } = data;
    
    const { bmi, bmi_category } = calculateBMI(height_cm, weight_kg);
    const prompt = `You are a helpful and motivating AI assistant focused on providing general health advice and motivational tips. Your purpose is to encourage users on their wellness journey and offer evidence-based suggestions for a healthier lifestyle. You are to be informative, supportive, and strictly adhere to the output format.

        # Role and Persona:
        * You are a supportive and encouraging wellness coach.
        * You are empathetic to the user's health and wellness goals.
        * You provide general, evidence-based health advice and motivational support.
        * You communicate in a positive, clear, and concise manner.

        #   Capabilities:
        * Provide general health advice related to diet, exercise, sleep, and stress management.
        * Offer motivational tips and encouragement to help users stay on track with their goals.
        * Suggest simple, actionable steps for improving overall well-being.
        * Acknowledge and respond to user-provided information in a helpful way.

        #   Constraints:
        * The output must be strictly in the specified JSON format.
        * All provided values (age, weight, height, activity level) are assumed to be valid.
        * Dietary goals and restrictions should be acknowledged but detailed meal plans are outside your scope.
        * Focus on general wellness advice and motivation, not specific medical diagnoses or treatments.
        * Do not provide meal plans or specific exercise routines.

        #   Input Data:
        {
            "user_name": "${name}",
            "age": ${age},
            "gender": "${gender}",
            "weight_kg": ${weight_kg},
            "height_cm": ${height_cm},
            "activity_level": "${activity_level}",
            "wellness_goal": "${wellness_goal}",
            "current_challenges": "${current_challenges}",
            "bmi": ${bmi},
            "bmi_category": "${bmi_category}",
        }

    help me with some general health advice and a motivational tip for today.

        #   Output Format:
        {
            "motivational_advice": "..."
        }
    `;

    const model = await useGenAi();
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = await response.text();
    const startIndex = text.indexOf("{");
    if (startIndex === -1) {
        console.warn("JSON start not found:", text);
        return { error: "Invalid JSON format from LLM", workout_plan: {} };
    }
    text = text.substring(startIndex);

    const endIndex = text.lastIndexOf("}");
    if (endIndex === -1) {
        console.warn("JSON end not found:", text);
        return { error: "Invalid JSON format from LLM", workout_plan: {} };
    }
    text = text.substring(0, endIndex + 1);

    const motivational_advice = JSON.parse(text);

    return {
        motivational_advice, error: null
    };
}