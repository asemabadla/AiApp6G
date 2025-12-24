import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || "";

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY });
    console.log("🔑 Gemini API Key loaded:", API_KEY ? "Yes" : "No");
  }

  async supportChat(messages: { role: string; content: string }[]) {
    console.log("💬 supportChat called with messages:", messages);

    try {
      const chat = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
        config: {
          systemInstruction: `أنت وكيل دعم عملاء ذكي لمنصة AiApp6G.
          اسم مؤسس المنصة هو عاصم العبادلة.
          المنصة تقوم ببناء تطبيقات برمجية متكاملة باستخدام وكلاء ذكاء اصطناعي متخصصين.
          سعر التطبيق هو 20 دولار فقط.
          يتم حذف جميع البيانات بعد تحميل العميل للتطبيق لضمان الخصوصية.
          يجب أن تكون لبقاً وتتحدث باللغة العربية الفصحى أو بلهجة مفهومة ومحترمة.`,
        },
      });

      console.log("✅ supportChat response:", chat);
      return chat.text || "";
    } catch (err) {
      console.error("❌ Error in supportChat:", err);
      throw err;
    }
  }

  async analyzeAppRequest(description: string) {
    console.log("🔍 analyzeAppRequest called with description:", description);

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `قم بتحليل هذا الطلب لبناء تطبيق: ${description}` }],
          },
        ],
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              features: { type: Type.ARRAY, items: { type: Type.STRING } },
              techStack: { type: Type.ARRAY, items: { type: Type.STRING } },
              uxStrategy: { type: Type.STRING },
              estimatedComplexity: { type: Type.STRING },
            },
            required: ["features", "techStack", "uxStrategy"],
          },
        },
      });

      console.log("✅ analyzeAppRequest raw response:", response);

      if (!response.text) {
        console.error("⚠️ No JSON text returned from analyzeAppRequest");
        throw new Error("لم يتم توليد استجابة من النموذج");
      }

      const parsed = JSON.parse(response.text);
      console.log("📦 Parsed analysis:", parsed);
      return parsed;
    } catch (err) {
      console.error("❌ Error in analyzeAppRequest:", err);
      throw err;
    }
  }

  async generateAppCode(techStack: string[], features: string[]) {
    console.log("🛠 generateAppCode called with:");
    console.log("📦 techStack:", techStack);
    console.log("✨ features:", features);

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{
              text: `قم بإنشاء كود مبدئي لتطبيق باستخدام هذه التقنيات: ${techStack.join(", ")} 
                     مع هذه الخصائص: ${features.join(", ")}`
            }]
          }
        ],
        config: {
          responseMimeType: "text/plain"
        }
      });

      console.log("✅ generateAppCode raw response:", response);

      if (!response.text) {
        console.error("⚠️ No code text returned from generateAppCode");
        throw new Error("لم يتم توليد كود التطبيق");
      }

      console.log("💡 Generated code:", response.text);
      return response.text;
    } catch (err) {
      console.error("❌ Error in generateAppCode:", err);
      throw err;
    }
  }
}

export const aiService = new AIService();