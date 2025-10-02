
import { GoogleGenAI, FunctionDeclaration, Type } from '@google/genai';

class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  private setReminderFunctionDeclaration: FunctionDeclaration = {
    name: 'setReminder',
    description: 'Sets a reminder for a specific task at a given time in the future. The time should be relative to now.',
    parameters: {
      type: Type.OBJECT,
      properties: {
        task: {
          type: Type.STRING,
          description: 'The specific task the user wants to be reminded of. For example: "go to the kitchen for an apple".',
        },
        delaySeconds: {
          type: Type.NUMBER,
          description: 'The delay in seconds from now when the reminder should be triggered. For example, for "in 5 minutes", this would be 300. For "in 20 seconds", this is 20.',
        },
      },
      required: ['task', 'delaySeconds'],
    },
  };

  async parseReminderCommand(text: string): Promise<{ task: string; delaySeconds: number } | null> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Analyze this user request and call the necessary function: "${text}"`,
        config: {
          tools: [{ functionDeclarations: [this.setReminderFunctionDeclaration] }],
        },
      });

      if (response.functionCalls && response.functionCalls.length > 0) {
        const functionCall = response.functionCalls[0];
        if (functionCall.name === 'setReminder' && functionCall.args) {
          return {
            task: functionCall.args.task as string,
            delaySeconds: functionCall.args.delaySeconds as number,
          };
        }
      }
      return null;
    } catch (error) {
      console.error('Error parsing reminder command:', error);
      throw new Error('Failed to parse reminder command with Gemini API.');
    }
  }

  async rephraseReminder(task: string): Promise<string> {
    try {
      const prompt = `You are a friendly personal assistant. Rephrase the following task into a natural, conversational reminder alert. The user just said they want a reminder for this. Task: "${task}". Keep it concise and encouraging. For example, if the task is "go to the kitchen and grab your apple", you could say "It's time to go to the kitchen and grab your apple now!".`;
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text.trim();
    } catch (error) {
      console.error('Error rephrasing reminder:', error);
      // Fallback to a generic phrase
      return `It's time for your reminder: ${task}`;
    }
  }
  
  async translateText(text: string, targetLanguage: string): Promise<string> {
    try {
      const prompt = `Translate the following text to ${targetLanguage}: "${text}"`;
       const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      return response.text.trim();
    } catch (error) {
       console.error('Error translating text:', error);
       return text; // Fallback to original text
    }
  }
}

export const geminiService = new GeminiService();
