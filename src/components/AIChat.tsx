import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/genai";
import { Language, ChatMessage } from '../types';
import { translations } from '../utils/i18n';

interface AIChatProps {
  lang: Language;
}

const AIChat: React.FC<AIChatProps> = ({ lang }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  const toggleChat = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; 
        
        if (!apiKey) {
            throw new Error("API Key not found");
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});

        const systemPrompt = lang === 'zh-HK' 
            ? "你是一個友善的天文學家，專門回答小朋友關於星星的問題。請用繁體中文回答，簡單易懂。"
            : "You are a friendly astronomer explaining stars to kids. Answer in English, keep it simple.";
        
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemPrompt }]
                },
                {
                    role: "model",
                    parts: [{ text: "Understood! I am ready to help young explorers with space questions." }]
                }
            ],
            generationConfig: {
                maxOutputTokens: 200,
            },
        });

        const result = await chat.sendMessage(userMsg.content);
        const response = result.response;
        const text = response.text();
        
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: t.chatError || "Sorry, I can't reach the stars right now!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-24 right-4 z-40 flex flex-col items-end transition-all duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-0'}`}>
      
      {/* Chat Window */}
      <div className={`mb-4 w-80 md:w-96 bg-[#161825]/95 backdrop-blur-xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none absolute bottom-0 right-0'}`}>
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <i className="fas fa-robot text-white"></i>
                </div>
                <div>
                    <div className="font-bold">{t.chatTitle || "AI Astronomer"}</div>
                    <div className="text-[10px] opacity-80 uppercase tracking-widest">{t.chatSubtitle}</div>
                </div>
            </div>
            <button onClick={toggleChat} className="text-white/80 hover:text-white">
                <i className="fas fa-times"></i>
            </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 scrollbar-hide bg-black/40">
            {messages.length === 0 && (
                <div className="text-center text-gray-400 mt-10 p-4">
                    <i className="fas fa-meteor text-4xl mb-4 opacity-50"></i>
                    <p>{t.askMe || "Hi! Ask me anything about the stars!"}</p>
                </div>
            )}
            {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-white/10 text-gray-100 rounded-bl-none border border-white/5'
                    }`}>
                        {msg.text}
                    </div>
                </div>
            ))}
             {isLoading && (
                <div className="flex justify-start">
                    <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none flex gap-2 items-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-white/5 border-t border-white/10">
            <div className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder={t.chatPlaceholder || "Type a question..."}
                    className="flex-1 bg-black/20 text-white rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 border border-white/5 placeholder-gray-500"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-500 text-white w-10 h-10 rounded-xl flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <i className="fas fa-paper-plane"></i>
                </button>
            </div>
        </div>

      </div>

      {/* Floating Toggle Button */}
      <button 
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 hover:scale-110 active:scale-95 border-2 ${isOpen ? 'bg-black/50 border-white/20 text-white' : 'bg-gradient-to-r from-blue-600 to-cyan-500 border-white/20 text-white animate-pulse'}`}
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-robot'} text-2xl`}></i>
      </button>

    </div>
  );
};

export default AIChat;
