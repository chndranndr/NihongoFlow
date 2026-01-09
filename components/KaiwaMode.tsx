import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { DifficultyLevel, ChatMessage } from '../types';
import { startKaiwaSession } from '../services/geminiService';
import { MessageCircle, Mic, Send, User, Bot, Volume2 } from 'lucide-react';

interface KaiwaModeProps {
  level: DifficultyLevel;
  onBack: () => void;
}

const SCENARIOS = [
  "Self Introduction (Jikoshoukai)",
  "Ordering at a Restaurant",
  "Asking for Directions",
  "Shopping at a Konbini",
  "Talking about Hobbies",
  "Travel Plans"
];

const KaiwaMode: React.FC<KaiwaModeProps> = ({ level, onBack }) => {
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scenario, setScenario] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const initSession = async (selectedScenario: string) => {
    setScenario(selectedScenario);
    setIsLoading(true);
    try {
      const session = startKaiwaSession(level, selectedScenario);
      setChatSession(session);
      
      // Get initial greeting from AI
      const response = await session.sendMessage({ message: "Start the conversation." });
      
      setMessages([{
        id: 'init',
        role: 'model',
        text: response.text || "Konnichiwa! Let's start chatting.",
        timestamp: Date.now()
      }]);
    } catch (error) {
      console.error("Failed to start session", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await chatSession.sendMessage({ message: input });
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: result.text || "...",
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error sending message", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Simple Speech-to-Text Shim (Chrome/Edge only)
  const handleMicClick = () => {
    if ('webkitSpeechRecognition' in window) {
      // @ts-ignore
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'ja-JP';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
      };
      recognition.start();
    } else {
      alert("Speech recognition is only supported in Chrome/Edge.");
    }
  };

  if (!scenario) {
    return (
      <div className="max-w-2xl mx-auto p-4 animate-fade-in">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm mb-6">
          ← Back to Dashboard
        </button>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Choose a Scenario</h2>
        <p className="text-slate-500 mb-8">Select a topic to practice your Kaiwa (Conversation) skills.</p>
        
        <div className="grid gap-4">
          {SCENARIOS.map((s) => (
            <button
              key={s}
              onClick={() => initSession(s)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all text-left flex items-center justify-between group"
            >
              <span className="font-bold text-lg text-slate-700 group-hover:text-indigo-600">{s}</span>
              <MessageCircle className="w-5 h-5 text-slate-300 group-hover:text-indigo-500" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm">
          ← End Session
        </button>
        <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full truncate max-w-[200px]">
          {scenario}
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-end max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse space-x-2' : 'space-x-2'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-500'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                </div>
                
                <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="flex items-center space-x-2">
                 <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                 </div>
                 <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                   <div className="flex space-x-1">
                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                     <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                   </div>
                 </div>
               </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleMicClick}
              className="p-3 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-indigo-600 transition-colors"
              title="Speak (Chrome/Edge)"
            >
              <Mic className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type in Japanese..."
              className="flex-1 bg-slate-100 text-slate-800 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className="p-3 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-all shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaiwaMode;
