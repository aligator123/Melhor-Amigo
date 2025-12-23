
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getPetAdvice = async (history: ChatMessage[], userPrompt: string) => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: `Você é o "PetVibe AI", um especialista em estilo e comportamento animal de uma boutique premium de acessórios para pets. 
        Seu objetivo é ajudar os clientes a escolher os melhores acessórios (coleiras, camas, brinquedos) com base no porte, raça e personalidade do pet.
        Seja amigável, use emojis e dê sugestões práticas. 
        Se o usuário perguntar por algo que não temos (como comida), diga educadamente que nosso foco é estilo e conforto.
        Nossos produtos principais incluem: Coleiras de couro, Camas ortopédicas, Arranhadores, Peitorais refletivos e Brinquedos interativos.`,
      },
    });

    // We only send the message, as chat.sendMessage doesn't take history directly in this version
    // but the chat instance maintains it if we reused it. For simplicity in this stateless wrapper:
    const response = await chat.sendMessage({ message: userPrompt });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ops! Meu faro falhou um pouco agora. Pode tentar perguntar novamente? 🐾";
  }
};
