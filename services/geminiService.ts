
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
  }

  async supportChat(messages: {role: string, content: string}[]) {
    const chat = this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: messages.map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      })),
      config: {
        systemInstruction: `أنت وكيل دعم عملاء ذكي لمنصة AiApp6G. 
        اسم مؤسس المنصة هو عاصم العبادلة. 
        المنصة تقوم ببناء تطبيقات برمجية متكاملة باستخدام وكلاء ذكاء اصطناعي متخصصين.
        سعر التطبيق هو 20 دولار فقط.
        يتم حذف جميع البيانات بعد تحميل العميل للتطبيق لضمان الخصوصية.
        يجب أن تكون لبقاً وتتحدث باللغة العربية الفصحى أو بلهجة مفهومة ومحترمة.`,
      }
    });
    const response = await chat;
    return response.text;
  }

  async analyzeAppRequest(description: string) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `قم بتحليل هذا الطلب لبناء تطبيق: ${description}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            features: { type: Type.ARRAY, items: { type: Type.STRING } },
            techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
            uxStrategy: { type: Type.STRING },
            estimatedComplexity: { type: Type.STRING }
          },
          required: ["features", "techStack", "uxStrategy"]
        }
      }
    });
    return JSON.parse(response.text || "{}");
  }
}

export const aiService = new AIService();
