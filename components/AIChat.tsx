import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { translations } from '../utils/i18n';

interface AIChatProps {
  lang: Language;
}

const AIChat: React.FC<AIChatProps> = ({ lang }) => {
  const t = translations[lang];
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Reset/Init welcome message when language changes
  useEffect(() => {
    setMessages([{ role: 'model', text: t.askMe }]);
  }, [lang]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToGemini(messages, input, lang);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: t.chatError, isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Toggle Button with Glow */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:right-10 z-50 bg-gradient-to-r from-kidrise-orange to-red-500 hover:scale-110 text-white rounded-full p-4 shadow-[0_0_20px_rgba(255,140,0,0.6)] transition-all flex items-center justify-center w-16 h-16 border-2 border-white/20"
        title={t.chatTitle}
      >
        {isOpen ? <i className="fas fa-times text-2xl"></i> : <i className="fas fa-robot text-2xl animate-pulse"></i>}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-24 right-6 md:right-10 z-40 w-[85vw] md:w-96 bg-[#161825]/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`} style={{ maxHeight: '60vh', height: '500px' }}>
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-gradient-to-r from-white/5 to-transparent rounded-t-3xl">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-kidrise-orange to-yellow-400 flex items-center justify-center shadow-lg">
             <i className="fas fa-star text-white text-sm"></i>
          </div>
          <div>
            <h3 className="font-bold text-white text-base">{t.chatTitle}</h3>
            <p className="text-xs text-gray-400">{t.chatSubtitle}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-gradient-to-r from-kidrise-orange to-orange-600 text-white rounded-br-sm shadow-md' 
                  : 'bg-white/10 text-gray-100 rounded-bl-sm border border-white/5'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/10 p-3 rounded-2xl rounded-bl-none text-gray-400 text-xs flex gap-1 items-center border border-white/5">
                <span>{t.chatThinking}</span>
                <span className="animate-bounce">.</span>
                <span className="animate-bounce delay-100">.</span>
                <span className="animate-bounce delay-200">.</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t border-white/10 flex gap-2 bg-black/20 rounded-b-3xl">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2.5 text-sm text-white focus:outline-none focus:border-kidrise-orange focus:bg-white/10 transition-colors placeholder-gray-500"
          />
          <button 
            onClick={handleSend}
            disabled={isLoading}
            className="w-10 h-10 rounded-full bg-kidrise-orange hover:bg-orange-600 text-white flex items-center justify-center transition-colors disabled:opacity-50 shadow-lg"
          >
            <i className="fas fa-paper-plane text-xs"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default AIChat;
