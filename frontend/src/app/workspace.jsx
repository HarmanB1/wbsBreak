import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import {
    Brain,
    Sparkles,
    Send,
    Clock,
    Trash2,
    Plus,
    Save,
    PanelLeftClose,
    PanelLeftOpen,
    PanelRightClose,
    PanelRightOpen,
    History
} from "lucide-react";

const initialNotes = [
    { id: '1', content: 'Project structure: Use atomic design pattern for components.', timestamp: new Date() },
    { id: '2', content: 'Meeting: Finalize the API documentation by Friday.', timestamp: new Date() },
];

export const Workspace = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [currentNote, setCurrentNote] = useState('');
    const [chatMessages, setChatMessages] = useState([
        { role: 'assistant', content: "Hello. I've analyzed your current workspace. How can I help you refine these ideas?" }
    ]);
    const [chatInput, setChatInput] = useState('');
    const [showLeftPanel, setShowLeftPanel] = useState(true);
    const [showRightPanel, setShowRightPanel] = useState(true);

    const chatEndRef = useRef(null);
    useEffect(() => chatEndRef.current?.scrollIntoView(), [chatMessages]);

    const saveNote = () => {
        if (!currentNote.trim()) return;
        setNotes([{ id: Date.now().toString(), content: currentNote, timestamp: new Date() }, ...notes]);
        setCurrentNote('');
    };

    return (
        <div className="flex h-screen bg-white text-slate-900 pt-20 overflow-hidden font-sans">

            {/* --- LEFT PANEL: RECENT --- */}
            <AnimatePresence initial={false}>
                {showLeftPanel && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 300, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-slate-50 border-r border-slate-200 flex flex-col"
                    >
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <History size={16} className="text-slate-500" />
                                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">History</h2>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {notes.map(note => (
                                <div
                                    key={note.id}
                                    className="bg-white border border-slate-200 p-3 rounded-xl cursor-pointer hover:border-blue-400 transition-colors group"
                                    onClick={() => setCurrentNote(note.content)}
                                >
                                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed mb-2">
                                        {note.content}
                                    </p>
                                    <div className="flex justify-between items-center text-[10px] font-medium text-slate-400">
                                        <span>{new Date(note.timestamp).toLocaleDateString()}</span>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); setNotes(notes.filter(n => n.id !== note.id)) }}
                                            className="opacity-0 group-hover:opacity-100 hover:text-red-500 transition-opacity"
                                        >
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- CENTER: MAIN WORKSPACE --- */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Toolbar */}
                <div className="h-14 border-b border-slate-100 flex items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowLeftPanel(!showLeftPanel)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                        >
                            {showLeftPanel ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
                        </button>
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-sm font-semibold text-slate-700">Untitled Scratchpad</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={saveNote}
                            disabled={!currentNote.trim()}
                            className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 disabled:opacity-30 transition-all"
                        >
                            <Save size={14} />
                            Save
                        </button>
                        <button
                            onClick={() => setCurrentNote('')}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                        >
                            <Plus size={18} />
                        </button>
                        <div className="h-4 w-px bg-slate-200 mx-2" />
                        <button
                            onClick={() => setShowRightPanel(!showRightPanel)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
                        >
                            {showRightPanel ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
                        </button>
                    </div>
                </div>

                {/* Editor Area */}
                <div className="flex-1 p-10 overflow-y-auto">
                    <div className="max-w-3xl mx-auto h-full flex flex-col">
                        <textarea
                            value={currentNote}
                            onChange={(e) => setCurrentNote(e.target.value)}
                            placeholder="Start writing..."
                            className="w-full flex-1 bg-transparent resize-none outline-none text-lg leading-relaxed text-slate-800 placeholder:text-slate-300"
                        />
                    </div>
                </div>
            </div>

            {/* --- RIGHT PANEL: AI ASSISTANT --- */}
            <AnimatePresence initial={false}>
                {showRightPanel && (
                    <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 350, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="bg-slate-50 border-l border-slate-200 flex flex-col"
                    >
                        <div className="p-5 border-b border-slate-200 flex items-center gap-2">
                            <Sparkles size={16} className="text-blue-500" />
                            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">AI Assistant</h2>
                        </div>

                        <div className="flex-1 overflow-y-auto p-5 space-y-4">
                            {chatMessages.map((msg, idx) => (
                                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`
                    max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm
                    ${msg.role === 'user'
                                            ? 'bg-blue-600 text-white rounded-br-none'
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'}
                  `}>
                                        {msg.content}
                                    </div>
                                </div>
                            ))}
                            <div ref={chatEndRef} />
                        </div>

                        {/* AI Input */}
                        <div className="p-4 bg-white border-t border-slate-200">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500 transition-colors pr-10"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-blue-600">
                                    <Send size={16} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
