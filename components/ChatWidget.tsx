
import React, { useState, useRef, useEffect } from 'react';
import { aiService } from '../services/geminiService';
import { ChatMessage } from '../types';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'مرحباً بك! أنا مساعدك الذكي في AiApp6G. كيف يمكنني مساعدتك في بناء تطبيقك اليوم؟', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await aiService.supportChat([...messages, userMsg].map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'assistant', content: response || "عذراً، لم أستطع فهم ذلك.", timestamp: new Date() }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-[100]">
      {isOpen ? (
        <div className="w-80 md:w-96 h-[500px] glass-effect border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-10">
          <div className="p-4 ai-gradient flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-sm">🤖</div>
              <span className="font-bold">مساعد AiApp6G</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-end">
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none text-xs text-gray-500">جاري الكتابة...</div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              className="flex-grow bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm focus:ring-1 focus:ring-indigo-500 outline-none" 
              placeholder="اكتب سؤالك هنا..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="w-10 h-10 ai-gradient rounded-xl flex items-center justify-center text-white shrink-0"
            >
              ➔
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 ai-gradient rounded-2xl shadow-xl shadow-indigo-500/40 flex items-center justify-center text-3xl hover:scale-110 hover:rotate-6 transition-all duration-300"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatWidget;
