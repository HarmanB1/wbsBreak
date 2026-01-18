import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, FileText, CheckSquare, Send, Download, Trash2, Eye, Sparkles,
  Clock, CheckCircle2, XCircle, AlertCircle, File, Archive, Plus,
  ChevronDown, ChevronRight, Loader2, Star, MessageSquare, Calendar,
  Paperclip, Image, RotateCcw, ShieldCheck
} from 'lucide-react';


export const Context = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [showChecklist, setShowChecklist] = useState(true);
  const [aiReviewLoading, setAiReviewLoading] = useState(false);
  const [aiReviewResult, setAiReviewResult] = useState(null);
  const [submissionNote, setSubmissionNote] = useState('');

  const [checklist, setChecklist] = useState([
    { id: 'c1', text: 'All required documents attached', checked: false },
    { id: 'c2', text: 'Documents properly formatted', checked: false },
    { id: 'c3', text: 'Quality assurance completed', checked: false }
  ]);

  const fileInputRef = useRef(null);

  // --- NEW: Reset Functionality ---
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to clear this submission? All uploaded files and AI results will be lost.")) {
      setUploadedFiles([]);
      setAiReviewResult(null);
      setSubmissionNote('');
      setChecklist(checklist.map(i => ({ ...i, checked: false })));
      // Keep project/task selected for convenience, or nullify if preferred
    }
  };

  const runAIReview = () => {
    setAiReviewLoading(true);
    setTimeout(() => {
      setAiReviewResult({
        score: 92,
        status: 'passed',
        summary: 'AI has verified file integrity and content relevance.'
      });
      setAiReviewLoading(false);
    }, 2000);
  };

  const isManualDone = checklist.every(item => item.checked);
  const isAIDone = aiReviewResult?.score >= 80;
  const canSubmit = uploadedFiles.length > 0 && selectedProject && selectedTask && (isManualDone || isAIDone);

  return (
    <div className="flex h-screen bg-slate-50 pt-20">
      {/* Sidebar: Project Selection (Condensed for space) */}
      <div className="w-72 bg-white border-r border-slate-200 flex flex-col shadow-sm">
        <div className="p-5 border-b border-slate-200">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Context</h2>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Mapping projects logic... */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 mb-4">
            <p className="text-[10px] font-bold text-blue-500 uppercase">Current Task</p>
            <p className="text-sm font-bold text-slate-800">{selectedTask?.name || "None Selected"}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-5xl mx-auto space-y-6">

          {/* 1. Upload Section */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <Upload size={20} className="text-blue-600" />
                Deliverables
              </h2>
              <span className="text-xs font-medium text-slate-400">{uploadedFiles.length} files attached</span>
            </div>

            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => { e.preventDefault(); /* ...drop logic... */ }}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:bg-slate-50'}`}
            >
              <input ref={fileInputRef} type="file" multiple className="hidden" />
              <button onClick={() => fileInputRef.current.click()} className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-bold hover:shadow-sm transition-all">
                Choose Files
              </button>
            </div>
          </div>

          {/* 2. Validation Grid (Equal Importance) */}
          <div className="grid md:grid-cols-2 gap-6">

            {/* Manual Checklist */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${isManualDone ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <CheckSquare size={18} className="text-emerald-500" />
                  Self-Check
                </h3>
                {isManualDone && <CheckCircle2 size={18} className="text-emerald-500" />}
              </div>
              <div className="space-y-3">
                {checklist.map(item => (
                  <div key={item.id} onClick={() => /* toggle func */ { }} className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl cursor-pointer hover:border-emerald-300">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center ${item.checked ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300'}`}>
                      {item.checked && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                    <span className="text-sm font-medium text-slate-600">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Review Check */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${isAIDone ? 'bg-purple-50/50 border-purple-200' : 'bg-white border-slate-200'}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Sparkles size={18} className="text-purple-500" />
                  AI Validation
                </h3>
                {isAIDone && <ShieldCheck size={18} className="text-purple-500" />}
              </div>

              {!aiReviewResult ? (
                <div className="text-center py-6">
                  <p className="text-xs text-slate-500 mb-4">AI will scan for compliance and quality</p>
                  <button
                    onClick={runAIReview}
                    disabled={uploadedFiles.length === 0 || aiReviewLoading}
                    className="w-full py-2.5 bg-purple-600 text-white rounded-xl text-sm font-bold disabled:opacity-50"
                  >
                    {aiReviewLoading ? <Loader2 className="animate-spin mx-auto" size={18} /> : "Run AI Audit"}
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-black text-purple-600">{aiReviewResult.score}</span>
                    <span className="text-sm font-bold text-slate-400 mb-1">/ 100</span>
                  </div>
                  <p className="text-xs text-purple-800 bg-purple-100 p-2 rounded-lg">{aiReviewResult.summary}</p>
                  <button onClick={() => setAiReviewResult(null)} className="text-[10px] font-bold uppercase text-slate-400 hover:text-slate-600 transition-colors">Re-run Analysis</button>
                </div>
              )}
            </div>
          </div>

          {/* 3. Action Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <textarea
                placeholder="Final comments for the reviewer..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                rows={1}
                value={submissionNote}
                onChange={(e) => setSubmissionNote(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl transition-all"
              >
                <RotateCcw size={16} />
                Clear
              </button>

              <button
                disabled={!canSubmit}
                className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold shadow-lg transition-all ${canSubmit
                  ? 'bg-slate-900 text-white hover:scale-[1.02] active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
              >
                <Send size={16} />
                Submit Submission
              </button>
            </div>
          </div>

          {/* Warning Message if blocked */}
          {!canSubmit && uploadedFiles.length > 0 && (
            <div className="flex items-center justify-center gap-2 text-amber-600 bg-amber-50 py-2 rounded-lg border border-amber-100">
              <AlertCircle size={14} />
              <span className="text-xs font-bold uppercase tracking-tighter">Completion Required: Manual Check or AI Score {'>'} 80</span>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
