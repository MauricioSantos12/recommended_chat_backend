require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const responseMessageByIA = async ({ history, message }) => {
  if (!message) return;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      config: {
        systemInstruction: "Eres un asistente. Tu nombre es CarlIA",
      },
    });

    const chatHistory =
      history && history.length > 0
        ? history.map((msg) => ({
            role: msg.sender == "user" ? "user" : "model",
            parts: [{ text: msg.message }],
          }))
        : [];

    chatHistory.push({ role: "user", parts: [{ text: message }] });
    const response = await model.generateContent({
      contents: chatHistory,
    });

    const text = await response.response.text();
    return text;
  } catch (error) {
    console.error("Error generating content:", error);
    return "An error occurred while processing your request.";
  }
};

module.exports = { responseMessageByIA };
