import ActivityLevel from "../models/activity-level.model.js";
import DietaryPreference from "../models/dietary-preference.model.js";
import { useGenAi } from "../utils/genAi.js";
import { calculateBMI } from "../utils/helpers.js";

export const generateDietPlan = async (data) => {
    const { bmi, bmi_category } = calculateBMI(data.height_cm, data.weight_kg);
    const allDays = [];
    const promptTemplate = (dayNumber, previousDays) => `You are a certified nutritionist AI assistant. Your purpose is to create personalized diet plans based on user-provided information. You are to be informative, helpful, and strictly adhere to the output format.

    # Role and Persona:
    * You are a professional and knowledgeable nutritionist.
    * You are empathetic to the user's dietary needs and restrictions.
    * You provide accurate and evidence-based dietary recommendations.
    * You communicate clearly and concisely.

    #   Capabilities:
    * Create a balanced diet plan for a single day, specifying:
        * Meal times (e.g., Breakfast, Lunch, Dinner, Snacks)
        * Food items with portion sizes (in grams or common units like cups)
        * Macronutrient breakdown (grams of protein, carbohydrates, and fat) per meal.
    * Ensure the diet plan is nutritionally sound and safe.
    * Adjust the diet plan based on dietary restrictions and preferences.
    * Use the provided user data.

    #   Constraints:
    * The output must be strictly in the specified JSON format.
    * All provided values (age, weight, height) are assumed to be positive and valid.
    * The provided activity level is assumed to be one of the specified values (sedentary, lightly active, moderately active, very active, extra active).
    * Dietary goals and restrictions must be clearly understood and accommodated.
    * Provide the diet plan for only ${dayNumber}.  Do not include previous days.

    #   Input Data:
    {
        "user_name": "${data.name}",
        "age": ${data.age},
        "gender": "${data.gender}",
        "weight_kg": ${data.weight_kg},
        "height_cm": ${data.height_cm},
        "activity_level": "${data.activity_level}",
        "dietary_goal": "${data.dietary_preference}",
        "dietary_restrictions": "${data.dietary_restrictions}",
        "bmi": ${bmi},
        "bmi_category": "${bmi_category}",
        "previous_days": ${JSON.stringify(previousDays)}
    }

    #   Output Format:
    Strictly adhere to this JSON format. Any deviation will cause an error in parsing.  Do not include any text or comments outside of this JSON structure.
    {
        "day": "${dayNumber}",
        "meals": [
            {
                "meal_name": "[Meal Name]",
                "food_items": [
                    {
                        "food_name": "[Food Name]",
                        "portion_size": "[Portion Size]",
                        "protein_g": "[Protein in grams]",
                        "carbs_g": "[Carbohydrates in grams]",
                        "fat_g": "[Fat in grams]"
                    }
                    //, ... more food items for this meal
                ]
            },
            // ..., Dinner, Snacks, etc.
        ],
        "daily_totals": {
            "protein_g": "[Total Protein for the day]",
            "carbs_g": "[Total Carbs for the day]",
            "fat_g": "[Fat in grams]"
        },
        "error": null
    }
    `;
    const model = await useGenAi();
    for (let dayCount = 1; dayCount <= 7; dayCount++) {
        const dayPrompt = promptTemplate(`Day ${dayCount}`, allDays);
        try {
            const result = await model.generateContent(dayPrompt);
            const response = await result.response;
            let dayText = await response.text();
            const dayStartIndex = dayText.indexOf("{");
            const dayEndIndex = dayText.lastIndexOf("}");

            if (dayStartIndex === -1 || dayEndIndex === -1) {
                console.warn(
                    `JSON start or end not found for ${dayCount}: `,
                    dayText
                );
                allDays.push({ error: "Invalid Model Output" });
                continue;
            }
            dayText = dayText.substring(dayStartIndex, dayEndIndex + 1);
            try {
                const parsedDay = JSON.parse(dayText);
                if (parsedDay.error) {
                    console.warn(`LLM error on day ${dayCount}: `, parsedDay.error);
                    allDays.push({ error: parsedDay.error });
                    continue;
                }
                allDays.push(parsedDay);
            } catch (parseError) {
                console.error(`Error parsing JSON for day ${dayCount}`, parseError);
                allDays.push({ error: "Error parsing model output" });
                continue;
            }
        } catch (error) {
            console.error(`Error generating day ${dayCount} plan:`, error);
            if (error instanceof Error && error.message.includes("503 Service Unavailable")) {
                return {
                    diet_plan: null,
                    error: "Service Unavailable: The model is overloaded. Please try again later.",
                };
            }
            allDays.push({ error: "Failed to generate day plan." });
        }
    }

    const dietPlan = {
        user_name: data.name,
        age: data.age,
        gender: data.gender,
        weight_kg: data.weight_kg,
        height_cm: data.height_cm,
        activity_level: data.activity_level,
        dietary_goal: data.dietary_preference,
        dietary_restrictions: data.dietary_restrictions,
        bmi: bmi,
        bmi_category: bmi_category,
        daily_calories: 2000, // You might want to calculate this
        days: allDays,
    };
    return { diet_plan: dietPlan, error: null };
}