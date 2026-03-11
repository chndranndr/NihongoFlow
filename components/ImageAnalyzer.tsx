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
                setImage(result);
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
            setError(err.message || "Failed to analyze image.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const triggerUpload = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="max-w-3xl mx-auto pb-20 animate-fade-in">
            <div className="flex items-center gap-4 mb-6">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-secondary hover:text-primary font-medium transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <div className="flex items-center gap-2 bg-surface text-primary px-3 py-1.5 rounded-full text-xs font-semibold">
                    <ScanLine className="w-3 h-3" />
                    <span>Image Analyzer</span>
                </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6">
                {/* Left Column: Upload & Preview */}
                <div className="md:col-span-2 space-y-4">
                    <div
                        onClick={triggerUpload}
                        className={`
              relative aspect-[3/4] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden group
              ${image ? 'border-primary bg-primary' : 'border-border hover:border-primary/30 hover:bg-surface'}
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
                                    <p className="text-white font-semibold flex items-center gap-2"><Upload className="w-4 h-4" /> Change</p>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-6 space-y-3">
                                <div className="w-14 h-14 bg-surface rounded-xl flex items-center justify-center mx-auto">
                                    <ImageIcon className="w-7 h-7 text-secondary" />
                                </div>
                                <p className="text-primary font-semibold">Upload Photo</p>
                                <p className="text-secondary text-xs">JPG, PNG supported</p>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleAnalyze}
                        disabled={!image || isAnalyzing}
                        className="w-full py-4 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                        {isAnalyzing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" /> Analyzing...
                            </>
                        ) : (
                            <>
                                <Search className="w-5 h-5" /> Analyze
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
                        <div className="h-full flex flex-col items-center justify-center text-secondary p-8 border border-border rounded-2xl glass-card text-center min-h-[300px]">
                            <ScanLine className="w-12 h-12 mb-4 opacity-20" />
                            <p className="font-medium text-sm">Upload an image with Japanese text to analyze</p>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="h-full flex flex-col items-center justify-center p-8 border border-border rounded-2xl glass-card gap-4 min-h-[300px]">
                            <div className="w-12 h-12 border-4 border-surface border-t-primary rounded-full animate-spin"></div>
                            <p className="text-secondary animate-pulse font-medium">Analyzing...</p>
                        </div>
                    )}

                    {result && (
                        <div className="space-y-4 animate-fade-in-up">
                            {/* Translation Card */}
                            <div className="bg-primary text-white p-6 rounded-2xl">
                                <h3 className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">Translation</h3>
                                <p className="text-lg font-medium leading-relaxed">
                                    {result.fullTranslation}
                                </p>
                            </div>

                            {/* Breakdown Table */}
                            <div className="glass-card rounded-2xl border border-border overflow-hidden">
                                <div className="p-4 bg-surface border-b border-border">
                                    <h3 className="font-semibold text-primary">Breakdown</h3>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-surface text-secondary font-semibold uppercase text-xs">
                                            <tr>
                                                <th className="px-4 py-3">Word</th>
                                                <th className="px-4 py-3">Role</th>
                                                <th className="px-4 py-3">Form</th>
                                                <th className="px-4 py-3 min-w-[120px]">Meaning</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {result.breakdown.map((item, idx) => (
                                                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                                                    <td className="px-4 py-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-base font-semibold text-primary jp-font">{item.word}</span>
                                                            <span className="text-xs text-accent">{item.furigana}</span>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span className="inline-block px-2 py-0.5 rounded-md bg-surface text-secondary text-xs font-semibold">
                                                            {item.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <div className="space-y-1">
                                                            {item.baseForm !== '-' && (
                                                                <div className="text-xs text-secondary">
                                                                    Base: <span className="font-medium text-primary">{item.baseForm}</span>
                                                                </div>
                                                            )}
                                                            {item.attributes && item.attributes !== '-' && (
                                                                <div className="text-xs text-accent font-medium">
                                                                    {item.attributes}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-3 text-secondary font-medium">
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
