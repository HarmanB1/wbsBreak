import React from 'react';
import { Link } from "react-router-dom";
import {
    Clock,
    ArrowRight,
    AlertCircle,
    Sparkles,
    Calendar,
    CheckCircle2,
    MoreHorizontal,
    TrendingUp,
    AlertTriangle
} from "lucide-react";

// --- MOCK DATA ---

const recentProject = {
    id: "proj-1",
    name: "E-Commerce Rebrand",
    lastEdited: "2 hours ago",
    progress: 75,
    status: "Active",
    members: [1, 2, 3]
};

const weekData = {
    Mon: [
        { id: 1, title: 'Team Sync', start: '10:00', end: '11:00', type: 'meeting' },
        { id: 2, title: 'Deep Work', start: '13:00', end: '16:00', type: 'focus' }
    ],
    Tue: [
        { id: 3, title: 'Code Review', start: '14:00', end: '15:30', type: 'dev' }
    ],
    Wed: [],
    Thu: [
        { id: 4, title: 'Client Call', start: '09:00', end: '10:00', type: 'meeting' },
        { id: 5, title: 'Deploy', start: '16:00', end: '17:00', type: 'dev' }
    ],
    Fri: [
        { id: 6, title: 'Retro', start: '11:00', end: '12:00', type: 'meeting' }
    ],
    Sat: [],
    Sun: []
};

const alertsData = {
    deadlines: [
        { id: 1, task: "finalize_auth_flow", date: "Tomorrow", priority: "high" },
        { id: 2, task: "submit_app_review", date: "In 2 days", priority: "medium" },
    ],
    stalls: [
        { id: 1, task: "Database Migration", duration: "Stuck for 3 days" },
    ],
    aiSuggestions: [
        { id: 1, text: "Backend latency is high on /api/user. Consider indexing 'email' field." },
    ]
};

//for future prob could have backend call
const ScheduleItem = ({ item }) => {
    const getColors = (type) => {
        switch (type) {
            case 'meeting': return 'bg-blue-50 border-blue-200 text-blue-700';
            case 'dev': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
            case 'focus': return 'bg-purple-50 border-purple-200 text-purple-700';
            default: return 'bg-gray-50 border-gray-200 text-gray-700';
        }
    };

    return (
        <div className={`p-3 rounded-lg border-l-4 text-sm mb-3 ${getColors(item.type)}`}>
            <div className="font-semibold">{item.title}</div>
            <div className="text-xs opacity-80 flex items-center gap-1 mt-1">
                <Clock size={10} />
                {item.start} - {item.end}
            </div>
        </div>
    );
};

