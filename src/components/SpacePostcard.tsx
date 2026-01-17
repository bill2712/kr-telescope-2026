import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';

interface SpacePostcardProps {
    onClose: () => void;
    lang: 'zh-HK' | 'en';
}

interface Decoration {
    id: number;
    type: 'sticker' | 'text';
    content: string;
    x: number;
    y: number;
}

const STICKERS = ['👩‍🚀', '🚀', '🛸', '🪐', '⭐', '👽', '🛰️', '🌑'];

const SpacePostcard: React.FC<SpacePostcardProps> = ({ onClose, lang }) => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [decorations, setDecorations] = useState<Decoration[]>([]);
    const [activeId, setActiveId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showSaved, setShowSaved] = useState(false);
    
    // For manual text input
    const [isEditingText, setIsEditingText] = useState(false);
    const [textInput, setTextInput] = useState('');

    const containerRef = useRef<HTMLDivElement>(null);
    const editorRef = useRef<HTMLDivElement>(null);
    const dragRef = useRef<{ startX: number, startY: number, initX: number, initY: number } | null>(null);

    const translations = {
        'zh-HK': {
            title: '太空明信片',
            loading: '正在拍照...',
            addSticker: '貼紙',
            addText: '寫字',
            save: '儲存',
            close: '關閉',
            placeholder: '你好，太空！',
            saved: '已儲存！',
            tips: '拖動貼紙改變位置'
        },
        'en': {
            title: 'Space Postcard',
            loading: 'Taking Photo...',
            addSticker: 'Stickers',
            addText: 'Text',
            save: 'Save',
            close: 'Close',
            placeholder: 'Hello Space!',
            saved: 'Saved!',
            tips: 'Drag items to move'
        }
    };

    const t = translations[lang];

    useEffect(() => {
        const capture = async () => {
            await new Promise(resolve => setTimeout(resolve, 500)); // Wait for UI to settle
            const element = document.getElementById('starmap-container');
            if (element) {
                try {
                    const canvas = await html2canvas(element, {
                        useCORS: true,
                        allowTaint: true,
                        backgroundColor: '#000000',
                         ignoreElements: (element) => {
                             // Ignore existing UI overlays if possible
                             return element.classList.contains('map-tools') || element.tagName === 'BUTTON';
                         }
                    });
                    setCapturedImage(canvas.toDataURL('image/png'));
                } catch (error) {
                    console.error("Capture failed:", error);
                }
            }
            setIsLoading(false);
        };
        capture();
    }, []);

    const addSticker = (sticker: string) => {
        const newDecs: Decoration = {
            id: Date.now(),
            type: 'sticker',
            content: sticker,
            x: 50, // Percent
            y: 50  // Percent
        };
        setDecorations([...decorations, newDecs]);
        setActiveId(newDecs.id);
    };

    const addText = () => {
        setIsEditingText(true);
        setTextInput(t.placeholder);
    };

    const confirmText = () => {
        if (!textInput.trim()) {
            setIsEditingText(false);
            return;
        }
        const newDecs: Decoration = {
            id: Date.now(),
            type: 'text',
            content: textInput,
            x: 50,
            y: 50
        };
        setDecorations([...decorations, newDecs]);
        setIsEditingText(false);
        setActiveId(newDecs.id);
        setTextInput('');
    };

    const handlePointerDown = (e: React.PointerEvent, id: number) => {
        e.stopPropagation();
        setActiveId(id);
        const item = decorations.find(d => d.id === id);
        if (!item) return;

        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            initX: item.x,
            initY: item.y
        };
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!dragRef.current || activeId === null || !editorRef.current) return;
        
        const rect = editorRef.current.getBoundingClientRect();
        const deltaX = (e.clientX - dragRef.current.startX) / rect.width * 100;
        const deltaY = (e.clientY - dragRef.current.startY) / rect.height * 100;

        setDecorations(prev => prev.map(d => {
            if (d.id === activeId) {
                return {
                    ...d,
                    x: Math.min(100, Math.max(0, dragRef.current!.initX + deltaX)),
                    y: Math.min(100, Math.max(0, dragRef.current!.initY + deltaY))
                };
            }
            return d;
        }));
    };

    const handlePointerUp = () => {
        dragRef.current = null;
    };

    const deleteActive = () => {
        if (activeId !== null) {
            setDecorations(prev => prev.filter(d => d.id !== activeId));
            setActiveId(null);
        }
    };

    const handleSave = async () => {
        if (editorRef.current) {
            // Deselect to allow clean capture
            setActiveId(null); 
            
            // Wait a tick for react to update render
            await new Promise(resolve => setTimeout(resolve, 50));

             try {
                const canvas = await html2canvas(editorRef.current, {
                    useCORS: true,
                    allowTaint: true,
                    backgroundColor: null,
                    scale: 2 // High res
                });
                
                const link = document.createElement('a');
                link.download = `kidrise-postcard-${Date.now()}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
                
                setShowSaved(true);
                setTimeout(() => setShowSaved(false), 2000);
            } catch (error) {
                console.error("Save failed:", error);
            }
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center p-4 animate-fade-in"
             onPointerUp={handlePointerUp}
             onPointerMove={handlePointerMove}
        >
             {/* Text Input Modal */}
             {isEditingText && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4">
                        <h3 className="text-gray-900 font-bold mb-4">{t.addText}</h3>
                        <input 
                            type="text" 
                            value={textInput} 
                            onChange={e => setTextInput(e.target.value)}
                            className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 mb-4 text-black focus:border-kidrise-orange outline-none"
                            autoFocus
                        />
                         <div className="flex gap-2">
                            <button onClick={() => setIsEditingText(false)} className="flex-1 py-2 text-gray-500 font-bold">Cancel</button>
                            <button onClick={confirmText} className="flex-1 py-2 bg-kidrise-orange text-white rounded-xl font-bold">OK</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="w-full max-w-4xl flex flex-col h-full md:h-auto items-center">
                
                {/* Header */}
                <div className="w-full flex justify-between items-center mb-4 px-4 text-white">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        <i className="fas fa-camera text-kidrise-orange"></i>
                        {t.title}
                    </h2>
                    <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                        <i className="fas fa-times text-xl"></i>
                    </button>
                </div>

                {/* Editor Area */}
                <div className="relative w-full aspect-video md:aspect-[4/3] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10"
                     ref={editorRef}
                     onPointerDown={() => setActiveId(null)}
                >
                    {isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center">
                             <div className="w-12 h-12 border-4 border-kidrise-orange border-t-transparent rounded-full animate-spin"></div>
                             <p className="mt-4 text-white ml-3">{t.loading}</p>
                        </div>
                    ) : (
                        <>
                             {capturedImage && (
                                <img src={capturedImage} alt="Captured" className="w-full h-full object-cover select-none pointer-events-none" />
                             )}
                             
                             {/* Logo Watermark */}
                             <div className="absolute bottom-4 right-4 text-white/50 text-sm font-bold pointer-events-none select-none italic">
                                Kidrise Sky Explorer
                             </div>

                             {/* Decorations */}
                             {decorations.map(dec => (
                                 <div
                                    key={dec.id}
                                    className={`absolute cursor-move select-none transition-transform will-change-transform ${activeId === dec.id ? 'z-20 scale-110' : 'z-10'}`}
                                    style={{ 
                                        left: `${dec.x}%`, 
                                        top: `${dec.y}%`, 
                                        transform: 'translate(-50%, -50%)',
                                        touchAction: 'none'
                                    }}
                                    onPointerDown={(e) => handlePointerDown(e, dec.id)}
                                 >
                                    <div className={`relative px-2 py-1 ${activeId === dec.id ? 'ring-2 ring-kidrise-orange rounded-lg bg-black/20' : ''}`}>
                                        {activeId === dec.id && (
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); deleteActive(); }}
                                                className="absolute -top-3 -right-3 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center shadow-md hover:bg-red-600"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        )}
                                        {dec.type === 'sticker' ? (
                                            <span className="text-4xl md:text-6xl drop-shadow-md filter">{dec.content}</span>
                                        ) : (
                                            <span className="text-xl md:text-2xl font-bold text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-sans whitespace-nowrap">{dec.content}</span>
                                        )}
                                    </div>
                                 </div>
                             ))}
                        </>
                    )}
                </div>

                {/* Toolbar */}
                <div className="mt-6 w-full overflow-x-auto pb-4 md:pb-0">
                    <div className="flex items-center gap-4 px-4 min-w-max">
                        
                        {/* Stickers */}
                        <div className="bg-white/10 rounded-2xl p-2 flex gap-2 overflow-x-auto max-w-md backdrop-blur-md border border-white/10">
                            {STICKERS.map(s => (
                                <button 
                                    key={s} 
                                    onClick={() => addSticker(s)}
                                    className="w-12 h-12 flex items-center justify-center text-3xl hover:scale-110 hover:bg-white/10 rounded-xl transition-all active:scale-95"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="h-10 w-[1px] bg-white/20 mx-2"></div>

                        <button 
                            onClick={addText}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold shadow-lg active:scale-95 transition-all text-sm md:text-base flex items-center gap-2 whitespace-nowrap"
                        >
                            <i className="fas fa-font"></i>
                            {t.addText}
                        </button>

                        <button 
                            onClick={handleSave}
                            disabled={isLoading}
                            className={`px-8 py-3 bg-gradient-to-r from-kidrise-orange to-red-500 rounded-xl text-white font-bold shadow-lg shadow-orange-500/20 active:scale-95 transition-all text-sm md:text-base flex items-center gap-2 whitespace-nowrap ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                        >
                            <i className="fas fa-download"></i>
                            {t.save}
                        </button>

                    </div>
                </div>

                 {/* Success Toast */}
                 {showSaved && (
                    <div className="fixed top-10 left-1/2 -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg font-bold animate-fade-in-down flex items-center gap-2 z-[60]">
                        <i className="fas fa-check-circle"></i>
                        {t.saved}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpacePostcard;
