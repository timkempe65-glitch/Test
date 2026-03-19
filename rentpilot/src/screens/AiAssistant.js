import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, User } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';
import { aiChatSuggestions, aiResponses } from '../data/mockData';

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1.5 px-4 py-3">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-gray-300 rounded-full"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

function FormatMessage({ text }) {
  const lines = text.split('\n');
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        if (line.startsWith('**') && line.endsWith('**')) {
          return <p key={i} className="font-semibold text-gray-900">{line.replace(/\*\*/g, '')}</p>;
        }
        if (line.includes('**')) {
          const parts = line.split(/(\*\*.*?\*\*)/g);
          return (
            <p key={i}>
              {parts.map((part, j) =>
                part.startsWith('**') ? (
                  <strong key={j} className="font-semibold">{part.replace(/\*\*/g, '')}</strong>
                ) : (
                  <span key={j}>{part}</span>
                )
              )}
            </p>
          );
        }
        if (line.startsWith('•')) {
          return <p key={i} className="pl-2">{line}</p>;
        }
        if (line.startsWith('✅') || line.startsWith('⚠️')) {
          return <p key={i}>{line}</p>;
        }
        if (line.match(/^\d+\./)) {
          return <p key={i} className="pl-2">{line}</p>;
        }
        if (line === '') return <div key={i} className="h-1" />;
        return <p key={i}>{line}</p>;
      })}
    </div>
  );
}

export default function AiAssistant() {
  const [messages, setMessages] = useState([
    { id: 0, role: 'ai', text: "Hi! I'm your RentPilot AI assistant. I can help you analyze utility bills, track payments, generate statements, and more. What would you like to know?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = (text) => {
    if (!text.trim()) return;
    const userMsg = { id: Date.now(), role: 'user', text: text.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const key = text.trim().toLowerCase();
    const response = aiResponses[key] || aiResponses.default;

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: response.text,
      }]);
    }, response.delay);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <PageWrapper className="flex flex-col h-screen !pb-0 !pt-12">
      {/* Header */}
      <div className="flex items-center gap-3 pt-3 pb-4 px-1">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-900">AI Assistant</h1>
          <p className="text-xs text-gray-400">Powered by RentPilot AI</p>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto pb-40 space-y-3">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'ai' && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={12} className="text-white" />
                </div>
              )}
              <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-brand-500 text-white rounded-br-md'
                  : 'bg-white shadow-card text-gray-700 rounded-bl-md'
              }`}>
                {msg.role === 'ai' ? <FormatMessage text={msg.text} /> : msg.text}
              </div>
              {msg.role === 'user' && (
                <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={13} className="text-gray-500" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-400 to-violet-500 flex items-center justify-center flex-shrink-0 mt-1">
              <Sparkles size={12} className="text-white" />
            </div>
            <div className="bg-white shadow-card rounded-2xl rounded-bl-md">
              <TypingIndicator />
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />

        {/* Suggestions (show only at start) */}
        {messages.length <= 1 && !isTyping && (
          <div className="space-y-2 pt-2">
            <p className="text-xs text-gray-400 font-medium px-1">Try asking:</p>
            {aiChatSuggestions.map((suggestion, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => sendMessage(suggestion)}
                className="w-full text-left bg-white shadow-card rounded-xl px-4 py-3 text-sm text-gray-600 active:bg-gray-50"
              >
                {suggestion}
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white/95 backdrop-blur-lg border-t border-gray-100 px-4 py-3 pb-8">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about your properties..."
            className="flex-1 bg-gray-100 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:ring-2 focus:ring-brand-200 transition-all"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            type="submit"
            disabled={!input.trim() || isTyping}
            className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send size={16} className="text-white" />
          </motion.button>
        </form>
      </div>
    </PageWrapper>
  );
}
