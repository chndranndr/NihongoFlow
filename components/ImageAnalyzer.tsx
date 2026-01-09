import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Search, ScanLine, Loader2, ArrowLeft } from 'lucide-react';
import { analyzeJapaneseImage, ImageAnalysisResult } from '../services/geminiService';

interface ImageAnalyzerProps {
  onBack: () => void;
}

const ImageAnalyzer: React.FC<ImageAnalyzerProps> = ({ onBack }) => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [result, setResult] = useState<ImageAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        // Strip the data:image/jpeg;base64, part for API
        const base64Data = result.split(',')[1];
        setImage(result); // Keep full string for display
        setMimeType(file.type);
        setResult(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const base64Data = image.split(',')[1];
      const data = await analyzeJapaneseImage(base64Data, mimeType);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Failed to analyze image. Please check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-20 animate-fade-in">
      <div className="flex items-center mb-6">
        <button onClick={onBack} className="text-slate-500 hover:text-slate-700 font-medium text-sm mr-4 flex items-center">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <div className="flex items-center space-x-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase">
          <ScanLine className="w-3 h-3" />
          <span>Visual Analyzer</span>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-8">
        {/* Left Column: Upload & Preview */}
        <div className="md:col-span-2 space-y-4">
          <div 
            onClick={triggerUpload}
            className={`
              relative aspect-[3/4] rounded-3xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group
              ${image ? 'border-indigo-500 bg-slate-900' : 'border-slate-300 hover:border-indigo-400 hover:bg-slate-50'}
            `}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*"
            />
            
            {image ? (
              <>
                <img src={image} alt="Preview" className="absolute inset-0 w-full h-full object-contain z-10" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity z-20 flex items-center justify-center">
                   <p className="text-white font-bold flex items-center"><Upload className="w-4 h-4 mr-2" /> Change Image</p>
                </div>
              </>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-2">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <p className="text-slate-600 font-bold">Upload Photo</p>
                <p className="text-slate-400 text-xs">JPEGs, PNGs supported</p>
              </div>
            )}
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!image || isAnalyzing}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-300 hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Analyzing...
              </>
            ) : (
              <>
                <Search className="w-5 h-5 mr-2" /> Analyze Text
              </>
            )}
          </button>
          
          {error && (
            <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
              {error}
            </div>
          )}
        </div>

        {/* Right Column: Results */}
        <div className="md:col-span-3">
          {!result && !isAnalyzing && (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 p-8 border border-slate-100 rounded-3xl bg-white text-center">
              <ScanLine className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">Upload an image containing Japanese text to analyze grammatical structure and meaning.</p>
            </div>
          )}

          {isAnalyzing && (
             <div className="h-full flex flex-col items-center justify-center p-8 border border-slate-100 rounded-3xl bg-white space-y-4">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-slate-100 border-t-indigo-500 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center font-bold text-indigo-600 text-xs">AI</div>
                </div>
                <p className="text-slate-500 animate-pulse font-medium">Deciphering Kanji...</p>
             </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Full Translation Card */}
              <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl shadow-indigo-200">
                <h3 className="text-indigo-200 text-xs font-bold uppercase tracking-wider mb-2">Translation</h3>
                <p className="text-lg md:text-xl font-medium leading-relaxed">
                  {result.fullTranslation}
                </p>
              </div>

              {/* Detailed Table */}
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                 <div className="p-4 bg-slate-50 border-b border-slate-200">
                   <h3 className="font-bold text-slate-700">Detailed Breakdown</h3>
                 </div>
                 <div className="overflow-x-auto">
                   <table className="w-full text-sm text-left">
                     <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-xs">
                       <tr>
                         <th className="px-4 py-3 whitespace-nowrap">Word</th>
                         <th className="px-4 py-3 whitespace-nowrap">Role</th>
                         <th className="px-4 py-3 whitespace-nowrap">Form / Attributes</th>
                         <th className="px-4 py-3 min-w-[150px]">Meaning</th>
                       </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                       {result.breakdown.map((item, idx) => (
                         <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                           <td className="px-4 py-3 align-top">
                             <div className="flex flex-col">
                               <span className="text-lg font-bold text-slate-800 jp-font">{item.word}</span>
                               <span className="text-xs text-indigo-500 font-medium">{item.furigana}</span>
                             </div>
                           </td>
                           <td className="px-4 py-3 align-top">
                             <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200">
                               {item.role}
                             </span>
                           </td>
                           <td className="px-4 py-3 align-top">
                             <div className="space-y-1">
                               {item.baseForm !== '-' && (
                                 <div className="text-xs text-slate-500">
                                   Base: <span className="font-semibold text-slate-700">{item.baseForm}</span>
                                 </div>
                               )}
                               {item.attributes && item.attributes !== '-' && (
                                 <div className="text-xs text-emerald-600 font-medium">
                                   {item.attributes}
                                 </div>
                               )}
                             </div>
                           </td>
                           <td className="px-4 py-3 align-top text-slate-600 font-medium">
                             {item.meaning}
                           </td>
                         </tr>
                       ))}
                     </tbody>
                   </table>
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAnalyzer;
