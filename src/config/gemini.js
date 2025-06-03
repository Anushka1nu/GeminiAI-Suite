
import { GoogleGenerativeAI } from '@google/generative-ai';

const GEMINI_API_KEY =
  process.env.REACT_APP_GEMINI_API_KEY || 'AIzaSyBjnKjDzgODZyCI1PJaW1rCzP6fne4iVnk';

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function runGemini(userPrompt) {
  if (!userPrompt || userPrompt.trim() === '') {
    console.error('Prompt is empty');
    return 'Prompt is empty.';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    });

    const text = result?.response?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error('No text response from Gemini:', result);
      return 'No valid response from Gemini.';
    }

    return text;
  } catch (err) {
    console.error('Error from Gemini API:', err);
    return 'Error generating response.';
  }
}

export default runGemini;