export const Dash = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 p-8 font-sans text-slate-800">
            <div className="max-w-7xl mx-auto flex flex-col gap-10">

                {/* --- HEADER & WELCOME --- */}
                <div className="flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900">Good Morning, Alex</h1>
                        <p className="text-slate-500 mt-2">Here is what's happening with your projects today.</p>
                    </div>
                    <div className="text-sm font-medium text-slate-400">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                    </div>
                </div>

                {/* --- SECTION 1: JUMP BACK IN --- */}
                <section>
                    <div className="flex items-center gap-3 mb-4">
                        <TrendingUp size={20} className="text-blue-600" />
                        <h2 className="text-xl font-bold text-slate-800">Jump Back In</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Main Active Project Card */}
                        <Link to="/app/projects" className="col-span-2 group relative bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">
                                        EC
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold group-hover:text-blue-600 transition-colors">{recentProject.name}</h3>
                                        <p className="text-sm text-gray-400">Last edited {recentProject.lastEdited}</p>
                                    </div>
                                </div>
                                <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    {recentProject.status}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between text-sm font-medium">
                                    <span className="text-gray-500">Progress</span>
                                    <span>{recentProject.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${recentProject.progress}%` }} />
                                </div>
                            </div>

                            <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-200">
                                <ArrowRight className="text-blue-600" />
                            </div>
                        </Link>

                        {/* Quick Stats / Secondary Card */}
                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg flex flex-col justify-between">
                            <div>
                                <h3 className="text-gray-400 text-sm font-medium">Tasks Completed</h3>
                                <div className="text-4xl font-bold mt-2">12</div>
                                <div className="text-emerald-400 text-sm mt-1 flex items-center gap-1">
                                    <TrendingUp size={14} /> +15% vs last week
                                </div>
                            </div>
                            <button className="w-full bg-white/10 hover:bg-white/20 py-2 rounded-lg text-sm font-medium transition-colors backdrop-blur-sm">
                                View Report
                            </button>
                        </div>
                    </div>
                </section>

                {/* --- SECTION 2: SCHEDULE --- */}
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Calendar size={20} className="text-purple-600" />
                            <h2 className="text-xl font-bold text-slate-800">Your Week</h2>
                        </div>
                        <button className="text-sm text-gray-500 hover:text-black font-medium">View Calendar</button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm overflow-x-auto">
                        <div className="min-w-[800px] grid grid-cols-7 gap-4">
                            {Object.entries(weekData).map(([day, items]) => {
                                const isToday = new Date().toLocaleDateString('en-US', { weekday: 'short' }) === day;

                                return (
                                    <div key={day} className={`flex flex-col ${isToday ? 'bg-blue-50/30 rounded-xl -mx-2 px-2 py-2' : 'py-2'}`}>
                                        <div className="mb-4 text-center">
                                            <span className={`text-sm font-bold block ${isToday ? 'text-blue-600' : 'text-gray-500'}`}>
                                                {day}
                                            </span>
                                        </div>

                                        <div className="flex-1 min-h-[150px] space-y-2">
                                            {items.length > 0 ? (
                                                items.map((item) => (
                                                    <ScheduleItem key={item.id} item={item} />
                                                ))
                                            ) : (
                                                <div className="h-full border-2 border-dashed border-gray-100 rounded-lg flex items-center justify-center text-gray-300 text-xs">
                                                    Free
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* --- SECTION 3: ALERTS & INSIGHTS --- */}
                <section>
                    <h2 className="text-xl font-bold text-slate-800 mb-4">Needs Attention</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Deadlines Widget */}
                        <div className="bg-white p-5 rounded-2xl border border-red-100 shadow-[0_2px_10px_rgba(254,226,226,0.4)]">
                            <div className="flex items-center gap-2 mb-4 text-red-600">
                                <AlertCircle size={18} />
                                <h3 className="font-bold">Upcoming Deadlines</h3>
                            </div>
                            <div className="space-y-3">
                                {alertsData.deadlines.map(item => (
                                    <div key={item.id} className="flex justify-between items-center p-2 hover:bg-red-50 rounded-lg transition-colors cursor-pointer group">
                                        <div className="text-sm font-medium text-gray-700 group-hover:text-red-700 truncate max-w-[150px]">{item.task}</div>
                                        <div className="text-xs font-bold text-red-500 bg-red-100 px-2 py-1 rounded">{item.date}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Stalls Widget */}
                        <div className="bg-white p-5 rounded-2xl border border-orange-100 shadow-[0_2px_10px_rgba(255,237,213,0.4)]">
                            <div className="flex items-center gap-2 mb-4 text-orange-600">
                                <AlertTriangle size={18} />
                                <h3 className="font-bold">Project Stalls</h3>
                            </div>
                            {alertsData.stalls.map(item => (
                                <div key={item.id} className="bg-orange-50 p-3 rounded-lg border border-orange-100 mb-2">
                                    <div className="text-sm font-semibold text-gray-800">{item.task}</div>
                                    <div className="text-xs text-orange-600 mt-1 font-medium">{item.duration}</div>
                                </div>
                            ))}
                        </div>

                        {/* AI Insights Widget */}
                        <div className="bg-gradient-to-b from-indigo-50 to-white p-5 rounded-2xl border border-indigo-100 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Sparkles size={100} />
                            </div>
                            <div className="flex items-center gap-2 mb-4 text-indigo-600 relative z-10">
                                <Sparkles size={18} />
                                <h3 className="font-bold">AI Suggestions</h3>
                            </div>
                            {alertsData.aiSuggestions.map(item => (
                                <div key={item.id} className="relative z-10 text-sm text-gray-600 leading-relaxed">
                                    "{item.text}"
                                    <button className="block mt-3 text-xs font-bold text-indigo-600 hover:underline">
                                        Apply Fix →
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                </section>

            </div>
        </div>
    );
};
