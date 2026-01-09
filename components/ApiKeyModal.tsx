import React, { useState, useEffect } from 'react';
import { Key, Eye, EyeOff, Save, X, ExternalLink } from 'lucide-react';
import { getApiKey, saveApiKey, removeApiKey } from '../services/geminiService';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      setKey(getApiKey() || '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    if (key.trim()) {
      saveApiKey(key.trim());
    } else {
      removeApiKey();
    }
    onClose();
  };

  const handleClear = () => {
    setKey('');
    removeApiKey();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden z-10 animate-fade-in-up">
        {/* Header */}
        <div className="bg-slate-900 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="bg-indigo-500 p-2 rounded-lg">
                <Key className="w-5 h-5 text-white" />
             </div>
             <h2 className="text-xl font-bold text-white">API Settings</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <p className="text-slate-600 text-sm leading-relaxed">
            To use the AI Conversation (Kaiwa) and Infinite Grammar features, you need a Google Gemini API Key. Your key is stored locally in your browser and never sent to our servers.
          </p>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Gemini API Key
            </label>
            <div className="relative">
              <input
                type={showKey ? "text" : "password"}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 px-4 py-3 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none pr-12 font-mono text-sm"
              />
              <button
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
              >
                {showKey ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
            >
              Get a free API Key <ExternalLink className="w-3 h-3 ml-1" />
            </a>
            
            {getApiKey() && (
              <button 
                onClick={handleClear}
                className="text-xs font-bold text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Key
              </button>
            )}
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center"
          >
            <Save className="w-5 h-5 mr-2" />
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiKeyModal;
