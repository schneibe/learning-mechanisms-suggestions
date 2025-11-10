
import { GoogleGenAI, Type } from "@google/genai";
import type { LearningMechanism, GeneratedContent } from '../types';

// Fix: Adhering to the coding guidelines to use process.env.API_KEY, which also resolves the 'import.meta.env' TypeScript error.
const apiKey = process.env.API_KEY;

if (!apiKey) {
    // This provides a clear error message during development if the variable is missing.
    throw new Error("API_KEY environment variable not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        mechanism: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                reference: { type: Type.STRING },
            },
            required: ["title", "description", "reference"]
        },
        example: { type: Type.STRING },
        implementationTips: { type: Type.STRING },
        tradeoffs: { type: Type.STRING },
    },
    required: ["mechanism", "example", "implementationTips", "tradeoffs"]
};


export const generateLearningExperience = async (
    ageGroup: string,
    learningGoal: string,
    availableMechanisms: LearningMechanism[]
): Promise<GeneratedContent> => {
    
    const mechanismList = availableMechanisms
        .map(m => `- ${m.Title}: ${m.Description} (Reference: ${m.Reference})`)
        .join('\n');

    const prompt = `
You are an expert learning experience designer, specializing in creating engaging and effective educational activities. Your task is to suggest a specific learning mechanism for a given scenario.

You will be provided with a list of potential learning mechanisms. You MUST choose ONE mechanism from this list.

**Scenario Details:**
*   Target Age Group: ${ageGroup}
*   Learning Goal: ${learningGoal || 'General learning enhancement'}

**Available Learning Mechanisms:**
${mechanismList}

**Your Task:**
1.  Select the single most appropriate learning mechanism from the "Available Learning Mechanisms" list for the given scenario.
2.  Based on your selection, populate the fields in the required JSON format.

**Instructions for Content:**
- For "example", create a detailed, concrete activity using the chosen mechanism, tailored to the specified age group and learning goal.
- For "implementationTips", provide a bulleted list of actionable tips (using '*' as the bullet point) for a designer to implement this effectively.
- For "tradeoffs", provide a bulleted list of potential challenges or limitations (using '*' as the bullet point) to consider.
`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.8,
                topP: 0.95,
            }
        });

        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);

        return parsedJson;

    } catch (error) {
        console.error("Error generating content:", error);
        throw new Error("Failed to generate learning experience from AI. Please check your API key and try again.");
    }
};