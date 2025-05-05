import { useGenAi } from "../utils/genAi.js";
import { calculateBMI } from "../utils/helpers.js";


export const generateWorkoutPlan = async (data) => {
    const { height_cm, weight_kg, age, goal, user_name } = data;
    const { bmi_category:fitness_level } = calculateBMI(height_cm, weight_kg);
    
    const prompt = `Generate a personalized workout plan for ${user_name}, who is ${age} years old and has a fitness level of ${fitness_level}. The user's primary goal is ${goal}. The plan should be for a 5-day week and include specific exercises, sets, reps, and rest periods. The tone should be encouraging and motivating. Provide the plan in JSON format.

    The JSON structure should be as follows:
    
    {
      "user_name": "${user_name}",
      "age": ${age},
      "fitness_level": "${fitness_level}",
      "goal": "${goal}",
      "workout_plan": [
        {
          "day": "Day 1",
          "exercises": [
            {
              "name": "Exercise Name",
              "sets": "3",
              "reps": "10", 
              "rest": "1 minute" 
            },
            // ... more exercises for Day 1
          ]
        },
        {
          "day": "Day 2",
          "exercises": [
            // ... exercises for Day 2
          ]
        },
        // ... Day 3, Day 4, Day 5
      ],
      "important_considerations": {},
    }

    result should be only and only in json_format.
    `;

    try {
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

        const workout_plan = JSON.parse(text);

        return { workout_plan, error: null };
    } catch (error) {
        console.error("Error in generateWorkoutPlan service:", error);
        return { error: "Failed to generate workout plan: " + error.message, workout_plan: null }; // Include the error message
    }
};